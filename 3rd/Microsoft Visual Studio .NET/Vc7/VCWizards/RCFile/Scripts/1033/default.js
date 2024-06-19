// (c) 2001 Microsoft Corporation
function OnFinish(selProj, selObj)
{
	var oCM;
    try
    {
		oCM	= selProj.CodeModel;

		var strFileName = wizard.FindSymbol("ITEM_NAME");
		if (!ValidateFileExtension(strFileName))
		{
			wizard.ReportError();
			return VS_E_WIZARDBACKBUTTONPRESS;
		}

        var L_TRANSACTION_Text = "Add resource file";
        oCM.StartTransaction(L_TRANSACTION_Text);
        var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
        var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
        var strFileName = wizard.FindSymbol("ITEM_NAME");
        
        var strParamList = strFileName.split("\\");
        wizard.AddSymbol("FILE_ONLY_NAME", strParamList[strParamList.length - 1]);

        var strFile = strProjectPath + "\\" + "resource.h";
        var strTemplate = strTemplatePath + "\\" + "resource.h";
        var rcfile;

        var InfFile = CreateInfFile();
        var strTextStream = InfFile.OpenAsTextStream(1, -2);
        while (!strTextStream.AtEndOfStream)
        {
            strTpl = strTextStream.ReadLine();
            if (strTpl != "")
            {
                strName = strTpl;
                if(strName == "resource.h")
                {
                    var res_file_count = 1;
                    if (IsFileInProject(selProj, "resource.h"))
                    {
                        var res_file_name = "resource" + res_file_count + ".h";

                        while (IsFileInProject(selProj, res_file_name))
                        {
                            res_file_count++;
                            res_file_name = "resource" + res_file_count + ".h";
                        }
	                    strName = res_file_name;
                    }
                    wizard.AddSymbol("RESOURCE_INCLUDE", strName);
                }
                var strTarget = GetTargetName(strName);
                var strTemplate = strTemplatePath + "\\" + strTpl;
                var strFile = strTarget;


                wizard.RenderTemplate(strTemplate, strFile);

                var projfile = selProj.ProjectItems.AddFromFile(strFile);
                if( strName == "rcfile.rc" )
                {
                    rcfile = projfile;
                }
            
            }
        }
        
        if( rcfile )
        {
            var window = rcfile.Open(vsViewKindPrimary);
            if(window)
                window.visible = true;
        }

        strTextStream.Close();
        oCM.CommitTransaction();    
        InfFile.Delete();
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

function GetTargetName(strName)
{
	try
	{
		var strFileName = wizard.FindSymbol("ITEM_NAME");

		if(strName.substring(0,8) == "resource")
		{
			// The resource file needs to be in the same directory as the rc file, not the project path.
			strName = strFileName.substr(0, strFileName.lastIndexOf("\\") + 1) + strName;
			return strName;
		}
		else
		{
			return strFileName;
		}
	}
	catch(e)
	{
		throw e;
	}
}

function ValidateFileExtension(strFileName)
{
	if(!wizard.dte.VCLanguageManager.ValidateFileName(strFileName, vsCMValidateFileExtNone))
	{
		return false;
	}

	var rgstrSplitPathName = strFileName.split(".");
	if((rgstrSplitPathName.length != 1) && (rgstrSplitPathName[rgstrSplitPathName.length - 1] != "rc"))
	{
		var L_Err2_Text = "File extension has to be \".rc\".";
		oErrObj = new Error(L_Err2_Text);
		SetErrorInfo(oErrObj);
		return false;
	}
	return true;
}

function IsFileInProject(oProj, strFileIn)
{
    try
    {
        var fileItems = oProj.ProjectItems;
        var count = fileItems.count;
        for (var nPos = 0; nPos < count; nPos++)
        {
            var fileItem = fileItems.Item(nPos+1);
            var strFileName = fileItem.Name;
                if (strFileName.toLowerCase() == strFileIn.toLowerCase())
                return true;
        }
        return false;
    }
    catch(e)
    {   
		throw e;
    }
}
