// (c) 2001 Microsoft Corporation
function OnFinish(selProj, selObj)
{
    var oCM;
    try
    {
        oCM = selProj.CodeModel;

        var L_TRANSACTION_Text = "Add resource file";
        oCM.StartTransaction(L_TRANSACTION_Text);
        var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
        var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
        var strProjectName = wizard.FindSymbol("PROJECT_NAME");
        
        var strFile = strProjectPath + "\\" + "resource.h";
        var strTemplate = strTemplatePath + "\\" + "resource.h";

        var  strTargetIncludeName = GetTargetName("resource.h");

        var rgstrSplitPath = strTargetIncludeName.split("\\");
        wizard.AddSymbol("RESOURCE_INCLUDE", rgstrSplitPath[rgstrSplitPath.length - 1]);
        var strTargetResourceName = GetTargetName(strProjectName+".rc");
        rgstrSplitPath = strTargetResourceName.split("\\");
        wizard.AddSymbol("FILE_ONLY_NAME", rgstrSplitPath[rgstrSplitPath.length - 1]);

        wizard.RenderTemplate(strTemplatePath + "\\resource.h", strTargetIncludeName, false, true);
        selProj.ProjectItems.AddFromFile(strTargetIncludeName);
        wizard.RenderTemplate(strTemplatePath + "\\rcfile.rc", strTargetResourceName, false, true);        
        selProj.ProjectItems.AddFromFile(strTargetResourceName);
        oCM.CommitTransaction();
    }
    catch(e)
    {
        if (oCM)
            oCM.AbortTransaction();

        if (e.description.length != 0)
            SetErrorInfo(e);
        return e.number;
    }
}

function GetTargetName(strName)
{
    try
    {
        var strProjectPath = wizard.FindSymbol("PROJECT_PATH");

        strName = GetUniqueFileName(strProjectPath, strName);
        var strFileName = strProjectPath;
        strFileName += "\\";
        strFileName += strName;
        return strFileName;
    }
    catch(e)
    {
        throw e;
    }
}

