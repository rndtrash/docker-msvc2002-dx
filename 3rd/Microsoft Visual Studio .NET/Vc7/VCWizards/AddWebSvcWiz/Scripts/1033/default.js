// (c) 2001 Microsoft Corporation

function CanAddWebSvc(selProj, selObj)
{
	try
	{
		if (!IsDllProject(selProj) || !IsAtlServerAppProject(selProj))
		{
			var L_OnlyDllProjects_Text = "Web service support can only be added to ATL/Server Application DLL projects.";
			wizard.ReportError(L_OnlyDllProjects_Text);
			return false;
		}
		
		wizard.AddSymbol("HEADER_FILE", "");
		wizard.AddSymbol("TODO_COMMENTS", true);
		wizard.AddSymbol("SAMPLE_CODE", true);

		return true;
	}
	catch(e)
	{
		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}

function IsDllProject(selProj)
{
	try
	{
		if (typeDynamicLibrary == selProj.Object.Configurations(1).ConfigurationType)
			return true;
		return false;
	}
	catch(e)
	{
		return false;
	}
}

function IsAtlServerAppProject(selProj)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;
		
		if (oCM.Maps.Find("HANDLER") || NamespaceHasRequestHandler(oCM))
			return true;
		return false;
	}
	catch(e)
	{
		return false;
	}
}

function NamespaceHasRequestHandler(oCM)
{
	try
	{
		var oClasses = oCM.Classes;
		for (var nCntr = 1; nCntr <= oClasses.Count; nCntr++)
		{
			if (oClasses(nCntr).Attributes.Find("request_handler") != null)
				return true;
		}

		var oNamespaces = oCM.Namespaces;
		for (var nCntr = 1; nCntr <= oNamespaces.Count; nCntr++)
		{
			if (NamespaceHasRequestHandler(oNamespaces(nCntr)))
				return true;
		}
		
		return false;
	}
	catch(e)
	{
		throw e;
	}
}

// appends instead of overwriting like RenderAddTemplate does
function MyRenderAppendTemplate(strTemplateFile, strProjectFile, oProjToAddTo, bOpen)
{
	try
	{
		var strTemplatePath	= wizard.FindSymbol("TEMPLATES_PATH");
		if ("\\" != strTemplatePath.charAt(strTemplatePath.length-1))
			strTemplatePath += "\\";

		strTemplateFile = strTemplatePath + strTemplateFile;

		wizard.RenderTemplate(strTemplateFile, strProjectFile, false, false);
		if (oProjToAddTo)
		{
			AddFileToProject(strProjectFile, oProjToAddTo, bOpen)		
		}
	}
	catch(e)
	{
		throw e
	}
}

function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var L_TRANSACTION_Text = "Add ATL Server Web Service";
		oCM.StartTransaction(L_TRANSACTION_Text);

		if (!CheckObjectsExist(oCM))
		{
			return;
		}
		
		if (!CheckAddtoProject(selProj))
		{
			var L_Error1_Text = "Project must support attributes.";
			var oError = new Error(L_Error1_Text);
			SetErrorInfo(oError);
			return;
		}

		var strRemoteMachine = GetTargetMachineName(selProj);
		wizard.AddSymbol("REMOTE_MACHINE", strRemoteMachine);

		PatchWizardSymbols();
		AddIncludes(selProj);
		
		var InfFile = CreateInfFile();
		var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
		var strProjectName = wizard.FindSymbol("PROJECT_NAME");
		var strProjectPath	= wizard.FindSymbol("PROJECT_PATH");
		var strResPath = "";
		var strHelpPath = "";

		var strTpl = "";
		var strName = "";
		
		var strTextStream = InfFile.OpenAsTextStream(1, -2);
		while (!strTextStream.AtEndOfStream)
		{
			strTpl = strTextStream.ReadLine();
			if (strTpl != "")
			{
				var strTarget = GetTargetName(strTpl, strProjectName, strResPath, strHelpPath);

				MyRenderAppendTemplate(strTpl, strTarget, selProj, false);

				if (strTpl == "root.h")
				{
					// add #include for new class to main cpp file
					var strProjectCPP		= GetProjectFile(selProj, "CPP", false, true);
					oCM.AddInclude("\""+strTarget+"\"", strProjectCPP, vsCMAddPositionEnd);
				}

				if (strTpl == "root.disco")
				{
        			var projfile = selProj.Object.Files(strTarget);
					projfile.DeploymentContent = true;
				}
			}
		}
		
		strTextStream.Close();
		InfFile.Delete();
		
		oCM.CommitTransaction();
	}
	catch(e)
	{
		if (oCM)
			oCM.AbortTransaction();

		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}

