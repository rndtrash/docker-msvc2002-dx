// (c) 2001 Microsoft Corporation
// Script for Add Property Wizard

var aryParamVT = new Array;
var aryParamTypeNames = new Array;
var aryParamAttribs = new Array;

function OnFinish(selProj, oInterface)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var L_TRANSACTION_Text = "Add Property";
		oCM.StartTransaction(L_TRANSACTION_Text);

		if (typeDynamicLibrary == selProj.Object.Configurations(1).ConfigurationType)
			wizard.AddSymbol("DLL", true);
		else
			wizard.AddSymbol("DLL", false);

		var bMFC = wizard.FindSymbol("MFC_CLASS");

		// IDL changes
		//
		var bIsManaged = oInterface.IsManaged;
		
		if (bIsManaged)
		{
			AddToManaged(oInterface, true);
		}
		else
		{	
			InitParams(bMFC);
			var strAttributes = GetAttributes();

			if (bMFC)
				AddToIDLMFC(oInterface, strAttributes);
			else
			{
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

				AddToIDL(oInterface, strAttributes);
			}
		}
		
		// Class changes
		//
		
		var aryClasses = new Array();
		GetInterfaceClasses(oInterface.Name, selProj, aryClasses);
		for (var nIndex = 0; nIndex < aryClasses.length; nIndex++)
		{
			var oClass = aryClasses[nIndex];
			
			// same code for COleControl-derived class
			if (bMFC && oClass.IsDerivedFrom("CCmdTarget"))
				AddToClassMFC(oClass);
			// not CCmdTarget-derived
			else if (bIsManaged)
				AddToManaged(oClass, false);
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

function AddToClass(oClass, selProj)
{
	try
	{
		var strExternalName	= wizard.FindSymbol("EXTERNAL_NAME");
		var strType			= wizard.FindSymbol("TYPE");
		var strReturnType	= wizard.FindSymbol("RETURN_TYPE");
		var bGenerateGet	= wizard.FindSymbol("GENERATE_GET");
		var bGeneratePut	= wizard.FindSymbol("GENERATE_PUT");
		var bPropPutRef		= wizard.FindSymbol("PROPPUTREF");
		var nNumParams		= wizard.FindSymbol("NUM_PARAMETERS");

		// if derived from CComObjectRootEx or interface
		// add prototype and implementation
		var strCPP = oClass.Location(vsCMWhereDefault);
		strCPP = strCPP.substr(strCPP.lastIndexOf("\\")+1);
		strCPP = strCPP.substring(0, strCPP.lastIndexOf(".")+1) + "cpp";
		if (!selProj.Object.Files(strCPP))
			strCPP = "";

		var oGetFunction = false;
		var oPutFunction = false;

		var strParams = "";
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
		if (strParams.length)
			strParams += ", ";

		if (bGenerateGet)
		{
			oGetFunction = oClass.AddFunction("get_" + strExternalName + "(" + strParams + strType + "* pVal)", vsCMFunctionComMethod, strReturnType, vsCMAddPositionEnd, vsCMAccessPublic, strCPP);
			if (oGetFunction)
				oGetFunction.BodyText = GetFunctionBodyForReturnType(strReturnType);
		}
		if (bGeneratePut)
		{
			if (bPropPutRef)
				oPutFunction = oClass.AddFunction("putref_" + strExternalName + "(" + strParams + strType + " newVal)", vsCMFunctionComMethod, strReturnType, vsCMAddPositionEnd, vsCMAccessPublic, strCPP);
			else
				oPutFunction = oClass.AddFunction("put_" + strExternalName + "(" + strParams + strType + " newVal)", vsCMFunctionComMethod, strReturnType, vsCMAddPositionEnd, vsCMAccessPublic, strCPP);
			if (oPutFunction)
				oPutFunction.BodyText = GetFunctionBodyForReturnType(strReturnType);
		}
	}
	catch(e)
	{
		throw e;
	}
}

function AddToClassMFC(oClass)
{
	try
	{
		var strExternalName			= wizard.FindSymbol("EXTERNAL_NAME");
		var strType					= wizard.FindSymbol("TYPE");
		var strTypeVT				= wizard.FindSymbol("TYPE_VT");
		var strVariableName			= wizard.FindSymbol("VARIABLE_NAME");
		var strNotificationFunction	= wizard.FindSymbol("NOTIFICATION_FUNCTION");
		var strGetFunction			= wizard.FindSymbol("GET_FUNCTION");
		var strSetFunction			= wizard.FindSymbol("SET_FUNCTION");
		var bStock					= wizard.FindSymbol("STOCK");
		var bMemberVariable			= wizard.FindSymbol("MEMBER_VARIABLE");
		var nNumParams				= wizard.FindSymbol("NUM_PARAMETERS");
		var bDefaultProperty		= wizard.FindSymbol("DEFAULT_PROPERTY");
		var strDispid				= wizard.FindSymbol("DISPID");

		var strClassName = oClass.Name;

		// add to Dispatch map				
		var oMap = oClass.Maps.Find("DISPATCH");
		if (bStock)
		{
			oMap.AddEntry(wizard.FindSymbol("STOCK_MACRO"), vsCMAddPositionEnd);
		}
		else
		{			
			if (bMemberVariable)
			{
				// add to dispatch map
				var oMapItem;
				if (strNotificationFunction.length)
				{
					// add notification function
					var strCPP = oMap.Location(vsCMWhereDefault);
					strCPP = strCPP.substr(strCPP.lastIndexOf("\\")+1);
					var oFunction = oClass.AddFunction(strNotificationFunction, vsCMFunctionFunction, "void", vsCMAddPositionEnd, vsCMAccessProtected, strCPP);
					oFunction.BodyText = GetFunctionBodyForSet(oClass);
					oMapItem = oMap.AddEntry("DISP_PROPERTY_NOTIFY_ID", vsCMAddPositionEnd);
				}
				else
					oMapItem = oMap.AddEntry("DISP_PROPERTY_ID", vsCMAddPositionEnd);

				oMapItem.AddParameter(strClassName, vsCMAddPositionEnd);
				oMapItem.AddParameter('"' + strExternalName + '"', vsCMAddPositionEnd);
				oMapItem.AddParameter("dispid" + strExternalName, vsCMAddPositionEnd);
				oMapItem.AddParameter(strVariableName, vsCMAddPositionEnd);

				if (strNotificationFunction.length)
					oMapItem.AddParameter(strNotificationFunction, vsCMAddPositionEnd);
				oMapItem.AddParameter(strTypeVT, vsCMAddPositionEnd);

				// add member variable
				if (strType == "BSTR")
					oClass.AddVariable(strVariableName, "CString", vsCMAddPositionEnd, vsCMAccessProtected);
				else
					oClass.AddVariable(strVariableName, strType, vsCMAddPositionEnd, vsCMAccessProtected);
			}
			// Get/Set functions
			else
			{
				// add to dispatch map
				var oMapItem;
				if (nNumParams)
					oMapItem = oMap.AddEntry("DISP_PROPERTY_PARAM_ID", vsCMAddPositionEnd);
				else
					oMapItem = oMap.AddEntry("DISP_PROPERTY_EX_ID", vsCMAddPositionEnd);
				
				oMapItem.AddParameter(strClassName, vsCMAddPositionEnd);
				oMapItem.AddParameter('"' + strExternalName + '"', vsCMAddPositionEnd);
				oMapItem.AddParameter("dispid" + strExternalName, vsCMAddPositionEnd);
				if (strGetFunction.length)
					oMapItem.AddParameter(strGetFunction, vsCMAddPositionEnd);
				else
					oMapItem.AddParameter("GetNotSupported", vsCMAddPositionEnd);
				if (strSetFunction.length)
					oMapItem.AddParameter(strSetFunction, vsCMAddPositionEnd);
				else
					oMapItem.AddParameter("SetNotSupported", vsCMAddPositionEnd);
				oMapItem.AddParameter(strTypeVT, vsCMAddPositionEnd);

				if (nNumParams)
				{
					var strParamTypes = "";
					for (nCntr = 0; nCntr < aryParamVT.length; nCntr++)
					{
						if (strParamTypes.length)
							strParamTypes += " ";
						strParamTypes += aryParamVT[nCntr];
					}
					oMapItem.AddParameter(strParamTypes, vsCMAddPositionEnd);
				}

				// add Get and Set functions
				var strCPP = oMap.Location(vsCMWhereDefault);
				strCPP = strCPP.substr(strCPP.lastIndexOf("\\")+1);
				var oGetFunction = false;
				var oSetFunction = false;

				var strParams = "";
				for (nCntr = 0; nCntr < nNumParams; nCntr++)
				{
					if (nCntr > 0)
						strParams += ", ";
					if (aryParamTypeNames[nCntr].substr(0, 4) == "BSTR" &&
						aryParamTypeNames[nCntr].substr(0, 5) != "BSTR*" &&
						aryParamTypeNames[nCntr].substr(0, 6) != "BSTR *")
					{
						strParams += "LPCTSTR " + aryParamTypeNames[nCntr].substr(5);
					}
					else
						strParams += aryParamTypeNames[nCntr];
				}

				if (strGetFunction.length)
				{
					oGetFunction = oClass.AddFunction(strGetFunction + "(" + strParams + ")", vsCMFunctionFunction, strType, vsCMAddPositionEnd, vsCMAccessProtected, strCPP);
					if (oGetFunction)
						oGetFunction.BodyText = GetFunctionBodyForReturnType(strType);
				}
				if (strSetFunction.length)
				{
					if (strParams.length)
						strParams += ", ";
					if (strType == "BSTR")
						strType = "LPCTSTR";
					oSetFunction = oClass.AddFunction(strSetFunction + "(" + strParams + strType + " " + GetParamName(strType) + ")", vsCMFunctionFunction, "void", vsCMAddPositionEnd, vsCMAccessProtected, strCPP);
					if (oSetFunction)
						oSetFunction.BodyText = GetFunctionBodyForSet(oClass);
				}
			}

			// add dispidXXX in enum in Class.h
			var oEnum;
			if (oClass.Enums.Count)
				oEnum = oClass.Enums(1);
			else
				oEnum = oClass.AddEnum("", vsCMAddPositionEnd);

			var oEnumMember = oEnum.AddMember("dispid" + strExternalName, vsCMAddPositionEnd);
			oEnumMember.InitExpression = strDispid;

			if (bDefaultProperty)
			{
				var oMapItem = oMap.AddEntry("DISP_DEFVALUE", vsCMAddPositionEnd);
				oMapItem.AddParameter(strClassName, vsCMAddPositionEnd);
				oMapItem.AddParameter('"' + strExternalName + '"', vsCMAddPositionEnd);
			}
		}
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
		var strExternalName		= wizard.FindSymbol("EXTERNAL_NAME");
		var strType				= wizard.FindSymbol("TYPE");
		var strReturnType		= wizard.FindSymbol("RETURN_TYPE");
		var bGenerateGet		= wizard.FindSymbol("GENERATE_GET");
		var bGeneratePut		= wizard.FindSymbol("GENERATE_PUT");
		var bPropPutRef			= wizard.FindSymbol("PROPPUTREF");
		var nNumParams			= wizard.FindSymbol("NUM_PARAMETERS");
		var strInterfaceType	= wizard.FindSymbol("INTERFACE_TYPE");
		var strDispid			= wizard.FindSymbol("DISPID");
		var bEmbeddedIDL		= wizard.FindSymbol("EMBEDDED_IDL");

		var oGetFunction = false;
		var oPutFunction = false;

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

		if (bGenerateGet)
		{
			var strReturnType1;
			
			if (strInterfaceType == "dual" || strInterfaceType == "dispinterface")
				strReturnType1 = '[propget, id(' + strDispid + '), ' + strAttributes + '] HRESULT';
			else
				strReturnType1 = '[propget, ' + strAttributes + '] ' + strReturnType;
			
			oGetFunction = oInterface.AddFunction(strExternalName + strParams, vsCMFunctionFunction, strReturnType1, vsCMAddPositionEnd, vsCMAccessDefault);
		}

		if (bGeneratePut)
		{
			var strReturnType1;
			var strPutType = "propput";
			if (bPropPutRef)
				strPutType = "propputref";

			if (strInterfaceType == "dual" || strInterfaceType == "dispinterface")
				strReturnType1 = '[' + strPutType + ', id(' + strDispid + '), ' + strAttributes + '] HRESULT';
			else
				strReturnType1 = '[' + strPutType + ', ' + strAttributes + '] ' + strReturnType;
			
			oPutFunction = oInterface.AddFunction(strExternalName + strParams, vsCMFunctionFunction, strReturnType1, vsCMAddPositionEnd, vsCMAccessDefault);
		}

		if (oGetFunction)
		{
			var strType1 = "[out, retval] " + strType + "*";
			oGetFunction.AddParameter("pVal", strType1, vsCMAddPositionEnd);
		}

		if (oPutFunction)
		{
			var strType1 = "[in] " + strType;
			oPutFunction.AddParameter("newVal", strType1, vsCMAddPositionEnd);
		}
	}
	catch(e)
	{
		throw e;
	}
}


function AddToManaged(oElement, bInterface)
{
	try
	{
		var strExternalName		= wizard.FindSymbol("EXTERNAL_NAME");
		var strType				= wizard.FindSymbol("TYPE");
		var bGenerateGet		= wizard.FindSymbol("GENERATE_GET");
		var bGeneratePut		= wizard.FindSymbol("GENERATE_PUT");

		var oGetFunction = false;
		var oPutFunction = false;
		var Kind = oElement.Kind;

		var strReturnType;
		
		if (bGenerateGet)
		{
			if (bInterface)
			{
				strReturnType = '__property ' + strType;
			}
			else
			{
				strReturnType = strType;
			}
			
			oGetFunction = oElement.AddFunction('get_' + strExternalName + '()', 
				vsCMFunctionFunction, strReturnType, vsCMAddPositionEnd, vsCMAccessDefault);
		}

		if (bGeneratePut)
		{
			if (bInterface)
			{
				strReturnType = '__property void';
			}
			else
			{
				strReturnType = 'void';
			}
			
			oPutFunction = oElement.AddFunction('set_' + strExternalName + '(' + strType + ' newVal)', 
				vsCMFunctionFunction, strReturnType, vsCMAddPositionEnd, vsCMAccessDefault);
		}
	}
	catch(e)
	{
		throw e;
	}
}


function AddToIDLMFC(oInterface, strAttributes)
{
	try
	{
		var strExternalName		= wizard.FindSymbol("EXTERNAL_NAME");
		var strType				= wizard.FindSymbol("TYPE");
		var bStock				= wizard.FindSymbol("STOCK");
		var bMemberVariable		= wizard.FindSymbol("MEMBER_VARIABLE");
		var nNumParams			= wizard.FindSymbol("NUM_PARAMETERS");
		var bDefaultProperty	= wizard.FindSymbol("DEFAULT_PROPERTY");
		var strDispid			= wizard.FindSymbol("DISPID");

		if (bStock)
		{
			var strType1 = "[id(" + wizard.FindSymbol("STOCK_DISPID") + "), " + strAttributes + "] " + strType;
			oInterface.AddVariable(strExternalName, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
			if (bDefaultProperty)
			{
				strType1 = "[id(0)] " + strType;
				oInterface.AddVariable("_" + strExternalName, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
			}
		}
		else
		{
			if (bMemberVariable)
			{
				var strType1 = "[id(" + strDispid + "), " + strAttributes + "] " + strType;
				oInterface.AddVariable(strExternalName, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
				if (bDefaultProperty)
				{
					strType1 = "[id(0)] " + strType;
					oInterface.AddVariable("_" + strExternalName, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
				}
			}
			else
			{
				if (nNumParams)
				{
					var oGetFunction = false;
					var oSetFunction = false;
					var oGetFunction2 = false;
					var oSetFunction2 = false;

					var strParams = "(";
					for (nCntr = 0; nCntr < nNumParams; nCntr++)
					{
						if (nCntr > 0)
							strParams += ", ";
						if (aryParamAttribs[nCntr].length)
							strParams += "[" + aryParamAttribs[nCntr] + "] ";
						strParams += aryParamTypeNames[nCntr];
					}
					strParams += ")";

					var strType1 = "[id(" + strDispid + "), propget, " + strAttributes + "] " + strType;
					oGetFunction = oInterface.AddFunction(strExternalName + strParams, vsCMFunctionFunction, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
					if (bDefaultProperty)
					{
						strType1 = "[id(0), propget, " + strAttributes + "] " + strType;
						oGetFunction2 = oInterface.AddFunction("_" + strExternalName + strParams, vsCMFunctionFunction, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
					}

					var strType1 = "[id(" + strDispid + "), propput, " + strAttributes + "] void";
					oSetFunction = oInterface.AddFunction(strExternalName + strParams, vsCMFunctionFunction, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
					if (bDefaultProperty)
					{
						strType1 = "[id(0), propput, " + strAttributes + "] void";
						oSetFunction2 = oInterface.AddFunction("_" + strExternalName + strParams, vsCMFunctionFunction, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
					}

					if (oSetFunction)
						oSetFunction.AddParameter(GetParamName(strType), strType, vsCMAddPositionEnd);
					if (oSetFunction2)
						oSetFunction2.AddParameter(GetParamName(strType), strType, vsCMAddPositionEnd);
				}
				else
				{
					var strType1 = "[id(" + strDispid + "), " + strAttributes + "] " + strType;
					oInterface.AddVariable(strExternalName, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
					if (bDefaultProperty)
					{
						strType1 = "[id(0), " + strAttributes + "] " + strType;
						oInterface.AddVariable("_" + strExternalName, strType1, vsCMAddPositionEnd, vsCMAccessDefault);
					}
				}
			}
		}
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

		var strType	= wizard.FindSymbol("TYPE");
		if (strType.substr(0, 12) == "OLE_TRISTATE")
		{
			strType = "enum " + strType;
			wizard.AddSymbol("TYPE", strType);
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
		var strHelpContext		= wizard.FindSymbol("HELP_CONTEXT");
		var bBindable			= wizard.FindSymbol("BINDABLE");
		var bDefaultBind		= wizard.FindSymbol("DEFAULT_BIND");
		var bDefaultCollElem	= wizard.FindSymbol("DEFAULT_COLLELEM");
		var bDisplayBind		= wizard.FindSymbol("DISPLAY_BIND");
		var bHidden				= wizard.FindSymbol("HIDDEN");
		var bImmediateBind		= wizard.FindSymbol("IMMEDIATE_BIND");
		var bLocal				= wizard.FindSymbol("LOCAL");
		var bNonBrowsable		= wizard.FindSymbol("NON_BROWSABLE");
		var bRequestEdit		= wizard.FindSymbol("REQUEST_EDIT");
		var bRestricted			= wizard.FindSymbol("RESTRICTED");
		var bSource				= wizard.FindSymbol("SOURCE");

		var strAttributes = "";

		if (strHelpString != "")
			strAttributes += 'helpstring("' + strHelpString + '")';
		else
		{
			var strExternalName = wizard.FindSymbol("EXTERNAL_NAME");
			strAttributes += 'helpstring("property ' + strExternalName + '")';
		}

		if (strHelpContext != "")
			strAttributes += ', helpcontext(' + strHelpContext + ')';

		if (bBindable)
			strAttributes += ", bindable";

		if (bDefaultBind)
			strAttributes += ", defaultbind";

		if (bDefaultCollElem)
			strAttributes += ", defaultcollelem";

		if (bDisplayBind)
			strAttributes += ", displaybind";

		if (bHidden)
			strAttributes += ", hidden";

		if (bImmediateBind)
			strAttributes += ", immediatebind";

		if (bLocal)
			strAttributes += ", local";

		if (bNonBrowsable)
			strAttributes += ", nonbrowsable";

		if (bRequestEdit)
			strAttributes += ", requestedit";

		if (bRestricted)
			strAttributes += ", restricted";

		if (bSource)
			strAttributes += ", source";

		return strAttributes;
	}
	catch(e)
	{
		throw e;
	}
}

function GetParamName(strType)
{
	try
	{
		var strParamName = "newVal";
		if (-1 != strType.indexOf("**"))
			strParamName = "ppVal";
		else if  (-1 != strType.indexOf("*"))
			strParamName = "pVal";
		return strParamName;
	}
	catch(e)
	{
		throw e;
	}
}

function GetFunctionBodyForSet(oClass)
{
	try
	{
		var strBody = "";
		var bDLL = wizard.FindSymbol("DLL");

		if (bDLL)
			strBody = "AFX_MANAGE_STATE(AfxGetStaticModuleState());\r\n\r\n";
		else
			strBody = "AFX_MANAGE_STATE(AfxGetAppModuleState());\r\n\r\n";

		var L_Comment1_Text = "\57\57 TODO: Add your property handler code here\r\n";
		strBody += L_Comment1_Text;

		if (oClass.IsDerivedFrom("CDocument") || oClass.IsDerivedFrom("COleControl"))
			strBody += "\r\nSetModifiedFlag();\r\n";

		return strBody;
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
		var strComment;
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
			var L_Comment2_Text = "\57\57 TODO: Add your dispatch handler code here\r\n\r\n";
			strComment = L_Comment2_Text
		}
		else
		{
			var L_Comment3_Text = "\57\57 TODO: Add your implementation code here\r\n\r\n";
			strComment = L_Comment3_Text;
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

			case "SCODE":
			case "HRESULT":
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
				strBody += strComment.substr(0, strComment.length-2);
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