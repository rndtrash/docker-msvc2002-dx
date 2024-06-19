// (c) 2001 Microsoft Corporation
// Script for ATL Property Page

function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var strShortName = wizard.FindSymbol("SHORT_NAME");
		var L_TRANSACTION_Text = "Add ATL Property Page ";
		oCM.StartTransaction(L_TRANSACTION_Text + strShortName);

		var bDLL;
		if (typeDynamicLibrary == selProj.Object.Configurations(1).ConfigurationType)
			bDLL = true;
		else
			bDLL = false;
		wizard.AddSymbol("DLL_APP", bDLL);

		var strProjectName		= wizard.FindSymbol("PROJECT_NAME");
		var strProjectPath		= wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath		= wizard.FindSymbol("TEMPLATES_PATH");
		var strUpperShortName	= strShortName.toUpperCase();
		wizard.AddSymbol("UPPER_SHORT_NAME", strUpperShortName);
		var strVIProgID			= wizard.FindSymbol("VERSION_INDEPENDENT_PROGID");
		wizard.AddSymbol("PROGID", strVIProgID.substr(0,37) + ".1");
 		var strClassName		= wizard.FindSymbol("CLASS_NAME");
		var strHeaderFile		= wizard.FindSymbol("HEADER_FILE");
		var strImplFile			= wizard.FindSymbol("IMPL_FILE");
		var strCoClass			= wizard.FindSymbol("COCLASS");
		var bAttributed			= wizard.FindSymbol("ATTRIBUTED");

		var strProjectRC		= GetProjectFile(selProj, "RC", true, false);

		// Create necessary GUIDS
		CreateGUIDs();

		// open resource file
		var oResHelper = wizard.ResourceHelper;
		oResHelper.OpenResourceFile(strProjectRC);

		if (!bAttributed)
		{
			// Get LibName
			wizard.AddSymbol("LIB_NAME", oCM.IDLLibraries(1).Name);

			// Get LibID
			wizard.AddSymbol("LIBID_REGISTRY_FORMAT", oCM.IDLLibraries(1).Attributes.Find("uuid").Value);

			// Get AppID
			var strAppID = wizard.GetAppID();
			if (strAppID.length > 0)
			{
				wizard.AddSymbol("APPID_EXIST", true);
				wizard.AddSymbol("APPID_REGISTRY_FORMAT", strAppID);
			}

			// Render proppageco.idl and insert into strProject.idl
			AddCoclassFromFile(oCM, "proppageco.idl");

			SetMergeProxySymbol(selProj);
		}

		var strDLGID = "IDD_" + strUpperShortName;
		var strSymbolValue = oResHelper.AddResource(strDLGID, strTemplatePath + "\\propdlg.rc", "DIALOG");
		wizard.AddSymbol("IDD_DIALOGID", strSymbolValue.split("=").shift());

		var strTitleID = "IDS_TITLE" + strShortName;
		strSymbolValue = oResHelper.AddResource(strTitleID, wizard.FindSymbol("TITLE"), "STRING");
		wizard.AddSymbol("IDS_TITLE", strSymbolValue.split("=").shift());

		var strHelpFileID = "IDS_HELPFILE" + strShortName;
		strSymbolValue = oResHelper.AddResource(strHelpFileID, wizard.FindSymbol("HELP_FILE"), "STRING");
		wizard.AddSymbol("IDS_HELPFILE", strSymbolValue.split("=").shift());

		var strDocStringID = "IDS_DOCSTRING" + strShortName;
		strSymbolValue = oResHelper.AddResource(strDocStringID, wizard.FindSymbol("DOC_STRING"), "STRING");
		wizard.AddSymbol("IDS_DOCSTRING", strSymbolValue.split("=").shift());

		// Add #include <atlcom.h> to stdafx.h
		if (!DoesIncludeExist(selProj, '<atlcom.h>', "stdafx.h"))
			oCM.AddInclude('<atlcom.h>', "stdafx.h", vsCMAddPositionEnd);
		// Add #include <atlctl.h> to stdafx.h
		if (!DoesIncludeExist(selProj, '<atlctl.h>', "stdafx.h"))
			oCM.AddInclude('<atlctl.h>', "stdafx.h", vsCMAddPositionEnd);


		if (!bAttributed)
		{
			// add RGS file resource
			var strRGSFile = GetUniqueFileName(strProjectPath, strShortName + ".rgs");
			RenderAddTemplate("proppage.rgs", strRGSFile, false, false);
			var strRGSID = "IDR_" + strUpperShortName;
			strSymbolValue = oResHelper.AddResource(strRGSID, strProjectPath + strRGSFile, "REGISTRY");
			wizard.AddSymbol("RGS_ID", strSymbolValue.split("=").shift());
		}
		// close resource file
		oResHelper.CloseResourceFile();

		// Add header
		RenderAddTemplate("proppage.h", strHeaderFile, selProj, true);

		// Add CPP
		RenderAddTemplate("proppage.cpp", strImplFile, selProj, false);

		oCM.CommitTransaction();
				
		oCM.Classes.Find(strClassName).StartPoint.TryToShow(vsPaneShowTop);
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
		throw e;
	}
}
