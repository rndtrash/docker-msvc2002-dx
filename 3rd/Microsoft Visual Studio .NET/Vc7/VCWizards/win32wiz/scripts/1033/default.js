// (c) 2001 Microsoft Corporation

function OnFinish(selProj, selObj)
{
	try
	{
		var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
		var strProjectName = wizard.FindSymbol("PROJECT_NAME");

		var bEmptyProject = wizard.FindSymbol("EMPTY_PROJECT");

		selProj = CreateProject(strProjectName, strProjectPath);
		selProj.Object.Keyword = "Win32Proj";

		AddCommonConfig(selProj, strProjectName);
		var strAppType = GetAppType();
		AddSpecificConfig(selProj, strProjectName, bEmptyProject, strAppType);

		SetFilters(selProj);

		if (!bEmptyProject)
		{
			var strCodePage = wizard.FindSymbol("CODE_PAGE");
			if (strCodePage == "1252")
				wizard.AddSymbol("ABOUTBOX_FONT_SIZE", "8");
			else
				wizard.AddSymbol("ABOUTBOX_FONT_SIZE", "9");
			
			var InfFile = CreateInfFile();
			var Pch = wizard.FindSymbol("PRE_COMPILED_HEADER");

			if ((strAppType == "LIB" || ((strAppType == "CONSOLE") && 
		                wizard.FindSymbol("SUPPORT_MFC"))) && !Pch) 
			{
				AddFilesToProject(selProj, strProjectName, InfFile);
				SetNoPchSettings(selProj);
			}
			else
			{
				AddFilesToProject(selProj, strProjectName, InfFile);
				SetCommonPchSettings(selProj);	
			}

			InfFile.Delete();
		}
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

		if (strName == "small.ico")
		{
			strTarget = "small.ico";
		}
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

function GetAppType()
{
	try
	{
		var strAppType = "";
		if (wizard.FindSymbol("CONSOLE_APP"))
			strAppType = "CONSOLE";
		else
		{
			if (wizard.FindSymbol("WIN_APP"))
				strAppType = "WIN";
			else
			{
				if (wizard.FindSymbol("DLL_APP"))
					strAppType = "DLL";
				else
				{
					if (wizard.FindSymbol("LIB_APP"))
						strAppType = "LIB";
				}
			}
		}
		return strAppType;
	}
	catch(e)
	{
		throw e;
	}
}

function AddSpecificConfig(proj, strProjectName, bEmptyProject, strAppType)
{
	try
	{
		var bMFC = wizard.FindSymbol("SUPPORT_MFC");

		var config = proj.Object.Configurations("Debug");
		config.CharacterSet = charSetMBCS;

		if (strAppType == "LIB")
			config.ConfigurationType = typeStaticLibrary;
		else if (strAppType == "DLL")
			config.ConfigurationType = typeDynamicLibrary;

		var CLTool = config.Tools("VCCLCompilerTool");
	//	CLTool.PrecompiledHeaderFile = "$(OutDir)/" + strProjectName + ".pch";
		if ((strAppType == "DLL" && bEmptyProject) || (strAppType == "LIB") || (strAppType == "CONSOLE" &&  bEmptyProject) || (strAppType == "WIN" && bEmptyProject))
		{
			CLTool.UsePrecompiledHeader = pchGenerateAuto;
		}

		if (strAppType == "DLL")
		{
			CLTool.RuntimeLibrary = rtMultiThreadedDebug;
		}
		else
		{
			if (bMFC)
				CLTool.RuntimeLibrary = rtMultiThreadedDebugDLL;
			else
				CLTool.RuntimeLibrary = rtSingleThreadedDebug;
		}

		var strDefines = GetPlatformDefine(config);
		strDefines += "_DEBUG";

		switch(strAppType)
		{
			case "CONSOLE":
				strDefines += ";_CONSOLE";
				if (bMFC)
					config.UseOfMFC = useMfcDynamic;
				break;
			case "LIB":
				strDefines += ";_LIB";
				if (bMFC)
					config.UseOfMFC = useMfcDynamic;
				break;
			case "DLL":
				strDefines += ";_WINDOWS;_USRDLL;";
				var strExports = wizard.FindSymbol("UPPER_CASE_PROJECT_NAME") + "_EXPORTS";
				strDefines += strExports;
				break;
			case "WIN":
				strDefines += ";_WINDOWS";
				break;
			default:
				break;
		}

		CLTool.PreprocessorDefinitions = strDefines;
		if (bEmptyProject)
			CLTool.UsePrecompiledHeader = pchNone;

		CLTool.DebugInformationFormat = debugEditAndContinue;

		if (strAppType == "LIB")
		{
			var LibTool = config.Tools("VCLibrarianTool");
			LibTool.OutputFile = "$(OutDir)/" + strProjectName + ".lib";
		}
		else
		{
			var LinkTool = config.Tools("VCLinkerTool");
			LinkTool.ProgramDatabaseFile = "$(OutDir)/" + strProjectName + ".pdb";
			LinkTool.GenerateDebugInformation = true;
			LinkTool.LinkIncremental = linkIncrementalYes;

			if (strAppType == "DLL" || strAppType == "WIN")
				LinkTool.SubSystem = subSystemWindows;
			else
				LinkTool.SubSystem = subSystemConsole;

			if (strAppType == "DLL")
			{
				LinkTool.ImportLibrary = "$(OutDir)/" + strProjectName + ".lib";
				LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".dll";
			}
			else
				LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".exe";
		}

		config = proj.Object.Configurations.Item("Release");
		config.CharacterSet = charSetMBCS;

		if (strAppType == "LIB")
			config.ConfigurationType = typeStaticLibrary;
		else if (strAppType == "DLL")
			config.ConfigurationType = typeDynamicLibrary;

		var CLTool = config.Tools("VCCLCompilerTool");
		if ((strAppType == "DLL" && bEmptyProject) || (strAppType == "LIB") || (strAppType == "CONSOLE" &&  bEmptyProject) || (strAppType == "WIN" && bEmptyProject))
		{
			CLTool.UsePrecompiledHeader = pchGenerateAuto;
		}

		if (strAppType == "DLL")
		{
			CLTool.RuntimeLibrary = rtMultiThreaded;
		}
		else
		{
			if (bMFC)
				CLTool.RuntimeLibrary = rtMultiThreadedDLL;
			else
				CLTool.RuntimeLibrary = rtSingleThreaded;
		}
		CLTool.InlineFunctionExpansion = expandOnlyInline;

		var strDefines = GetPlatformDefine(config);
		strDefines += "NDEBUG";
		if (bEmptyProject)
			CLTool.UsePrecompiledHeader = pchNone;

		CLTool.DebugInformationFormat = debugEnabled;

		switch(strAppType)
		{
			case "CONSOLE":
				strDefines += ";_CONSOLE";
				if (bMFC)
					config.UseOfMFC = useMfcDynamic;
				break;
			case "LIB":
				strDefines += ";_LIB";
				if (bMFC)
					config.UseOfMFC = useMfcDynamic;
				break;
			case "DLL":
				strDefines += ";_WINDOWS;_USRDLL;";
				var strExports = wizard.FindSymbol("UPPER_CASE_PROJECT_NAME") + "_EXPORTS";
				strDefines += strExports;
				break;
			case "WIN":
				strDefines += ";_WINDOWS";
				break;
			default:
				break;
		}

		CLTool.PreprocessorDefinitions = strDefines;

		if (strAppType == "LIB")
		{
			var LibTool = config.Tools("VCLibrarianTool");
			LibTool.OutputFile = "$(OutDir)/" + strProjectName + ".lib";
		}
		else
		{
			var LinkTool = config.Tools("VCLinkerTool");
			LinkTool.GenerateDebugInformation = true;
			LinkTool.LinkIncremental = linkIncrementalNo;

			if (strAppType == "DLL" || strAppType == "WIN")
				LinkTool.SubSystem = subSystemWindows;
			else
				LinkTool.SubSystem = subSystemConsole;

			if (strAppType == "DLL")
			{
				LinkTool.ImportLibrary = "$(OutDir)/" + strProjectName + ".lib";
				LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".dll";
			}
			else
			{
				LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".exe";
			}
		}
	}
	catch(e)
	{
		throw e;
	}
}

