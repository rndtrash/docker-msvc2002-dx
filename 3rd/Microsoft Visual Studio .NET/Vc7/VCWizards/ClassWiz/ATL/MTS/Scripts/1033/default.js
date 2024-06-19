// (c) 2001 Microsoft Corporation
// Script for ATL COM+ 1.0 Object

function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var strShortName = wizard.FindSymbol("SHORT_NAME");
		var L_TRANSACTION1_Text = "Add ATL COM+ 1.0 Object ";
		oCM.StartTransaction(L_TRANSACTION1_Text + strShortName);
		
		var bDLL;
		if (typeDynamicLibrary == selProj.Object.Configurations(1).ConfigurationType)
			bDLL = true;
		else
			bDLL = false;
		wizard.AddSymbol("DLL_APP", bDLL);

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

		var strProjectRC	= GetProjectFile(selProj, "RC", true, false);
		var strProjectIDL 	= GetProjectFile(selProj, "IDL", false, false);			
		

		// Create necessary GUIDS
		CreateGUIDs();

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
			RenderAddTemplate("mts.rgs", strRGSFile, false, false);

			var oResHelper = wizard.ResourceHelper;
			oResHelper.OpenResourceFile(strProjectRC);
			var strSymbolValue = oResHelper.AddResource(strRGSID, strProjectPath + strRGSFile, "REGISTRY");
			wizard.AddSymbol("RGS_ID", strSymbolValue.split("=").shift());
			oResHelper.CloseResourceFile();

			var bTransaction = wizard.FindSymbol("TRANSACTION_SUPPORT");
			var bQueueable = wizard.FindSymbol("QUEUEABLE");

			if (bTransaction || bQueueable)
			{
				// Add #include "mtxattr.h" to strProject.idl
				if (!DoesIncludeExist(selProj, '"mtxattr.h"', strProjectIDL))
					oCM.AddInclude('"mtxattr.h"', strProjectIDL, vsCMAddPositionEnd);
			}

			// Render mtsco.idl and insert into strProject.idl
			AddCoclassFromFile(oCM, "mtsco.idl");

			// Render mtsint.idl and insert into strProject.idl
			AddInterfaceFromFile(oCM, "mtsint.idl");
			

			SetMergeProxySymbol(selProj);
		}

		// Add header
		RenderAddTemplate("mts.h", strHeaderFile, selProj, true);

		// Add CPP
		RenderAddTemplate("mts.cpp", strImplFile, selProj, false);

		// make sure comsvcs.lib is linked in
		var oConfigs = selProj.Object.Configurations;
		for (var nCntr = 1; nCntr <= oConfigs.Count; nCntr++)
		{
			var LinkTool = oConfigs(nCntr).Tools("VCLinkerTool");			
			var strLibs = LinkTool.AdditionalDependencies;
			if (-1 == strLibs.toUpperCase().indexOf("COMSVCS.LIB"))
				LinkTool.AdditionalDependencies += " comsvcs.lib";
		}

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
	}
	catch(e)
	{
		throw e;
	}
}

function CanAddMTSClass(oProj, selObj)
{
	var oCM;
	try
	{
		var L_ErrMsg3_Text = "COM+ 1.0 classes can only be added to ATL DLL or MFC Regular DLL projects.";
		if (typeDynamicLibrary != oProj.Object.Configurations(1).ConfigurationType)
		{
			wizard.ReportError(L_ErrMsg3_Text);
			return false;
		}
		if (!IsATLProject(oProj))
		{
			if (!IsMFCProject(oProj, true))
			{   
				wizard.ReportError(L_ErrMsg3_Text);
				return false;
			}
			else
			{
				oCM = oProj.CodeModel;

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
		if (oCM)
			oCM.AbortTransaction();

		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}
