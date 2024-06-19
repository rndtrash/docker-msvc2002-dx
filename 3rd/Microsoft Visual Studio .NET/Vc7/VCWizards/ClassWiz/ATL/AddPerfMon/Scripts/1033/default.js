// (c) 2001 Microsoft Corporation
// Script for AddPerfMon

function CanAddPerfSupport(selProj, selObj)
{
	try
	{
		if (!IsDllProject(wizard))
		{
			var L_OnlyDllProjects_Text = "PerfMon support can only be added to DLL projects.";
			wizard.ReportError(L_OnlyDllProjects_Text);
			return false;
		}
		return true;
	}
	catch(e)
	{
		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}

function IsDllProject(wizard)
{
	try
	{
		var oSolution = wizard.dte.Solution;
		var strProjectName = wizard.FindSymbol("PROJECT_NAME");
		var oProject;
		var iProject;
		var typeDynamicLibrary = 2;
		for (iProject = 1; iProject <= oSolution.Count; iProject++)
		{
			if (oSolution(iProject).Name == strProjectName)
			{
				oProject = oSolution(iProject);
				break;
			}
		}

		var config = oProject.Object.Configurations(1);
		if (typeDynamicLibrary == config.ConfigurationType)
		{
			return true;
		}
		return false;
	}
	catch(e)
	{
		throw e;
	}
}

function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{
		oCM = selProj.CodeModel;

		var strProjectName		= wizard.FindSymbol("PROJECT_NAME");
		var strSafeProjectName	= wizard.FindSymbol("SAFE_PROJECT_NAME");
		var strProjectPath		= wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath		= wizard.FindSymbol("TEMPLATES_PATH");
		var strHeaderName		= wizard.FindSymbol("HEADER_FILE");
		var oFiles = selProj.ProjectItems;

		var strProjectCPP		= GetProjectFile(selProj, "CPP", false, true);
		var strSTDAFX			= GetProjectFile(selProj, "STDAFX", false, true);

		var oSolution = dte.Solution;

		// Create Service Name
		CreateServiceName();

		// open a transaction
		var L_TRANSACTION_Text = "Add PerfMon Class To Project";
		oCM.StartTransaction(L_TRANSACTION_Text);

		// add macros to stdafx.h
		var oPerfReg = oCM.Macros.Find("_ATL_PERF_REGISTER");
		if (!oPerfReg)
			oCM.AddMacro("_ATL_PERF_REGISTER", strSTDAFX, "", vsCMAddPositionStart);

		// add _ATL_ATTRIBUTES
		if (!oCM.Macros.Find("_ATL_ATTRIBUTES"))
		{
			var nTotal = selProj.Object.Configurations.Count;
			for (var nCntr = 1; nCntr <= nTotal; nCntr++)
			{
				var oConfig = selProj.Object.Configurations(nCntr);
				var oVCCLTool = oConfig.Tools("VCCLCompilerTool");
				if (-1 == oVCCLTool.PreprocessorDefinitions.search("_ATL_ATTRIBUTES"))
					oVCCLTool.PreprocessorDefinitions += ";_ATL_ATTRIBUTES";
			}
		}


		// add #includes to stdafx.h
		if (!DoesIncludeExist(selProj, "<atlbase.h>", strSTDAFX))
			oCM.AddInclude("<atlbase.h>", strSTDAFX, vsCMAddPositionEnd);
		if (!DoesIncludeExist(selProj, "<atlcom.h>", strSTDAFX))
			oCM.AddInclude("<atlcom.h>", strSTDAFX, vsCMAddPositionEnd);
		if (!DoesIncludeExist(selProj, "<atlperf.h>", strSTDAFX))
			oCM.AddInclude("<atlperf.h>", strSTDAFX, vsCMAddPositionEnd);

		// add #include for new class to main cpp file
		oCM.AddInclude("\""+strHeaderName+"\"", strProjectCPP, vsCMAddPositionEnd);

		// render header for new class
		RenderAddTemplate("perfclass.h", strHeaderName, selProj, true);

		if (!IsAttributedProject(wizard))
		{
			var bExisted = true;
	
			var oDllRegisterServer = GetMemberFunction(false, "DllRegisterServer", selProj);
			if (!oDllRegisterServer)
			{
				bExisted = false;
				oDllRegisterServer = oCM.AddFunction("DllRegisterServer", strProjectCPP, vsCMFunctionFunction, "STDAPI", vsCMAddPositionEnd, vsCMAccessPublic);
				oDllRegisterServer.BodyText = "\tHRESULT hr = ATL::RegisterPerfMon();\r\n\treturn hr;\r\n";
			}
			else
			{
				var oDllRegisterServerInsert = oDllRegisterServer.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint();
		
				var reReg = /DllRegisterServer/i;
				if (oDllRegisterServer.BodyText.search(reReg) == -1)
					oDllRegisterServerInsert.Insert(PerfWizGetCodeForDllRegisterServer());
			}

			oCM.Synchronize();
	
			var oDllUnregisterServer = GetMemberFunction(false, "DllUnregisterServer", selProj);
			if (!oDllUnregisterServer)
			{
				bExisted = false;
				oDllUnregisterServer = oCM.AddFunction("DllUnregisterServer", strProjectCPP, vsCMFunctionFunction, "STDAPI", vsCMAddPositionEnd, vsCMAccessPublic);
				oDllUnregisterServer.BodyText = "\tHRESULT hr = ATL::UnregisterPerfMon();\r\n\treturn hr;\r\n";
			}
			else
			{
				var oDllUnregisterServerInsert = oDllUnregisterServer.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint();
		
				var reUnreg = /DllUnregisterServer/i;
				if (oDllUnregisterServer.BodyText.search(reUnreg) == -1)
					oDllUnregisterServerInsert.Insert(PerfWizGetCodeForDllUnregisterServer());
			}	

			oCM.Synchronize();
	
			// add #pragmas for exporting functions
			if (!bExisted)
			{
				var oDllRegisterServer = GetMemberFunction(false, "DllRegisterServer", selProj);
				oDllRegisterServer.StartPoint.Insert(PerfWizGetExportPragmas() + "\r\n");
			}
		}

		oCM.CommitTransaction();
		
		oCM.Classes.Find(wizard.FindSymbol("CLASS_NAME")).StartPoint.TryToShow(vsPaneShowTop);
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

function CreateServiceName()
{
	try
	{
		var strClassName = wizard.FindSymbol("CLASS_NAME");
		var strServiceName = "Perf_" + strClassName;
		var strLen = strClassName.length;
		if (strClassName.substr(0,1) == "C")
			var strServiceName = "Perf_" + strClassName.substr(1, strLen);

		wizard.AddSymbol("PERFMON_NAME", strServiceName);
	}
	catch(e)
	{
		throw e;
	}
}

function GetMemberFunction(oClass, strFuncName, selProj)
{
	try
	{
		var oFunctions;
		if (oClass)
			oFunctions = oClass.Functions;
		else
		{
			if (!selProj)
				return false;
			oFunctions = selProj.CodeModel.Functions;
		}

		for (var nCntr = 1; nCntr <= oFunctions.Count; nCntr++)
		{
			if (oFunctions(nCntr).Name == strFuncName)
				return oFunctions(nCntr);
		}
		return false;
	}
	catch(e)
	{
		throw e;
	}		
}

function PerfWizGetCodeForDllRegisterServer()
{
	try
	{
		var strCode = new Array();

		strCode[0] = "HRESULT hres = ATL::RegisterPerfMon();";
		strCode[1] = "if (hres != S_OK)";
		strCode[2] = "\treturn hres;";

		var strRet = "";
		for (var nCntr = 0; nCntr < strCode.length; nCntr++)
			strRet += "\t" + strCode[nCntr] + "\r\n";
		return strRet;
	}
	catch(e)
	{
		throw e;
	}
}

function PerfWizGetCodeForDllUnregisterServer()
{
	try
	{
		var strCode = new Array();

		strCode[0] = "HRESULT hres  = ATL::UnregisterPerfMon();";
		strCode[1] = "if (hres != S_OK)";
		strCode[2] = "\treturn hres;";

		var strRet = "";
		for (var nCntr = 0; nCntr < strCode.length; nCntr++)
			strRet += "\t" + strCode[nCntr] + "\r\n";
		return strRet;
	}
	catch(e)
	{
		throw e;
	}
}

function PerfWizGetExportPragmas()
{
	try
	{
		var strCode = new Array();

		strCode[0] = '#pragma comment(linker, "/EXPORT:DllRegisterServer=_DllRegisterServer@0,PRIVATE")';
		strCode[1] = '#pragma comment(linker, "/EXPORT:DllUnregisterServer=_DllUnregisterServer@0,PRIVATE")';

		var strRet = "";
		for (var nCntr = 0; nCntr < strCode.length; nCntr++)
			strRet += strCode[nCntr] + "\r\n";
		return strRet;
	}
	catch(e)
	{
		throw e;
	}
}
