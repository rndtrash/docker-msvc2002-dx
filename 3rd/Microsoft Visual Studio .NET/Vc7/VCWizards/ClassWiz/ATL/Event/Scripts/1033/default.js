// Script for WMI Event Provider wizard

function OnFinish(selProj, selObj)
{

	var oCM	= selProj.CodeModel;


	try
	{
	
		oCM.StartTransaction("Add WMI Event provider");



		var bDLL;
		if (typeDynamicLibrary == selProj.Object.Configurations(1).ConfigurationType) //REVIEW: hardcoded configuration
			bDLL = true;
		else
			bDLL = false;
		wizard.AddSymbol("DLL_APP", bDLL);

		var strProjectName 		= wizard.FindSymbol("PROJECT_NAME");
		
		var strProjectPath		= wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath		= wizard.FindSymbol("TEMPLATES_PATH");
		var strShortName		= wizard.FindSymbol("SHORT_NAME");	
		var strUpperShortName	= strShortName.toUpperCase();

		wizard.AddSymbol("UPPER_SHORT_NAME", strUpperShortName);
		var strVIProgID			= wizard.FindSymbol("VERSION_INDEPENDENT_PROGID");

		wizard.AddSymbol("PROGID", strVIProgID + ".1");
 		var strClassName		= wizard.FindSymbol("CLASS_NAME");
		var strHeaderFile		= wizard.FindSymbol("HEADER_FILE");
		var strImplFile			= wizard.FindSymbol("IMPL_FILE");
		var strCoClass			= wizard.FindSymbol("COCLASS");
		var bAttributed			= wizard.FindSymbol("ATTRIBUTED");
		
		var strProjectCPP		= GetProjectFile(selProj, "CPP", false, false);
		var strProjectRC		= GetProjectFile(selProj, "RC", true, false);
		
		var bClassSpecified = (wizard.FindSymbol("WMICLASSNAME").toString() != "");
		wizard.AddSymbol ("CLASS_SPECIFIED", bClassSpecified);

		// Create necessary GUIDS
		CreateGUIDs();

		if (!bAttributed)
		{
			// Get LibName
			wizard.AddSymbol("LIB_NAME", oCM.IDLLibraries(1).Name);
			
			// Get LibID
			wizard.AddSymbol("LIBID_REGISTRY_FORMAT", oCM.IDLLibraries(1).Attributes("uuid").Value);


			// Get AppID
			var strAppID = wizard.GetAppID();
			if (strAppID.length > 0)
			{
				wizard.AddSymbol("APPID_EXIST", true);
				wizard.AddSymbol("APPID_REGISTRY_FORMAT", strAppID);
			}
		

			// add RGS file resource
			var strRGSFile = GetUniqueFileName(strProjectPath, strShortName + ".rgs");
			var strRGSID = "IDR_" + strUpperShortName;
			RenderAddTemplate("wmiprov.rgs", strRGSFile, false);


	
			var oResHelper = wizard.ResourceHelper;
			oResHelper.OpenResourceFile(strProjectRC);
//			oResHelper.AddResource(strRGSID, strProjectPath + "\\" + strRGSFile, "REGISTRY");
			oResHelper.AddResource(strRGSID, strProjectPath + strRGSFile, "REGISTRY");
			oResHelper.CloseResourceFile();	

			// Render wmiprovco.idl and insert into strProject.idl
			AddCoclassFromFile(oCM, "wmiprovco.idl");
	
			SetMergeProxySymbol(selProj);	
		}


		// Add #include "strHeaderFile" to strProjectName.cpp
		if (!DoesIncludeExist(selProj, '"' + strHeaderFile + '"', strProjectCPP))
			oCM.AddInclude('"' + strHeaderFile + '"', strProjectCPP, vsCMAddPositionEnd);
	
		// Add header
		RenderAddTemplate("wmiprov.h", strHeaderFile, selProj);	


		// Add CPP
		RenderAddTemplate("wmiprov.cpp", strImplFile, selProj);

		//Add MOF
		AddMOFFromFile("wmiprov.mof", selProj);
		
		//add wmi libraries to linker input
		var nTotal = selProj.Object.Configurations.Count;
		var nCntr;		
		for (nCntr = 1; nCntr <= nTotal; nCntr++)
		{
					
			var VCLinkTool = selProj.Object.Configurations(nCntr).Tools("VCLinkerTool");
			if (-1 == VCLinkTool.AdditionalDependencies.toUpperCase().search("WBEMUUID.LIB"))
			{
				VCLinkTool.AdditionalDependencies += " wbemuuid.lib";
			}
			if (-1 == VCLinkTool.AdditionalDependencies.toUpperCase().search("WMIUTILS.LIB"))
			{
				VCLinkTool.AdditionalDependencies += " wmiutils.lib";
			}
		}
		
		oCM.CommitTransaction();

	
	}
	catch(e)
	{
		oCM.AbortTransaction();
		var L_alert1_ErrorMessage = "Error in OnFinish js: ";
		wizard.ReportError(L_alert1_ErrorMessage + e.description);
	}
}

