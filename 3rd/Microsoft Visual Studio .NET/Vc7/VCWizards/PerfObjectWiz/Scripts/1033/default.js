// (c) 2001 Microsoft Corporation
function OnFinish(selProj, Class)
{
	var oCM;
	try
	{
		oCM	= selProj.CodeModel;

		var strClassName = wizard.FindSymbol("CLASS_NAME");

		var strNameString = wizard.FindSymbol("NAME_STRING");
		var strHelpString = wizard.FindSymbol("HELP_STRING");

		var strDetailLevel = wizard.FindSymbol("DETAIL_LEVEL");
		var bNoInstances = wizard.FindSymbol("NO_INSTANCES")==true;

		var strParentName = wizard.FindSymbol("PARENT_NAME");
		var strFile = Class.Location(vsCMWhereDefault);

		// open a transaction
		var L_TRANSACTION_Text = "Perf Object Wiz";
		oCM.StartTransaction(L_TRANSACTION_Text);

		if(Class.Name != strParentName)
		{
			var L_Error1_Text = "Wrong context object in OnFinish";
			var oError = new Error(L_Error1_Text);
			SetErrorInfo(oError);
			return;
		}

		var oNewClass;
		if (Class.Attributes.Find("perfmon"))
		{
			oNewClass = Class.AddClass(strClassName, vsCMAddPositionEnd, "", "", vsCMAccessPublic);
			var oAttribute = oNewClass.AddAttribute("perf_object", "", vsCMAddPositionEnd);
			oAttribute.AddParameter("namestring", "\"" + QuoteString(strNameString) + "\"", vsCMAddPositionEnd);
			oAttribute.AddParameter("helpstring", "\"" + QuoteString(strHelpString) + "\"", vsCMAddPositionEnd);
			oAttribute.AddParameter("detail", strDetailLevel, vsCMAddPositionEnd);
			if (bNoInstances)
			{
				oAttribute.AddParameter("no_instances", "true", vsCMAddPositionEnd);
			}
		}
		else
		{
			// add a new object class
			oNewClass = Class.AddClass(strClassName, vsCMAddPositionEnd, "CPerfObject", "", vsCMAccessPublic);
			oNewClass.AddMap("COUNTER", strClassName, vsCMAddPositionEnd);

			var oMap = Class.Maps.Find("PERF");
			if (!oMap)
			{
				oCM.AbortTransaction();
				var L_NoPerfMap_Text = "Couldn't find PERF map in CPerfMon object";
				var oError = new Error(L_NoPerfMap_Text);
				SetErrorInfo(oError);
				return;
			}
			
			var oMapItems = oMap.Entries;
			var oChainEntry = oMap.AddEntry("CHAIN_PERF_OBJECT", vsCMAddPositionEnd);
			oChainEntry.AddParameter(strClassName, vsCMAddPositionEnd);

			// add the id and the declaration
			{
				var oEdit = oNewClass.StartPointOf(vsCMPartBody).CreateEditPoint();
				
				var str = "public:\r\n";
				if (bNoInstances)
					str += "DECLARE_PERF_OBJECT_NO_INSTANCES(";
				else
					str += "DECLARE_PERF_OBJECT(";
				str += strClassName+", "+oMapItems.Count+", "+
						"\""+QuoteString(strNameString)+"\", "+
						"\""+QuoteString(strHelpString)+"\", "+
						"-1);\r\n";
				oEdit.Insert(str);
			}
			oCM.Synchronize();
		}

		// Take the new class, cut it, and paste it before the parent class
		// replace this once positioning new elements relative to others is implemented
		var oNewBegin = oNewClass.StartPoint.CreateEditPoint();
		var oNewEnd = oNewClass.EndPoint;

		var oParentBegin = Class.StartPoint.CreateEditPoint();
		oNewBegin.Cut(oNewEnd);
		oParentBegin.Paste();
		oParentBegin.Insert("\r\n\r\n");

		oCM.Synchronize();

		oNewBegin = oCM.Classes.Find(strClassName).StartPoint.CreateEditPoint();
		var oParentEnd = Class.EndPoint;
		oNewBegin.SmartFormat(oParentEnd);

		oCM.Synchronize();
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

function QuoteString(str)
{
	try
	{
		var strResult, re;
			re = new RegExp("([\\\\\"])","g");
		strResult = str.replace(re, "\\$1");
		return strResult;
	}
	catch(e)
	{
		throw e;
	}
}
