// (c) 2001 Microsoft Corporation
// Script for Add Method Wizard

var aryParamVT = new Array;
var aryParamTypeNames = new Array;
var aryParamAttribs = new Array;

function OnFinish(selProj, oInterface)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var L_TRANSACTION_Text = "Add Method ";
		var strInternalName	= wizard.FindSymbol("INTERNAL_NAME");
		oCM.StartTransaction(L_TRANSACTION_Text + strInternalName);

		if (typeDynamicLibrary == selProj.Object.Configurations(1).ConfigurationType)
			wizard.AddSymbol("DLL", true);
		else
			wizard.AddSymbol("DLL", false);

		var bMFC = wizard.FindSymbol("MFC_CLASS");
		InitParams(bMFC);

		var strFile = oInterface.File;
		if (strFile.length >= 5 &&
			(".IDL" == strFile.substr(strFile.length-4).toUpperCase() ||
			".ODL" == strFile.substr(strFile.length-4).toUpperCase()))
		{
			wizard.AddSymbol("EMBEDDED_IDL", false);
		}
		else
		{
			wizard.AddSymbol("EMBEDDED_IDL", true);
		}

		var strAttributes = GetAttributes();
		AddToIDL(oInterface, strAttributes);

		// Class changes
		var aryClasses = new Array();
		var strInterface = oInterface.Name;
		GetInterfaceClasses(strInterface, selProj, aryClasses);
		for (var nIndex = 0; nIndex < aryClasses.length; nIndex++)
		{
			var oClass = aryClasses[nIndex];

			// MFC class
			if (bMFC && oClass.IsDerivedFrom("CCmdTarget"))
				AddToMFCClass(oClass);

			// non-MFC class
			else
				AddToClass(oClass, selProj);
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

function AddToMFCClass(oClass)
{
	try
	{
		var bStock				= wizard.FindSymbol("STOCK");
		var strReturnType		= wizard.FindSymbol("RETURN_TYPE");
		var strExternalName		= wizard.FindSymbol("EXTERNAL_NAME");
		var nNumParams			= wizard.FindSymbol("NUM_PARAMETERS");
		var strInternalName		= wizard.FindSymbol("INTERNAL_NAME");
		var strDispid			= wizard.FindSymbol("DISPID");

		var strClassName = oClass.Name;
		var oMap = oClass.Maps.Find("DISPATCH");

		if (bStock)
			oMap.AddEntry(wizard.FindSymbol("STOCK_MACRO"), vsCMAddPositionEnd);
		else
		{			
			var oMapItem = oMap.AddEntry("DISP_FUNCTION_ID", vsCMAddPositionEnd);
			oMapItem.AddParameter(strClassName, vsCMAddPositionEnd);
			oMapItem.AddParameter('"' + strExternalName + '"', vsCMAddPositionEnd);
			oMapItem.AddParameter("dispid" + strExternalName, vsCMAddPositionEnd);
			oMapItem.AddParameter(strInternalName, vsCMAddPositionEnd);
			oMapItem.AddParameter(wizard.FindSymbol("RETURN_TYPE_VT"), vsCMAddPositionEnd);

			var strParamTypes = "";
			for (nCntr = 0; nCntr < aryParamVT.length; nCntr++)
			{
				if (strParamTypes.length)
					strParamTypes += " ";
				strParamTypes += aryParamVT[nCntr];
			}
			if (strParamTypes.length == 0)
				strParamTypes = "VTS_NONE";

			oMapItem.AddParameter(strParamTypes, vsCMAddPositionEnd);

			// add prototype and implementation
			var strCPP = oMap.Location(vsCMWhereDefault);
			strCPP = strCPP.substr(strCPP.lastIndexOf("\\")+1);

			var strParams = "(";
			for (nCntr = 0; nCntr < nNumParams; nCntr++)
			{
				if (nCntr > 0)
					strParams += ", ";
				if (aryParamTypeNames[nCntr].substr(0, 5) == "BSTR " &&
					aryParamTypeNames[nCntr].substr(0, 6) != "BSTR *")
				{
					strParams += "LPCTSTR " + aryParamTypeNames[nCntr].substr(5);
				}
				else
					strParams += aryParamTypeNames[nCntr];
			}
			strParams += ")";

			var oFunction = oClass.AddFunction(strInternalName + strParams, vsCMFunctionFunction, strReturnType, vsCMAddPositionEnd, vsCMAccessProtected, strCPP);

			oFunction.BodyText = GetFunctionBodyForReturnType(strReturnType);

			// add dispidXXX in enum in Class.h
			var oEnum;
			if (oClass.Enums.Count)
				oEnum = oClass.Enums(1);
			else
				oEnum = oClass.AddEnum("", vsCMAddPositionEnd);

			var oEnumMember = oEnum.AddMember("dispid" + strExternalName, vsCMAddPositionEnd);
			oEnumMember.InitExpression = strDispid + "L";
		}
	}
	catch(e)
	{
		throw e;
	}
}

function AddToClass(oClass, selProj)
{
	try
	{
		var strReturnType		= wizard.FindSymbol("RETURN_TYPE");
		var strExternalName		= wizard.FindSymbol("EXTERNAL_NAME");
		var nNumParams			= wizard.FindSymbol("NUM_PARAMETERS");

		var strCPP = oClass.Location(vsCMWhereDefault);
		strCPP = strCPP.substr(strCPP.lastIndexOf("\\")+1);
		strCPP = strCPP.substring(0, strCPP.lastIndexOf(".")+1) + "cpp";
		if (!selProj.Object.Files(strCPP))
			strCPP = "";

		var strParams = "(";
		for (nCntr = 0; nCntr < nNumParams; nCntr++)
		{
			if (nCntr > 0)
				strParams += ", ";
			if (aryParamTypeNames[nCntr].substr(0, 10) == "SAFEARRAY(")
			{
				strParams += "SAFEARRAY * " + aryParamTypeNames[nCntr].substr(aryParamTypeNames[nCntr].indexOf(')') + 2);
			}
			else
				strParams += aryParamTypeNames[nCntr];
		}
		strParams += ")";

		var oFunction = oClass.AddFunction(strExternalName + strParams, vsCMFunctionComMethod, strReturnType, vsCMAddPositionEnd, vsCMAccessPublic, strCPP);

		oFunction.BodyText = GetFunctionBodyForReturnType(strReturnType);
	}
	catch(e)
	{
		throw e;
	}
}

function AddToIDL(oInterface, strAttributes)
{
	try
	{
		var bStock				= wizard.FindSymbol("STOCK");
		var strReturnType		= wizard.FindSymbol("RETURN_TYPE");
		var strExternalName		= wizard.FindSymbol("EXTERNAL_NAME");
		var strInterfaceType	= wizard.FindSymbol("INTERFACE_TYPE");
		var nNumParams			= wizard.FindSymbol("NUM_PARAMETERS");
		var bEmbeddedIDL		= wizard.FindSymbol("EMBEDDED_IDL");

		var strAllAttribs = "[";
		if (bStock)
			strAllAttribs += "id(" + wizard.FindSymbol("STOCK_DISPID") + "), ";
		else
		{
			if (strInterfaceType != "custom")
				strAllAttribs += "id(" + wizard.FindSymbol("DISPID") + "), ";
		}

		strAllAttribs += strAttributes + "] ";

		strRet = strAllAttribs + strReturnType;

		var strParams = "(";
		for (nCntr = 0; nCntr < nNumParams; nCntr++)
		{
			if (nCntr > 0)
				strParams += ", ";
			if (bEmbeddedIDL && aryParamTypeNames[nCntr].substr(0, 10) == "SAFEARRAY(")
			{
				strParams += "["
				if (aryParamAttribs[nCntr].length)
					strParams += aryParamAttribs[nCntr] + ", ";
				strParams += "satype(";
				strParams += aryParamTypeNames[nCntr].substring(10, aryParamTypeNames[nCntr].indexOf(')'));
				strParams += ")] ";
				strParams += "SAFEARRAY * " + aryParamTypeNames[nCntr].substr(aryParamTypeNames[nCntr].indexOf(')') + 2);
			}
			else
			{
				if (aryParamAttribs[nCntr].length)
					strParams += "[" + aryParamAttribs[nCntr] + "] ";
				strParams += aryParamTypeNames[nCntr];
			}
		}
		strParams += ")";

		var oFunction = oInterface.AddFunction(strExternalName + strParams, vsCMFunctionFunction, strRet, vsCMAddPositionEnd, vsCMAccessDefault);
	}
	catch(e)
	{
		throw e;
	}
}

function InitParams(bMFC)
{
	try
	{
		var nNumParams = wizard.FindSymbol("NUM_PARAMETERS");
		for (var nCntr = 0; nCntr < nNumParams; nCntr++)
		{
			if (bMFC)
				aryParamVT[nCntr] = wizard.FindSymbol("PARAM_VT_TYPE" + nCntr);
			aryParamTypeNames[nCntr] = wizard.FindSymbol("PARAM_TYPE_NAME" + nCntr);
			if (aryParamTypeNames[nCntr].substr(0, 12) == "OLE_TRISTATE")
				aryParamTypeNames[nCntr] = "enum " + aryParamTypeNames[nCntr];
			aryParamAttribs[nCntr] = wizard.FindSymbol("PARAM_ATTRIB" + nCntr);
		}

		var strReturnType = wizard.FindSymbol("RETURN_TYPE");
		if (strReturnType.substr(0, 12) == "OLE_TRISTATE")
		{
			strReturnType = "enum " + strReturnType;
			wizard.AddSymbol("RETURN_TYPE", strReturnType);
		}
	}
	catch(e)
	{
		throw e;
	}
}

function GetAttributes()
{
	try
	{
		var strHelpString		= wizard.FindSymbol("HELP_STRING");
		var strCallAs			= wizard.FindSymbol("CALL_AS");
		var strHelpContext		= wizard.FindSymbol("HELP_CONTEXT");
		var bHidden				= wizard.FindSymbol("HIDDEN");
		var bLocal				= wizard.FindSymbol("LOCAL");
		var bRestricted			= wizard.FindSymbol("RESTRICTED");
		var bSource				= wizard.FindSymbol("SOURCE");
		var bVararg				= wizard.FindSymbol("VAR_ARG");

		var strAttributes = "";

		if (strHelpString != "")
			strAttributes += 'helpstring("' + strHelpString + '")';
		else
		{
			var strExternalName = wizard.FindSymbol("EXTERNAL_NAME");
			strAttributes += 'helpstring("method ' + strExternalName + '")';
		}

		if (strCallAs != "")
			strAttributes += ', call_as(' + strCallAs + ')';

		if (strHelpContext != "")
			strAttributes += ', helpcontext(' + strHelpContext + ')';

		if (bHidden)
			strAttributes += ", hidden";

		if (bLocal)
			strAttributes += ", local";

		if (bRestricted)
			strAttributes += ", restricted";

		if (bSource)
			strAttributes += ", source";

		if (bVararg)
			strAttributes += ", vararg";

		return strAttributes;
	}
	catch(e)
	{
		throw e;
	}
}

function GetFunctionBodyForReturnType(strReturnType)
{
	try
	{
		var strBody = "";
		var strComment = "";
		var bMFCProject = wizard.FindSymbol("MFC_PROJECT");
		if (bMFCProject)
		{
			var bDLL = wizard.FindSymbol("DLL");
			if (bDLL)
				strBody = "AFX_MANAGE_STATE(AfxGetStaticModuleState());\r\n\r\n";
			else
				strBody = "AFX_MANAGE_STATE(AfxGetAppModuleState());\r\n\r\n";
		}

		var bMFC = wizard.FindSymbol("MFC_CLASS");
		if (bMFC)
		{
			var L_Comment1_Text = "\57\57 TODO: Add your dispatch handler code here\r\n\r\n";
			strComment = L_Comment1_Text;
		}
		else
		{
			var L_Comment2_Text = "\57\57 TODO: Add your implementation code here\r\n\r\n";
			strComment = L_Comment2_Text;
		}
		switch(strReturnType)
		{
			case "IDispatch*":
			case "IFontDisp*":
			case "IPictureDisp*":
			case "IUnknown*":
			case "OLE_HANDLE":
				strBody += strComment;
				strBody += "return NULL;\r\n";
				break;

			case "DATE":
				strBody += strComment;
				strBody += "return (DATE)0;\r\n";
				break;

			case "OLE_COLOR":
				strBody += strComment;
				strBody += "return RGB(0,0,0);\r\n";
				break;

			case "enum OLE_TRISTATE":
				strBody += strComment;
				strBody += "return (OLE_TRISTATE)0;\r\n";
				break;

			case "HRESULT":
			case "SCODE":
				strBody += strComment;
				strBody += "return S_OK;\r\n";
				break;

			case "BSTR":
				if (bMFC)
				{
					strBody += "CString strResult;\r\n\r\n";
					strBody += strComment;
					strBody += "return strResult.AllocSysString();\r\n";
				}
				else
				{
					strBody += strComment;
					strBody += "return NULL;\r\n";
				}
				break;

			case "CY":
				strBody += "CURRENCY cyResult = { 0, 0 };\r\n\r\n";
				strBody += strComment;
				strBody += "return cyResult;\r\n";
				break;

			case "VARIANT":
				strBody += "VARIANT vaResult;\r\n";
				strBody += "VariantInit(&vaResult);\r\n\r\n";
				strBody += strComment;
				strBody += "return vaResult;\r\n";
				break;

			case "VARIANT_BOOL":
				strBody += strComment;
				strBody += "return VARIANT_TRUE;\r\n";
				break;

			case "void":
				strBody += strComment.substr(0, strComment.length-2);;
				break;
			
			default:
				strBody += strComment;
				strBody += "return 0;\r\n";
				break;			
		}
		return strBody;
	}
	catch(e)
	{
		throw e;
	}
}