// (c) 2001 Microsoft Corporation

function OnFinish(selProj, selObj)
{
	try
	{
		var strTemplatePath	= wizard.FindSymbol("TEMPLATES_PATH");
		var strProjectPath	= wizard.FindSymbol("PROJECT_PATH");
		var strProjectName	= wizard.FindSymbol("PROJECT_NAME");
		var bAttributed		= wizard.FindSymbol("ATTRIBUTED");
		var strSafeProjName = wizard.FindSymbol("SAFE_PROJECT_NAME");
		wizard.AddSymbol("UPPER_CASE_PROJECT_NAME", strSafeProjName.toUpperCase());

		selProj = CreateProject(strProjectName, strProjectPath);

		AddConfigurations(selProj, strProjectName);

		SetFilters(selProj);
		selProj.Object.keyword = "AtlProj";
		
		var InfFile = CreateInfFile();
		AddFilesToProject(selProj, strProjectName, InfFile);

		var L_strGenerated_Text = "Generated Files";
		if (!bAttributed)
		{
			var strMIDLHeader = strProjectPath + "\\" + strProjectName + ".h";
			wizard.RenderTemplate(strTemplatePath + "\\root.h", strMIDLHeader);
			var strMIDL_IFile = strProjectPath + "\\" + strProjectName + "_i.c";

			wizard.RenderTemplate(strTemplatePath + "\\root_i.c", strMIDL_IFile);

			var oGeneratedFiles = selProj.Object.AddFilter(L_strGenerated_Text);
			if (oGeneratedFiles)
			{
				oGeneratedFiles.SourceControlFiles = false;
				oGeneratedFiles.AddFile(strMIDL_IFile);
			}
			else
				selProj.Object.AddFile(strMIDL_IFile);
		}

		SetPchSettings(selProj, strProjectName);

		InfFile.Delete();
		selProj.Object.Save();

		var bMergeProxy = wizard.FindSymbol("MERGE_PROXY_STUB");
		if (!bMergeProxy)
		{			
			var strDefFile = strProjectPath + "\\" + strProjectName + "ps.def";		
			var str_PFile;
			var str_IFile;

			if (bAttributed)
			{
				str_PFile = strProjectPath + "\\_" + strProjectName + "_p.c";
				str_IFile = strProjectPath + "\\_" + strProjectName + "_i.c";
			}
			else
			{
				str_PFile = strProjectPath + "\\" + strProjectName + "_p.c";
				str_IFile = strProjectPath + "\\" + strProjectName + "_i.c";
			}

			strProjectName += "PS";
			wizard.AddSymbol("CLOSE_SOLUTION", false);
			var oPSProj = CreateProject(strProjectName, strProjectPath);

			SetPSConfigurations(oPSProj, selProj);

			var strSrcFilter = wizard.FindSymbol("SOURCE_FILTER");
			var L_Source_Text = "Source Files";
			var group = oPSProj.Object.AddFilter(L_Source_Text);
			group.Filter = strSrcFilter;

			oPSProj.Object.keyword = "AtlPSProj";

			wizard.RenderTemplate(strTemplatePath + "\\rootps.def", strDefFile);
			oPSProj.Object.AddFile(strDefFile);
			var oGeneratedFiles = oPSProj.Object.AddFilter(L_strGenerated_Text);
			if (oGeneratedFiles)
			{
				oGeneratedFiles.SourceControlFiles = false;
				oGeneratedFiles.AddFile(str_IFile);
				oGeneratedFiles.AddFile(str_PFile);
				oGeneratedFiles.AddFile(strProjectPath + "\\dlldata.c");
			}
			else
			{
				oPSProj.Object.AddFile(str_IFile);
				oPSProj.Object.AddFile(str_PFile);
				oPSProj.Object.AddFile(strProjectPath + "\\dlldata.c");
			}

			oPSProj.Object.Save();
		}

		// expand main project node, highlight it
		//
		strProjectName	= wizard.FindSymbol("PROJECT_NAME");
		var oHier = wizard.dte.Windows.Item(vsWindowKindSolutionExplorer).Object;
		var oHISolution = oHier.UIHierarchyItems(1);
		var oHIProjMain;
		for (nHI=1; nHI<=oHISolution.UIHierarchyItems.Count; nHI++)
		{
			if ( oHISolution.UIHierarchyItems(nHI).name == strProjectName ) 
			{
				oHIProjMain = oHISolution.UIHierarchyItems(nHI);
				break;
			}
		}
		if (oHIProjMain)
		{
			oHIProjMain.UIHierarchyItems.Expanded = true;
			oHIProjMain.Select(vsUISelectionTypeSelect);
		}
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
			if (strName == "root.idl")
			{
				var strSafeProjectName = wizard.FindSymbol("SAFE_PROJECT_NAME");
				strTarget = strSafeProjectName + ".idl";
			}
			else
			{
				strTarget = strProjectName + strName.substr(4, strName.length - 4);
			}
		}
		return strTarget; 
	}
	catch(e)
	{
		throw e;
	}
}

