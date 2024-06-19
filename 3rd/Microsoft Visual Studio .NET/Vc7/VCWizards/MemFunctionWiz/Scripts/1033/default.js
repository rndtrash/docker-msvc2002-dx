// (c) 2001 Microsoft Corporation
function OnFinish(selProj, Class)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var strName = wizard.FindSymbol("FUNCTION_NAME");
		var L_TransactionNameString_Text = "Add Function ";
		oCM.StartTransaction(L_TransactionNameString_Text + strName);

		var strComment = wizard.FindSymbol("COMMENT");
		var vsAccess = wizard.FindSymbol("ACCESS");
		var strNameWithParam = wizard.FindSymbol("FUNCTION_FULLNAME");

		var strType = wizard.FindSymbol("RETURN_TYPE");

		var strClassName = wizard.FindSymbol("PARENT_NAME");
		if(Class.Name != strClassName)
		{
			oCM.AbortTransaction();

			var L_wrongContextObjectErr_Text = "Wrong context object in OnFinish";
			var oError = new Error(L_wrongContextObjectErr_Text)
			SetErrorInfo(oError);
			return;
		}

		var strImplFile = "";
		var kind = vsCMFunctionFunction;
		var bPure = wizard.FindSymbol("PURE");

		if (wizard.FindSymbol("INLINE"))
		{
			// Indicate inline member function
			kind = kind | vsCMFunctionInline;
		}
		else
		{
			// Not inline so provide implementation filename
			if (!bPure)
				strImplFile = wizard.FindSymbol("IMPL_FILE");
		}

		if(wizard.FindSymbol("VIRTUAL"))
		{
			// Indicate virtual member function
			kind = kind | vsCMFunctionVirtual;

			if (bPure)
			{
				// Indicate pure virtual member function
				kind = kind | vsCMFunctionPure;
				// pure virtual must not have an implementation file.
				strImplFile = "";
			}
		}
		else
		{
			// Not virtual 
			if(wizard.FindSymbol("STATIC"))
			{
				// Indicate static member function
				kind = kind | vsCMFunctionShared;
			}
		}

		// Add the member function to the class
		var func = Class.AddFunction(strNameWithParam, kind, strType, vsCMAddPositionEnd, vsAccess, strImplFile);

		if (!(kind | vsCMFunctionPure))
		{
			var strBody = func.BodyText;
			var L_todostring_Text = "// TODO: Add your implementation code here.\r\n";
			strBody = L_todostring_Text + strBody;
			func.BodyText = strBody;
		}

		var strHeader;
		if (selProj.Object.keyword == "ManagedCProj")
			strHeader = Class.Location(vsCMWhereDefault);
		else
			strHeader = "stdafx.h";

		if (strType == "HRESULT")
		{
			if (!DoesIncludeExist(selProj, "<windows.h>", strHeader))
				oCM.AddInclude("<windows.h>", strHeader, vsCMAddPositionEnd);
		}

		if(strComment != "")
		{
			// Associate the comment provided with the function created
			func.Comment = strComment;
		}

		oCM.CommitTransaction();

		//move the cursor to the new added function
		ShowTextPoint(func.StartPoint);
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
