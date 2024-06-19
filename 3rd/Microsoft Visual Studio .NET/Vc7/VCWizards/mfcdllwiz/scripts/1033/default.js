// (c) 2001 Microsoft Corporation

function OnFinish(selProj, selObj)
{
	try
	{
		var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
		var strProjectName = wizard.FindSymbol("PROJECT_NAME");

		selProj = CreateProject(strProjectName, strProjectPath);

		AddCommonConfig(selProj, strProjectName);
		AddSpecificConfig(selProj, strProjectName);
		selProj.Object.keyword = "MFCDLLProj";

		SetFilters(selProj);

		var InfFile = CreateInfFile();
		AddFilesToProject(selProj, strProjectName, InfFile);

		SetCommonPchSettings(selProj);

		InfFile.Delete();
		selProj.Object.Save();
	}
	catch(e)
	{
		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}

function SetFileProperties(projfile, strName)
{
	return false;
}

function DoOpenFile(strTarget)
{
	return false;
}

function GetTargetName(strName, strProjectName, strResPath, strHelpPath)
{
	try
	{
		var strTarget = strName;
		if (strName.substr(0, 4) == "root")
		{
			var strlen = strName.length;
			if (strName == "root.ico" || strName == "root.rc2")
			{
				var strSafeProjectName = wizard.FindSymbol("SAFE_PROJECT_NAME");
				strSafeTarget = strSafeProjectName + strName.substr(4, strlen - 4);
				strTarget = strResPath + "\\" + strSafeTarget;
			}
			else
			{
				strTarget = strProjectName + strName.substr(4, strlen - 4);
			}
			return strTarget;
		}

		switch (strName)
		{
			case "readme.txt":
				strTarget = "ReadMe.txt";
				break;
			case "all.rc":
			case "dlgall.rc":
				strTarget = strProjectName + ".rc";
				break;
			case "dlgres.h":
			case "resource.h":
				strTarget = "Resource.h";
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

function AddSpecificConfig(proj, strProjectName)
{
	try
	{
		var bAutomation = wizard.FindSymbol("AUTOMATION");
		var bRegular = wizard.FindSymbol("DLL_TYPE_REGULAR");
		var bRegularStatic = wizard.FindSymbol("DLL_TYPE_REGULAR_STATIC");

		var config = proj.Object.Configurations("Debug");
		config.ConfigurationType = typeDynamicLibrary;
		config.CharacterSet = charSetMBCS;

		var CLTool = config.Tools("VCCLCompilerTool");
		var strDefines = GetPlatformDefine(config);
		strDefines += "_WINDOWS;_DEBUG";
		if (bRegular || bRegularStatic)
			strDefines += ";_USRDLL";
		else
			strDefines += ";_AFXEXT";

		if (bRegularStatic)
		{
			config.UseOfMFC = useMfcStatic;
			CLTool.RuntimeLibrary = rtMultiThreadedDebug;
		}
		else
		{
			config.UseOfMFC = useMfcDynamic;
			CLTool.RuntimeLibrary = rtMultiThreadedDebugDLL;
		}

		CLTool.PreprocessorDefinitions = strDefines;
		CLTool.TreatWChar_tAsBuiltInType = true;
		CLTool.DebugInformationFormat = debugEditAndContinue;

		var MidlTool = config.Tools("VCMidlTool");
		MidlTool.MkTypLibCompatible = false;
		MidlTool.PreprocessorDefinitions = "_DEBUG";

		if (bAutomation)
		{
			MidlTool.TypeLibraryName = "$(IntDir)/" + "$(ProjectName).tlb";
			if (IsPlatformWin32(config))
				MidlTool.TargetEnvironment = midlTargetWin32;
		}

		var RCTool = config.Tools("VCResourceCompilerTool");
		RCTool.Culture = rcEnglishUS;
		RCTool.PreprocessorDefinitions = "_DEBUG";
		RCTool.AdditionalIncludeDirectories = "$(IntDir)";
		
		var LinkTool = config.Tools("VCLinkerTool");
		LinkTool.LinkIncremental = linkIncrementalYes;
		LinkTool.GenerateDebugInformation = true;
		var strDefFile = ".\\" + strProjectName + ".def";
		LinkTool.ModuleDefinitionFile = strDefFile;
		LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".dll";
		LinkTool.ImportLibrary = "$(OutDir)/" + strProjectName + ".lib";

		if (bAutomation)
		{
			var PostBuildTool = config.Tools("VCPostBuildEventTool");
			var L_PerformingRegistration1_Text = "Performing registration";
			PostBuildTool.Description = L_PerformingRegistration1_Text;
			PostBuildTool.CommandLine = "regsvr32 /s /c \"$(TargetPath)\"";
		}

		config = proj.Object.Configurations("Release");
		config.ConfigurationType = typeDynamicLibrary;
		config.CharacterSet = charSetMBCS;

		CLTool = config.Tools("VCCLCompilerTool");
		strDefines = GetPlatformDefine(config);
		strDefines += "_WINDOWS;NDEBUG";
		if (bRegular || bRegularStatic)
			strDefines += ";_USRDLL";
		else
			strDefines += ";_AFXEXT";

		if (bRegularStatic)
		{
			config.UseOfMFC = useMfcStatic;
			CLTool.RuntimeLibrary = rtMultiThreaded;
		}
		else
		{
			config.UseOfMFC = useMfcDynamic;
			CLTool.RuntimeLibrary = rtMultiThreadedDLL;
		}
		CLTool.PreprocessorDefinitions = strDefines;
		CLTool.InlineFunctionExpansion = expandOnlyInline;
		CLTool.TreatWChar_tAsBuiltInType = true;
		CLTool.DebugInformationFormat = debugEnabled;

		MidlTool = config.Tools("VCMidlTool");
		MidlTool.MkTypLibCompatible = false;
		MidlTool.PreprocessorDefinitions = "NDEBUG";
		if (bAutomation)
		{
			MidlTool.TypeLibraryName = "$(IntDir)/" + "$(ProjectName).tlb";
			if (IsPlatformWin32(config))
				MidlTool.TargetEnvironment = midlTargetWin32;
		}

		RCTool = config.Tools("VCResourceCompilerTool");
		RCTool.Culture = rcEnglishUS;
		RCTool.PreprocessorDefinitions = "NDEBUG";
		RCTool.AdditionalIncludeDirectories = "$(IntDir)";

		LinkTool = config.Tools("VCLinkerTool");
		var strDefFile = ".\\" + strProjectName + ".def";
		LinkTool.ModuleDefinitionFile = strDefFile;
		LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".dll";
		LinkTool.ImportLibrary = "$(OutDir)/" + strProjectName + ".lib";
		LinkTool.GenerateDebugInformation = true;
		LinkTool.LinkIncremental = linkIncrementalNo;

		if (bAutomation)
		{
			var PostBuildTool = config.Tools("VCPostBuildEventTool");
			var L_PerformingRegistration2_Text = "Performing registration";
			PostBuildTool.Description = L_PerformingRegistration2_Text;
			PostBuildTool.CommandLine = "regsvr32 /s /c \"$(TargetPath)\"";
		}
	}
	catch(e)
	{
		throw e;
	}
}