function SetPSConfigurations(oProj, oMainProj)
{
	try
	{
		oConfigs = oProj.Object.Configurations;
		bSupportComPlus = wizard.FindSymbol("SUPPORT_COMPLUS");

		for (var nCntr = 1; nCntr <= oConfigs.Count; nCntr++)
		{
			var oConfig = oConfigs(nCntr);
			var bDebug = false;
			if (-1 != oConfig.Name.indexOf("Debug"))
				bDebug = true;

			oConfig.ConfigurationType = typeDynamicLibrary;
			var oCLTool = oConfig.Tools("VCCLCompilerTool");

			var strDefines = GetPlatformDefine(oConfig);
			strDefines += "_WIN32_WINNT=0x0400;REGISTER_PROXY_DLL";
			if (bDebug)
			{
				strDefines += ";_DEBUG";
				oCLTool.RuntimeLibrary = rtMultiThreadedDebugDLL;

				oConfig.IntermediateDirectory = "DebugPS";
				oConfig.OutputDirectory = "DebugPS";
			}
			else
			{
				strDefines += ";NDEBUG";
				oCLTool.RuntimeLibrary = rtMultiThreadedDLL;
				oCLTool.Optimization = optimizeFull;

				oConfig.IntermediateDirectory = "ReleasePS";
				oConfig.OutputDirectory = "ReleasePS";
			}
			oCLTool.PreprocessorDefinitions = strDefines;

			var oLinkTool = oConfig.Tools("VCLinkerTool");
			oLinkTool.AdditionalDependencies = "kernel32.lib rpcndr.lib rpcns4.lib rpcrt4.lib oleaut32.lib uuid.lib";

			if (bSupportComPlus)
				oLinkTool.AdditionalDependencies += " ole32.lib advapi32.lib comsvcs.lib";

			oLinkTool.ModuleDefinitionFile = oProj.Name + ".def";

			if (!bDebug)
			{
				oLinkTool.EnableCOMDATFolding = optFolding;
				oLinkTool.OptimizeReferences = optReferences;
			}

			var oPreBuildTool = oConfig.Tools("VCPreBuildEventTool");
			var strCommand = "if exist dlldata.c goto :END\r\n";
			var L_Echo1_Text = "echo Error: MIDL will not generate DLLDATA.C unless you have at least 1 interface in the main project.\r\n";
			strCommand += L_Echo1_Text;
			strCommand += "Exit 1\r\n";
			strCommand += ":END\r\n";
			oPreBuildTool.CommandLine = strCommand;
			var L_Echo2_Text = "Checking for required files";
			oPreBuildTool.Description = L_Echo2_Text;

			var oPostBuildTool = oConfig.Tools("VCPostBuildEventTool");
			var L_PerformingRegistration1_Text = "Performing registration";
			oPostBuildTool.Description = L_PerformingRegistration1_Text;
			oPostBuildTool.CommandLine = "regsvr32 /s /c \"$(TargetPath)\"";
		}

		// exclude from Solution build
		var oSolBuild = dte.Solution.SolutionBuild;
		var oSolConfigs = oSolBuild.SolutionConfigurations;
		for (var nCntr = 1; nCntr <= oSolConfigs.Count; nCntr++)
		{
			var oSolContexts = oSolConfigs(nCntr).SolutionContexts;
			for (var nCntr2 = 1; nCntr2 <= oSolContexts.Count; nCntr2++)
			{
				var oSolContext = oSolContexts(nCntr2);
				if (oSolContext.ProjectName == oProj.UniqueName)
					oSolContext.ShouldBuild = false;
			}
		}

		// add main project to build dependency list
	    oSolBuild.BuildDependencies(oProj.UniqueName).AddProject(oMainProj.UniqueName);
	}
	catch(e)
	{
		throw e;
	}
}

