// (c) 2001 Microsoft Corporation
function OnFinish(selProj, selObj)
{   
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
		var strFileName = wizard.FindSymbol("ITEM_NAME");

		var L_TRANSACTION_Text = "Add ";
		oCM.StartTransaction(L_TRANSACTION_Text + strFileName);

		// use the filesystem object to check for file existance
		var oFSO = new ActiveXObject("Scripting.FileSystemObject");
		if (oFSO.FileExists(strFileName))
		{
			var L_Error1_Text = " already exists. Please choose a different file name.";
			wizard.ReportError(strFileName + L_Error1_Text);
			return VS_E_WIZCANCEL;
		}
		
		// render the srf file 
		wizard.RenderTemplate(strTemplatePath + "\\" + "rootapp.srf", strFileName);
		
		// add the srf file to the project
		selProj.Object.AddFile(strFileName);
		var srffile = selProj.ProjectItems( strFileName );
        if( srffile )
        {
            var window = srffile.Open(vsViewKindPrimary);
            if(window)
                window.visible = true;
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


