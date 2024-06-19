// (c) 2001 Microsoft Corporation

function OnFinish(selProj, selObj)
{
	try
	{
		var strProductPath = wizard.FindSymbol("PRODUCT_INSTALLATION_DIR");
		var strStartPath = wizard.FindSymbol("PROJECT_PATH");
		var strWizardName = wizard.FindSymbol("CUSTOM_WIZARD_NAME");

		wizard.AddSymbol("TAB_ARRAYS", "");
		
		var nPages = wizard.FindSymbol("NUM_OF_PAGES");
		if (nPages > 1)
		{
			var strTabArrays = "var tab_array = new Array();\n";
			for (n = 0; n < nPages; n++)
			{
				strTabArrays = strTabArrays + "tab_array[" + n + "] = Page_" + (n+1) + ";\n";
			}
			wizard.AddSymbol("TAB_ARRAYS", strTabArrays);
		}		

		selProj = CreateProject(strWizardName, strStartPath);
		selProj.Object.Keyword = "CustomAppWizProj";

		AddFilters(selProj);

		var InfFile = CreateInfFile();
		AddFilesToProject(selProj, strWizardName, InfFile)
		InfFile.Delete();

		if (nPages > 1)
		{

			var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
			var strTemplateFile = strTemplatePath + "\\sample.htm";

			var strPath = wizard.FindSymbol("CUSTOM_WIZARD_HTML_PATH");

			for (n = 2; n <= nPages; n++)
			{
				wizard.AddSymbol("CURRENT_PAGE", n);
				var strTarget = strPath + "\\Page_" + n.toString() + ".htm";
				wizard.RenderTemplate(strTemplateFile, strTarget);
				selProj.ProjectItems.AddFromFile(strTarget);
			}
		}
		
		var lConfigCount = selProj.Object.Configurations.Count;
		for (var i = 1; i <= lConfigCount; i++)
		{
			var config = selProj.Object.Configurations.Item(i);
			// set to static lib so that F5 will invoke the "Executable for Debugging Session" dialog
			// config.ConfigurationType = typeStaticLibrary;

			// This will set devenv.exe to be the executable for debugging session
			config.DebugSettings.Command = wizard.GetProcessName();

		}
		
		InstallFiles(strStartPath, strWizardName, strProductPath);

		selProj.Object.Save();

	}
	catch(e)
	{
		wizard.ReportError(e.description);
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


function GetTargetName(strName, strWizardName, strResPath, strHelpPath)
{
	var strTarget = strName;

	switch(strName)
	{
		case "readme.txt":
		{
			var strPath = wizard.FindSymbol("CUSTOM_WIZARD_TEMPLATES_PATH");
			strTarget = strPath + "\\ReadMe.txt";
			break;
		}
		case "sample.txt":
		{
			var strPath = wizard.FindSymbol("CUSTOM_WIZARD_TEMPLATES_PATH");
			strTarget = strPath + "\\Sample.txt";
			break;
		}
		case "customwiz.inf":
		{
			var strPath = wizard.FindSymbol("CUSTOM_WIZARD_TEMPLATES_PATH");
			strTarget = strPath + "\\Templates.inf";
			break;
		}
		case "customwiz.htm":
		{
			var strPath = wizard.FindSymbol("CUSTOM_WIZARD_HTML_PATH");
			strTarget = strPath + "\\default.htm";
			break;
		}
		case "Custom.gif":
		{
			var strPath = wizard.FindSymbol("CUSTOM_WIZARD_IMAGES_PATH");
			strTarget = strPath + "\\" + strWizardName + ".gif";
			break;
		}
		case "Custom_Background.gif":
		{
			var strPath = wizard.FindSymbol("CUSTOM_WIZARD_IMAGES_PATH");
			strTarget = strPath + "\\" + strWizardName + "_Background.gif";
			break;
		}
		case "customwiz.vsz":
		{
			var strPath = wizard.FindSymbol("CUSTOM_WIZARD_START_PATH");
			strTarget = strPath + "\\" + strWizardName + ".vsz";
			break;
		}
		case "customwiz.vcproj":
		{
			var strPath = wizard.FindSymbol("CUSTOM_WIZARD_START_PATH");
			strTarget = strPath + "\\default.vcproj";
			break;
		}
		case "customwiz.ico":
		{
			var strPath = wizard.FindSymbol("CUSTOM_WIZARD_START_PATH");
			strTarget = strPath + "\\" + strWizardName + ".ico";
			break;
		}
		case "customwiz.vsdir":
		{
			var strPath = wizard.FindSymbol("CUSTOM_WIZARD_START_PATH");
			strTarget = strPath + "\\" + strWizardName + ".vsdir";
			break;
		}
		case "customwiz.css":
		{
			var strPath = wizard.FindSymbol("CUSTOM_WIZARD_START_PATH");
			strLocale = wizard.GetHostLocale();
			strTarget = strPath + "\\" + strLocale + "\\styles.css";
			break;
		}
		case "customwiz.js":
		{
			var strPath = wizard.FindSymbol("CUSTOM_WIZARD_SCRIPT_PATH");
			strTarget = strPath + "\\default.js";
			break;
		}
		default:
			break;
	}
	return strTarget; 
}

function AddFilters(selProj)
{
	var strTemplateFilter = wizard.FindSymbol("TEMPLATE_FILTER");
    var L_strTemplate_Text = "Template Files";
	var group = selProj.Object.AddFilter(L_strTemplate_Text);
	group.Filter = strTemplateFilter;

	var strHTMLFilter = wizard.FindSymbol("HTML_FILTER");
    var L_strHTML_Text = "HTML Files";
	group = selProj.Object.AddFilter(L_strHTML_Text);
	group.Filter = strHTMLFilter;

	var strImageFilter = wizard.FindSymbol("IMAGE_FILTER");
    var L_strImage_Text = "Image Files";
	group = selProj.Object.AddFilter(L_strImage_Text);
	group.Filter = strImageFilter;

	var strScriptFilter = wizard.FindSymbol("SCRIPT_FILTER");
    var L_strScript_Text = "Script Files";
	group = selProj.Object.AddFilter(L_strScript_Text);
	group.Filter = strScriptFilter;

	var strScriptFilter = wizard.FindSymbol("MISC_FILTER");
    var L_strMisc_Text = "Miscellaneous Files";
	group = selProj.Object.AddFilter(L_strMisc_Text);
	group.Filter = strScriptFilter;
}

// Copy the vsz, vsdir and ico files to the installation dir
//
function InstallFiles(strStartPath, strWizardName, strProductPath)
{
	var oFSO = new ActiveXObject("Scripting.FileSystemObject");

	var strSourcePath = strStartPath + "\\" + strWizardName + ".vsz";
	var strTargetPath = strProductPath + "VCProjects\\" + strWizardName + ".vsz";

	oFSO.CopyFile(strSourcePath, strTargetPath);

	var strSourcePath = strStartPath + "\\" + strWizardName + ".vsdir";
	var strTargetPath = strProductPath + "VCProjects\\" + strWizardName + ".vsdir";

	oFSO.CopyFile(strSourcePath, strTargetPath);

	var strSourcePath = strStartPath + "\\" + strWizardName + ".ico";
	var strTargetPath = strProductPath + "VCProjects\\" + strWizardName + ".ico";

	oFSO.CopyFile(strSourcePath, strTargetPath);
}

