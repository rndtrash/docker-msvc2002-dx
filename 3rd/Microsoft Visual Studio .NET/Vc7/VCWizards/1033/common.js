// (c) 2001 Microsoft Corporation
var vsViewKindPrimary                     = "{00000000-0000-0000-0000-000000000000}";
var vsViewKindDebugging                   = "{7651A700-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindCode                        = "{7651A701-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindDesigner                    = "{7651A702-06E5-11D1-8EBD-00A0C90F26EA}";
var vsViewKindTextView                    = "{7651A703-06E5-11D1-8EBD-00A0C90F26EA}";

var GUID_ItemType_PhysicalFolder		  = "{6BB5F8EF-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_VirtualFolder			  =	"{6BB5F8F0-4483-11D3-8BCF-00C04F8EC28C}";
var GUID_ItemType_PhysicalFile			  = "{6BB5F8EE-4483-11D3-8BCF-00C04F8EC28C}";

var GUID_Deployment_TemplatePath          = "{54435603-DBB4-11D2-8724-00A0C9A8B90C}";

var vsCMLanguageIDL = "{B5E9BD35-6D3E-4B5D-925E-8A43B79820B4}";
var vsCMLanguageVC = "{B5E9BD32-6D3E-4B5D-925E-8A43B79820B4}";


var gbExceptionThrown = false;

    var vsCMFunctionConstructor = 1;

	var vsCMAddPositionInvalid = -3;
	var vsCMAddPositionDefault = -2;
	var	vsCMAddPositionEnd = -1;
	var vsCMAddPositionStart = 0;
//
	var vsCMAccessPublic = 1;
	var vsCMAccessDefault = 32;
//
	var vsCMWhereInvalid = -1;
	var vsCMWhereDefault = 0;
	var vsCMWhereDeclaration = 1;
	var vsCMWhereDefinition = 2;
//
	var vsCMPartName = 1;
	var vsCMPartAttributes = 2;
	var vsCMPartHeader = 4;
	var vsCMPartWhole = 8;
	var vsCMPartBody = 16;
	var vsCMPartNavigate = 32;
	//vsCMPartDelimiter = 64;
	var vsCMPartAttributesWithDelimiter = 68;
	var vsCMPartBodyWithDelimiter = 80;
	var vsCMPartHeaderWithAttributes = 6;
	var vsCMPartWholeWithAttributes = 10;
//
	var vsCMValidateFileExtNone = -1;
	var vsCMValidateFileExtCpp = 0;
	var vsCMValidateFileExtCppSource = 1;
	var vsCMValidateFileExtHtml = 2;
//
	var vsCMElementClass    = 1;
	var vsCMElementFunction = 2;
	var vsCMElementVariable = 3;
	var vsCMElementProperty = 4;
	var vsCMElementNamespace= 5;
	var vsCMElementInterface= 8;
	var vsCMElementStruct   = 11;	
	var vsCMElementUnion    = 12;
	var vsCMElementIDLCoClass=33;
	var vsCMElementVCBase   = 37;
//
	var einterfaceDual = 0;
	var einterfaceCustom = 1;
	var einterfaceDispinterface = 2;
//
	var eparamIn = 0;
	var eparamOut = 1;
	var eparamInOut = 2;
	var eparamOutRetval = 3;


// VS-specific HRESULT failure codes
//
	var OLE_E_PROMPTSAVECANCELLED = -2147221492;
	var VS_E_PROJECTALREADYEXISTS = -2147753952;
	var VS_E_PACKAGENOTLOADED = -2147753953;
	var VS_E_PROJECTNOTLOADED = -2147753954;
	var VS_E_SOLUTIONNOTOPEN = -2147753955;
	var VS_E_SOLUTIONALREADYOPEN = -2147753956;
	var VS_E_INCOMPATIBLEDOCDATA = -2147753962;
	var VS_E_UNSUPPORTEDFORMAT = -2147753963;
	var VS_E_WIZARDBACKBUTTONPRESS = -2147213313;
	var VS_E_WIZCANCEL = VS_E_WIZARDBACKBUTTONPRESS;

////////////////////////////////////////////////////////


/******************************************************************************
 Description: Sets the error info
  nErrNumber: Error code
  strErrDesc: Error description
******************************************************************************/
function SetErrorInfo(oErrorObj)
{
	var oWizard;
	try
	{
		oWizard = wizard;
	}
	catch(e)
	{
		oWizard = window.external;
	}

	try
	{
		var strErrorText = "";

		if(oErrorObj.description.length != 0)
		{
			strErrorText = oErrorObj.description;		
		}
		else
		{
			var strErrorDesc = GetRuntimeErrorDesc(oErrorObj.name);
			if (strErrorDesc.length != 0)
			{
				var L_strScriptRuntimeError_Text = " error occurred while running the script:\r\n\r\n";
				strErrorText = oErrorObj.name + L_strScriptRuntimeError_Text + strErrorDesc;
			}
		}

		oWizard.SetErrorInfo(strErrorText, oErrorObj.number & 0xFFFFFFFF);
	}
	catch(e)
	{
		var L_ErrSettingErrInfo_Text = "An error occurred while setting the error info.";
		oWizard.ReportError(L_ErrSettingErrInfo_Text);
	}
}


/******************************************************************************
         Description: Returns a description for the exception type given
 strRuntimeErrorName: The name of the type of exception occurred
 *****************************************************************************/
function GetRuntimeErrorDesc(strRuntimeErrorName)
{
	var L_strDesc_Text = "";
	switch(strRuntimeErrorName)
	{
		case "ConversionError":
			var L_ConversionError1_Text = "This error occurs whenever there is an attempt to convert";
			var L_ConversionError2_Text = "an object into something to which it cannot be converted.";
			L_strDesc_Text = L_ConversionError1_Text + "\r\n" + L_ConversionError2_Text;
			break;
		case "RangeError":
			var L_RangeError1_Text = "This error occurs when a function is supplied with an argument";
			var L_RangeError2_Text = "that has exceeded its allowable range. For example, this error occurs";
			var L_RangeError3_Text = "if you attempt to construct an Array object with a length that is not";
			var L_RangeError4_Text = "a valid positive integer.";
			L_strDesc_Text = L_RangeError1_Text + "\r\n" + L_RangeError2_Text + "\r\n" + L_RangeError3_Text + "\r\n" + L_RangeError4_Text;
			break;
		case "ReferenceError":
			var L_ReferenceError1_Text = "This error occurs when an invalid reference has been detected.";
			var L_ReferenceError2_Text = "This error will occur, for example, if an expected reference is null.";
			L_strDesc_Text = L_ReferenceError1_Text + "\r\n" + L_ReferenceError2_Text;
			break;
		case "RegExpError":
			var L_RegExpError1_Text = "This error occurs when a compilation error occurs with a regular";
			var L_RegExpError2_Text = "expression. Once the regular expression is compiled, however, this error";
			var L_RegExpError3_Text = "cannot occur. This example will occur, for example, when a regular";
			var L_RegExpError4_Text = "expression is declared with a pattern that has an invalid syntax, or flags";
			var L_RegExpError5_Text = "other than i, g, or m, or if it contains the same flag more than once.";
			L_strDesc_Text = L_RegExpError1_Text + "\r\n" + L_RegExpError2_Text + "\r\n" + L_RegExpError3_Text + "\r\n" + L_RegExpError4_Text + "\r\n" + L_RegExpError5_Text;
			break;
		case "SyntaxError":
			var L_SyntaxError1_Text = "This error occurs when source text is parsed and that source text does not";
			var L_SyntaxError2_Text = "follow correct syntax. This error will occur, for example, if the eval";
			var L_SyntaxError3_Text = "function is called with an argument that is not valid program text.";
			L_strDesc_Text = L_SyntaxError1_Text + "\r\n" + L_SyntaxError2_Text + "\r\n" + L_SyntaxError3_Text;
			break;
		case "TypeError":
			var L_TypeError1_Text = "This error occurs whenever the actual type of an operand does not match the";
			var L_TypeError2_Text = "expected type. An example of when this error occurs is a function call made on";
			var L_TypeError3_Text = "something that is not an object or does not support the call.";
			L_strDesc_Text = L_TypeError1_Text + "\r\n" + L_TypeError2_Text + "\r\n" + L_TypeError3_Text;
			break;
		case "URIError":
			var L_URIError1_Text = "This error occurs when an illegal Uniform Resource Indicator (URI) is detected.";
			var L_URIError2_Text = "For example, this is error occurs when an illegal character is found in a string";
			var L_URIError3_Text = "being encoded or decoded.";
			L_strDesc_Text = L_URIError1_Text + "\r\n" + L_URIError2_Text + "\r\n" + L_URIError3_Text;
			break;
		default:
			break;
	}
	return L_strDesc_Text;
}

/******************************************************************************
    Description: Creates a C++ project
 strProjectName: Project Name
 strProjectPath: The path that the project will be created in
******************************************************************************/
function CreateProject(strProjectName, strProjectPath)
{
	try
	{
		var strProjTemplatePath = wizard.FindSymbol("PROJECT_TEMPLATE_PATH");
		var strProjTemplate = strProjTemplatePath + "\\default.vcproj"; 

		var Solution = dte.Solution;
		var strSolutionName = "";
		if (wizard.FindSymbol("CLOSE_SOLUTION"))
		{
			Solution.Close();
			strSolutionName = wizard.FindSymbol("VS_SOLUTION_NAME");
			if (strSolutionName.length)
			{
				var strSolutionPath = strProjectPath.substr(0, strProjectPath.length - strProjectName.length);
				Solution.Create(strSolutionPath, strSolutionName);
			}
		}

		var strProjectNameWithExt = strProjectName + ".vcproj";
		var oTarget = wizard.FindSymbol("TARGET");
		var oProj;
		if (wizard.FindSymbol("WIZARD_TYPE") == vsWizardAddSubProject)  // vsWizardAddSubProject
		{
			var prjItem = oTarget.AddFromTemplate(strProjTemplate, strProjectPath + "\\" + strProjectNameWithExt);
			oProj = prjItem.SubProject;
		}
		else
		{
			oProj = oTarget.AddFromTemplate(strProjTemplate, strProjectPath, strProjectNameWithExt);
		}

		return oProj;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Adds source, include and resource filters for project folders.
              The symbols contain the file extensions to be used for filtering.
       oProj: Project object
******************************************************************************/
function SetFilters(oProj)
{
	try
	{
		var strSrcFilter = wizard.FindSymbol("SOURCE_FILTER");
		var L_strSource_Text = "Source Files";
		var group = oProj.Object.AddFilter(L_strSource_Text);
		group.Filter = strSrcFilter;

		var strIncFilter = wizard.FindSymbol("INCLUDE_FILTER");
		var L_strHeader_Text = "Header Files";
		group = oProj.Object.AddFilter(L_strHeader_Text);
		group.Filter = strIncFilter;

		var strResFilter = wizard.FindSymbol("RESOURCE_FILTER");
		var L_strResources_Text = "Resource Files";
		group = oProj.Object.AddFilter(L_strResources_Text);
		group.Filter = strResFilter;
	}
	catch(e)
	{   
		throw e;
	}
}


/******************************************************************************
 Description: Creates the Templates.inf file.
              Templates.inf is created based on TemplatesInf.txt and contains
			  a list of file names to be created by the wizard.
******************************************************************************/
function CreateInfFile()
{
	try
	{
		var oFSO, TemplatesFolder, TemplateFiles, strTemplate;
		oFSO = new ActiveXObject("Scripting.FileSystemObject");

		var TemporaryFolder = 2;
		var oFolder = oFSO.GetSpecialFolder(TemporaryFolder);

		var strTempFolder = oFSO.GetAbsolutePathName(oFolder.Path);
		var strWizTempFile = strTempFolder + "\\" + oFSO.GetTempName();

		var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
		var strInfFile = strTemplatePath + "\\Templates.inf";
		wizard.RenderTemplate(strInfFile, strWizTempFile);

		var oWizTempFile = oFSO.GetFile(strWizTempFile);
		return oWizTempFile;

	}
	catch(e)
	{   
		throw e;
	}
}


/******************************************************************************
 Description: Returns a unique file name
strDirectory: Directory to look for file name in
 strFileName: File name to check.  If unique, same file name is returned.  If 
              not unique, a number from 1-9999999 will be appended.  If not 
			  passed in, a unique file name is returned via GetTempName.
******************************************************************************/
function GetUniqueFileName(strDirectory, strFileName)
{
	try
	{
		oFSO = new ActiveXObject("Scripting.FileSystemObject");
		if (!strFileName)
			return oFSO.GetTempName();

		if (strDirectory.length && strDirectory.charAt(strDirectory.length-1) != "\\")
			strDirectory += "\\";

		var strFullPath = strDirectory + strFileName;
		var strName = strFileName.substring(0, strFileName.lastIndexOf("."));
		var strExt = strFileName.substr(strFileName.lastIndexOf("."));

		var nCntr = 0;
		while (oFSO.FileExists(strFullPath))
		{
			nCntr++;
			strFullPath = strDirectory + strName + nCntr + strExt;
		}
		if (nCntr)
			return strName + nCntr + strExt;
		else
			return strFileName;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
    Description: Adds all the files to the project based on the 
	             Templates.inf file.
          oProj: Project object
 strProjectName: Project name
        InfFile: Templates.inf file object
******************************************************************************/
function AddFilesToProject(oProj, strProjectName, InfFile)
{
	try
	{
		var strTemplatePath;
		var strResPath;
		var strHelpPath;
		try
		{
			strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
			strResPath = wizard.FindSymbol("RES_PATH");
			strHelpPath = wizard.FindSymbol("HELP_PATH");
		}
		catch(e)
		{
			// OK if some of the symbols aren't there.
		}

		var strName;

		var strTextStream = InfFile.OpenAsTextStream(1, -2);
		while (!strTextStream.AtEndOfStream)
		{
			var bCopyOnly = false;  //"true" will only copy the file from strTemplate to strTarget without rendering/adding to the project
			strName = TrimStr(strTextStream.ReadLine());
			if (strName != "")
			{
				
				var nCopy = strName.indexOf("|")
				if(nCopy >= 0)
				{
					bCopyOnly = true;
					strName = TrimStr(strName.substr(nCopy+1));
				}
				var strTarget = GetTargetName(strName, strProjectName, strResPath, strHelpPath);
				var strTemplate = strTemplatePath + "\\" + strName;
				var bHelpImages = false;
				if (strTarget == "")  // help images
				{
					bHelpImages = true;
					strTarget = strHelpPath + "\\Images\\" + strName;
				}
				var strExt = strName.substr(strName.lastIndexOf("."));

				wizard.RenderTemplate(strTemplate, strTarget, bCopyOnly, true);
				if(bHelpImages)
				{
					continue;
				}
				var bFound = false;

				var oItems = oProj.ProjectItems;
				projfile = oItems(strTarget);
				if (projfile != null)
					bFound = true;

				if(!bFound)
					projfile = oItems.AddFromFile(strTarget);

				if(projfile)
					SetFileProperties(projfile, strName);

				if (DoOpenFile(strName) && projfile != null)
				{
					var window = projfile.Open(vsViewKindPrimary);
					if(window)
						window.visible = true;
				}
			}
		}
		strTextStream.Close();
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
    Description: Adds the default configurations to the project.
          oProj: Project object
 strProjectName: Project name
******************************************************************************/
function AddCommonConfig(oProj, strProjectName)
{
	try
	{
		var config = oProj.Object.Configurations("Debug");
		config.IntermediateDirectory = "Debug";
		config.OutputDirectory = "Debug";

		var CLTool = config.Tools("VCCLCompilerTool");
		CLTool.UsePrecompiledHeader = pchUseUsingSpecific;
		CLTool.WarningLevel = warningLevel_3;
		CLTool.MinimalRebuild = true;
		CLTool.DebugInformationFormat = debugEditAndContinue;
		CLTool.Optimization = optimizeDisabled;
		CLTool.BasicRuntimeChecks = runtimeBasicCheckAll;
		CLTool.Detect64BitPortabilityProblems = true;

		var LinkTool = config.Tools("VCLinkerTool");
		LinkTool.SubSystem = subSystemWindows;
		LinkTool.TargetMachine = machineX86;
		LinkTool.GenerateDebugInformation = true;

		config = oProj.Object.Configurations("Release");
		config.IntermediateDirectory = "Release";
		config.OutputDirectory = "Release";

		CLTool = config.Tools("VCCLCompilerTool");
		CLTool.WarningLevel = warningLevel_3;
		CLTool.UsePrecompiledHeader = pchUseUsingSpecific;
		CLTool.Optimization = optimizeMaxSpeed;
		CLTool.OmitFramePointers = true;
		CLTool.EnableFunctionLevelLinking = true;
		CLTool.StringPooling = true;
		CLTool.Detect64BitPortabilityProblems = true;
		CLTool.DebugInformationFormat = debugEnabled;

		LinkTool = config.Tools("VCLinkerTool");
		LinkTool.SubSystem = subSystemWindows;
		LinkTool.TargetMachine = machineX86;
		LinkTool.GenerateDebugInformation = true;
		LinkTool.EnableCOMDATFolding = optFolding;
		LinkTool.OptimizeReferences = optReferences;

	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Sets up the pre-compiled header for the project.
       oProj: Project object
******************************************************************************/
function SetCommonPchSettings(oProj)
{
	try
	{
		// setup /Yu (using precompiled headers)
		var configs = oProj.Object.Configurations;
		config = configs("Debug");

		var CLTool = config.Tools("VCCLCompilerTool");
		CLTool.UsePrecompiledHeader = pchUseUsingSpecific;
		config = configs("Release");

		var CLTool = config.Tools("VCCLCompilerTool");
		CLTool.UsePrecompiledHeader = pchUseUsingSpecific;

		// setup /Yc (create precompiled header)
		var files = oProj.Object.Files;
		file = files("StdAfx.cpp");

		config = file.FileConfigurations("Debug");
		config.Tool.UsePrecompiledHeader = pchCreateUsingSpecific;

		config = file.FileConfigurations("Release");
		config.Tool.UsePrecompiledHeader = pchCreateUsingSpecific;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Sets up the project config properties when no pre-compiled
              header is used.
       oProj: Project object
******************************************************************************/
function SetNoPchSettings(oProj)
{
	try
	{
		var config = oProj.Object.Configurations("Debug");
		var CLTool = config.Tools("VCCLCompilerTool");
		CLTool.UsePrecompiledHeader = pchNone;

		var config = oProj.Object.Configurations("Release");
		var CLTool = config.Tools("VCCLCompilerTool");
		CLTool.UsePrecompiledHeader = pchNone;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Deletes the file given
        oFSO: File System Object
     strFile: Name of the file to be deleted
******************************************************************************/
function DeleteFile(oFSO, strFile)
{
	try
	{
		if (oFSO.FileExists(strFile))
		{
			var oFile = oFSO.GetFile(strFile);
			oFile.Delete();
		}
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
    Description: Renders a template file and optionally adds it to the project
strTemplateFile: Template file name only (excluding path, relative to TEMPLATES_PATH)
 strProjectFile: Name of new file created (may include path, but relative to PROJECT_PATH)
   oProjToAddTo: Project object, if the created file needs to be added to it
                 (skip it or pass false if not adding the file to the project)
          bOpen: If true, open the file in the fdefault editor, after adding 
                 it to the project.
******************************************************************************/
function RenderAddTemplate(strTemplateFile, strProjectFile, oProjToAddTo, bOpen)
{
	try
	{
		var strTemplatePath	= wizard.FindSymbol("TEMPLATES_PATH");
		if ("\\" != strTemplatePath.charAt(strTemplatePath.length-1))
			strTemplatePath += "\\";

		strTemplateFile = strTemplatePath + strTemplateFile;

		wizard.RenderTemplate(strTemplateFile, strProjectFile, false, false);
		if (oProjToAddTo)
		{
			AddFileToProject(strProjectFile, oProjToAddTo, bOpen)		
		}
	}
	catch(e)
	{
		throw e
	}
}

/******************************************************************************
    Description: Renders a template file and optionally adds it to the project
strTemplateFile: Template file name only (excluding path, relative to TEMPLATES_PATH)
 strProjectFile: Name of new file created (may include path, but relative to PROJECT_PATH)
   oProjToAddTo: Project object, if the created file needs to be added to it
                 (skip it or pass false if not adding the file to the project)
          bOpen: If true, open the file in the fdefault editor, after adding 
                 it to the project.
******************************************************************************/
function RenderAddTemplateHTM(strTemplateFile, strProjectFile, oProjToAddTo, bOpen)
{
	try
	{
		var strTemplatePath	= window.external.FindSymbol("TEMPLATES_PATH");
		if ("\\" != strTemplatePath.charAt(strTemplatePath.length-1))
			strTemplatePath += "\\";

		strTemplateFile = strTemplatePath + strTemplateFile;

		window.external.RenderTemplate(strTemplateFile, strProjectFile, false, false);
		if (oProjToAddTo)
		{
			AddFileToProject(strProjectFile, oProjToAddTo, bOpen)		
		}
	}
	catch(e)
	{
		throw e
	}
}

/******************************************************************************
    Description: Add file to the project
 strProjectFile: Name of the file to be added
   oProjToAddTo: Project object
          bOpen: If true, open the file in the fdefault editor, after adding 
                 it to the project.
******************************************************************************/
function AddFileToProject(strProjectFile, oProjToAddTo, bOpen)
{
	try
	{
		var projfile;
		var bFound = false;

		oItems = oProjToAddTo.ProjectItems;
		projfile = oItems(strProjectFile);
		if (projfile != null)
		{
			bFound = true;
		}

		if(!bFound)
		{
			projfile = oItems.AddFromFile(strProjectFile);
		}

		if(bOpen && projfile != null)
		{
			var window = projfile.Open(vsViewKindPrimary);
			if( window )
				window.visible = true;
		}
	}
	catch(e)
	{
		throw e
	}
}

/******************************************************************************
 Description: Returns the project's directory path
       oProj: Project object
******************************************************************************/
function GetProjectPath(oProj)
{
	try
	{
		var strProjectPath = oProj.FullName;
		for (nPos = strProjectPath.length-1; nPos >= 0; nPos--)
		{
			if (strProjectPath.charAt(nPos) == "\134")
				break;
		}
		return strProjectPath.substr(0, nPos);
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
     Description: Renders and inserts a template file that contains an interface
                  into the project's IDL file
			 oCM: Code Model object
strInterfaceFile: Template file name only (excluding path)
******************************************************************************/
function AddInterfaceFromFile(oCM, strInterfaceFile)
{
	try
	{
		var strTemplateFile	= wizard.FindSymbol("TEMPLATES_PATH") + "\\" + strInterfaceFile;
		var strInsertText = wizard.RenderTemplateToString(strTemplateFile);
		oCM.IDLLibraries(1).StartPoint.CreateEditPoint().Insert(strInsertText);
		oCM.Synchronize();
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
   Description: Renders and inserts a template file that contains a coclass
                into the project's IDL file
           oCM: Code Model object
strCoclassFile: Template file name only (excluding path)
******************************************************************************/
function AddCoclassFromFile(oCM, strCoclassFile)
{
	try
	{
		var strTemplateFile	= wizard.FindSymbol("TEMPLATES_PATH") + "\\" + strCoclassFile;
		var strInsertText = wizard.RenderTemplateToString(strTemplateFile);
		oCM.IDLLibraries(1).EndPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint().Insert(strInsertText);
		oCM.Synchronize();
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
        Description: Returns a boolean indicating whether a #include exists in a file
		      oProj: Project object
      strHeaderFile: #include to search for
  strInsertIntoFile: Source file that contains the #include (excluding the path)
******************************************************************************/
function DoesIncludeExist(oProj, strHeaderFile, strInsertIntoFile)
{
	try
	{
		var oIncludes = oProj.ProjectItems(strInsertIntoFile).FileCodeModel.Includes;
		if(oIncludes.Find(strHeaderFile)!=null)
			return true;
		return false;
	}
	catch(e)
	{   
		throw e;
	}
}


/******************************************************************************
Description: Returns the highest dispid from members of the given interface & 
             all its bases
  oInterface: Interface object
******************************************************************************/
function GetMaxID(oInterface)
{
	var currentMax = 0;
	try
	{
		var funcs = oInterface.Functions;
		if(funcs!=null)
		{
			var nTotal = funcs.Count;
			var nCntr;
			for (nCntr = 1; nCntr <= nTotal; nCntr++)
			{
				var id = funcs(nCntr).Attributes.Find("id");
				if(id!=null)
				{
					var idval = parseInt(id.Value);
					if(idval>currentMax)
						currentMax = idval;
				}
			}
		}
//REMOVE remove this and use Children collection above, if it's implemented
		funcs = oInterface.Variables;
		if(funcs!=null)
		{
			var nTotal = funcs.Count;
			var nCntr;
			for (nCntr = 1; nCntr <= nTotal; nCntr++)
			{
				var id = funcs(nCntr).Attributes.Find("id");
				if(id!=null)
				{
					var idval = parseInt(id.Value);
					if(idval>currentMax)
						currentMax = idval;
				}
			}
		}
		var nextBases = oInterface.Bases;
		var nTotal = nextBases.Count;
		var nCntr;
		for (nCntr = 1; nCntr <= nTotal; nCntr++)
		{
			var nextObject = nextBases(nCntr).Class;
			if(nextObject!=null && nextObject.Name != "IDispatch")
			{
				var idval = GetMaxID(nextObject);
				if(idval>currentMax)
						currentMax = idval;
			}
		}
		return currentMax;
	}
	catch(e)
	{   
		throw e;
	}
}


/******************************************************************************
     Description: Checks if a project is MFC-based.
	       oProj: Project object
bCWinAppRequired: Flag indicating whether Extension DLLs are included in check
******************************************************************************/
function IsMFCProject(oProj, bCWinAppRequired)
{
	try
	{
		var oCM = oProj.CodeModel;
		
		// look for class derived from CWinApp
		var oClasses = oCM.Classes;
		for (var nCntr = 1; nCntr <= oClasses.Count; nCntr++)
		{
			var oClass = oClasses(nCntr);
			if (oClass.IsDerivedFrom("CWinApp"))
			{
				// one global variable must be of this class type
				var oVariables = oCM.Variables;
				for (var nCntr2 = 1; nCntr2 <= oVariables.Count; nCntr2++)
				{
					if (oVariables(nCntr2).TypeString == oClass.Name)
						return true;
				}
			}
		}

		if (!bCWinAppRequired)
		{
			// check if MFC Extension DLL
			if (2 == oProj.Object.Configurations(1).ConfigurationType)
			{
				var oVariables = oCM.Variables;
				for (var nCntr = 1; nCntr <= oVariables.Count; nCntr++)
				{
					if (oVariables(nCntr).TypeString == "AFX_EXTENSION_MODULE")
						return true;
				}
			}
			
			// check if Win32 app with MFC support
			var oVariables = oCM.Variables;
			for (var nCntr2 = 1; nCntr2 <= oVariables.Count; nCntr2++)
			{
				if (oVariables(nCntr2).TypeString == "CWinApp")
					return true;
			}
		}

		// not MFC project
		return false;
	}
	catch(e)
	{   
		throw e;
	}
}

/********************************************************************************
	Description:	Returns a boolean indicating whether ATL support can be added
					to the project.
		selProj:	Selected project
********************************************************************************/
function CanAddATLSupport(selProj)
{
	var oCM;
	try
	{
		if (IsATLProject(selProj))
		{
			var L_ErrMsg1_Text = "Current project already has ATL support.";
			wizard.ReportError(L_ErrMsg1_Text);
			return false;
		}
		else
		{
			// check if MFC app
			if (!IsMFCProject(selProj, true))
			{
				var L_ErrMsg2_Text = "ATL support can only be added to MFC Exes or MFC Regular DLLs.";
				wizard.ReportError(L_ErrMsg2_Text);
				return false;
			}
			else
			{
				oCM	= selProj.CodeModel;

				var L_TRANSACTION_Text = "Add ATL Support To Project";
				oCM.StartTransaction(L_TRANSACTION_Text);

				var bRet = AddATLSupportToProject(selProj);
				if (bRet)
					oCM.CommitTransaction();
				else
					oCM.AbortTransaction();
				return bRet;
			}
		}
		return true;
	}
	catch(e)
	{
		if (oCM)
			oCM.AbortTransaction();

		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}

/******************************************************************************
 Description: Returns a boolean indicating whether the project supports both
              attributed and non-attributed ATL objects.
******************************************************************************/
function CanAddNonAttributed()
{
	try
	{
		var oProj = window.external.ProjectObject;
		// check for IDL file
		var bIDL = false;
		var oFiles = oProj.Object.Files;
		for (var nCntr = 1; nCntr <= oFiles.Count; nCntr++)
		{
			if (-1 != oFiles(nCntr).Name.toUpperCase().search(".IDL"))
			{
				bIDL = true;
				return true;
			}
		}
		return false;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Returns a boolean indicating whether a project is attributed or not.
     oWizard: Wizard object
******************************************************************************/
function IsAttributedProject(oWizard)
{
	try
	{
		var oCM = oWizard.ProjectObject.CodeModel;
		
		// check for a global module attribute
		if (oCM.Attributes.Find("module"))
			return true;
			
		// check for a module attribute applied to a class
		var oClasses = oCM.Classes;
		for (var nCntr = 1; nCntr <= oClasses.Count; nCntr++)
		{
			var oClass = oClasses(nCntr);
			if (oClass.Attributes.Find("module"))
				return true;
		}

		return false;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Generates a C++ friendly name
     strName: The old, unfriendly name
******************************************************************************/
function CreateSafeName(strName)
{
	try
	{
		var nLen = strName.length;
		var strSafeName = "";
		
		for (nCntr = 0; nCntr < nLen; nCntr++)
		{
			var cChar = strName.charAt(nCntr);
			if ((cChar >= 'A' && cChar <= 'Z') || (cChar >= 'a' && cChar <= 'z') || 
					(cChar == '_') || (cChar >= '0' && cChar <= '9'))
			{
				// valid character, so add it
				strSafeName += cChar;
			}
			// otherwize, we skip it
		}
		if (strSafeName=="")
		{
			// if it's empty, we add My
			strSafeName = "My";
		}
		else if (strSafeName.charAt(0) >= '0' && strSafeName.charAt(0) <= '9')
		{
			// if it starts with a digit, we prepend My
			strSafeName = "My" + strSafeName;
		}
		return strSafeName;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Returns a boolean indicating whether project is ATL-based.
       oProj: Project object
******************************************************************************/
function IsATLProject(oProj)
{
	try
	{
		var oCM = oProj.CodeModel;
		// look for global variable derived from CAtlModuleT
		var oVariables = oCM.Variables;
		for (var nCntr = 1; nCntr <= oVariables.Count; nCntr++)
		{
			var oVariable = oVariables(nCntr);
			var oType = oVariable.Type;
			var strTypeString = oType.TypeString;
			
			if (strTypeString == "CComModule" || strTypeString == "CAutoThreadModule")
				return true;
			
			var oCodeType = oType.CodeType;
			if (oCodeType && oCodeType.IsDerivedFrom("CAtlModuleT"))
				return true;
		}

		// check for [module] attribute
		if (oCM.Attributes.Find("module"))
			return true;

		if (!oProj.Object.Files("resource.h"))
			return false;
			
		// check for a module attribute applied to a class
		var oClasses = oCM.Classes;
		for (var nCntr = 1; nCntr <= oClasses.Count; nCntr++)
		{
			var oClass = oClasses(nCntr);
			if (oClass.Attributes.Find("module"))
				return true;
		}
		
		return false;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
Description: Returns the file name of per project type of files (RC, IDL, etc.)
      oProj: selected project
    strType: Type of file - STDAFX, RC, IDL, CPP, H, ODL, DEF
  bFullPath: Flag indicating whether to return the full path name.
       bMFC: if strtype == "CPP" or "H", indicates if the project is MFC-base,
             otherwise we assume ATL
******************************************************************************/
function GetProjectFile(oProj, strType, bFullPath, bMFC)
{
	try
	{
		var oFiles = oProj.Object.Files;
		var strFileName = "";

		switch (strType)
		{
			case "RC":
			case "IDL":
			case "ODL":
			case "DEF":
				for (var nCntr = 1; nCntr <= oFiles.Count; nCntr++)
				{
					var oFile = oFiles(nCntr);
					if (-1 != oFile.Name.toUpperCase().indexOf("." + strType))
					{
						if (false == oFile.FileConfigurations(1).ExcludedFromBuild)
						{
							strFileName = oFile.Name;
							break;
						}
					}
				}
				break;

			case "STDAFX":
				// look for name of precompiled header
				var strPrecompiledHeader = oProj.Object.Configurations(1).Tools("VCCLCompilerTool").PrecompiledHeaderThrough;
				if (strPrecompiledHeader.length)
					strFileName = strPrecompiledHeader;
				// if not found look for stdafx.h
				else
					strFileName = "stdafx.h";
				break;

			case "CPP":
			case "H":
				var oCM = oProj.CodeModel;
				if (bMFC)
				{
					var oClasses = oCM.Classes;
					for (var nCntr = 1; nCntr <= oClasses.Count; nCntr++)
					{
						// look for class derived from CWinApp
						if (oClasses(nCntr).IsDerivedFrom("CWinApp"))
						{
							if (strType == "H")
								strFileName = oClasses(nCntr).Location(vsCMWhereDefault);
							// strType == "CPP"
							else
							{
								var oVariables = oCM.Variables;
								for (var nCntr2 = 1; nCntr2 <= oVariables.Count; nCntr2++)
								{
									if (oVariables(nCntr2).TypeString == oClasses(nCntr).Name)
										strFileName = oVariables(nCntr2).Location(vsCMWhereDefault);
								}
							}
							break;
						}
					}
				}
				else
				{
					var oVarOrAttrib = false;
					// look for global variable derived from CAtlModuleT
					var oVariables = oCM.Variables;
					for (var nCntr = 1; nCntr <= oVariables.Count; nCntr++)
					{
						var strTypeString = oVariables(nCntr).TypeString;
						if (strTypeString == "CComModule" || strTypeString == "CAutoThreadModule")
							oVarOrAttrib = oVariables(nCntr);
						else
						{
							var oClass = oCM.Classes.Find(strTypeString)
							if (oClass)
							{
								if (oClass.IsDerivedFrom("CAtlModuleT"))
								{
									oVarOrAttrib = oVariables(nCntr);
									break;
								}
							}
						}
					}

					// check for [module] attribute
					if (!oVarOrAttrib)
						oVarOrAttrib = oCM.Attributes.Find("module");
			
					// check for a module attribute applied to a class
					if (!oVarOrAttrib)
					{
						var oClasses = oCM.Classes;
						for (var nCntr = 1; nCntr <= oClasses.Count; nCntr++)
						{
							var oClass = oClasses(nCntr);
							var oModule = oClass.Attributes.Find("module");
							if (oModule)
							{
								oVarOrAttrib = oModule;
								break;
							}
						}
					}

					if (oVarOrAttrib)
					{
						if (strType == "CPP")
							strFileName = oVarOrAttrib.Location(vsCMWhereDefault);
						// strType == "H"
						else
						{
							var strTemp = oVarOrAttrib.Location(vsCMWhereDefault);
							strFileName = strTemp.substring(0, strTemp.indexOf(".")) + ".h";
						}
					}
				}
				break;
		}

		// remove path
		if (-1 != strFileName.indexOf("\\"))
			strFileName = strFileName.substr(strFileName.lastIndexOf("\\") + 1);

		if (strFileName.length == 0 || !oFiles(strFileName))
		{
			if (strType == "STDAFX")
				return "";

			// try finding projectname.strType
			var strNewFileName = oProj.Name + "." + strType;
			if (strFileName != strNewFileName)
			{
				if (oFiles(strNewFileName))
					strFileName = strNewFileName;
				else
					return "";
			}
			else
				return "";
		}

		if (bFullPath)
			return oFiles(strFileName).FullPath;
		else
			return strFileName;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Called from the wizards html script when 'Finish' is clicked. This
              function in turn calls the wizard control's Finish().
    document: HTML document object
******************************************************************************/
function OnWizFinish(document)
{
	document.body.style.cursor='wait';
	try
	{
		window.external.Finish(document, "ok"); 
	}
	catch(e)
	{
		document.body.style.cursor='default';
		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number;
	}
}

/******************************************************************************
 Description: Converts an ATL project to attributed
******************************************************************************/
function ConvertProjectToAttributed()
{
	try
	{
		var oWizard;
		try
		{
			oWizard = wizard;
		}
		catch(e)
		{
			oWizard = window.external;
		}
		var oProj = oWizard.ProjectObject;
		var oCM = oProj.CodeModel;

		try
		{
			var L_TRANSACTION1_Text = "Convert Project To Attributed";
			oCM.StartTransaction(L_TRANSACTION1_Text);
			
			var strType;
			var bDLL = false;
			var typeDynamicLibrary = 2;
			if (typeDynamicLibrary == oProj.Object.Configurations(1).ConfigurationType)
			{
				bDLL = true;
				strType = "dll";
			}
			else
				bDLL = false;

			var bMFC = IsMFCProject(oProj, true);
			if (bMFC)
				 strType = "unspecified";

			if (!IsAttributedProject(oWizard))
			{
				var L_PART1_Text = "To insert an attributed object, your project must be converted to an attributed project.";
				var strPrompt = L_PART1_Text;
				if (bDLL && !bMFC)
				{
					var L_PART2_Text = "  All exported functions, including DllMain will be commented out.";
					strPrompt += L_PART2_Text;
				}
				var L_PART3_Text = "  Do you wish to continue?";
				strPrompt += L_PART3_Text;
				if (!oWizard.YesNoAlert(strPrompt))
					return false;
			}	
			else
				return true;

			if (!bMFC)
			{
				// look for global variable derived from CAtlModuleT
				var oVariables = oCM.Variables;
				for (var nCntr = 1; nCntr <= oVariables.Count; nCntr++)
				{
					var strTypeString = oVariables(nCntr).TypeString;
					if (strTypeString == "CComModule" || strTypeString == "CAutoThreadModule")
					{
						if (!bDLL)
						{
							if (strTypeString == "CServiceModule")
								strType = "service";
							else
								strType = "exe";
						}
						//Comment out global Module
						oCM.Remove(oVariables(nCntr).Name);
						break;
					}
					else
					{
						var oClass = oCM.Classes.Find(strTypeString)
						if (oClass)
						{
							if (oClass.IsDerivedFrom("CAtlModuleT"))
							{
								var oModule = oVariables(nCntr);
								if (!bDLL)
								{
									if (oClass.IsDerivedFrom("CAtlServiceModuleT"))
										strType = "service";
									else
										strType = "exe";
								}

								//Comment out class
								oCM.Remove(oClass.Name);

								//Comment out global Module
								oCM.Remove(oModule.Name);
								break;
							}
						}
					}
				}

				if (bDLL)
				{
					// delete DEF file
					var strDefFile = GetProjectFile(oProj, "DEF", false);
					if (strDefFile.length)
					{
						var oFile = oProj.Object.Files(strDefFile);
						oProj.Object.RemoveFile(oFile);
					}
					// Comment out exported functions
					oCM.Remove("DllMain");
					oCM.Remove("DllCanUnloadNow");
					oCM.Remove("DllGetClassObject");
					oCM.Remove("DllRegisterServer");
					oCM.Remove("DllUnregisterServer");

				}
				else
				{
					// Comment out WinMain
					oCM.Remove("_tWinMain");
				}
			}

			// Add module attribute to projectname.cpp
			// [ module(dll, uuid = "{406877CF-6568-11D3-BC62-00C04F990181}", name = "ATLFOO", helpstring = "atlfoo 1.0 Type Library") ];

			var strProjectCPP = GetProjectFile(oProj, "CPP");
			var oAttribute = oCM.AddAttribute("module", strProjectCPP, strType, vsCMAddPositionEnd);
			if (oCM.IDLLibraries.Count)
			{
				var oUUID = oCM.IDLLibraries(1).Attributes.Find("uuid");
				if (oUUID)
				{
					var strUUID = oUUID.Value;
					oAttribute.AddParameter("uuid", '"{' + strUUID + '}"', vsCMAddPositionEnd);
				}
				if (strType == "service")
					oAttribute.AddParameter("resource_name", '"IDS_SERVICENAME"', vsCMAddPositionEnd);
				var oHelpString = oCM.IDLLibraries(1).Attributes.Find("helpstring");
				if (oHelpString)
				{
					var strHelpString = oHelpString.Value;
					oAttribute.AddParameter("helpstring", strHelpString, vsCMAddPositionEnd);
				}
			}
			oAttribute.AddParameter("name", '"' + CreateSafeName(oProj.Name) + 'Lib"', vsCMAddPositionEnd);

			var strProjectIDL = GetProjectFile(oProj, "IDL");
			// Add to the end of stdafx.h - [ importidl(projectname.idl) ];
			if (strProjectIDL.length)
				oAttribute = oCM.AddAttribute("importidl", GetProjectFile(oProj, "STDAFX"), strProjectIDL, vsCMAddPositionEnd);

			// add _ATL_ATTRIBUTES
			var nTotal = oProj.Object.Configurations.Count;
			for (var nCntr = 1; nCntr <= nTotal; nCntr++)
			{
				var oConfig = oProj.Object.Configurations(nCntr);
				var VCCLTool = oConfig.Tools("VCCLCompilerTool");
				if (-1 == VCCLTool.PreprocessorDefinitions.search("_ATL_ATTRIBUTES"))
					VCCLTool.PreprocessorDefinitions += ";_ATL_ATTRIBUTES";

				// add /idlout:_projectname.idl
				var LinkTool = oConfig.Tools("VCLinkerTool");
				LinkTool.MergedIDLBaseFileName = "_" + strProjectIDL;
				if (bDLL && !bMFC)
					LinkTool.ModuleDefinitionFile = "";
			}

			// comment out: 1 TYPELIB "projectname.tlb"
			if (strProjectIDL.length)
			{
				var strProjectRC = GetProjectFile(oProj, "RC", true);
				var oResHelper = oWizard.ResourceHelper;
				oResHelper.OpenResourceFile(strProjectRC);
				var strCompDir = oResHelper.CompileDirectives;
				var nPos = strCompDir.indexOf(" TYPELIB ");
				while (nPos != -1)
				{
					strCompDir = strCompDir.substr(0, nPos-1) + "// " + strCompDir.substr(nPos-1);
					nPos = strCompDir.indexOf(" TYPELIB ", nPos+9);
				}

				oResHelper.CompileDirectives = strCompDir;
				oResHelper.CloseResourceFile();
			}

			oCM.CommitTransaction();
			return true;
		}
		catch(e)
		{   
			var L_ErrMsg13_Text = "Error in ConvertProjectToAttributed: ";
			oWizard.ReportError(L_ErrMsg13_Text + e.description);

			oCM.AbortTransaction();
			return false;
		}
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Returns the type of interface (e.g. custom, dual, dispinterface, 
              oleautomation)
  oInterface: VCCodeInterface object
******************************************************************************/
function GetInterfaceType(oInterface)
{
	try
	{
		if (-1 != oInterface.DeclarationText.search("dispinterface " + oInterface.Name))
			return "dispinterface";

		var oAttributes = oInterface.Attributes;
		for (var nCntr = 1; nCntr <= oAttributes.Count; nCntr++)
		{
			if (oAttributes(nCntr).Name == "dual")
				return "dual";
			else if (oAttributes(nCntr).Name == "oleautomation")
				return "oleautomation";
			else if (oAttributes(nCntr).Name == "dispinterface")
				return "dispinterface";
		}
		return "custom";
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Returns the VCCodeClass objects associated with an interface
strInterface: Name of interface
    oProject: Selected project
  aryClasses: Array of class objects (out param)
******************************************************************************/
function GetInterfaceClasses(strInterface, oProject, aryClasses)
{
	try
	{
		var oCM = oProject.CodeModel;

		var strIID;
		if (strInterface.charAt(0) == '_')
			strIID = "IID" + strInterface;
		else
			strIID = "IID_" + strInterface;

		var nIndex = 0;
		var oClasses = oCM.Classes;
		var bMFC = false;
		var bATL = false;
		for (var nCntr = 1; nCntr <= oClasses.Count; nCntr++)
		{
			var oClass = oClasses(nCntr);

			if (!bMFC)
			{
				if (oClass.IsDerivedFrom(strInterface))
				{
					aryClasses[nIndex] = oClass;
					nIndex++;
					bATL = true;
				}
				else if (oClass.IsDerivedFrom("CStockPropImpl"))
				{
					var oBases = oClass.Bases;
					var strCompare = "CStockPropImpl<" + oClass.Name + "," + strInterface + ">";
					for (var nCntr2 = 1; nCntr2 <= oBases.Count; nCntr2++)
					{
						var strBaseName = oBases(nCntr2).DisplayName;
						if (strCompare == strBaseName.substring(0, strCompare.length))
						{
							aryClasses[nIndex] = oClass;
							nIndex++;
							bATL = true;
							break;
						}
					}
				}
				else if (oClass.IsDerivedFrom("IDispatchImpl"))
				{
					var oBases = oClass.Bases;
					var strCompare = "IDispatchImpl<" + strInterface + ",";
					for (var nCntr2 = 1; nCntr2 <= oBases.Count; nCntr2++)
					{
						var strBaseName = oBases(nCntr2).DisplayName;
						if (strCompare == strBaseName.substring(0, strCompare.length))
						{
							aryClasses[nIndex] = oClass;
							nIndex++;
							bATL = true;
							break;
						}
					}
				}
			}
			if (!bATL)
			{
				if (oClass.IsDerivedFrom("COleControl"))
				{
					// look for IID_Interface in InitializeIIDs call in constructor.
					oConstructor = oClass.Functions.Find(oClass.Name);
					if (!oConstructor)
						continue;

					var strBody = oConstructor.BodyText;
					if (-1 != strBody.indexOf("&" + strIID + ",") ||
						-1 != strBody.indexOf("&" + strIID + ")"))
					{
						aryClasses[nIndex] = oClass;
						nIndex++;
						bMFC = true;
					}
				}
				else if (oClass.IsDerivedFrom("CCmdTarget"))
				{
					// look for IID_Interface in INTERFACE MAP.
					var oMap = oClass.Maps.Find("INTERFACE");
					if (oMap)
					{
						var oMapItems = oMap.Entries;
						var bFound = false;
						for (var nCntr2 = 1; nCntr2 <= oMapItems.Count; nCntr2++)
						{
							var oMapItem = oMapItems(nCntr2);
							var oParams = oMapItem.Parameters;
							for (var nCntr3 = 1; nCntr3 <= oParams.Count; nCntr3++)
							{
								if (-1 != oParams(nCntr3).Name.indexOf(strIID))
								{
									aryClasses[nIndex] = oClass;
									nIndex++;
									bFound = true;
									bMFC = true;
									break;
								}
							}
							if (bFound)
								break;
						}
					}
				}
			}
		}
		if (aryClasses.length)
			return true;
		else
			return false;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Adds ATL support to an MFC project
       oProj: Selected project
******************************************************************************/
function AddATLSupportToProject(oProj)
{
	try
	{
		var L_ATLSupportQuestion_Text = "ATL support will be added to this project.  Do you wish to continue?";
		if (!wizard.YesNoAlert(L_ATLSupportQuestion_Text))
			return false;

		var strProjectName		= wizard.FindSymbol("PROJECT_NAME");
		var strSafeProjectName	= CreateSafeName(strProjectName);
		var strProjectPath		= wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath		= wizard.FindSymbol("TEMPLATES_PATH");
		if (-1 == strTemplatePath.toUpperCase().indexOf("ADDTOMFC"))
			strTemplatePath = wizard.FindSymbol("PROJECT_TEMPLATE_PATH") + "\\ClassWiz\\ATL\\AddToMFC\\Templates\\" + wizard.GetHostLocale();
		wizard.AddSymbol("SAFE_PROJECT_NAME", strSafeProjectName);

		var oCM = oProj.CodeModel;
		
		var strProjectCPP		= GetProjectFile(oProj, "CPP", false, true);
		var strProjectH			= GetProjectFile(oProj, "H", false, true);
		var strProjectRC		= GetProjectFile(oProj, "RC", true, true);
		var strProjectODL		= GetProjectFile(oProj, "ODL", false, true);
		var strProjectIDL		= GetProjectFile(oProj, "IDL", false, true);
		var strSTDAFX			= GetProjectFile(oProj, "STDAFX", false, true);

		var bDLL;
		if (typeDynamicLibrary == oProj.Object.Configurations(1).ConfigurationType)
			bDLL = true;
		else
			bDLL = false;

		wizard.AddSymbol("DLL_APP", bDLL);
		
		// Create necessary GUIDS
		// create LIBID GUID
		var strRawGUID = wizard.CreateGuid();
		var strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
		wizard.AddSymbol("LIBID_REGISTRY_FORMAT", strFormattedGUID);

		// create APPID GUID
		strRawGUID = wizard.CreateGuid();
		var strAppID = wizard.FormatGuid(strRawGUID, 0);
		wizard.AddSymbol("APPID_REGISTRY_FORMAT", strAppID);

		// check for IDL or ODL file
		var oFiles = oProj.Object.Files;
		// if ODL file found, convert to IDL
		if (strProjectODL.length)
		{
			var oFile = oFiles(strProjectODL);

			strProjectODL = oFile.FullPath;
			oProj.Object.RemoveFile(oFile);
			strProjectIDL = strProjectODL.substr(0, strProjectODL.length-4) + ".idl";

			var oFSO = new ActiveXObject("Scripting.FileSystemObject");
			oFSO.MoveFile(strProjectODL, strProjectIDL);
			oProj.Object.AddFile(strProjectIDL);
		}
		
		var bNewIDL = false;
		// if no IDL, render template
		if (0 == strProjectIDL.length)
		{
			strProjectIDL = strProjectPath + strSafeProjectName + ".idl";
			wizard.RenderTemplate(strTemplatePath + "\\addatl.idl", strProjectIDL);
			oProj.Object.AddFile(strProjectIDL);
			bNewIDL = true;
			oCM.Synchronize();
		}
		else
		{
			oCM.AddIDLImport('"oaidl.idl"', strProjectIDL, vsCMAddPositionStart);
			oCM.AddIDLImport('"ocidl.idl"', strProjectIDL, vsCMAddPositionStart);
		}

		// MIDL settings
		var strMidlHeader = "$(ProjectName)_i.h";
		var strMidlCFile = "$(ProjectName)_i.c";
		var oConfigs = oProj.Object.Configurations;
		for (var nCntr=1; nCntr <= oConfigs.Count; nCntr++)
		{
			var config = oConfigs(nCntr);
			config.UseOfATL = useATLStatic;
			var bDebug = false;
			if (-1 != config.Name.toUpperCase().indexOf("DEBUG"))
				bDebug = true;
			var MidlTool = config.Tools("VCMidlTool");
			MidlTool.MkTypLibCompatible = false;
			if (IsPlatformWin32(config))
				MidlTool.TargetEnvironment = midlTargetWin32;
			if (bDebug)
				MidlTool.PreprocessorDefinitions = "_DEBUG";
			else
				MidlTool.PreprocessorDefinitions = "NDEBUG";

			if (bNewIDL)
			{
				MidlTool.HeaderFileName = strMidlHeader;
				MidlTool.InterfaceIdentifierFileName = strMidlCFile;
			}
			else
			{
				if (MidlTool.HeaderFileName.length && MidlTool.HeaderFileName.charAt(0) != "$")
					strMidlHeader = MidlTool.HeaderFileName;
				else
					MidlTool.HeaderFileName = strMidlHeader;

				if (MidlTool.InterfaceIdentifierFileName.length && MidlTool.InterfaceIdentifierFileName.charAt(0) != "$")
					strMidlCFile = MidlTool.InterfaceIdentifierFileName
				else
					MidlTool.InterfaceIdentifierFileName = strMidlCFile;
			}
			strMidlHeader = config.Evaluate(strMidlHeader);
			strMidlCFile = config.Evaluate(strMidlCFile);
			
			MidlTool.GenerateStublessProxies = true;
			MidlTool.TypeLibraryName = "$(IntDir)/" + "$(ProjectName).tlb";

			// remove .DEF file from linker settings
			if (bDLL)
			{
				var LinkTool = config.Tools("VCLinkerTool");
				LinkTool.ModuleDefinitionFile = "";
			}

			// Resource settings
			var RCTool = config.Tools("VCResourceCompilerTool");
			RCTool.AdditionalIncludeDirectories = "$(IntDir)";

			var PostBuildTool = config.Tools("VCPostBuildEventTool");
			if (!PostBuildTool.CommandLine.length)
			{
				var L_PerformingRegistration1_Text = "Performing registration";
				PostBuildTool.Description = L_PerformingRegistration1_Text;
				if (bDLL)
					PostBuildTool.CommandLine = "regsvr32 /s /c \"$(TargetPath)\"";
				else
					PostBuildTool.CommandLine = "\"$(TargetPath)\" /RegServer";
			}
		}
		
		// Add #include <initguid.h> to strProjectName.cpp
		if (!DoesIncludeExist(oProj, "<initguid.h>", strProjectCPP))
			oCM.AddInclude("<initguid.h>", strProjectCPP, vsCMAddPositionEnd);

		// Add #include "projectname_i.h" to strProjectName.h
		if (!DoesIncludeExist(oProj, '"' + strMidlHeader + '"', strProjectH))
			oCM.AddInclude('"' + strMidlHeader + '"', strProjectH, vsCMAddPositionEnd);

		// Add #include "projectname_i.c" to strProjectName.cpp
		if (!DoesIncludeExist(oProj, '"' + strMidlCFile + '"', strProjectCPP))
			oCM.AddInclude('"' + strMidlCFile + '"', strProjectCPP, vsCMAddPositionEnd);

		// add RGS file resource
		var strRGSFile = strProjectName + ".rgs";
		var strRGSID = "IDR_" + strSafeProjectName.toUpperCase();
		wizard.RenderTemplate(strTemplatePath + "\\addatl.rgs", strProjectPath + strRGSFile);

		var oResHelper = wizard.ResourceHelper;
		oResHelper.OpenResourceFile(strProjectRC);
		oResHelper.AddResource(strRGSID, strProjectPath + strRGSFile, "REGISTRY");

		// add TYPELIB if necessary
		if (bNewIDL)
			oResHelper.CompileDirectives += '\r\n1 TYPELIB "' + strProjectName + '.tlb"';

		oResHelper.CloseResourceFile();

		oCM.AddMacro("_ATL_APARTMENT_THREADED", strSTDAFX, "", vsCMAddPositionStart);

		// add #includes to stdafx.h
		if (!DoesIncludeExist(oProj, "<atlbase.h>", strSTDAFX))
			oCM.AddInclude("<atlbase.h>", strSTDAFX, vsCMAddPositionEnd);
		if (!DoesIncludeExist(oProj, "<atlcom.h>", strSTDAFX))
			oCM.AddInclude("<atlcom.h>", strSTDAFX, vsCMAddPositionEnd);

		// render addatlps.def
		wizard.RenderTemplate(strTemplatePath + "\\addatlps.def", strProjectPath + strProjectName + "ps.def");

		// render addatlps.mk
		wizard.RenderTemplate(strTemplatePath + "\\addatlps.mk", strProjectPath + strProjectName + "ps.mk");

		var oClasses = oCM.Classes;
		var oInitInstance = false;
		var oCWinApp = false;
		for (var nCntr = 1; nCntr <= oClasses.Count; nCntr++)
		{
			oClass = oClasses(nCntr);
			// look for class derived from CWinApp
			if (oClass.IsDerivedFrom("CWinApp"))
			{				
				oInitInstance = oClass.Functions.Find("InitInstance");
				if (!oInitInstance)
				{
					oInitInstance = oClass.AddFunction("InitInstance", vsCMFunctionFunction, "BOOL", vsCMAddPositionEnd, vsCMAccessPublic, strProjectCPP);
					oInitInstance.BodyText = GetCodeForInitInstance(0, 1);
					oInitInstance.Comment = oClass.Name + " initialization";
				}
				oCWinApp = oClass;
				break;
			}
		}

		if (bDLL)
		{
			var oDllCanUnloadNow = GetMemberFunction(false, "DllCanUnloadNow", oProj);
			if (!oDllCanUnloadNow)
			{
				oDllCanUnloadNow = oCM.AddFunction("DllCanUnloadNow", strProjectCPP, vsCMFunctionFunction, "STDAPI", vsCMAddPositionEnd);
				oDllCanUnloadNow.BodyText = GetCodeForDllCanUnloadNow(0, 3);
				oDllCanUnloadNow.Comment = "DllCanUnloadNow - Allows COM to unload DLL";
			}
			else
			{
				oDllCanUnloadNow.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint().Insert(GetCodeForDllCanUnloadNow(1, 2));
				oCM.Synchronize();
			}

			var oDllGetClassObject = GetMemberFunction(false, "DllGetClassObject", oProj);
			if (!oDllGetClassObject)
			{
				oDllGetClassObject = oCM.AddFunction("DllGetClassObject(REFCLSID rclsid, REFIID riid, LPVOID* ppv)", strProjectCPP, vsCMFunctionFunction, "STDAPI", vsCMAddPositionEnd, vsCMAccessPublic);
				oDllGetClassObject.BodyText = GetCodeForDllGetClassObject(0, 3);
				oDllGetClassObject.Comment = "DllGetClassObject - Returns class factory";
			}
			else
			{
				oDllGetClassObject.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint().Insert(GetCodeForDllGetClassObject(1, 2));
				oCM.Synchronize();
			}

			var oDllRegisterServer = GetMemberFunction(false, "DllRegisterServer", oProj);
			if (!oDllRegisterServer)
			{
				oDllRegisterServer = oCM.AddFunction("DllRegisterServer", strProjectCPP, vsCMFunctionFunction, "STDAPI", vsCMAddPositionEnd, vsCMAccessPublic);
				oDllRegisterServer.BodyText = GetCodeForDllRegisterServer(0, 7);
				oDllRegisterServer.Comment = "DllRegisterServer - Adds entries to the system registry";
			}
			else
			{
				oDllRegisterServer.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint().Insert(GetCodeForDllRegisterServer(1, 4));
				oCM.Synchronize();
			}

			var oDllUnregisterServer = GetMemberFunction(false, "DllUnregisterServer", oProj);
			if (!oDllUnregisterServer)
			{
				oDllUnregisterServer = oCM.AddFunction("DllUnregisterServer", strProjectCPP, vsCMFunctionFunction, "STDAPI", vsCMAddPositionEnd, vsCMAccessPublic);
				oDllUnregisterServer.BodyText = GetCodeForDllUnregisterServer(0, 7);
				oDllUnregisterServer.Comment = "DllUnregisterServer - Removes entries from the system registry";
			}
			else
			{
				oDllUnregisterServer.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint().Insert(GetCodeForDllUnregisterServer(1, 4));
				oCM.Synchronize();
			}

			// add #pragmas for exporting functions
			oDllCanUnloadNow.StartPoint.Insert(GetExportPragmas() + "\r\n");
			oCM.Synchronize();

			// delete DEF file
			var strDefFile = GetProjectFile(oProj, "DEF", false);
			if (strDefFile.length)
			{
				var oFile = oProj.Object.Files(strDefFile);
				oProj.Object.RemoveFile(oFile);
			}
				
			if (-1 == oInitInstance.BodyText.indexOf("COleControlModule::InitInstance") &&
				-1 == oInitInstance.BodyText.indexOf("COleObjectFactory::RegisterAll"))
			{
				oInitInstance.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint().Insert("\tCOleObjectFactory::RegisterAll();\r\n");
				oCM.Synchronize();
			}
		}
		// EXE case
		else
		{
			if (oCWinApp)
			{
				var oExitInstance = GetMemberFunction(oCWinApp, "ExitInstance", oProj);
				if (!oExitInstance)
				{
					oExitInstance = oCWinApp.AddFunction("ExitInstance", vsCMFunctionFunction, "BOOL", vsCMAddPositionEnd, vsCMAccessPublic, strProjectCPP);
					oExitInstance.BodyText = GetCodeForExitInstance(0, 1);
				}
				else
				{
					oExitInstance.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint().Insert(GetCodeForExitInstance(0, 0));
					oCM.Synchronize();
				}

				var strBody = oInitInstance.BodyText;
				if (-1 == strBody.search("AfxOleInit") &&
					-1 == strBody.search("OleInitialize") &&
					-1 == strBody.search("CoInitialize") &&
					-1 == strBody.search("CoInitializeEx"))
				{
					var oEditPoint = oInitInstance.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint().Insert(GetCodeForInitInstance(2, 2));
					oCM.Synchronize();
				}			
				// look for ParseCommandLine(cmdInfo)
				var nPos = strBody.indexOf("ParseCommandLine(cmdInfo)");
				if (-1 == nPos)
				{
					if (!InsertIntoFunction(oInitInstance, "AfxEnableControlContainer", 3, 29, false))
						if (!InsertIntoFunction(oInitInstance, "AfxOleInit", 3, 29, false))
							if (!InsertIntoFunction(oInitInstance, "OleInitialize", 3, 29, false))
								if (!InsertIntoFunction(oInitInstance, "CoInitialize", 3, 29, false))
									if (!InsertIntoFunction(oInitInstance, "CoInitializeEx", 3, 29, false))
									throw "Parsing error: COM initialization function not found.";
				}
				else
				{
					// look for cmdInfo.m_bRunAutomated or RunAutomated
					if (-1 == strBody.indexOf("cmdInfo.m_bRunAutomated") &&
						-1 == strBody.indexOf("RunAutomated()"))
					{
						// no cmdInfo.m_bRunAutomated
						InsertIntoFunction(oInitInstance, "ParseCommandLine(cmdInfo)", 6, 29, false);
					}
					else
					{
						// insert CoRegisterClassObject code
						InsertIntoFunction(oInitInstance, "ParseCommandLine(cmdInfo)", 6, 8, false);

						// look for "== CCommandLineInfo::AppUnregister"
						if (!InsertIntoFunction(oInitInstance, "== CCommandLineInfo::AppUnregister", 19, 20, true))
						{
							if (!InsertIntoFunction(oInitInstance, "cmdInfo.m_bRunAutomated", 16, 29, false))
								InsertIntoFunction(oInitInstance, "RunAutomated()", 16, 29, false);
						}
						else
						{
							if (!InsertIntoFunction(oInitInstance, "COleObjectFactory::UpdateRegistryAll()", 26, 27, false))
								if (!InsertIntoFunction(oInitInstance, "UpdateRegistry(OAT_INPLACE_SERVER)", 26, 27, false))
									InsertIntoFunction(oInitInstance, "UpdateRegistry(OAT_DOC_OBJECT_SERVER)", 26, 27, false);
						}
					}
				}
			}			
		}

		var oAtlModule = oCM.AddClass("C" + strSafeProjectName + "Module", strProjectCPP, vsCMAddPositionStart, "CAtlMfcModule", "", vsCMAccessPublic);
		var strBody = "public:\r\n";
		strBody += "\tDECLARE_LIBID(LIBID_" + oCM.IDLLibraries(1).Name + ");\r\n";
		strBody += "\tDECLARE_REGISTRY_APPID_RESOURCEID(" + strRGSID + ', "{' + strAppID + '}");';
		oAtlModule.BodyText = strBody;
		// Add global _AtlModule to project.cpp
		oAtlModule.EndPoint.CreateEditPoint().Insert("\r\n\r\nC" + strSafeProjectName + "Module _AtlModule;\r\n");
		oCM.Synchronize();

		return true;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Returns a Function object based on the given name
      oClass: Class object
 strFuncName: Name of the function
       oProj: Selected project
******************************************************************************/
function GetMemberFunction(oClass, strFuncName, oProj)
{
	try
	{
		var oFunctions;
		if (oClass)
			oFunctions = oClass.Functions;
		else
		{
			if (!oProj)
				return false;
			oFunctions = oProj.CodeModel.Functions;
		}

		for (var nCntr = 1; nCntr <= oFunctions.Count; nCntr++)
		{
			if (oFunctions(nCntr).Name == strFuncName)
				return oFunctions(nCntr);
		}
		return false;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Helper function to get the text for ExitInstance()
  nLineStart: Function's start line number
    nLineEnd: Function's end line number
******************************************************************************/
function GetCodeForExitInstance(nLineStart, nLineEnd)
{
	try
	{
		var strCode = new Array();

		strCode[0] = "_AtlModule.RevokeClassObjects();";
		strCode[1] = "return CWinApp::ExitInstance();";

		var strRet = "";
		for (var nCntr = nLineStart; nCntr <= nLineEnd; nCntr++)
			strRet += "\t" + strCode[nCntr] + "\r\n";
		return strRet;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Helper function to get the text for InitInstance()
  nLineStart: Function's start line number
    nLineEnd: Function's end line number
******************************************************************************/
function GetCodeForInitInstance(nLineStart, nLineEnd)
{
	try
	{
		var strCode = new Array();

		strCode[0] = "CWinApp::InitInstance();";
		strCode[1] = "return TRUE;";

		strCode[2] = "AfxOleInit();";

		strCode[3] = "// Parse command line for standard shell commands, DDE, file open";
		strCode[4] = "CCommandLineInfo cmdInfo;";
		strCode[5] = "ParseCommandLine(cmdInfo);";

		strCode[6] = "// Register class factories via CoRegisterClassObject().";
		strCode[7] = "if (FAILED(_AtlModule.RegisterClassObjects(CLSCTX_LOCAL_SERVER, REGCLS_MULTIPLEUSE)))";
		strCode[8] = "\treturn FALSE;";
		strCode[9] = "// App was launched with /Embedding or /Automation switch.";
		strCode[10] = "// Run app as automation server.";
		strCode[11] = "if (cmdInfo.m_bRunEmbedded || cmdInfo.m_bRunAutomated)";
		strCode[12] = "{";
		strCode[13] = "\t// Don't show the main window";
		strCode[14] = "\treturn TRUE;";
		strCode[15] = "}";

		strCode[16] = "// App was launched with /Unregserver or /Unregister switch.";
		strCode[17] = "if (cmdInfo.m_nShellCommand == CCommandLineInfo::AppUnregister)";
		strCode[18] = "{";
		strCode[19] = "\t_AtlModule.UpdateRegistryAppId(FALSE);";
		strCode[20] = "\t_AtlModule.UnregisterServer(TRUE);";
		strCode[21] = "\treturn FALSE;";
		strCode[22] = "}";

		strCode[23] = "// App was launched with /Register or /Regserver switch.";
		strCode[24] = "if (cmdInfo.m_nShellCommand == CCommandLineInfo::AppRegister)";
		strCode[25] = "{";
		strCode[26] = "\t_AtlModule.UpdateRegistryAppId(TRUE);";
		strCode[27] = "\t_AtlModule.RegisterServer(TRUE);";
		strCode[28] = "\treturn FALSE;";
		strCode[29] = "}";

		var strRet = "";
		for (var nCntr = nLineStart; nCntr <= nLineEnd; nCntr++)
			strRet += "\t" + strCode[nCntr] + "\r\n";
		return strRet;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Helper function used by InsertIntoFunction to convert an index in
			  a function body to a line number.
   strString: Function body
        nPos: Position to convert
******************************************************************************/
function OffsetToLineNumber(strString, nPos)
{
	try
	{
		var nCurPos = strString.indexOf("\r\n");
		var nLine = 1;
		while (nCurPos != -1 && nCurPos < nPos)
		{
			nLine++;
			nCurPos = strString.indexOf("\r\n", nCurPos+2);
		}
		return nLine;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
     Description: Helper function used by InsertIntoFunction to determine if a
				  line begins with a particular string
         strBody: Body of function
 strSearchString: String to look for
       nStartPos: Starting position for search
******************************************************************************/
function LineBeginsWith(strBody, strSearchString, nStartPos)
{
	try
	{
		// go to start of line
		var nPos = strBody.lastIndexOf("\n", nStartPos) + 1;
		if (nPos == -1)
			nPos = 0;
		// walk to first char
		while (strBody.charAt(nPos) == " " || strBody.charAt(nPos) == "\t")
			nPos++;
		if (strBody.substr(nPos, strSearchString.length) == strSearchString)
		{
			return true;
		}
		else
			return false;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
     Description: Helper function used by AddATLSupportToProject to insert
				  code into InitInstance.
       oFunction: Function object to insert into
 strSearchString: String to look for to determine insertion point
      nStartLine: Starting line to pass to GetCodeForInitInstance
        nEndLine: Ending line to pass to GetCodeForInitInstance
  bInsideIfBlock: Boolean indicating whether to insert inside if block
******************************************************************************/
function InsertIntoFunction(oFunction, strSearchString, nStartLine, nEndLine, bInsideIfBlock)
{
	try
	{
		var strBody = oFunction.BodyText;
		var nCurPos = strBody.indexOf(strSearchString);
		if (-1 == nCurPos)
			return false;

		if (LineBeginsWith(strBody, "if", nCurPos) || LineBeginsWith(strBody, "else", nCurPos))
		{
			var nEndOfNextLine = strBody.indexOf("\r\n", nCurPos) + 2;
			nEndOfNextLine = strBody.indexOf("\r\n", nEndOfNextLine);

			// look for "{" on current line and next line
			var nPos = strBody.indexOf("{", nCurPos);
			if (nPos != -1 && nPos < nEndOfNextLine)
			{
				if (bInsideIfBlock)
					nCurPos = nPos;
				else
					nCurPos = strBody.indexOf("}", nPos);
			}
			else
				nCurPos = strBody.indexOf("\r\n", nCurPos) + 2;
		}

		var oEditPoint = oFunction.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint();
		oEditPoint.LineDown(OffsetToLineNumber(strBody, nCurPos));
		oEditPoint.Insert(GetCodeForInitInstance(nStartLine, nEndLine));

		return true;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Returns implementation lines for DllCanUnloadNow
  nLineStart: Starting line
    nLineEnd: Ending line
******************************************************************************/
function GetCodeForDllCanUnloadNow(nLineStart, nLineEnd)
{
	try
	{
		var strCode = new Array();

		strCode[0] = "AFX_MANAGE_STATE(AfxGetStaticModuleState());";
		strCode[1] = "if (_AtlModule.GetLockCount() > 0)";
		strCode[2] = "\treturn S_FALSE;";
		strCode[3] = "return S_OK;";

		var strRet = "";
		for (var nCntr = nLineStart; nCntr <= nLineEnd; nCntr++)
			strRet += "\t" + strCode[nCntr] + "\r\n";
		return strRet;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Returns implementation lines for DllGetClassObject
  nLineStart: Starting line
    nLineEnd: Ending line
******************************************************************************/
function GetCodeForDllGetClassObject(nLineStart, nLineEnd)
{
	try
	{
		var strCode = new Array();

		strCode[0] = "AFX_MANAGE_STATE(AfxGetStaticModuleState());";
		strCode[1] = "if (S_OK == _AtlModule.GetClassObject(rclsid, riid, ppv))";
		strCode[2] = "\treturn S_OK;";
		strCode[3] = "return AfxDllGetClassObject(rclsid, riid, ppv);";

		var strRet = "";
		for (var nCntr = nLineStart; nCntr <= nLineEnd; nCntr++)
			strRet += "\t" + strCode[nCntr] + "\r\n";
		return strRet;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Returns implementation lines for DllRegisterServer
  nLineStart: Starting line
    nLineEnd: Ending line
******************************************************************************/
function GetCodeForDllRegisterServer(nLineStart, nLineEnd)
{
	try
	{
		var strCode = new Array();

		strCode[0] = "AFX_MANAGE_STATE(AfxGetStaticModuleState());";
		strCode[1] = "_AtlModule.UpdateRegistryAppId(TRUE);";
		strCode[2] = "HRESULT hRes = _AtlModule.RegisterServer(TRUE);";
		strCode[3] = "if (hRes != S_OK)";
		strCode[4] = "\treturn hRes;";
		strCode[5] = "if (!COleObjectFactory::UpdateRegistryAll(TRUE))";
		strCode[6] = "\treturn ResultFromScode(SELFREG_E_CLASS);";
		strCode[7] = "return S_OK;";

		var strRet = "";
		for (var nCntr = nLineStart; nCntr <= nLineEnd; nCntr++)
			strRet += "\t" + strCode[nCntr] + "\r\n";
		return strRet;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Returns implementation lines for DllUnregisterServer
  nLineStart: Starting line
    nLineEnd: Ending line
******************************************************************************/
function GetCodeForDllUnregisterServer(nLineStart, nLineEnd)
{
	try
	{
		var strCode = new Array();

		strCode[0] = "AFX_MANAGE_STATE(AfxGetStaticModuleState());";
		strCode[1] = "_AtlModule.UpdateRegistryAppId(FALSE);";
		strCode[2] = "HRESULT hRes = _AtlModule.UnregisterServer(TRUE);";
		strCode[3] = "if (hRes != S_OK)";
		strCode[4] = "\treturn hRes;";
		strCode[5] = "if (!COleObjectFactory::UpdateRegistryAll(FALSE))";
		strCode[6] = "\treturn ResultFromScode(SELFREG_E_CLASS);";
		strCode[7] = "return S_OK;";

		var strRet = "";
		for (var nCntr = nLineStart; nCntr <= nLineEnd; nCntr++)
			strRet += "\t" + strCode[nCntr] + "\r\n";
		return strRet;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
 Description: Returns "#pragma comment(linker...)" for exporting required COM
			  DLL functions.
******************************************************************************/
function GetExportPragmas()
{
	try
	{
		var strCode = new Array();

		strCode[0] = '#pragma comment(linker, "/EXPORT:DllCanUnloadNow=_DllCanUnloadNow@0,PRIVATE")';
		strCode[1] = '#pragma comment(linker, "/EXPORT:DllGetClassObject=_DllGetClassObject@12,PRIVATE")';
		strCode[2] = '#pragma comment(linker, "/EXPORT:DllRegisterServer=_DllRegisterServer@0,PRIVATE")';
		strCode[3] = '#pragma comment(linker, "/EXPORT:DllUnregisterServer=_DllUnregisterServer@0,PRIVATE")';

		var strRet = "";
		for (var nCntr = 0; nCntr < strCode.length; nCntr++)
			strRet += strCode[nCntr] + "\r\n";
		return strRet;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
    Description: This function is called by the wizard to verify if the project
	             is compatible with the Code Wizard that's about to be run.  The
				 wizard knows to call this function when it sees the param 
				 PREPROCESS_FUNCTION in VC7\VCAddClass\XXX.VSZ
          oProj: Selected project
        oObject: Select object (in this case it will be the project)
******************************************************************************/
function CanAddMFCClass(oProj, oObject)
{
	try
	{
		if (!IsMFCProject(oProj, false))
		{
			var L_CanAddMFCClass_Text = "MFC classes can only be added to MFC projects.";
			wizard.ReportError(L_CanAddMFCClass_Text);
			return false;
		}
		return true;
	}
	catch(e)
	{   
		throw e;
	}
}

/******************************************************************************
    Description: This function is called by the wizard to verify if the VC 
	             Code Model is available.  The wizard knows to call this function 
				 when it sees the param PREPROCESS_FUNCTION in VC7\VCAddClass\XXX.VSZ
		  oProj: Selected project
        oObject: Select object (in this case it will be the project)
******************************************************************************/
function CanAddClass(oProj, oObject)
{
	try
	{
		var oCM = oProj.CodeModel;
		return true;
	}
	catch(e)
	{
		L_CanAddClass_Text = "Code Model not available, cannot add class.";
		wizard.ReportError(L_CanAddClass_Text);
		return false;
	}
}

/******************************************************************************
   Description: This function is called by the wizard to verify if the project
                is compatible with the Code Wizard that's about to be run.  The
                wizard knows to call this function when it sees the param 
                PREPROCESS_FUNCTION in VC7\VCAddClass\XXX.VSZ
         oProj: Selected project
       oObject: Select object (in this case it will be the project)
******************************************************************************/
function CanAddATLClass(oProj, oObject)
{
	try
	{
		if (!IsATLProject(oProj))
		{
			if (!IsMFCProject(oProj, true))
			{   
				var L_CanAddATLClass_Text = "ATL classes can only be added to ATL, MFC EXE and MFC Regular DLL projects.";
				wizard.ReportError(L_CanAddATLClass_Text);
				return false;
			}
			else
			{
				var oCM = oProj.CodeModel;
				var L_TRANSACTION2_Text = "Add ATL Support To Project"; 
				oCM.StartTransaction(L_TRANSACTION2_Text);
				var bRet = AddATLSupportToProject(oProj);
				if (bRet)
					oCM.CommitTransaction();
				else
					oCM.AbortTransaction();
				return bRet;
			}
		}
		return true;
	}
	catch(e)
	{
		throw e;
	}
}

/******************************************************************************
       Description: Checks if a file exists.  If it does, prompts the user if
	                they want to merge what's about to be added to the existing 
					file.
       strFileName: File name to check.  If unique, function returns true.
bCheckIfMidlHeader: Displays an error if filename is used by MIDL
     bSetMergeFlag: Whether to set the MERGE_FILE symbol
******************************************************************************/
function CanUseFileName(strFileName, bCheckIfMidlHeader, bCannotExist, bSetMergeFlag)
{
	try
	{
		if (bCheckIfMidlHeader)
		{
			var oMidlTool = window.external.ProjectObject.Object.Configurations(1).Tools("VCMidlTool");
			var strHeadFile = window.external.ProjectObject.Object.Configurations(1).Evaluate(oMidlTool.HeaderFileName);
			if (strHeadFile.toLowerCase() == strFileName.toLowerCase())
			{   
				var L_CanUseFileName_Text = " is generated by MIDL and cannot be used.";
				window.external.ReportError(strFileName + L_CanUseFileName_Text);
				return false;
			}
		}
		if (window.external.DoesFileExist(strFileName))
		{
			if (bCannotExist)
			{   
				var L_CanUseFileName2_Text = " is already in use.";
				window.external.ReportError(strFileName + L_CanUseFileName2_Text);
				return false;
			}
			else
			{
				var L_CanUseFileName3_Text = " already exists. Do you want to merge this class into the same file?";
				var bRet = window.external.YesNoAlert(strFileName + L_CanUseFileName3_Text);
				if (bRet && bSetMergeFlag)
					window.external.AddSymbol("MERGE_FILE", true);
				return bRet;
			}
		}
		else
			return true;
	}
	catch(e)
	{
		throw e;
	}
}

/******************************************************************************
     Description: adds the "include" statement to strInFile, including the header
                  where strCodeElemName is implemented, if such a header found in the oProj
           oProj: the context project
 strCodeElemName: the name (full name) of the code element for which we're searching
                  the definition header
       strInFile: the file that will include the definition header, if found
******************************************************************************/
function IncludeCodeElementDeclaration(oProj, strCodeElemName, strInFile)
{
	try
	{
		var CodeElement = oProj.CodeModel.CodeTypeFromFullName(strCodeElemName);
		if(CodeElement==null)
		{
			var L_IncludeCodeElementDeclaration1_Text = "Unable to find code element: ";
			throw new Error(1, L_IncludeCodeElementDeclaration1_Text + strCodeElemName);
		}
		var strCodeElemFile = CodeElement.Location(vsCMWhereDefault);
		if(strCodeElemFile==null)
		{
			var L_IncludeCodeElementDeclaration2_Text = "Unable to find code element file for code element: ";
			throw new Error(1, L_IncludeCodeElementDeclaration2_Text + strCodeElemName);
		}

		var nIndex = strCodeElemFile.lastIndexOf("\\");
		var strCodeElemFilePath = strCodeElemFile.substr(0, nIndex);
		if(nIndex!=0)
			strCodeElemFile = strCodeElemFile.substr(nIndex+1);

		var strInFileName = strInFile;
		nIndex = strInFileName.lastIndexOf("\\");
		var strInFilePath = strInFileName.substr(0, nIndex);
		if(nIndex!=0)
			strInFileName = strInFileName.substr(nIndex+1);

		strInFileName = strInFileName.toUpperCase();
		var strUpperCEFile = strCodeElemFile.toUpperCase();

		//only if strCodeElemName defined in different header; do not include it recursively to the same file
		if(strInFileName != strUpperCEFile)
		{ 
			var dotIndex = strUpperCEFile.lastIndexOf('.');
			if(dotIndex>=0 && strUpperCEFile.charAt(dotIndex+1)=='H') //only if strUpperCEFile is a valid C++ header file
			{
				var strIncludeText;
				if(strCodeElemFilePath.length==0 || strCodeElemFilePath.toLowerCase()==strInFilePath.toLowerCase())
				{
					//we don't know the path of strCodeElemFile (for example if it comes from ATLMFC headers)
					//or it lies in the same directory as strInFileName
					strIncludeText = '"' + strCodeElemFile + '"';
				}
				else
				{ 
					//if strInFileName and strCodeElemFile files live in different paths, we add the fullpath of strCodeElemFile to #include
					strIncludeText = '"' + strCodeElemFilePath + '\\' + strCodeElemFile + '"';
				}
				if (!DoesIncludeExist(oProj, strIncludeText, strInFile))
					oProj.CodeModel.AddInclude(strIncludeText, strInFile, vsCMAddPositionEnd); //include header where code element class is defined
			}
		}
	}
	catch(e)
	{
		throw e;
	}
}

/******************************************************************************
Description: This function is called by the wizard to add the _MERGE_PROXYSTUB
			 symbol if needed
      oProj: Selected project object
******************************************************************************/
function SetMergeProxySymbol(oProj)
{
	try
	{
		// if merging proxy/stub, proj will have dlldatax.c
		if (!oProj.Object.Files("dlldatax.c"))
			return;

		// add _MERGE_PROXYSTUB if necessary
		var oConfigs = oProj.Object.Configurations;
		for (var nCntr = 1; nCntr <= oConfigs.Count; nCntr++)
		{
			var oConfig = oConfigs(nCntr);
			var oCLTool = oConfig.Tools("VCCLCompilerTool");
			if (-1 == oCLTool.PreprocessorDefinitions.indexOf("_MERGE_PROXYSTUB"))
				oCLTool.PreprocessorDefinitions += ";_MERGE_PROXYSTUB";
		}
	}
	catch(e)
	{
		throw e;
	}
}

/******************************************************************************
 Description: Strip spaces from a string
       strin: The string (is in/out param)
******************************************************************************/
function TrimStr(str)
{
	var nLength = str.length;
	var nStartIndex = 0;
	var nEndIndex = nLength-1;

	while (nStartIndex < nLength && (str.charAt(nStartIndex) == ' ' || str.charAt(nStartIndex) == '\t'))
		nStartIndex++;
		
	while (nEndIndex > nStartIndex && (str.charAt(nEndIndex) == ' ' || str.charAt(nEndIndex) == '\t'))
		nEndIndex--;
	
	return str.substring(nStartIndex, nEndIndex+1);
}
/******************************************************************************
 Description: Open the file that contains the TextPoint, then move the cursor to the 
			  TextPoint.
         oTP: The reference to TextPoint
******************************************************************************/
function ShowTextPoint(oTP)
{
	try
	{
		oTP.Parent.Parent.ProjectItem.Open(vsViewKindCode).Visible = true;
		var oSel = oTP.Parent.Selection;
		oSel.MoveToPoint(oTP);
		oSel.ActivePoint.TryToShow(vsPaneShowHow.vsPaneShowAsIs);
	}
	catch(e)
	{
		throw(e);
	}
}

function ValidateFileNameAndEnsureInProject(strFileName, fileType)
{			
	try
	{
		if (!window.external.dte.VCLanguageManager.ValidateFileName(strFileName, fileType))
		{
			// Not a valid file name.
			return false;
		}

		if (!window.external.DoesFileExist(strFileName))
		{
			// File doesn't already exist.
			return true;
		}

		if (window.external.ProjectObject.Object.Files.Item(strFileName))
		{
			// Already in the project.
			return true;
		}

		if (!window.external.ProjectObject.Object.CanAddFile(strFileName))
		{
			// Can not be added to the project.
			return false;
		}

		var L_ConfirmAddFileToProject_Text = "File '";
		L_ConfirmAddFileToProject_Text = L_ConfirmAddFileToProject_Text + strFileName;
		var L_ConfirmAddFileToProject1_Text = "' is not in the project.  Would you like to add this file to the project?";
		L_ConfirmAddFileToProject_Text = L_ConfirmAddFileToProject_Text + L_ConfirmAddFileToProject1_Text;

		if (!window.external.YesNoAlert(L_ConfirmAddFileToProject_Text))
		{
			// User chose not to add to project.
			return false;
		}

		if (window.external.ProjectObject.Object.AddFile(strFileName))
		{
			// Successfully added the file to the project.
			return true;
		}
	}
	catch(e)
	{
		throw(e);
	}

	return false;
}

/******************************************************************************
        Description: Returns a boolean indicating whether this is a Win32 configuration or not
		    oConfig: VCConfiguration object
******************************************************************************/
function IsPlatformWin32(oConfig)
{
	return oConfig.Platform.Name == "Win32";
}


function GetPlatformDefine(oConfig)
{
	if (oConfig.Platform.Name == "Win32")
		return "WIN32;";
	else
		return "";
}

/******************************************************************************
 Description: Finds the project item in the project that corresponds to the 
		file name specified.
         oFilter: The Project or Filter to start searching from
		 strFile: The file to search for
******************************************************************************/

function FindProjectItem(oFilter, strFile)
{
	var oProjectItem;
	
	try
	{
		oProjectItem = oFilter.ProjectItems.Item(strFile);
	}
	catch(e)
	{
	}

	try
	{	
		if (oProjectItem)
		{
			return oProjectItem;
		}
		else
		{
			var oFilters = oFilter.Filters;
			var cFilters = oFilters.Count;
			
			for (var iFilter = 1; iFilter <= cFilters; iFilter++)
			{
				oProjectItem = FindProjectItem(oFilters.Item(iFilter), strFile);

				if (oProjectItem)
				{
					return oProjectItem;
				}
			}
		}
	}
	catch(e)
	{
		throw(e);
	}
	
	return null;
}