var nNumConfigs = 2;

var astrConfigName = new Array();
astrConfigName[0] = "Debug";
astrConfigName[1] = "Release";

var astrConfigDir = new Array();
astrConfigDir[0] = "Debug";
astrConfigDir[1] = "Release";

var astrDefines = new Array();
astrDefines[0] = "_WINDOWS;_DEBUG";
astrDefines[1] = "_WINDOWS;NDEBUG";

var anCRT = new Array();
anCRT[0] = rtMultiThreadedDebugDLL;
anCRT[1] = rtMultiThreadedDLL;

function AddConfigurations(proj, strProjectName)
{
	try
	{
		var nCntr;
		for (nCntr = 0; nCntr < nNumConfigs; nCntr++)
		{
			// check if Debug
			var bDebug = false;
			if (-1 != astrConfigName[nCntr].search("Debug"))
				bDebug = true;
			
			var config = proj.Object.Configurations(astrConfigName[nCntr]);

			// add configuration if it doesn't exist
			if (!config)
			{
				proj.Object.AddConfiguration(astrConfigName[nCntr]);
				config = proj.Object.Configurations(astrConfigName[nCntr]);
			}


			// set output directories
			config.IntermediateDirectory = astrConfigDir[nCntr];
			config.OutputDirectory = astrConfigDir[nCntr];

			// set configuration type
			var bAppTypeDLL = wizard.FindSymbol("DLL_APP");
			if (bAppTypeDLL)
				config.ConfigurationType = typeDynamicLibrary;

			config.CharacterSet = charSetMBCS;
			config.ATLMinimizesCRunTimeLibraryUsage = false;
			config.UseOfATL = useATLStatic;

			// Compiler settings
			var CLTool = config.Tools("VCCLCompilerTool");
			CLTool.UsePrecompiledHeader = pchUseUsingSpecific;
			CLTool.WarningLevel = warningLevel_3;
			CLTool.Detect64BitPortabilityProblems = true;
			if (bDebug)
			{
				CLTool.MinimalRebuild = true;
				CLTool.DebugInformationFormat = debugEditAndContinue;
				CLTool.BasicRuntimeChecks = runtimeBasicCheckAll;
				CLTool.Optimization = optimizeDisabled;
			}
			else
			{
				CLTool.DebugInformationFormat = debugEnabled;
			}

			var bAttributed = wizard.FindSymbol("ATTRIBUTED");
			var bMFC		= wizard.FindSymbol("SUPPORT_MFC");
			var bMergeProxy = wizard.FindSymbol("MERGE_PROXY_STUB");
			var bSupportComPlus	= wizard.FindSymbol("SUPPORT_COMPLUS");
			var bSupportComponentRegistrar = wizard.FindSymbol("SUPPORT_COMPONENT_REGISTRAR");

			var strDefines = GetPlatformDefine(config);
			strDefines += astrDefines[nCntr];
			if (bAppTypeDLL)
				strDefines += ";_USRDLL";
			if (bAttributed)
				strDefines += ";_ATL_ATTRIBUTES";
			if (bMFC)
				config.UseOfMFC = useMfcDynamic;
			if (bMergeProxy && bSupportComponentRegistrar)
				strDefines += ";_MERGE_PROXYSTUB";
			CLTool.PreprocessorDefinitions = strDefines;
			CLTool.RuntimeLibrary = anCRT[nCntr];
			if (!bDebug)
			{
				CLTool.InlineFunctionExpansion = expandOnlyInline;
				CLTool.EnableFunctionLevelLinking = true;
				CLTool.StringPooling = true;
			}

			// MIDL settings
			var MidlTool = config.Tools("VCMidlTool");
			MidlTool.MkTypLibCompatible = false;
			if (IsPlatformWin32(config))
				MidlTool.TargetEnvironment = midlTargetWin32;

			if (bDebug)
				MidlTool.PreprocessorDefinitions = "_DEBUG";
			else
				MidlTool.PreprocessorDefinitions = "NDEBUG";

			MidlTool.HeaderFileName = strProjectName + ".h";
			MidlTool.InterfaceIdentifierFileName = strProjectName + "_i.c";
			MidlTool.ProxyFileName = strProjectName + "_p.c";
			MidlTool.GenerateStublessProxies = true;
			var strSafeProjectName = wizard.FindSymbol("SAFE_PROJECT_NAME");
			MidlTool.TypeLibraryName = "$(IntDir)/" + strProjectName + ".tlb";
			MidlTool.DLLDataFileName = "";

			// Resource settings
			var RCTool = config.Tools("VCResourceCompilerTool");
			RCTool.Culture = rcEnglishUS;
			RCTool.AdditionalIncludeDirectories = "$(IntDir)";
			if (bDebug)
				RCTool.PreprocessorDefinitions = "_DEBUG";
			else
				RCTool.PreprocessorDefinitions = "NDEBUG";

			// Linker settings
			var LinkTool = config.Tools("VCLinkerTool");
			LinkTool.SubSystem = subSystemWindows;
			LinkTool.IgnoreImportLibrary = true;
			LinkTool.TargetMachine = machineX86;

			if (bAppTypeDLL && !bAttributed)
			{
				var strDefFile = ".\\" + strProjectName + ".def";
				LinkTool.ModuleDefinitionFile = strDefFile;
			}
			if (bSupportComPlus)
				LinkTool.AdditionalDependencies += " comsvcs.lib";

			if (bAppTypeDLL)
			{
				LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".dll";
			}
			else
			{
				LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".exe";
			}

			LinkTool.ImportLibrary = "$(OutDir)/" + strProjectName + ".lib";
			if (bAttributed)
				LinkTool.MergedIDLBaseFileName = "_" + strProjectName + ".idl";

			LinkTool.GenerateDebugInformation = true;
			if (bDebug)
				LinkTool.LinkIncremental = linkIncrementalYes;
			else
			{
				LinkTool.LinkIncremental = linkIncrementalNo;
				LinkTool.EnableCOMDATFolding = optFolding;
				LinkTool.OptimizeReferences = optReferences;
			}

			var PostBuildTool = config.Tools("VCPostBuildEventTool");
			var L_PerformingRegistration2_Text = "Performing registration";
			PostBuildTool.Description = L_PerformingRegistration2_Text;
			if (bAppTypeDLL)
				PostBuildTool.CommandLine = "regsvr32 /s /c \"$(TargetPath)\"";
			else
				PostBuildTool.CommandLine = "\"$(TargetPath)\" /RegServer";
		}
	}
	catch(e)
	{
		throw e;
	}
}

function SetPchSettings(proj, strProjectName)
{
	try
	{
		var files = proj.Object.Files;
		var fStdafx = files("StdAfx.cpp");
		var bAttributed = wizard.FindSymbol("ATTRIBUTED");

		var nCntr;
		for (nCntr = 0; nCntr < nNumConfigs; nCntr++)
		{
			var config = fStdafx.FileConfigurations(astrConfigName[nCntr]);
			config.Tool.UsePrecompiledHeader = pchCreateUsingSpecific;

			if (!bAttributed)
			{
				var fProject_i = files(strProjectName + "_i.c");
				config = fProject_i.FileConfigurations(astrConfigName[nCntr]);
				config.Tool.UsePrecompiledHeader = pchNone;

				if (wizard.FindSymbol("MERGE_PROXY_STUB"))
				{
					file = files("dlldatax.c");
					config = file.FileConfigurations(astrConfigName[nCntr]);
					config.Tool.UsePrecompiledHeader = pchNone;
				}
			}
		}
	}
	catch(e)
	{
		throw e;
	}
}
