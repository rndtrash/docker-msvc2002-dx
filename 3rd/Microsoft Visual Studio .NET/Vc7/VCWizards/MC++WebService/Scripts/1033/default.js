// (c) 2001 Microsoft Corporation
var strAddress = null;
var strProjectName = null;

function OnFinish(selProj, selObj)
{
    try
    {
        var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
        strProjectName = wizard.FindSymbol("PROJECT_NAME");

		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var d = fso.GetDrive(fso.GetDriveName(strProjectPath));
		if (d.DriveType == 3)				// Network drive type
		{
			var L_CanUseDrive_Text = " The Project location is not fully trusted by the .NET runtime. ";
			L_CanUseDrive1_Text = "This is usually because the location is a network ";
			L_CanUseDrive_Text = L_CanUseDrive_Text + L_CanUseDrive1_Text;
			L_CanUseDrive2_Text = "share or mapped to a network share on a remote ";
			L_CanUseDrive_Text = L_CanUseDrive_Text + L_CanUseDrive2_Text;
			L_CanUseDrive3_Text = "machine. If the output path is under the project ";
			L_CanUseDrive_Text = L_CanUseDrive_Text + L_CanUseDrive3_Text;
			L_CanUseDrive4_Text = "location, your code will not execute as fully trusted, ";
			L_CanUseDrive_Text = L_CanUseDrive_Text + L_CanUseDrive4_Text;
			L_CanUseDrive5_Text = "and you may receive unexpected security exceptions. ";
			L_CanUseDrive_Text = L_CanUseDrive_Text + L_CanUseDrive5_Text;
			L_CanUseDrive6_Text = "Click OK to ignore and continue. Click CANCEL to ";
			L_CanUseDrive_Text = L_CanUseDrive_Text + L_CanUseDrive6_Text;
			L_CanUseDrive7_Text = "choose a different project location";
			L_CanUseDrive_Text = L_CanUseDrive_Text + L_CanUseDrive7_Text;
			var bRet = wizard.OkCancelAlert(L_CanUseDrive_Text);
			if (!bRet)
				return VS_E_WIZARDBACKBUTTONPRESS;
		}

		strAddress = "http://localhost"
        var strSafeProjectName = CreateSafeName(strProjectName);
        wizard.AddSymbol("SAFE_NAMESPACE_NAME", strSafeProjectName);

        var proj = CreateProject(strProjectName, strProjectPath);

        AddManagedConfig(proj, strProjectName);
        proj.Object.keyword = "ManagedCProj";
        wizard.AddSymbol("DLL_APP","");
        wizard.AddSymbol("SOURCE_FILTER", "cpp;c;cxx;def;odl;idl;hpj;bat;asm;asmx");
        wizard.AddSymbol("INCLUDE_FILTER", "h;hpp;hxx;hm;inl;inc");
        wizard.AddSymbol("RESOURCE_FILTER", "rc;ico;cur;bmp;dlg;rc2;rct;bin;rgs;gif;jpg;jpeg;jpe;r");
        SetFilters(proj);
        var InfFile = CreateInfFile();
        AddFilesToProject(proj, strProjectName, InfFile);

		InfFile.Delete();
        SetCommonPchSettings(proj);
        proj.Object.Save();
    }
	catch(e)
	{
		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}

function IsAsciiName(strName)
{
	try
	{
		var nLen = strName.length;
		var strSafeName = "";
		
		for (nCntr = 0; nCntr < nLen; nCntr++)
		{
			var cChar = strName.charAt(nCntr);
			if ((cChar >= 'A' && cChar <= 'Z') || (cChar >= 'a' && cChar <= 'z') || (cChar == '_') || (cChar >= '0' && cChar <= '9'))
			{
			}
			else 
				return false;
		}
		return true;
	}
	catch(e)
	{
		throw e;
	}
}

function SetFileProperties(projfile, strName)
{
	try
	{
		if (strName == "root.asmx")
		{
			projfile.Object.DeploymentContent = true;
		}
		else if (strName == "root.vsdisco")
		{
			projfile.Object.DeploymentContent = true;
		}
		else if (strName == "Web.config")
		{
			projfile.Object.DeploymentContent = true;
		}
		else if(strName == "Global.asax")
		{
			projfile.Object.DeploymentContent = true;
		}        

		return false;
	}
	catch(e)
	{
		throw e;
	}
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

function AddManagedConfig(proj, strProjectName)
{
	try
	{
		var config = proj.Object.Configurations("Debug");
		config.IntermediateDirectory = "Debug";
		config.OutputDirectory = "Debug";
		config.ManagedExtensions = true;
		config.CharacterSet = charSetMBCS;
		var solutionName = config.Evaluate("$(SolutionName)"); 
		config.DebugSettings.HttpUrl = strAddress + "\/" + solutionName + "\/" + strProjectName + ".asmx" ;
 
		config.ConfigurationType = typeDynamicLibrary;

		var CLTool = config.Tools("VCCLCompilerTool");
		CLTool.WarningLevel = warningLevel_3;
		CLTool.MinimalRebuild = false;
		CLTool.DebugInformationFormat = debugEnabled;
		CLTool.Optimization = optimizeDisabled;
		CLTool.BasicRuntimeChecks = runtimeBasicCheckNone;
		var strDefines = GetPlatformDefine(config);
		strDefines += "_DEBUG";
		CLTool.PreprocessorDefinitions = strDefines;
		CLTool.RuntimeLibrary = rtMultiThreadedDebug;

		var LinkTool = config.Tools("VCLinkerTool");
		LinkTool.GenerateDebugInformation = true;
		LinkTool.LinkIncremental = linkIncrementalYes;

		LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".dll";

		var WebDeployConfig = config.Tools("VCWebDeploymentTool");
		WebDeployConfig.ExcludedFromBuild = false;
		WebDeployConfig.VirtualDirectoryName = solutionName;

		config = proj.Object.Configurations.Item("Release");
		config.IntermediateDirectory = "Release";
		config.OutputDirectory = "Release";
		config.ManagedExtensions = true;
		config.CharacterSet = charSetMBCS;

		config.DebugSettings.HttpUrl = strAddress + "\/" + solutionName + "\/" + strProjectName + ".asmx" ;

		config.ConfigurationType = typeDynamicLibrary;

		CLTool = config.Tools("VCCLCompilerTool");
		CLTool.WarningLevel = warningLevel_3;
		CLTool.MinimalRebuild = false;
		CLTool.Optimization = optimizeMaxSpeed;
		CLTool.InlineFunctionExpansion = expandOnlyInline;
		strDefines = GetPlatformDefine(config);
		strDefines += "NDEBUG";
		CLTool.PreprocessorDefinitions = strDefines;
		CLTool.DebugInformationFormat = debugEnabled;

		LinkTool = config.Tools("VCLinkerTool");
		LinkTool.GenerateDebugInformation = true;
		LinkTool.LinkIncremental = linkIncrementalNo;

		LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".dll";

		WebDeployConfig = config.Tools("VCWebDeploymentTool");
		WebDeployConfig.ExcludedFromBuild = false;
		WebDeployConfig.VirtualDirectoryName = solutionName;

	}
	catch(e)
	{
		throw e;
	}
}


