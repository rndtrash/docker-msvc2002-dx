// (c) 2001 Microsoft Corporation
// Script for Add Event

function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var strExternalName = wizard.FindSymbol("EXTERNAL_NAME");
		var L_TRANSACTION_Text = "Add ActiveX Event ";
		oCM.StartTransaction(L_TRANSACTION_Text + strExternalName);

		var strInternalName		= wizard.FindSymbol("INTERNAL_NAME");
		var bStock				= wizard.FindSymbol("STOCK");
		var nNumParams			= wizard.FindSymbol("NUM_PARAMETERS");
		var oClass				= selObj;
		var strClassName		= oClass.Name;
		var oMap				= oClass.Maps.Find("EVENT");
		var strInterfaceName	= wizard.FindSymbol("INTERFACE_NAME");
		var oInterface			= oCM.IDLLibraries(1).Interfaces.Find(strInterfaceName);
		var nDispID				= GetMaxID(oInterface) + 1;

		// set param variables
		var strParamVtTypes = "";
		var strParamNames = "";
		var strParamTypeNames = "";
		var strParamTypeNamesIDL = "";
		for (nCntr = 0; nCntr < nNumParams; nCntr++)
		{
			if (strParamVtTypes.length)
				strParamVtTypes += " ";
			strParamVtTypes += wizard.FindSymbol("PARAM_VT_TYPE" + nCntr);

			var strType = wizard.FindSymbol("PARAM_TYPE" + nCntr);
			var strName = wizard.FindSymbol("PARAM_NAME" + nCntr);
			if (strParamTypeNames.length)
				strParamTypeNames += ", ";
			if (strParamTypeNamesIDL.length)
				strParamTypeNamesIDL += ", ";
			strParamTypeNamesIDL += strType + " " + strName;
			if (strType == "BSTR")
				strType = "LPCTSTR";
			strParamTypeNames += strType + " " + strName;
			strParamNames += ", " + strName;
		}
		if (strParamVtTypes.length == 0)
			strParamVtTypes = "VTS_NONE";
		strParamTypeNames = "(" + strParamTypeNames + ")";
		strParamTypeNamesIDL = "(" + strParamTypeNamesIDL + ")";

		// add entry in EVENT MAP
		if (bStock)
		{
			oMap.AddEntry(wizard.FindSymbol("STOCK_MACRO"), vsCMAddPositionEnd);
		}
		else
		{			
			var oMapItem = oMap.AddEntry("EVENT_CUSTOM_ID", vsCMAddPositionEnd);
			oMapItem.AddParameter('"' + strExternalName + '"', vsCMAddPositionEnd);
			oMapItem.AddParameter("eventid" + strExternalName, vsCMAddPositionEnd);
			oMapItem.AddParameter(strInternalName, vsCMAddPositionEnd);
			oMapItem.AddParameter(strParamVtTypes, vsCMAddPositionEnd);
	
			// add FireXXX into Class.h

			var oFunction = oClass.AddFunction(strInternalName + strParamTypeNames, vsCMFunctionFunction, "void", vsCMAddPositionEnd, vsCMAccessProtected);
			oFunction.BodyText = "FireEvent(eventid" + strExternalName + ", EVENT_PARAM(" + strParamVtTypes + ")" + strParamNames + ");\r\n";

			// add eventidXXX in enum in Class.h
			var oEnum;
			if (oClass.Enums.Count)
				oEnum = oClass.Enums(1);
			else
				oEnum = oClass.AddEnum("", vsCMAddPositionEnd);
			var oEnumMember = oEnum.AddMember("eventid" + strExternalName, vsCMAddPositionEnd);
			oEnumMember.InitExpression = nDispID + "L";
		}

		// add entry in ODL/IDL
		var strReturnType;
		if (bStock)
			strReturnType = "[id(" + wizard.FindSymbol("STOCK_DISPID") + ")] void";
		else
			strReturnType = "[id(" + nDispID + ")] void";
		var oFunction = oInterface.AddFunction(strExternalName + strParamTypeNamesIDL, vsCMFunctionFunction, strReturnType, vsCMAddPositionEnd, vsCMAccessDefault);

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
