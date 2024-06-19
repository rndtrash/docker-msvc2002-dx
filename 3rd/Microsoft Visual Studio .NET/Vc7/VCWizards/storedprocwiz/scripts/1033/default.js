// (c) 2001 Microsoft Corporation

function OnFinish(selProj, selObj)
{
	try
	{
		var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
		var strProjectName = wizard.FindSymbol("PROJECT_NAME");

		selProj = CreateProject(strProjectName, strProjectPath);
		selProj.Object.Keyword = "ExtStoredProcProj";

		AddCommonConfig(selProj, strProjectName);
		AddSpecificConfig(selProj, strProjectName);

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

		if (strName == "readme.txt")
			strTarget = "ReadMe.txt";
		if (strName == "resource.h")
			strTarget = "Resource.h";

		if (strName.substr(0, 4) == "root")
		{
			var strlen = strName.length;
			strTarget = strProjectName + strName.substr(4, strlen - 4);
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
		var config = proj.Object.Configurations("Debug");
		config.CharacterSet = charSetMBCS;
		config.ConfigurationType = typeDynamicLibrary;

		var CLTool = config.Tools("VCCLCompilerTool");
		var strDefines = GetPlatformDefine(config);
		strDefines += "_WINDOWS;_DEBUG;_USRDLL";
		CLTool.PreprocessorDefinitions= strDefines
		CLTool.RuntimeLibrary = rtMultiThreadedDebugDLL;
		CLTool.DebugInformationFormat = debugEditAndContinue;

		var MidlTool = config.Tools("VCMidlTool");
		MidlTool.MkTypLibCompatible = false;
		MidlTool.PreprocessorDefinitions = "_DEBUG";

		var RCTool = config.Tools("VCResourceCompilerTool");
		RCTool.Culture = rcEnglishUS;
		RCTool.PreprocessorDefinitions = "_DEBUG";
		
		var LinkTool = config.Tools("VCLinkerTool");
		LinkTool.AdditionalDependencies = "opends60.lib";
		LinkTool.LinkIncremental = linkIncrementalYes;
		LinkTool.GenerateDebugInformation = true;

		config = proj.Object.Configurations("Release");
		config.CharacterSet = charSetMBCS;
		config.ConfigurationType = typeDynamicLibrary;

		CLTool = config.Tools("VCCLCompilerTool");
		strDefines = GetPlatformDefine(config);
		strDefines += "_WINDOWS;NDEBUG;_USRDLL";
		CLTool.PreprocessorDefinitions= strDefines;
		CLTool.InlineFunctionExpansion = expandOnlyInline;
		CLTool.RuntimeLibrary = rtMultiThreadedDLL;
		CLTool.DebugInformationFormat = debugEnabled;

		MidlTool = config.Tools("VCMidlTool");
		MidlTool.MkTypLibCompatible = false;
		MidlTool.PreprocessorDefinitions = "NDEBUG";

		RCTool = config.Tools("VCResourceCompilerTool");
		RCTool.Culture = rcEnglishUS;
		RCTool.PreprocessorDefinitions = "NDEBUG";

		LinkTool = config.Tools("VCLinkerTool");
		LinkTool.GenerateDebugInformation = true;
		LinkTool.AdditionalDependencies = "opends60.lib";
		LinkTool.LinkIncremental = linkIncrementalNo;
	}
	catch(e)
	{
		throw e;
	}
}
