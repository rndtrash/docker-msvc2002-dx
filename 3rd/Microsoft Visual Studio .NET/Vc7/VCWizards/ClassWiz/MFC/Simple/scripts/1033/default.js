// (c) 2001 Microsoft Corporation
// Script for MFC Add Simple Class

function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var strClassName = wizard.FindSymbol("CLASS_NAME");

		var L_TransactionName_Text = "Add MFC Simple class ";
		oCM.StartTransaction(L_TransactionName_Text + strClassName);

		var strProjectPath		= wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath		= wizard.FindSymbol("TEMPLATES_PATH");
		var strIncludeHeader	= wizard.FindSymbol("INCLUDE_HEADER");
		var strHeaderFile		= wizard.FindSymbol("HEADER_FILE");
		var strImplFile			= wizard.FindSymbol("IMPL_FILE");
		var strDialogID			= wizard.FindSymbol("IDD_DIALOG");
		var strTemplateHeader	= wizard.FindSymbol("TEMPLATE_HEADER");
		var strTemplateImpl		= wizard.FindSymbol("TEMPLATE_IMPL");
		var strHTMLID			= wizard.FindSymbol("HTML_ID");
		var strHTMLFile			= wizard.FindSymbol("HTML_FILE");
		var strBaseClass		= wizard.FindSymbol("BASE_CLASS");
		var bGenDocTemplate		= wizard.FindSymbol("GEN_DOCTEMPLATE");
		var bMDI				= wizard.FindSymbol("MDI_APP");
		var strDocumentClass	= wizard.FindSymbol("DOCUMENT_CLASS");
		var strFrameClass		= wizard.FindSymbol("FRAME_CLASS");
		var bAccessibility		= wizard.FindSymbol("ACCESSIBILITY");
		var strProjectCPP		= GetProjectFile(selProj, "CPP", false, true);

		if (strIncludeHeader != "")
		{
			if (!DoesIncludeExist(selProj, strIncludeHeader, "stdafx.h"))
				oCM.AddInclude(strIncludeHeader, "stdafx.h", vsCMAddPositionEnd);
		}

		var strProjectRC = GetProjectFile(selProj, "RC", true);
		var oResHelper = wizard.ResourceHelper;

		if (wizard.FindSymbol("CREATE_DIALOG"))
		{
			var strSymbolValue = "";
			oResHelper.OpenResourceFile(strProjectRC);
			if (strBaseClass == "CDHtmlDialog")
				strSymbolValue = oResHelper.AddResource(strDialogID, strTemplatePath + "\\dhtmldlg.rc", "DIALOG");
			else if (strBaseClass == "CFormView")
				strSymbolValue = oResHelper.AddResource(strDialogID, strTemplatePath + "\\formview.rc", "DIALOG");
			else
				strSymbolValue = oResHelper.AddResource(strDialogID, strTemplatePath + "\\dialog.rc", "DIALOG");
			oResHelper.CloseResourceFile();
			wizard.AddSymbol("IDD_DIALOG", strSymbolValue.split("=").shift());
		}

		if (strBaseClass == "CDHtmlDialog")
		{
			RenderAddTemplate("dhtmldlg.htm", strHTMLFile, selProj, false);
			oResHelper.OpenResourceFile(strProjectRC);
			var strSymbolValue = oResHelper.AddResource(strHTMLID, strProjectPath + strHTMLFile, "HTML");
			oResHelper.CloseResourceFile();
			wizard.AddSymbol("HTML_ID", strSymbolValue.split("=").shift());
		}

		RenderAddTemplate(strTemplateHeader, strHeaderFile, selProj, true);
		RenderAddTemplate(strTemplateImpl, strImplFile, selProj, false);

		// look for InitInstance
		var oInitInstance = false;
		if ((strBaseClass == "CFormView" && bGenDocTemplate) || bAccessibility)
		{
			var oClasses = oCM.Classes;
			for (var nCntr = 1; nCntr <= oClasses.Count; nCntr++)
			{
				// look for class derived from CWinApp
				if (oClasses(nCntr).IsDerivedFrom("CWinApp"))
				{
					oInitInstance = oClasses(nCntr).Functions.Find("InitInstance");
					break;
				}
			}
		}

		// insert AfxOleInit()
		if (bAccessibility && oInitInstance)
		{
			var strBody = oInitInstance.BodyText;
			if (-1 == strBody.indexOf("AfxOleInit"))
			{
				oInitInstance.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint().Insert("\tAfxOleInit();\r\n");
				oCM.Synchronize();						
			}
		}

		if (strBaseClass == "CFormView" && bGenDocTemplate)
		{
			var strMainFrameCaption = wizard.FindSymbol("DOCUMENT_MAIN_FRAME_CAPTION");
			var strFileNewNameShort = wizard.FindSymbol("DOCUMENT_FILE_NEW_NAME_SHORT");
			var strTypeName = wizard.FindSymbol("DOCUMENT_TYPE_NAME");
			var strFilterName = wizard.FindSymbol("DOCUMENT_FILTER_NAME");
			var strFileExt = wizard.FindSymbol("DOCUMENT_FILE_EXTENSION");
			var strFileTypeID = wizard.FindSymbol("DOCUMENT_FILE_TYPE_ID");
			var strFileNewNameLong = wizard.FindSymbol("DOCUMENT_FILE_NEW_NAME_LONG");
			var strTemp = strMainFrameCaption + "\\n" + strFileNewNameShort + "\\n" + strTypeName + "\\n" + strFilterName + "\\n" + strFileExt + "\\n" + strFileTypeID + "\\n" + strFileNewNameLong;

			var strID = CreateSafeName(strClassName).toUpperCase();
			if (strID.charAt(0) == "C")
				strID = strID.substr(1);
			strID = "IDR_" + strID + "_TMPL";
	
			oResHelper.OpenResourceFile(strProjectRC);			

			var strIconFile;
			if (strClassName.charAt(0) == "C" || strClassName.charAt(0) == "c")
				strIconFile = strClassName.substr(1) + ".ico";
			else
				strIconFile = strClassName + ".ico";
			strIconFile = GetUniqueFileName(strProjectPath, strIconFile);
			wizard.RenderTemplate(strTemplatePath + "\\formview.ico", strProjectPath + "res\\" + strIconFile, true); //don't process ico file
			var strSymbolValue = oResHelper.AddResource(strID, strProjectPath + "res\\" + strIconFile, "ICON", "", true);
			strID = strSymbolValue.split("=").shift();

			oResHelper.AddResource(strID, strTemp, "STRING", "", true);

			if (bMDI)
				oResHelper.AddResource(strID, strTemplatePath + "\\formviewmdi.rc", "MENU", "#include <afxres.h>", true);
			else
				oResHelper.AddResource(strID, strTemplatePath + "\\formviewsdi.rc", "MENU", "#include <afxres.h>", true);

			oResHelper.CloseResourceFile();

			if (oInitInstance)
			{
				if (!DoesIncludeExist(selProj, strHeaderFile, strProjectCPP))
					oCM.AddInclude('"' + strHeaderFile + '"', strProjectCPP, vsCMAddPositionEnd);

				var	strInsert = "\t{\r\n";
				if (bMDI)
					strInsert += "\t\tCMultiDocTemplate* pNewDocTemplate = new CMultiDocTemplate(\r\n";
				else
					strInsert += "\t\tCSingleDocTemplate* pNewDocTemplate = new CSingleDocTemplate(\r\n";
				strInsert += "\t\t\t" + strID + ",\r\n";
				strInsert += "\t\t\tRUNTIME_CLASS(" + strDocumentClass + "),\r\n";
				strInsert += "\t\t\tRUNTIME_CLASS(" + strFrameClass + "),\r\n";
				strInsert += "\t\t\tRUNTIME_CLASS(" + strClassName + "));\r\n";
				strInsert += "\t\tAddDocTemplate(pNewDocTemplate);\r\n";
				strInsert += "\t}\r\n\r\n";
				oInitInstance.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint().Insert(strInsert);
				oCM.Synchronize();						
			}
		}

		if (wizard.FindSymbol("AUTOMATION") || wizard.FindSymbol("CREATABLE"))
		{
			var strProjectIDL = GetProjectFile(selProj, "IDL");
			if (!strProjectIDL || strProjectIDL.length == 0)
				strProjectIDL = GetProjectFile(selProj, "ODL");
			if (strProjectIDL.length)
			{
				// Add #include "olectl.h" to strProject.idl
				if (!DoesIncludeExist(selProj, '"olectl.h"', strProjectIDL))
					oCM.AddInclude('"olectl.h"', strProjectIDL, vsCMAddPositionEnd);

				// Render coclass.idl and insert into strProject.idl
				AddCoclassFromFile(oCM, "coclass.idl");
			}
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
