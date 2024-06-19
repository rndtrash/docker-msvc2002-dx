// (c) 2001 Microsoft Corporation
function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var strProjectName = wizard.FindSymbol("PROJECT_NAME");

		var strClassName = wizard.FindSymbol("CLASS_NAME");
		var strHeader = wizard.FindSymbol("HEADER_FILE");
		var strImpl = wizard.FindSymbol("IMPL_FILE");
		var strBaseName = wizard.FindSymbol("BASE_CLASS_NAME");

		var L_TransactionName_Text = "Wizard Added ";
		oCM.StartTransaction(L_TransactionName_Text + strClassName);

		var newclass = oCM.AddClass(strClassName, strHeader, vsCMAddPositionEnd, "", "", vsCMAccessDefault);
		if (strBaseName != "")
		{
			var oBase = newclass.AddBase(strBaseName, vsCMAddPositionEnd);
			oBase.Access = wizard.FindSymbol("ACCESS");
		}
		
		newclass.AddFunction(strClassName, vsCMFunctionConstructor, "", vsCMAddPositionEnd, vsCMAccessPublic, strImpl);
		var oDestructor = newclass.AddFunction("~"+strClassName, vsCMFunctionDestructor, "", vsCMAddPositionEnd, vsCMAccessPublic, strImpl);
		oDestructor.IsVirtual = wizard.FindSymbol("VIRTUAL_DTOR")==true;
		if(strBaseName != "")
		{
			try
			{
				IncludeCodeElementDeclaration(selProj, strBaseName, newclass.Location(vsCMWhereDefault));
			}
			catch(e)
			{
				//don't display the error in case base class was not found: the warning was already displayed in HTML script
				//var L_ErrMsg1_Text = "Unable to find base class definition: ";
				//wizard.ReportError( L_ErrMsg1_Text + e.description);
			}
		}

		oCM.CommitTransaction();
		
		ShowTextPoint(newclass.StartPoint);
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

