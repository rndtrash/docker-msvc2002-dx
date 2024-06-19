// (c) 2001 Microsoft Corporation
function OnFinish(selProj, selObj)
{   
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
		var strDefFileName = wizard.FindSymbol("ITEM_NAME");
		var L_addFile_Text = "Add file ";
		oCM.StartTransaction( L_addFile_Text + strDefFileName);
	
		// check whether there is already a .def file in the project
		var nPI, strPIName;
		for (nPI=1; nPI<=selProj.ProjectItems.Count; nPI++)
		{
			strPIName = selProj.ProjectItems(nPI).Name;
			if (strPIName.substr(strPIName.length-4)==".def")
			{	
				L_DefFileExists_Text = "There can be only one .def file per project";
				var oError = new Error(L_DefFileExists_Text);
				SetErrorInfo(oError);
				return;
			}
		}

		// use the filesystem object to check for file existance
		var oFSO = new ActiveXObject("Scripting.FileSystemObject");
		if (oFSO.FileExists(strDefFileName))
		{
			L_thisFileExists_Text = " already exists. Please choose a different file name.";
			wizard.ReportError(strDefFileName + L_thisFileExists_Text);
			return VS_E_WIZCANCEL;
		}
		
		// render the def file 
		var oLinker = selProj.Object.Configurations(1).Tools("VCLinkerTool");
		if (oLinker.LinkDll == true)
			wizard.RenderTemplate(strTemplatePath + "\\" + "root.def", strDefFileName);
		else
			wizard.RenderTemplate(strTemplatePath + "\\" + "empty.def", strDefFileName);

		//add the def file to the project
		selProj.Object.AddFile(strDefFileName);
		// add "/DEF:<filename>" to the linker options
		var nConfig;
		for (nConfig=1; nConfig<= selProj.Object.Configurations.Count; nConfig++)
		{ 
			var oLinker = selProj.Object.Configurations(nConfig).Tools("VCLinkerTool");
			oLinker.ModuleDefinitionFile = StripPath(strDefFileName);
		}

       var deffile = selProj.ProjectItems( strDefFileName );
       if( deffile )
       {
           var window = deffile.Open(vsViewKindPrimary);
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

function StripPath(strFullPath)
{
	try
	{
		var nIndex = strFullPath.lastIndexOf("\\", strFullPath.length);
		if (nIndex != -1)
		{
			return strFullPath.substring(nIndex+1, strFullPath.length);
		}
		
		return strFullPath;
	}
	catch(e)
	{
		throw e;
	}
}

