// (c) 2001 Microsoft Corporation
// Script for ATL Controls

function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var strShortName = wizard.FindSymbol("SHORT_NAME");
		var L_TRANSACTION_Text = "Add ATL Control ";
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
		var strInterfaceName	= wizard.FindSymbol("INTERFACE_NAME");
		var strHTMLID 			= "IDH_" + strUpperShortName;
		var strDLGID  			= "IDD_" + strUpperShortName;
		wizard.AddSymbol("UPPER_SHORT_NAME", strUpperShortName);
		var strVIProgID			= wizard.FindSymbol("VERSION_INDEPENDENT_PROGID");
		wizard.AddSymbol("PROGID", strVIProgID.substr(0,37) + ".1");
		var bConnectionPoint	= wizard.FindSymbol("CONNECTION_POINTS");
 		var strClassName		= wizard.FindSymbol("CLASS_NAME");
		var strHeaderFile		= wizard.FindSymbol("HEADER_FILE");
		var strImplFile			= wizard.FindSymbol("IMPL_FILE");
		var strCoClass			= wizard.FindSymbol("COCLASS");
		var bAttributed			= wizard.FindSymbol("ATTRIBUTED");

		var bHTMLCtl			= wizard.FindSymbol("HTML_CONTROL");
		var bCompositeCtl		= wizard.FindSymbol("COMPOSITE_CONTROL");

		var strProjectRC		= GetProjectFile(selProj, "RC", true, false);
		var strProjectIDL		= GetProjectFile(selProj, "IDL", false, false);

		// Create necessary GUIDS
		CreateGUIDs();

		// open resource file
		var oResHelper = wizard.ResourceHelper;
		oResHelper.OpenResourceFile(strProjectRC);

		// Add Bitmap resource
		var strBitmapFile = GetUniqueFileName(strProjectPath, strShortName + ".bmp");
		var strBMPID = "IDB_" + strUpperShortName;
		wizard.RenderTemplate(strTemplatePath + "\\" + "toolbar.bmp", strProjectPath + strBitmapFile, true); //don't process bitmap
		var strNameAndID = oResHelper.AddResource(strBMPID, strProjectPath + strBitmapFile, "BITMAP");
		var nEqualPos = strNameAndID.indexOf("=");
		var strSymbolName = strNameAndID.substr(0, nEqualPos);
		var strSymbolID = strNameAndID.substr(nEqualPos + 1);
		wizard.AddSymbol("IDR_BMPID_VALUE", strSymbolID);

		if (!bAttributed)
		{
			// Get LibName
			wizard.AddSymbol("LIB_NAME", oCM.IDLLibraries(1).Name);

			// Get LibID
			var oUuid = oCM.IDLLibraries(1).Attributes.Find("uuid");
			if (oUuid)
				wizard.AddSymbol("LIBID_REGISTRY_FORMAT", oUuid.Value);

			// Get typelib version
			var oVersion = oCM.IDLLibraries(1).Attributes.Find("version");
			if (oVersion)
			{
				var aryMajorMinor = oVersion.Value.split('.');
				for (var nCntr=0; nCntr<aryMajorMinor.length; nCntr++)
				{
					if (nCntr == 0)
						wizard.AddSymbol("TYPELIB_VERSION_MAJOR", aryMajorMinor[nCntr]);
					else
						wizard.AddSymbol("TYPELIB_VERSION_MINOR", aryMajorMinor[nCntr]);
				}
			}

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
			RenderAddTemplate("control.rgs", strRGSFile, false, false);
			var strSymbolValue = oResHelper.AddResource(strRGSID, strProjectPath + strRGSFile, "REGISTRY");
			wizard.AddSymbol("RGS_ID", strSymbolValue.split("=").shift());

			// Add connection point support
			if (bConnectionPoint)
				RenderAddTemplate("connpt.h", "_" + strInterfaceName + "Events_CP.h", selProj, false);

			// Add #include "olectl.h" to strProject.idl
			if (!DoesIncludeExist(selProj, '"olectl.h"', strProjectIDL))
				oCM.AddInclude('"olectl.h"', strProjectIDL, vsCMAddPositionEnd);

			// Render ctlco.idl and insert into strProject.idl
			AddCoclassFromFile(oCM, "ctlco.idl");

			// Render ctlint.idl and insert into strProject.idl
			AddInterfaceFromFile(oCM, "ctlint.idl");

			SetMergeProxySymbol(selProj);
		}

		if (bHTMLCtl)
		{
			var strHTMLFile = GetUniqueFileName(strProjectPath, strShortName + "UI.htm");
			RenderAddTemplate("HTMLCTL.htm", strHTMLFile, false, false);
			var strSymbolValue = oResHelper.AddResource(strHTMLID, strProjectPath + strHTMLFile, "HTML");
			wizard.AddSymbol("IDH_HTMLID", strSymbolValue.split("=").shift());
		}

		if (bCompositeCtl)
		{
			var strSymbolValue = oResHelper.AddResource(strDLGID, strTemplatePath + "\\cmposite.rc", "DIALOG");
			wizard.AddSymbol("IDD_DIALOGID", strSymbolValue.split("=").shift());
		}
		
		// Add header
		RenderAddTemplate("control.h", strHeaderFile, selProj, true);	

		// Add HTML
		var strHTMLFile = GetUniqueFileName(strProjectPath, strShortName + ".htm");
		RenderAddTemplate("default.htm", strHTMLFile, selProj, false);

		// Add CPP
		RenderAddTemplate("control.cpp", strImplFile, selProj, false);

		// close resource file
		oResHelper.CloseResourceFile();

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

		// create interface GUID
		strRawGUID = wizard.CreateGuid();
		strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
		wizard.AddSymbol("INTERFACE_IID", strFormattedGUID);

		// create connection point GUID
		var bConnectionPoint = wizard.FindSymbol("CONNECTION_POINTS");
		if (bConnectionPoint)
		{
			strRawGUID = wizard.CreateGuid();
			strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
			wizard.AddSymbol("CONNECTION_POINT_IID", strFormattedGUID);
		}

		// create GUID for HTML dispatch interface
		var bHTMLCtl = wizard.FindSymbol("HTML_CONTROL");
		if (bHTMLCtl)
		{
			strRawGUID = wizard.CreateGuid();
			strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
			wizard.AddSymbol("INTERFACEUI_IID", strFormattedGUID);
	
			// create GUID for HTML coclass
			var bAttributed = wizard.FindSymbol("ATTRIBUTED");
			if (bAttributed)
			{
				strRawGUID = wizard.CreateGuid();
				strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
				wizard.AddSymbol("OBJECT_UI_GUID", strFormattedGUID);				
			}
		}
	}
	catch(e)
	{
		throw e;
	}
}
