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

        selProj.Object.keyword = "MFCISAPIProj";

        SetFilters(selProj);

        var InfFile = CreateInfFile();
        AddFilesToProject(selProj, strProjectName, InfFile);

        SetCommonPchSettings(selProj);

		InfFile.Delete();
        selProj.Object.Save();

        if (wizard.FindSymbol("GENERATE_DEPLOYMENT"))
        {
            var strDplyPath = Solution.TemplatePath(GUID_Deployment_TemplatePath);
            strDplyPath += "\\WebSetup.vdproj";
            
            var strDeployDir = wizard.FindSymbol("PROJECT_PATH");
            var strDeployName = wizard.FindSymbol("PROJECT_NAME")+"Deploy";
            var strFullDeployPath = "";

            var nIndex = strDeployDir.lastIndexOf(wizard.FindSymbol("PROJECT_NAME"));
            if (nIndex == -1)
                nIndex = strDeployDir.length;
            else
                nIndex -= 1;

            var strDeployPath = strDeployDir.substring(0, nIndex);
            strDeployPath+= "\\" + strDeployName;
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            
            try
            {
                fso.CreateFolder(strDeployPath);
            }
            catch (e)
            {
                strDeployPath = strDeployDir.substring(0, nIndex);
                strDeployPath+= "\\" + wizard.GenerateNextDefaultProjectName(strDeployName, strDeployPath);
            }
                
            var oTarget = wizard.FindSymbol("TARGET");
            var dplyproj;

            if (wizard.FindSymbol("WIZARD_TYPE") == vsWizardAddSubProject)  //  
            {
                var prjItem = oTarget.AddFromTemplate(strDplyPath, strDeployPath + "\\" + strDeployName);
                dplyproj = prjItem.SubProject;
            }
            else
            {
                dplyproj = oTarget.AddFromTemplate(strDplyPath, strDeployPath, strDeployName);
            }
    
            var webfldr = wizard.GetDefaultWebTargetFolder(dplyproj.Object);
            if (webfldr == null)
            {
                webfldr = wizard.CreateWebTargetFolder();
                webfldr.Name = "MC++ Server Deployment";
                
                var webfldrkey = "MC_DEPLOY";
                var FolderPlugin = dplyproj.Object.PlugIns.Item("Folder");
    
                FolderPlugin.Items.AddWithKey(webfldrkey, webfldr);
            }
            
            var strAddress = "http://";
            strAddress += wizard.FindSymbol("ISAPI_SERVER");
            strAddress += "/"
            strAddress += wizard.FindSymbol("ISAPI_VROOT");
            webfldr.DefaultAddress = strAddress;
            
            var strRemoteMachine = wizard.FindSymbol("ISAPI_SERVER");
            wizard.SetRemoteMachine(dplyproj, strRemoteMachine);
    
            webfldr.IsApplication = true;   
            webfldr.AlwaysCreate = true;

            var builtOutput = wizard.AddBuiltOutput(dplyproj.Object, selProj);
            builtOutput.Folder = webfldr;
            var deployContent = wizard.AddDeploymentContent(dplyproj.Object, selProj);
            deployContent.Folder = webfldr;
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
		if (strName.substr(0, 4) == "root")
		{
			var strlen = strName.length;
		if (strName == "root.rc2")
		{
			var strSafeProjectName = wizard.FindSymbol("SAFE_PROJECT_NAME");
        		strTarget = strSafeProjectName + strName.substr(4, strlen - 4);
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
				strTarget = strProjectName + ".rc";
				break;
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
		var bDynamicMFC = wizard.FindSymbol("DYNAMIC_MFC");

		var config = proj.Object.Configurations("Debug");
		config.CharacterSet = charSetMBCS;
		config.ConfigurationType = typeDynamicLibrary;

		var CLTool = config.Tools("VCCLCompilerTool");
		var strDefines = GetPlatformDefine(config);
		if (bDynamicMFC)
		{
			config.UseOfMFC = useMfcDynamic;
			CLTool.RuntimeLibrary = rtMultiThreadedDebugDLL;
		}
		else
		{
			config.UseOfMFC = useMfcStatic;
			CLTool.RuntimeLibrary = rtMultiThreadedDebug;
		}
		strDefines += "_WINDOWS;_DEBUG;_USRDLL";
		CLTool.PreprocessorDefinitions = strDefines;
		CLTool.BufferSecurityCheck = true;
		CLTool.TreatWChar_tAsBuiltInType = true;
		CLTool.DebugInformationFormat = debugEditAndContinue;

		var MidlTool = config.Tools("VCMidlTool");
		MidlTool.MkTypLibCompatible = false;
		MidlTool.PreprocessorDefinitions = "_DEBUG";

		var RCTool = config.Tools("VCResourceCompilerTool");
		RCTool.Culture = rcEnglishUS;
		RCTool.PreprocessorDefinitions = "_DEBUG";
    
		var LinkTool = config.Tools("VCLinkerTool");
		LinkTool.LinkIncremental = linkIncrementalYes;
		LinkTool.GenerateDebugInformation = true;
		var strDefFile = ".\\" + strProjectName + ".def";
		LinkTool.ModuleDefinitionFile = strDefFile;
		LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".dll";
		LinkTool.ImportLibrary = "$(OutDir)/" + strProjectName + ".lib";

		config = proj.Object.Configurations("Release");
		config.CharacterSet = charSetMBCS;
		config.ConfigurationType = typeDynamicLibrary;

		CLTool = config.Tools("VCCLCompilerTool");
		strDefines = GetPlatformDefine(config);
		if (bDynamicMFC)
		{
			config.UseOfMFC = useMfcDynamic;
			strDefines += "_WINDOWS;NDEBUG;_USRDLL";
			CLTool.PreprocessorDefinitions = strDefines;
			CLTool.RuntimeLibrary = rtMultiThreadedDLL;
		}
		else
		{
			config.UseOfMFC = useMfcStatic;
			strDefines += "_WINDOWS;NDEBUG;_USRDLL";
			CLTool.PreprocessorDefinitions = strDefines;
			CLTool.RuntimeLibrary = rtMultiThreaded;
		}
		CLTool.InlineFunctionExpansion = expandOnlyInline;
		CLTool.BufferSecurityCheck = true;
		CLTool.TreatWChar_tAsBuiltInType = true;
		CLTool.DebugInformationFormat = debugEnabled;

		MidlTool = config.Tools("VCMidlTool");
		MidlTool.MkTypLibCompatible = false;
		MidlTool.PreprocessorDefinitions = "NDEBUG";

		RCTool = config.Tools("VCResourceCompilerTool");
		RCTool.Culture = rcEnglishUS;
		RCTool.PreprocessorDefinitions = "NDEBUG";

		LinkTool = config.Tools("VCLinkerTool");
		var strDefFile = ".\\" + strProjectName + ".def";
		LinkTool.ModuleDefinitionFile = strDefFile;
		LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".dll";
		LinkTool.ImportLibrary = "$(OutDir)/" + strProjectName + ".lib";
		LinkTool.GenerateDebugInformation = true;
		LinkTool.LinkIncremental = linkIncrementalNo;
	}
	catch(e)
	{
		throw e;
	}
}

