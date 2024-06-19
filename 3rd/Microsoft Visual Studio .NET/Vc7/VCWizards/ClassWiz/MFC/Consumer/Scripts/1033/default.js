// (c) 2001 Microsoft Corporation
// Script for ODBC Consumer

function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		// open a transaction
		var L_TransactionName_Text = "MFC Consumer Wizard";
		oCM.StartTransaction(L_TransactionName_Text);

		var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
		var strHeaderFile = wizard.FindSymbol("HEADER_FILE");
		var strImplFile = wizard.FindSymbol("IMPLEMENTATION_FILE");
		var strClassName = wizard.FindSymbol("CLASS_NAME");

// The following 4 symbols need to be set before calling GetConsumerClass.
// They were previously set by window.external.SelectDataSource().
// You must set these yourself if not using SelectDataSource().
// 1. DB_CONNECTION_STRING - check return value from SelectDataSource for format
// 2. DB_TABLE - table name
// 3. DB_SCHEMA - table schema
// 4. SNAPSHOT - boolean indicating whether we want a snapshot (if not, we get a dynaset)
		
		var bSnapshot = wizard.FindSymbol("SNAPSHOT");
		var bBindAllColumns = wizard.FindSymbol("BIND_ALL_COLUMNS");
		var strCodeDecl = wizard.GetODBCConsumerClassDecl(bBindAllColumns, bSnapshot, strClassName);
		var strCodeImpl = wizard.GetODBCConsumerClassImpl();
		wizard.AddSymbol("ROWSET_CLASS_ODBC_DECL", strCodeDecl);
		wizard.AddSymbol("ROWSET_CLASS_ODBC_IMPL", strCodeImpl);
		// Add header
		RenderAddTemplate("consumer.h", strHeaderFile, selProj, true);
		RenderAddTemplate("consumer.cpp", strImplFile, selProj, false);

		if (!DoesIncludeExist(selProj, "\"stdafx.h\"", strImplFile))
			selProj.CodeModel.AddInclude("\"stdafx.h\"", strImplFile, vsCMAddPositionEnd);
		if (!DoesIncludeExist(selProj, '"' + strHeaderFile + '"', strImplFile))
			selProj.CodeModel.AddInclude( '"' + strHeaderFile + '"', strImplFile, vsCMAddPositionEnd);

		var strProjectName = wizard.FindSymbol("PROJECT_NAME");

		var nTotal = selProj.Object.Configurations.Count;
		var nCntr;
		var pchFile = "";
		for (nCntr = 1; nCntr <= nTotal; nCntr++)
		{
			var VCCLTool = selProj.Object.Configurations(nCntr).Tools("VCCLCompilerTool");
			if(VCCLTool.UsePrecompiledHeader == pchUseUsingSpecific)
			{
				if(pchFile=="")
					pchFile = VCCLTool.PrecompiledHeaderThrough;
			}
			var VCLinkTool = selProj.Object.Configurations(nCntr).Tools("VCLinkerTool");
			if (-1 == VCLinkTool.AdditionalDependencies.toUpperCase().search("ODBC32.LIB"))
			{
				VCLinkTool.AdditionalDependencies += " odbc32.lib";
			}
		}
		if(pchFile!="")
		{
			// Add necessary #include to pchFile
			if (!DoesIncludeExist(selProj, "<afxdb.h>", pchFile))
				selProj.CodeModel.AddInclude("<afxdb.h>", pchFile, vsCMAddPositionEnd);
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