function GetFileNameUnique(strItemName, strSuffix)
{
	try
	{
		var nCnt = 0;
		var strFileCheck = strItemName + strSuffix;
		while (wizard.DoesFileExist(strFileCheck))
		{
			nCnt++;
			strFileCheck = strItemName + nCnt.toString() + strSuffix;
		}
		
		return strFileCheck;
	}
	catch(e)
	{
		throw e;
	}
}

function GetTargetName(strName, strProjectName, strResPath, strHelpPath)
{
	try
	{
		var strBase = wizard.FindSymbol("ITEM_NAME");

		var strHeaderFile = wizard.FindSymbol("HEADER_FILE");
		if (strHeaderFile.length > 0)
		{
			if (strHeaderFile.substr(strHeaderFile.length-2) == ".h")
				strBase = strHeaderFile.substr(0, strHeaderFile.length-2);
			else
				strBase = strHeaderFile;
		}

		var strTarget = strName;
		switch (strName)
		{
			case "root.disco":
				strTarget = StripPath(GetFileNameUnique(strBase, ".disco"));
				break;
			case "root.h":
				// if we have UI, use the filename selected
				strTarget = wizard.FindSymbol("HEADER_FILE");
				
				// else generate a unique one
				if (strTarget.length == 0)
					strTarget = StripPath(GetFileNameUnique(strBase, ".h"));
				break;
			default:
				break;
		}
		return strTarget; 
	}
	catch(e)
	{
		throw e;
	}
}

function StripPath(strFullPath)
{
	try
	{
		var nIndex = strFullPath.lastIndexOf("\\", strFullPath.length);
		if (nIndex != -1)
		{
			return strFullPath.substring(nIndex+1, strFullPath.length);
		}
		
		return strFullPath;
	}
	catch(e)
	{
		throw e;
	}
}

function CheckAddtoProject(oProj)
{
	try
	{
		if (!IsAttributedProject(wizard))
		{
			if (!ConvertProjectToAttributed(oProj))
				return false;
		}
	}
	catch (e)
	{
		return false;
	}
	
	return true;
}

function CheckObjectsExist(oCM)
{
	var strBase = wizard.FindSymbol("ITEM_NAME");
	var oNamespace = oCM.Namespaces.Find(strBase + "Service");
	if (oNamespace)
	{
		var strInterface = "I" + strBase + "Service"
		var oInterface = oNamespace.Interfaces.Find(strInterface);
		if (oInterface)
		{
			var L_InterfaceAlreadyExists_Text = "Interface already exists: ";
			oErrObj = new Error(L_InterfaceAlreadyExists_Text + strInterface);
			SetErrorInfo(oErrObj);
			return false;
		}

		var strClass = "C" + strBase + "Service";
		var oClass = oNamespace.Classes.Find(strClass);
		if (oClass)
		{
			var L_ClassAlreadyExists_Text = "Class already exists: ";
			oErrObj = new Error(L_ClassAlreadyExists_Text + strClass);
			SetErrorInfo(oErrObj);
			return false;
		}
	}
	
	return true;
}

