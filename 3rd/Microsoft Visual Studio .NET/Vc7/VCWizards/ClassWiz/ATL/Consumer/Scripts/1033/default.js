// (c) 2001 Microsoft Corporation
// Script for ATL Consumer

function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{		
		oCM	= selProj.CodeModel;

		var strClassName = wizard.FindSymbol("CLASS_NAME");

		var L_TransactionName_Text = "Add ATL Consumer class ";
		oCM.StartTransaction(L_TransactionName_Text + strClassName);

		var strProjectPath		= wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath		= wizard.FindSymbol("TEMPLATES_PATH");
		var strHeaderFile		= wizard.FindSymbol("HEADER_FILE");

		var bAttributed			= wizard.FindSymbol("ATTRIBUTED");
		var bCommand			= wizard.FindSymbol("TYPE_COMMAND");
		var bChange				= wizard.FindSymbol("SUPPORT_CHANGE");
		var bInsert				= wizard.FindSymbol("SUPPORT_INSERT");
		var bDelete				= wizard.FindSymbol("SUPPORT_DELETE");

// The following 4 symbols need to be set before calling GetConsumerClass.
// They were previously set by window.external.SelectDataSource().
// You must set these yourself if not using SelectDataSource().
// 1. DB_CONNECTION_STRING - check return value from SelectDataSource for format
// 2. DB_TABLE - table name
// 3. DB_SCHEMA - table schema
// 4. DB_STORED_PROCEDURE - boolean indicating whether this is a stored procedure
		
		var strDTLCode = wizard.GetConsumerClass(strClassName, bAttributed, bCommand, bChange, bInsert, bDelete);
		wizard.AddSymbol("DTL_CODE", strDTLCode);
		// Add header
		RenderAddTemplate("consumer.h", strHeaderFile, selProj, true);

		var strProjectName = wizard.FindSymbol("PROJECT_NAME");

		var nTotal = selProj.Object.Configurations.Count;
		var nCntr;
		var pchFile = "";
		for (nCntr = 1; nCntr <= nTotal; nCntr++)
		{
			var VCCLTool = selProj.Object.Configurations(nCntr).Tools("VCCLCompilerTool");
			if(VCCLTool.UsePrecompiledHeader == pchUseUsingSpecific)
			{
				if(!pchFile.length)
					pchFile = VCCLTool.PrecompiledHeaderThrough;
			}
			if (bAttributed)
			{
				// Add #define _ATL_ATTRIBUTES
				if (-1 == VCCLTool.PreprocessorDefinitions.search("_ATL_ATTRIBUTES"))
				{
					VCCLTool.PreprocessorDefinitions += ";_ATL_ATTRIBUTES";
				}
			}
			var VCLinkTool = selProj.Object.Configurations(nCntr).Tools("VCLinkerTool");
			if (-1 == VCLinkTool.AdditionalDependencies.toUpperCase().search("MSDASC.LIB"))
			{
				VCLinkTool.AdditionalDependencies += " msdasc.lib";
			}
		}
		if (!pchFile.length)
		{
			pchFile = GetProjectFile(selProj, "H");
			if (!pchFile || !pchFile.length)
				pchFile = GetProjectFile(selProj, "CPP");
		}
		if(pchFile && pchFile.length)
		{
			// Add necessary #include to pchFile
			if (!DoesIncludeExist(selProj, "<atldbcli.h>", pchFile))
				selProj.CodeModel.AddInclude("<atldbcli.h>", pchFile, vsCMAddPositionEnd);
		}

		oCM.CommitTransaction();
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