function AddMOFFromFile (strTemplateName, selProj)
{
	try
	{
	   	var ForReading = 1, ForWriting = 2, ForAppending = 8;
    	var TristateUseDefault = -2, TristateUnicode = -1, TristateAnsi = 0;
    
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var strMOFName = wizard.FindSymbol("PROJECT_NAME") + ".mof";
		
		var strMOFPath = wizard.FindSymbol("PROJECT_PATH") + strMOFName;
		
		var bFirstRun = !fso.FileExists(strMOFPath);
			
		if (bFirstRun)
		{
			var folder;			
			//add MOF filter to "Source Files"					
			for( var n = 1 ; n <= selProj.Object.Filters.Count ; n++)
			{
				folder = selProj.Object.Filters.Item(n);
				if( folder.Filter.match( "cpp" ) != null  )
				{
					folder.Filter = folder.Filter + ";mof"
					break;
				}
			}
			RenderAddTemplate("header.mof", strMOFName, selProj);

			// To Close the opened .mof file, so that there is no warning message
			// for opened modified file
			var activeDoc;
			for(var nDocs = 1 ; nDocs <= selProj.DTE.Documents.Count ; nDocs++)
			{
				activeDoc =selProj.DTE.Documents.Item(nDocs);
				if(activeDoc.Name == strMOFName)
				{
					activeDoc.Close();
					break;
				}
			}
		}
		
		if (wizard.FindSymbol("CLASS_SPECIFIED") == true)
		{

			//create ESCAPED_NAMESPACE symbol that would have 2 backslashes in
			//complex namespace names
			var strEscapedNS = "";
			var strNS = wizard.FindSymbol("NAMESPACE");
			var arPieces = strNS.split("\\");				
			
			if (arPieces.length == 0)
			{
				strEscapedNS = strNS;
			}
			else 
			{			
				for (var i = 0; i < arPieces.length - 1; i++)
				{
					strEscapedNS +=	arPieces[i] + "\\\\";
				}										
				strEscapedNS += arPieces[arPieces.length - 1];			
			}
			
			wizard.AddSymbol("ESCAPED_NAMESPACE", strEscapedNS);	
		}	
				
		var strTemp = wizard.FindSymbol("PROJECT_PATH") + strTemplateName;
		RenderAddTemplate(strTemplateName, strTemp, false);		
		
		var fAddon = fso.OpenTextFile(strTemp, ForReading, false, TristateAnsi);	//ANSI for now, should be Unicode
		var strAddon = fAddon.ReadAll();		
		fAddon.Close();
	
		
		//now, add wmiprov.mof at the bottom
		var strMOFPath = wizard.FindSymbol("PROJECT_PATH") + strMOFName;		
		var fHeader = fso.GetFile(strMOFPath);
		var ts = fHeader.OpenAsTextStream(ForAppending, TristateAnsi);	//ANSI for now, should be Unicode
		ts.WriteBlankLines(1);		
		ts.Write(strAddon);	
		ts.Close();		
				
		fso.DeleteFile(strTemp);
		
		if (bFirstRun) 
		{
			//set custom build step for the MOF file in each configuration
			
			var files = selProj.Object.Files;
			var Moffile = files(strMOFName);

			var nTotal = Moffile.FileConfigurations.Count;			
			var nCntr;		
			for (nCntr = 1; nCntr <= nTotal; nCntr++)
			{				
				var customBuildTool = Moffile.FileConfigurations(nCntr).Tool;
								
				customBuildTool.CommandLine = "mofcomp \"$(InputDir)\\$(InputName)\".mof\n\recho mofcomptrace > \"$(OutDir)\\$(InputName)\".trace";
				
				customBuildTool.Outputs  = 	"\"$(OutDir)\\$(InputName)\".trace";	

				var L_alert9_ErrorMessage = "Compiling MOF file";
				customBuildTool.Description = L_alert9_ErrorMessage;				
								
			}			
		}			
							
	}
	catch(e)
	{
		var L_alert2_ErrorMessage = "Error in AddMOFFile: ";
		wizard.ReportError(L_alert2_ErrorMessage + e.description);
	}
}