function PatchWizardSymbols()
{
	try
	{
		// create guids for web service
		var strGuid = wizard.CreateGuid();
		wizard.AddSymbol("SOAP_COCLASS_GUID", wizard.FormatGuid(strGuid, Format1));
		strGuid = wizard.CreateGuid();
		wizard.AddSymbol("SOAP_INTERFACE_GUID", wizard.FormatGuid(strGuid, Format1));
		
		var strProjectName		= wizard.FindSymbol("PROJECT_NAME");
		var strSafeProjectName	= CreateSafeName(strProjectName);
		var strProjectPath		= wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath		= wizard.FindSymbol("TEMPLATES_PATH");
		var strSafeItemName     = CreateSafeName(StripPath(wizard.FindSymbol("ITEM_NAME")));

		wizard.AddSymbol("APP_CLASS", strSafeItemName);
		if (wizard.FindSymbol("HEADER_FILE").length == 0)
			wizard.AddSymbol("HEADER_FILE", GetFileNameUnique(strSafeItemName, ".h"));
		wizard.AddSymbol("NO_PCH", false);
	}
	catch(e)
	{
		throw e;
	}
}

function GlobalFunctionExists(oProj, strFunctionName)
{
	try
	{
		var oCM = oProj.CodeModel;
		
		var nCnt=1;
		for (nCnt=1; nCnt <= oCM.Functions.Count; nCnt++)
		{
			if (oCM.Functions.Item(nCnt).Name == strFunctionName)
				return true;
		}
		
		return false;
	}
	catch(e)
	{
		throw e;
	}
}

function AddIncludes(selProj)
{
	try
	{
		var nTotal = selProj.Object.Configurations.Count;
		var nCntr;
		var pchFile = "";
		for (nCntr = 1; nCntr <= nTotal; nCntr++)
		{
			var VCCLTool = selProj.Object.Configurations(nCntr).Tools("VCCLCompilerTool");
			if (VCCLTool.UsePrecompiledHeader == pchUseUsingSpecific)
			{
				if(pchFile=="")
					pchFile = VCCLTool.PrecompiledHeaderThrough;
			}
		}
		
		if(pchFile!="")
		{
			// Add necessary #include's to pchFile
			
			if (!DoesIncludeExist(selProj, "<winsock2.h>", pchFile))
			{
				// do not add if they specifically include winsock.h or the app is an MFC app
				if (!DoesIncludeExist(selProj, "<winsock.h>", pchFile) && !IsMFCProject(selProj, false))
				{
					selProj.CodeModel.AddInclude("<winsock2.h>", pchFile, vsCMAddPositionStart);
				}
			}
			
			if (!DoesIncludeExist(selProj, "<atlsoap.h>", pchFile))
				selProj.CodeModel.AddInclude("<atlsoap.h>", pchFile, vsCMAddPositionEnd);
		}
		else
		{
			wizard.AddSymbol("NO_PCH", true);
		}
	}
	catch(e)
	{
		throw e;
	}
}

function FindDeploy(selProj)
{
	var nCnt;
	for (nCnt = 1; nCnt <= wizard.dte.Solution.Count; nCnt++)
	{
		try
		{
			var obj = wizard.dte.Solution.Item(nCnt);
			  if (obj != null && wizard.IsWebTierProject(obj.Object))
			{
				if (obj.Name == selProj.Name + "Deploy")
					return obj;
			}
		}
		catch(e)
		{
			// we probably hit a project that wasn't loaded. skip it
		}
	}
	
	return null;
}

function GetTargetMachineName(selProj)
{
	try
	{
		var dplyProj = FindDeploy(selProj);
		var strRemoteMachine = wizard.GetComputerName();
		if (dplyProj)
			strRemoteMachine = wizard.GetRemoteMachine(dplyProj, "Debug");

		return strRemoteMachine;
	}
	catch(e)
	{
		throw e;
	}
}
