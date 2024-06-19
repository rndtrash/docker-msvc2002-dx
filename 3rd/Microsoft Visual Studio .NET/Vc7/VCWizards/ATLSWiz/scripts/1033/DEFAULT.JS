// (c) 2001 Microsoft Corporation
var strDBString;

function OnFinish(selProj, selObj)
{
	try
	{
		PatchWizardSymbols();
        var bGenIsapi = wizard.FindSymbol("GENERATE_ISAPI");
        var bGenApp = wizard.FindSymbol("GENERATE_APP");
		var bCombine = wizard.FindSymbol("COMBINE_PROJECTS");
		var bSoap = wizard.FindSymbol("SOAP");
		var bStencil = wizard.FindSymbol("STENCIL");
		
		var CurrentDate = new Date();
		var strYear = CurrentDate.getYear();
		wizard.AddSymbol("PROJECT_YEAR", strYear.toString());
		wizard.AddSymbol("DEPLOYMENT_PROJECT_NAME", wizard.FindSymbol("PROJECT_NAME")+"Deploy");
		
        var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
      	var strProjectName = wizard.FindSymbol("PROJECT_NAME");
      	var strSafeProjectName = wizard.FindSymbol("SAFE_PROJECT_NAME");

		// before we do anything, check that the name given us isn't too long
		//
		var strTestPath = strProjectPath + "\\" + strProjectName;

		// 240 is MAX_PATH - space enough for ext and string that get appended
		// ("Deploy" or "Isapi")
		//
		if( strTestPath.length > 240 )
		{
			var L_ErrMsgPath_Text = "Error: path is too long. Please use a shorter project name.";
			var oError = new Error(L_ErrMsgPath_Text);
			SetErrorInfo(oError);
			return;
		}

		var bCloseSolution = wizard.FindSymbol("CLOSE_SOLUTION");

		var Solution = dte.Solution;
		var strSolutionName = "";

		if (bCloseSolution)
		{
			Solution.Close();
			strSolutionName = wizard.FindSymbol("VS_SOLUTION_NAME");
			if (strSolutionName.length)
			{
				var strSolutionPath = strProjectPath.substr(0, strProjectPath.length - strProjectName.length);
				Solution.Create(strSolutionPath, strSolutionName);
			}
		}

		var IsapiProj = null;
		var AppProj = null;
		
		if (bGenApp)
        {
			wizard.AddSymbol("GENERATING_APP", true);
			if (bCombine)
				wizard.AddSymbol("GENERATING_ISAPI", true);
				
			var strTemplatePath = wizard.FindSymbol("PROJECT_TEMPLATE_PATH");
			var strTemplate = strTemplatePath+"\\default.vcproj";
			var strProjNameWithExt = strProjectName+".vcproj";

			var oTarget = wizard.FindSymbol("TARGET");
			var proj;
			if (wizard.FindSymbol("WIZARD_TYPE") == vsWizardAddSubProject)  // vsWizardAddSubProject
			{
				var prjItem = oTarget.AddFromTemplate(strTemplate, strProjectPath + "\\" + strProjNameWithExt);
				proj = prjItem.SubProject;
			}
			else
			{
				proj = oTarget.AddFromTemplate(strTemplate, strProjectPath, strProjNameWithExt);
			}
			
			AddCommonConfig(proj, strProjectName);
			AddSpecificConfig(proj, strProjectName, strSafeProjectName);
			
			SetFilters(proj);
			
			proj.Object.keyword = "AtlServerProj";

			var InfFile = CreateInfFile();
			var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
        
        	var strTpl = "";
        	var strName = "";
        
//			wizard.AddSymbol("PROJECT_NAME", wizard.FindSymbol("APP_PROJECT"));
            var strTextStream = InfFile.OpenAsTextStream(1, -2);
        	while (!strTextStream.AtEndOfStream)
        	{
        		strTpl = strTextStream.ReadLine();
        		if (strTpl != "")
        		{
        			strName = strTpl;
					if ((bCombine && (strTpl == "rootisapi.def" || strTpl == "rootisapiextension.h")) || 
						(strTpl.indexOf("isapi", 0) == -1 && strTpl.indexOf("ISAPI", 0) == -1))
					{
	        			var strTarget = GetTargetName(strName, strProjectName);
	        			var strTemplate = strTemplatePath + "\\" + strTpl;
	        			var strFile = strProjectPath + "\\" + strTarget;

	        			wizard.RenderTemplate(strTemplate, strFile);
	        			var projfile = proj.Object.AddFile(strFile);

						if (strName == "rootapp.srf")
						{
							projfile.DeploymentContent = true;
						}
						else if (strName == "root.disco")
						{
							projfile.DeploymentContent = true;
						}
						else if (strName == "root.htm")
						{
							projfile.DeploymentContent = true;
						}

					}
        		}
        	}
			proj.Object.Save();
			strTextStream.Close();
        	SetCommonPchSettings(proj);
			InfFile.Delete();
			wizard.AddSymbol("GENERATING_APP", false);
			AppProj = proj;
        }
	
        if (bGenIsapi && !bCombine)
        {
			wizard.AddSymbol("_PROJECT_NAME", strProjectName);
			wizard.AddSymbol("PROJECT_NAME", wizard.FindSymbol("ISAPI_PROJECT"));
			wizard.AddSymbol("GENERATING_ISAPI", true);

        	var strProjectPath = wizard.FindSymbol("ISAPI_DIRECTORY") +"\\" + wizard.FindSymbol("ISAPI_PROJECT");
        	var strProjectName = wizard.FindSymbol("ISAPI_PROJECT");
			var strTemplatePath = wizard.FindSymbol("PROJECT_TEMPLATE_PATH");

			var strTemplate = strTemplatePath+"\\default.vcproj";
			var strProjNameWithExt = strProjectName+".vcproj";

			var oTarget = wizard.FindSymbol("TARGET");
			var proj;
			if (wizard.FindSymbol("WIZARD_TYPE") == vsWizardAddSubProject)  // vsWizardAddSubProject
			{
				var prjItem = oTarget.AddFromTemplate(strTemplate, strProjectPath + "\\" + strProjNameWithExt);
				proj = prjItem.SubProject;
			}
			else
			{
				proj = oTarget.AddFromTemplate(strTemplate, strProjectPath, strProjNameWithExt);
			}
			
			AddCommonConfig(proj, strProjectName);
			AddSpecificConfig(proj, strProjectName, strProjectName);
			SetFilters(proj);
			var InfFile = CreateInfFile();
			var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
			        
        	var strTpl = "";
        	var strName = "";
            var strTextStream = InfFile.OpenAsTextStream(1, -2);
        	while (!strTextStream.AtEndOfStream)
        	{
        		strTpl = strTextStream.ReadLine();
        		if (strTpl != "")
        		{
        			strName = strTpl;
					if (strTpl.indexOf("app", 0) == -1 && strTpl.indexOf("APP", 0) == -1)
					{
	        			var strTarget = GetTargetName(strName, strProjectName);
	        			var strTemplate = strTemplatePath + "\\" + strTpl;
	        			var strFile = strProjectPath + "\\" + strTarget;

	        			wizard.RenderTemplate(strTemplate, strFile);
					proj.Object.AddFile(strFile);
					}
        		}
        	}
			proj.Object.Save();
        	strTextStream.Close();
        	SetCommonPchSettings(proj);
			InfFile.Delete();
			wizard.AddSymbol("GENERATING_ISAPI", false);
			wizard.AddSymbol("PROJECT_NAME", wizard.FindSymbol("_PROJECT_NAME"));
			IsapiProj = proj;
        }
	}
	catch(e)
	{
		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}

function GetTargetName(strName, strProjectName)
{
	try
	{
		var strTarget = strName;
		switch (strName)
		{
			case "readme.txt":
				strTarget = "ReadMe.txt";
				break;
			case "root.cpp":
				strTarget = wizard.FindSymbol("PROJECT_NAME")+".cpp";
				break;
			case "rootapp.srf":
				strTarget = wizard.FindSymbol("PROJECT_NAME")+".srf";
				break;
			case "rootisapi.def":
				strTarget = wizard.FindSymbol("PROJECT_NAME")+".def";
				break;
			case "root.disco":
				strTarget = wizard.FindSymbol("PROJECT_NAME")+".disco";
				break;
			case "root.htm":
				strTarget = wizard.FindSymbol("PROJECT_NAME")+".htm";
				break;
			case "rootisapiextension.h":
				strTarget = wizard.FindSymbol("EXTENSION_FILE");
				break;
			case "root.rc":
				strTarget = wizard.FindSymbol("PROJECT_NAME")+".rc";
				break;
			case "root.h":
				strTarget = wizard.FindSymbol("APP_FILE");
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

function AddSpecificConfig(proj, strProjectName, strSafeProjectName)
{
	try
	{
		var config = proj.Object.Configurations("Debug");

		config.CharacterSet = charSetMBCS;
		config.ConfigurationType = typeDynamicLibrary;
		config.UseOfATL = useATLStatic;

		var bAttributed = wizard.FindSymbol("ATTRIBUTED");
		var bSoap = wizard.FindSymbol("SOAP");
		var bStencil = wizard.FindSymbol("STENCIL");
		var CLTool = config.Tools("VCCLCompilerTool");

		var strDefines = GetPlatformDefine(config);
		strDefines += "_WINDOWS;_DEBUG;_USRDLL";
		if (bAttributed || bSoap)
			strDefines+= ";_ATL_ATTRIBUTES";

		CLTool.PreprocessorDefinitions= strDefines;
		CLTool.RuntimeLibrary = rtMultiThreadedDebug;
		CLTool.BufferSecurityCheck = true;
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

		if (wizard.FindSymbol("GENERATING_ISAPI") || wizard.FindSymbol("COMBINE_PROJECTS"))
		{
			var strDefFile = ".\\" + strProjectName + ".def";
			LinkTool.ModuleDefinitionFile = strDefFile;
		}

		LinkTool.OutputFile = "$(OutDir)/"+strSafeProjectName+".dll";
		LinkTool.ImportLibrary = "$(OutDir)/" + strSafeProjectName + ".lib";

		if (wizard.FindSymbol("SESSION_DB") == true)
		{
			LinkTool.AdditionalDependencies = "msdasc.lib";
		}
		if (bSoap)
		{
			LinkTool.MergedIDLBaseFileName = "_"+strProjectName+".idl";
		}
		
		if (wizard.FindSymbol("GENERATE_DEPLOYMENT"))
		{
			var DeploymentTool = config.Tools("VCWebDeploymentTool");
			DeploymentTool.ExcludedFromBuild = false;
			DeploymentTool.RelativePath = "";
			DeploymentTool.VirtualDirectoryName = wizard.FindSymbol("ISAPI_VROOT");
			DeploymentTool.ApplicationProtection = 0; // eAppProtectLow
			
			if (wizard.FindSymbol("GENERATING_ISAPI") || wizard.FindSymbol("COMBINE_PROJECTS"))
			{
				DeploymentTool.UnloadBeforeCopy = true;
				DeploymentTool.ApplicationMappings = ".srf;.dll";
				if (wizard.FindSymbol("PERFMON"))
				{
					DeploymentTool.RegisterOutput = true;
				}
			}
			
			if (wizard.FindSymbol("GENERATING_APP") || wizard.FindSymbol("COMBINE_PROJECTS"))
			{
				// set debug settings
				
				var dbg = config.DebugSettings;
				dbg.Remote = 0;
				var strUrl = "http://localhost/" + wizard.FindSymbol("ISAPI_VROOT") + "/";
				
				if (bSoap)
				{
					strUrl += wizard.FindSymbol("SAFE_PROJECT_NAME")+".dll?Handler=Gen" + wizard.FindSymbol("SAFE_PROJECT_NAME") + "WSDL";
				}
				else if (wizard.FindSymbol("STENCIL"))
				{
					strUrl += wizard.FindSymbol("PROJECT_NAME")+".srf";
				}
				else
				{
					strUrl += wizard.FindSymbol("SAFE_PROJECT_NAME")+".dll?Handler=Default";
				}		
				dbg.HttpUrl = strUrl;
			}
		}
		
		config = proj.Object.Configurations("Release");
		config.CharacterSet = charSetMBCS;
		config.ConfigurationType = typeDynamicLibrary;
		config.UseOfATL = useATLStatic;
			
		CLTool = config.Tools("VCCLCompilerTool");

		strDefines = GetPlatformDefine(config);
		strDefines += "_WINDOWS;NDEBUG;_USRDLL";
		if (bAttributed || bSoap)
			strDefines += ";_ATL_ATTRIBUTES";

		CLTool.PreprocessorDefinitions= strDefines;
		CLTool.RuntimeLibrary = rtMultiThreadedDLL;
		CLTool.InlineFunctionExpansion = expandOnlyInline;
		CLTool.BufferSecurityCheck = true;
		CLTool.DebugInformationFormat = debugEnabled;

		MidlTool = config.Tools("VCMidlTool");
		MidlTool.MkTypLibCompatible = false;
		MidlTool.PreprocessorDefinitions = "NDEBUG";

		RCTool = config.Tools("VCResourceCompilerTool");
		RCTool.Culture = rcEnglishUS;
		RCTool.PreprocessorDefinitions = "NDEBUG";

		LinkTool = config.Tools("VCLinkerTool");
		LinkTool.LinkIncremental = linkIncrementalNo;
		LinkTool.GenerateDebugInformation = true;

		if (wizard.FindSymbol("GENERATING_ISAPI") || wizard.FindSymbol("COMBINE_PROJECTS"))
		{
			var strDefFile = ".\\" + strProjectName + ".def";
			LinkTool.ModuleDefinitionFile = strDefFile;
		}
		LinkTool.OutputFile = "$(OutDir)/"+strSafeProjectName+".dll";
		LinkTool.ImportLibrary ="$(OutDir)/" + strSafeProjectName + ".lib";
		if (wizard.FindSymbol("SESSION_DB") == true)
		{
			LinkTool.AdditionalDependencies = "msdasc.lib";
		}
		if (bSoap)
		{
			LinkTool.MergedIDLBaseFileName = "_"+strProjectName+".idl";
		}
		
		if (wizard.FindSymbol("GENERATE_DEPLOYMENT"))
		{
			var DeploymentTool = config.Tools("VCWebDeploymentTool");
			DeploymentTool.ExcludedFromBuild = false;
			DeploymentTool.RelativePath = "";
			DeploymentTool.VirtualDirectoryName = wizard.FindSymbol("ISAPI_VROOT");
			DeploymentTool.ApplicationProtection = 0; // eAppProtectLow
			
			if (wizard.FindSymbol("GENERATING_ISAPI") || wizard.FindSymbol("COMBINE_PROJECTS"))
			{
				DeploymentTool.UnloadBeforeCopy = true;
				DeploymentTool.ApplicationMappings = ".srf;.dll";
				if (wizard.FindSymbol("PERFMON"))
				{
					DeploymentTool.RegisterOutput = true;
				}
			}
			
			if (wizard.FindSymbol("GENERATING_APP") || wizard.FindSymbol("COMBINE_PROJECTS"))
			{
				// set debug settings
				
				var dbg = config.DebugSettings;
				dbg.Remote = 0;
				var strUrl = "http://localhost/" + wizard.FindSymbol("ISAPI_VROOT") + "/";
				
				if (bSoap)
				{
					strUrl += wizard.FindSymbol("SAFE_PROJECT_NAME")+".dll?Handler=Gen" + wizard.FindSymbol("SAFE_PROJECT_NAME") + "WSDL";
				}
				else if (wizard.FindSymbol("STENCIL"))
				{
					strUrl += wizard.FindSymbol("PROJECT_NAME")+".srf";
				}
				else
				{
					strUrl += wizard.FindSymbol("SAFE_PROJECT_NAME")+".dll?Handler=Default";
				}		
				dbg.HttpUrl = strUrl;
			}
		}
	}
	catch(e)
	{
		throw e;
	}
}

function PatchWizardSymbols()
{
	try
	{
		// for keeping track of debugging comments in the templates
		wizard.AddSymbol("__dbgcmt", false);
		
		if (wizard.FindSymbol("COMBINE_PROJECTS"))
		{
			wizard.AddSymbol("GENERATE_ISAPI", true);
			wizard.AddSymbol("GENERATE_APP", true);
		}
		
		if (wizard.FindSymbol("SOAP"))
		{
			wizard.AddSymbol("STENCIL", false);
			wizard.AddSymbol("VALIDATION", false);

			var strGuid = wizard.CreateGuid();
			wizard.AddSymbol("SOAP_INTERFACE_GUID", wizard.FormatGuid(strGuid, Format1));

			strGuid = wizard.CreateGuid();
			wizard.AddSymbol("SOAP_COCLASS_GUID", wizard.FormatGuid(strGuid, Format1));

			wizard.AddSymbol("ATTRIBUTED", true);
		}
		
		if (wizard.FindSymbol("SOME_SESSION") == false)
		{
			wizard.AddSymbol("SESSION_DB", false);
			wizard.AddSymbol("SESSION_MEM", false);
		}
		
		if (wizard.FindSymbol("PERFMON") == true && wizard.FindSymbol("GENERATE_ISAPI") == false)
		{
			wizard.AddSymbol("PERFMON", false);
		}
		
		if (wizard.FindSymbol("SESSION_DB") == true)
		{
			var strConnectString = wizard.FindSymbol("DB_CONNECTION_STRING");
			if (strConnectString.length == 0)
				return;

			GetDBString(strConnectString);
		}
		
		if (!wizard.FindSymbol("SESSION_MEM") && !wizard.FindSymbol("SESSION_DB") &&
			!wizard.FindSymbol("FILE_CACHE") && !wizard.FindSymbol("BLOB_CACHE") &&
			!wizard.FindSymbol("DATASOURCE_CACHE") && !wizard.FindSymbol("BROWSCAPS"))
		{
			wizard.AddSymbol("EXTENSION_CLASS", "CIsapiExtension")
		}
		
		if (wizard.FindSymbol("GENERATE_ISAPI"))
		{
			var strVal = wizard.FindSymbol("ISAPI_DIRECTORY");
			var strNewVal = TrimStr(strVal);
			wizard.AddSymbol("ISAPI_DIRECTORY", strNewVal);
			
			strVal = wizard.FindSymbol("ISAPI_PROJECT");
			strNewVal = TrimStr(strVal);
			wizard.AddSymbol("ISAPI_PROJECT", strNewVal);
		}
		
		wizard.AddSymbol("GENERATING_APP", false);
		wizard.AddSymbol("GENERATING_ISAPI", false);
		var strRemoteMachine = "localhost";
		try
		{
			strRemoteMachine = wizard.GetComputerName();
		}
		catch (e)
		{
			strRemoteMachine = "localhost";
		}
		
		wizard.AddSymbol("REMOTE_MACHINE", strRemoteMachine);
	}
	catch(e)
	{
		throw e;
	}
}

function GetDBString(str)
{
	try
	{
		var i = 0;
		strDBString = "";
		for (i = 0; i < str.length; i++)
		{
			if (str.charAt(i) == '\"' || str.charAt(i) == '\\')
			{
				strDBString+= '\\';
			}
			strDBString+= str.charAt(i);
		}
		wizard.AddSymbol("DB_CONNECTION_STRING", strDBString);
	}
	catch(e)
	{
		throw e;
	}
}

