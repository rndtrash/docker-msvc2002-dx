// (c) 2001 Microsoft Corporation

function OnFinish(selProj, selObj)
{	
	var oCM;
	try
	{
		if(!IsDllProject(selProj))
		{
			var L_NotManaged_Text = "Managed Web Service can be added to DLL projects only";
			wizard.ReportError (L_NotManaged_Text);
			return VS_E_WIZARDBACKBUTTONPRESS;
		}

		oCM	= selProj.CodeModel;

		var L_TRANSACTION_Text = "Add Web Service";
		oCM.StartTransaction(L_TRANSACTION_Text);

		CheckAddtoProject(selProj);
		
		PatchWizardSymbols();	
		var strSafeItemName = wizard.FindSymbol("SAFE_ITEM_NAME");
		var oElement = oCM.Namespaces.Find(strSafeItemName);
		if (oElement)
		{
			var strItemName = wizard.FindSymbol("ITEM_NAME");
			var L_ObjectExist_Text = " is already found in the project. Please choose a different name.";
			wizard.ReportError(strItemName + L_ObjectExist_Text);
			return VS_E_WIZARDBACKBUTTONPRESS; 
		}
	}
	catch(e)
	{
		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
	try
	{
		var L_TRANSACTION_Text = "Add Web Service";
		oCM.StartTransaction(L_TRANSACTION_Text);
		
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
				strName = strTpl;
				var strTarget = GetTargetName(strName, strProjectName, strResPath, strHelpPath);
				var strTemplate = strTemplatePath + "\\" + strTpl;
				var strFile = strProjectPath + "\\" + strTarget;
				
				if (wizard.DoesFileExist(strName))
					continue;
				wizard.RenderTemplate(strTemplate, strFile);
				
				var projfile = selProj.Object.AddFile(strFile);

				if (strName == "root.vsdisco" || strName == "root.asmx")
				{
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

function GetTargetName(strName, strProjectName, strResPath, strHelpPath)
{
	try
	{
		var strTarget = strName;
		switch (strName)
		{
			case "root.vsdisco":
				strTarget = StripPath(GetUniqueFileName(wizard.FindSymbol("PROJECT_PATH"), wizard.FindSymbol("ITEM_NAME") +".vsdisco"));
				break;
			case "root.h":
				strTarget = wizard.FindSymbol("FILE_NAME");
				break;
			case "root.asmx":
				strTarget = StripPath(GetUniqueFileName(wizard.FindSymbol("PROJECT_PATH"), wizard.FindSymbol("ITEM_NAME") +".asmx"));
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
	catch (e)
	{
		throw e;
	}
}

function IsDllProject(selProj)
{
	try
	{
		var nTotal = selProj.Object.Configurations.Count;
		for (var nCntr = 1; nCntr <= nTotal; nCntr++)
		{
			if (typeDynamicLibrary != selProj.Object.Configurations(nCntr).ConfigurationType)
				return false;
		}
		return true;
	}
	catch(e)
	{
		return false;
	}
}

function CheckAddtoProject(oProj)
{
	wizard.AddSymbol("COMMENTS_MANAGED_SWITCHES","");
	try
	{
		var nTotal = oProj.Object.Configurations.Count;
		for (var nCntr = 1; nCntr <= nTotal; nCntr++)
		{
			var oConfig = oProj.Object.Configurations(nCntr);
			if (oConfig.ManagedExtensions == false)
			{
				var L_MANAGEDSETTINGS_TEXT = "/*\nCheck for the following property settings on the files that include this file.\n";
				var L_MANAGEDSETTINGS1_TEXT = "1. \"Debug Information Format\" should be set to \"Zi\"\n";
				L_MANAGEDSETTINGS_TEXT = L_MANAGEDSETTINGS_TEXT + L_MANAGEDSETTINGS1_TEXT;
				L_MANAGEDSETTINGS2_TEXT = "2. \"Compile As Managed\" should be set to \"Assembly (\\CLR)\"\n";
				L_MANAGEDSETTINGS_TEXT = L_MANAGEDSETTINGS_TEXT + L_MANAGEDSETTINGS2_TEXT;
				L_MANAGEDSETTINGS3_TEXT = "3. \"Enable Minimal Rebuild\" should be set to \"No\"\n";
				L_MANAGEDSETTINGS_TEXT = L_MANAGEDSETTINGS_TEXT + L_MANAGEDSETTINGS3_TEXT;
				L_MANAGEDSETTINGS4_TEXT = "4. \"Basic Runtime Checks\" should be set to \"Default\"\n";
				L_MANAGEDSETTINGS_TEXT = L_MANAGEDSETTINGS_TEXT + L_MANAGEDSETTINGS4_TEXT;
				L_MANAGEDSETTINGS5_TEXT = "5. \"Runtime Library\" should be set to \"Multi-threaded DLL (\\MD)\"\n";
				L_MANAGEDSETTINGS_TEXT = L_MANAGEDSETTINGS_TEXT + L_MANAGEDSETTINGS5_TEXT;
				L_MANAGEDSETTINGS6_TEXT = "6. You might have to make some changes to the precompiled header settings.\n*/\n";
				L_MANAGEDSETTINGS_TEXT = L_MANAGEDSETTINGS_TEXT + L_MANAGEDSETTINGS6_TEXT;
				wizard.AddSymbol("COMMENTS_MANAGED_SWITCHES", L_MANAGEDSETTINGS_TEXT);

				return false;
			}
		}
		return true;

	}
	catch (e)
	{
		return false;
	}
}

function PatchWizardSymbols()
{
	try
	{
		var strProjectName		= wizard.FindSymbol("PROJECT_NAME");
		var strSafeProjectName	= CreateSafeName(strProjectName);

		var strProjectPath		= wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath		= wizard.FindSymbol("TEMPLATES_PATH");

		var strSafeItemName     = CreateSafeName(StripPath(wizard.FindSymbol("ITEM_NAME")));
		var strFileName		= StripPath(GetUniqueFileName(strProjectPath, strSafeItemName)) + ".h";

		wizard.AddSymbol("SAFE_ITEM_NAME", strSafeItemName);
		wizard.AddSymbol("FILE_NAME", strFileName);
	}
	catch (e)
	{
		throw e;
	}
}