function CreateGUIDs()
{
	try
	{
		// create CLSID
		var strRawGUID = wizard.CreateGuid();
		var strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
		wizard.AddSymbol("CLSID_REGISTRY_FORMAT", strFormattedGUID);

		
	}
	catch(e)
	{
		var L_alert3_ErrorMessage = "Error in CreateGUIDs: ";
		wizard.ReportError(L_alert3_ErrorMessage + e.description);
	}
}

function IsWMIOk(selProj, selObj)
{
	//uses WMI Registry provider to determine WMI version

	try 
	{
		if (!CanAddATLClass(selProj, selObj))
		{
			return false;
		}
		
		try 
		{
			var locator = new ActiveXObject("WbemScripting.SWbemLocator");
		
			var services = locator.ConnectServer("", //local server
										"root\\default");												
		}
		catch (e)
		{
			var L_alert4_ErrorMessage = "Could not connect to WMI. Please verify that WMI is installed on your machine";
			throw(L_alert4_ErrorMessage);
		}										
				
		var classObj = services.Get("StdRegProv");
				
		var methObject = classObj.Methods_.Item("GetExpandedStringValue");
		var inParmsInstance = methObject.InParameters.SpawnInstance_();
				
		inParmsInstance.Properties_.Add("sSubKeyName", 8);
	
		inParmsInstance.Properties_("sSubKeyName").Value = 
			"SOFTWARE\\Microsoft\\WBEM";
	

		inParmsInstance.Properties_.Add("sValueName", 8);
	
		inParmsInstance.Properties_("sValueName").Value = "Build";


		var outParms = classObj.ExecMethod_("GetExpandedStringValue",
							inParmsInstance);

		if (outParms.Properties_("ReturnValue").Value != 0)
		{
			var L_alert5_ErrorMessage = "Could not determine WMI build number";
			throw (L_alert5_ErrorMessage);
		}

		if (outParms.Properties_("sValue").Value >= "1085")
		{
			return true;
		}
		else 
		{
			var L_alert6_ErrorMessage = "Version of WMI installed on your machine is ";
			var L_alert7_ErrorMessage = ". Version 1085 or higher is required to run this wizard.";
			throw (L_alert6_ErrorMessage + outParms.Properties_("sValue").Value +
					L_alert7_ErrorMessage);
		}

	}

	catch (e)
	{
		var L_alert8_ErrorMessage = "Cannot add WMI Event provider object to your project due to the following error:\n\r ";
		wizard.ReportError (L_alert8_ErrorMessage + e);
		return false;
	}
	
}

