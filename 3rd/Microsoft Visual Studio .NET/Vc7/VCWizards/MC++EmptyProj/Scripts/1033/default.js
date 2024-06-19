// (c) 2001 Microsoft Corporation

function OnFinish(selProj, selObj)
{
	try
	{
		var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
		var strProjectName = wizard.FindSymbol("PROJECT_NAME");

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

		var proj = CreateProject(strProjectName, strProjectPath);

		AddManagedConfig(proj, strProjectName);
		proj.Object.keyword = "ManagedCProj";

		wizard.AddSymbol("SOURCE_FILTER", "cpp;c;cxx;def;odl;idl;hpj;bat;asm");
		wizard.AddSymbol("INCLUDE_FILTER", "h;hpp;hxx;hm;inl;inc");
		wizard.AddSymbol("RESOURCE_FILTER", "rc;ico;cur;bmp;dlg;rc2;rct;bin;rgs;gif;jpg;jpeg;jpe;r");

		SetFilters(proj);

		proj.Object.Save();
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

		config.ConfigurationType = typeApplication;

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

		LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".exe";

		config = proj.Object.Configurations.Item("Release");
		config.IntermediateDirectory = "Release";
		config.OutputDirectory = "Release";
		config.ManagedExtensions = true;
		config.CharacterSet = charSetMBCS;

		config.ConfigurationType = typeApplication;

		CLTool = config.Tools("VCCLCompilerTool");
		CLTool.WarningLevel = warningLevel_3;
		CLTool.MinimalRebuild = false;
		CLTool.Optimization = optimizeMaxSpeed;
		CLTool.InlineFunctionExpansion = expandOnlyInline;
		strDefines = GetPlatformDefine(config);
		strDefines += "NDEBUG";
		CLTool.PreprocessorDefinitions = strDefines;

		LinkTool = config.Tools("VCLinkerTool");
		LinkTool.GenerateDebugInformation = true;
		LinkTool.LinkIncremental = linkIncrementalNo;

		LinkTool.OutputFile = "$(OutDir)/" + strProjectName + ".exe";
	}
	catch(e)
	{
		throw e;
	}
}


