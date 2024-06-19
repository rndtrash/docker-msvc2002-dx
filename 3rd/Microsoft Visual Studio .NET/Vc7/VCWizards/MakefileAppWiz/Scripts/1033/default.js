// (c) 2001 Microsoft Corporation
function OnFinish(selProj, selObj)
{
	try
	{
		var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
		var strProjectName = wizard.FindSymbol("PROJECT_NAME");

		selProj = CreateProject(strProjectName, strProjectPath);
		selProj.Object.Keyword = "MakeFileProj";

		AddConfig(selProj.Object, strProjectName);
		SetFilters(selProj);

		selProj.Object.Save();

	}
	catch(e)
	{
		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}

function AddConfig(proj, strProjectName)
{
	try
	{
		var config = proj.Configurations("Debug");
		config.IntermediateDirectory = "Debug";
		config.OutputDirectory = "Debug";
		config.ConfigurationType = typeUnknown;

		var strCommandLine = wizard.FindSymbol("BUILD_COMMAND_LINE");
		var strOutput = wizard.FindSymbol("OUTPUT");
		var strCleanCommands = wizard.FindSymbol("CLEAN_COMMANDS");
		var strRebuildCommandLine = wizard.FindSymbol("REBUILD_COMMAND_LINE");

		var NMakeTool = config.Tools("VCNMakeTool");
		if (strCommandLine.length)
			NMakeTool.BuildCommandLine = strCommandLine;
		if (strOutput.length)
			NMakeTool.Output = strOutput;
		if (strCleanCommands.length)
			NMakeTool.CleanCommandLine = strCleanCommands;
		if (strRebuildCommandLine.length)
			NMakeTool.ReBuildCommandLine = strRebuildCommandLine;

		config = proj.Configurations("Release");
		config.IntermediateDirectory = "Release";
		config.OutputDirectory = "Release";
		config.ConfigurationType = typeUnknown;

		NMakeTool = config.Tools("VCNMakeTool");
		if (strCommandLine.length)
			NMakeTool.BuildCommandLine = strCommandLine;
		if (strOutput.length)
			NMakeTool.Output = strOutput;
		if (strCleanCommands.length)
			NMakeTool.CleanCommandLine = strCleanCommands;
		if (strRebuildCommandLine.length)
			NMakeTool.ReBuildCommandLine = strRebuildCommandLine;
	}
	catch(e)
	{
		throw e;
	}
}

