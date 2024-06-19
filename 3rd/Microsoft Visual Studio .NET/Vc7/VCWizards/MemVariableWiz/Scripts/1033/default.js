// (c) 2001 Microsoft Corporation
function OnFinish(selProj, Class)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var strName = wizard.FindSymbol("VARIABLE_NAME");
		var L_TransactionName_Text = "Add Variable ";
		oCM.StartTransaction(L_TransactionName_Text + strName);

		var strComment = wizard.FindSymbol("COMMENT");
		var vsAccess = wizard.FindSymbol("ACCESS");
		var strType = wizard.FindSymbol("VARIABLE_TYPE");

		var strClass = wizard.FindSymbol("PARENT_NAME");
		if(Class.Name != strClass)
		{
			var L_WrongContextObjectErr_Text = "Wrong context object in OnFinish";
			throw (L_WrongContextObjectErr_Text);
		}

		var bUpdate = wizard.FindSymbol("UPDATE");
		var newVariable;
		if (!bUpdate)
		{
			newVariable = Class.AddVariable(strName, strType, vsCMAddPositionEnd, vsAccess);
			
	//		var extender = newVariable.Extender("MFCVariable");
	//		extender.MaxValue = 100;
	//		extender.MinValue = 1;
	
			if(strComment != "")
				newVariable.Comment=strComment;
	
			//prepare the initializer expression for some of the known variable types
				var strInit = strName + '(';
	
			var NamePos, NameLength, NameLengthPos;
			NameLengthPos = new VBArray(wizard.CppParseTypeString(strType));
	
			NamePos = NameLengthPos.getItem(0);
			NameLength = NameLengthPos.getItem(1);
	
			var strTypeTail = strType.substr(NamePos+NameLength);
			var strTypeHead = strType.substr(0, NamePos);
	
			var indexCloseParen = strTypeTail.indexOf(')');
			var indexOpenBra = strTypeTail.indexOf('[');
			var indexTemplate = strTypeHead.indexOf('<');
			if((indexOpenBra !=-1 && (indexCloseParen==-1 || indexOpenBra<indexCloseParen)) ||
				indexTemplate!=-1)
			{
				strInit = ""; //array type or template type
			}
			else if(strTypeHead.indexOf('*')!=-1)
			{
				// assume it's enough, although could check if * is within innermost ()
				strInit += "NULL"; //pointer type
			}
			else if(strType=="bool")
			{
				strInit += "false";
			}
			else if(strType=="BOOL")
				{
				strInit += "FALSE";
			}
			else if(strType.indexOf("char")!=-1
					|| strType.indexOf("double")!=-1
					|| strType.indexOf("float")!=-1
					|| strType.indexOf("int")!=-1
					|| strType.indexOf("long")!=-1
					|| strType.indexOf("short")!=-1)
			{
				strInit += '0';
			}
	
			// the following are special type cases custom-initialized as VC6.0 class wizard was doing
			else if(strType.indexOf("INT")!=-1
					|| strType.indexOf("UINT")!=-1
					|| strType.indexOf("LONG")!=-1
					|| strType.indexOf("ULONG")!=-1
					|| strType.indexOf("DWORD")!=-1
					|| strType.indexOf("BYTE")!=-1
					|| strType=="CTime")
			{
				strInit += '0';
			}
			else if(strType=="CString")
			{
				strInit += "_T(\"\")";
			}
			else if(strType=="COleDateTime")
			{
				strInit += "COleDateTime::GetCurrentTime()";
			}
			else if(strType=="COleCurrency")
			{
				strInit += "COleCurrency(0, 0)";
			}
			else if(strType == "GUID")
			{
				strInit += "GUID_NULL";
			}
			else
			{
				// unrecognized type
				strInit = "";
			}
			if(strInit.length)
				strInit += ')';

			if(strType == "DECIMAL")
			{
				strInit = "\tZeroMemory(&" + strName + ", sizeof(DECIMAL));\r\n"
			}
			else if(strType == "FILETIME")
			{
				strInit = "\tZeroMemory(&" + strName + ", sizeof(FILETIME));\r\n"
			}
	
			// unrecognized variable types (when strInit is empty) do not have initializers, only default constructor
			if(strInit.length)
			{
				var oFunctions = Class.Functions;
				for(var cnt=1; cnt<=oFunctions.Count;cnt++)
				{
					var oFunction = oFunctions(cnt);
					if(oFunction.FunctionKind == vsCMFunctionConstructor)
					{
						if (strType == "DECIMAL" ||
							strType == "FILETIME")
						{
							oFunction.StartPointOf(vsCMPartBody, vsCMWhereDefinition).CreateEditPoint().Insert(strInit);
							oCM.Synchronize();
						}
						else
						{
							// add the initializer into the constructor
							oFunction.AddInitializer(strInit);
						}
						break;
					}
				}
			}
		
			if (wizard.FindSymbol("CONTROL_VARIABLE"))
			{
				var strControlType = wizard.FindSymbol("CONTROL_TYPE");
	
				if (!bUpdate)
				{		
					var oDDXFunc = Class.Functions.Find("DoDataExchange");
					var bOCX = false;
					if (typeof(oDDXFunc) != "undefined")
					{
						var strFuncBody = "DDX_";
						if (wizard.FindSymbol("VARIABLE_CATEGORY") == "Control")
						{
							strFuncBody += "Control";
						}
						else if (wizard.FindSymbol("VARIABLE_CATEGORY") != "Value")
						{
							bOCX = true;
							strFuncBody += GetControlDDXType(strType);
						}
						else
						{
							strFuncBody += GetDDXType(strControlType, strType);
						}
	
						strFuncBody += "(pDX, ";
						strFuncBody += wizard.FindSymbol("CONTROL_NAME");
						strFuncBody += ", ";
						if (bOCX)
						{
							strFuncBody += "DISPID(";
							strFuncBody += wizard.FindSymbol("PROP_DISPID");
							strFuncBody += "), ";
						}
						strFuncBody += wizard.FindSymbol("VARIABLE_NAME");
						strFuncBody += ");\r\n";
						var newFuncBody = oDDXFunc.BodyText + strFuncBody;
						oDDXFunc.BodyText = newFuncBody;
					}
				}
	
				if (IsActiveXControl(strControlType) && wizard.FindSymbol("CLASS_NAME"))
				{
					var strHeader = wizard.FindSymbol("HEADER_FILE");
					RenderAddTemplate("wrapper.h", strHeader, selProj, false);
					RenderAddTemplate("wrapper.cpp", wizard.FindSymbol("IMPL_FILE"), selProj, false);
					var strFileName = Class.Location(vsCMWhereDefault);
					oCM.AddInclude("\"" + strHeader + "\"", strFileName, vsCMAddPositionEnd);

					if (wizard.FindSymbol("INCLUDE_PICTURE"))
					{
						oCM.AddInclude("\"_Picture.h\"", strHeader, vsCMAddPositionEnd);

						RenderAddTemplate("_Picture.h", "_Picture.h", selProj, false);
					}

					if (wizard.FindSymbol("INCLUDE_FONT"))
					{
						oCM.AddInclude("\"_Font.h\"", strHeader, vsCMAddPositionEnd);
						RenderAddTemplate("_Font.h", "_Font.h", selProj, false);
					}
				}
			}
		}
		else
		{
			newVariable = Class.Variables.Find(strName);
		}
		var extenderName = ExtenderFromType(strType);
		
		if (extenderName != "")
		{
			var MinValue = wizard.FindSymbol("MIN_VALUE");
			var MaxValue = wizard.FindSymbol("MAX_VALUE");
			var MaxChars = wizard.FindSymbol("MAX_CHARS");
			if ((extenderName == "MFCDialogStringVariable" && MaxChars != "") ||
				(MinValue != "" || MaxValue != ""))
			{
				var L_TRANSACTION_Text = "Add DDV ";

				var extender = newVariable.Extender(extenderName);				
				if (extender)
				{
					if (extenderName == "MFCDialogStringVariable")
					{
						extender.MaxChars = MaxChars;
					}
					else
					{
						if (MinValue != "")
							extender.MinValue = MinValue;
						if (MaxValue != "")
							extender.MaxValue = MaxValue;
					}
				}
			}
		}
	
		
		try
		{
			IncludeCodeElementDeclaration(selProj, strType, Class.Location(vsCMWhereDefault));
		}
		catch(e)
		{
			//don't display the error in case base class was not found: the warning was already displayed in HTML script
			//var L_ErrMsg1_Text = "Unable to find base class definition: ";
			//wizard.ReportError( L_ErrMsg1_Text + e.description);
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

function IsActiveXControl(strControlType)
{
	try
	{
		// ActiveXContol type string is persisted as its coclass' GUID, it must contain the '{' and '}' chars
		//
		if(strControlType.indexOf("{") != -1 && strControlType.indexOf("}") != -1)
			return true;
		return false;
	}
	catch(e)
	{
		throw e;
	}
}
function GetControlDDXType(strControlType)
{
	try
	{
		var strDDXControlType = "OCInt";

		switch(strControlType.toLowerCase())
		{
			case "float":
			case "double":
				strDDXControlType = "OCFloat";
				break;
			case "BOOL":
				strDDXControlType = "OCBool";
				break;
			case "OLE_COLOR":
				strDDXControlType = "OCColor";
				break;
			case "short":
				strDDXControlType = "OCShort";
				break;
			case "cstring":
				strDDXControlType = "OCText";
				break;
			default:
				break;
		}
		return strDDXControlType;
	}
	catch(e)
	{
		throw e;
	}
}

function GetDDXType(strControlType, strVarType)
{
	try
	{
		var strDDXType = "Text";

		switch(strControlType)
		{
			case "CHECK":
				strDDXType = "Check";
				break;
			case "RADIO":
				strDDXType = "Radio";
				break;
			case "LISTBOX":
				if (strVarType == "CString")
					strDDXType = "LBString";
				else
					strDDXType = "LBIndex";
				break;
			case "COMBOBOX":
			case "ComboBoxEx32":
				if (strVarType == "CString")
					strDDXType = "CBString";
				else
					strDDXType = "CBIndex";
				break;
			case "SCROLLBAR":
				strDDXType = "Scroll";
				break;
			case "SysMonthCal32":
				strDDXType = "MonthCalCtrl";
				break;
			case "SysDateTimePick32":
				strDDXType = "DateTimeCtrl";
				break;
			case "msctls_trackbar32":
				strDDXType = "Slider";
				break;				
			case "SysIPAddress32":
				strDDXType = "IPAddress";
				break;
			case "EDIT":
			case "RICHEDIT":
			case "RichEdit20A":
			case "LTEXT":
			case "CTEXT":
			case "RTEXT":
				strDDXType = "Text";
				break;
			default:
				break;
		}
		return strDDXType;
	}
	catch(e)
	{
		throw e;
	}
}

function ExtenderFromType(strVariableType)
{
	try
	{
		var retExtender = "";
		
		switch(strVariableType)
		{
		case "BYTE" :
		case "CHAR" :
		case "char" :
		case "short" :
		case "SHORT" :
		case "int" :
		case "INT" :
		case "UINT" :
		case "unsigned int" :
		case "unsigned" :
		case "long" :
		case "LONG" :
		case "DWORD" :
		case "float" :
		case "FLOAT" :
		case "double" :
		case "DOUBLE" :
			retExtender =  "MFCDialogNumberVariable";
			break;
			
		case "CString" :
			retExtender =  "MFCDialogStringVariable";
			break;
			
		case "COleCurrency" :
			retExtender =  "MFCDialogCurrencyVariable";
			break;
			
		case "COleDateTime" :
			retExtender =  "MFCDialogDateTimeVariable";
			break;

		}
		
		return retExtender;
	}
	catch(e)
	{
		throw e;
	}
}