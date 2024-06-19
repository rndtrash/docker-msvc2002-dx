// (c) 2001 Microsoft Corporation
// Script for ATL Provider

function OnFinish(selProj, selObj)
{
	var oCM;
	try
	{		
		oCM	= selProj.CodeModel;

		var strShortName = wizard.FindSymbol("SHORT_NAME");
		var L_TransactionName_Text = "Add ATL Provider ";
		oCM.StartTransaction(L_TransactionName_Text + strShortName);
	
		var strProjectPath		= wizard.FindSymbol("PROJECT_PATH");
		var strTemplatePath		= wizard.FindSymbol("TEMPLATES_PATH");
		var strUpperShortName	= strShortName.toUpperCase();
		wizard.AddSymbol("UPPER_SHORT_NAME", strUpperShortName);
		wizard.AddSymbol("TYPE_NAME", strShortName + " Class");
		var strVIProgID			= wizard.FindSymbol("VERSION_INDEPENDENT_PROGID");
		wizard.AddSymbol("PROGID", strVIProgID + "." + wizard.FindSymbol("VERSION"));
		var strCoClass			= wizard.FindSymbol("COCLASS");
		var bAttributed			= wizard.FindSymbol("ATTRIBUTED");

		var strDataSourceHeader	= wizard.FindSymbol("DATASOURCE_HEADER");
		var strSessionHeader	= wizard.FindSymbol("SESSION_HEADER");
		var strRowsetHeader		= wizard.FindSymbol("ROWSET_HEADER");
		var strRowsetImpl		= wizard.FindSymbol("ROWSET_IMPL");
		var strDataSourceClass	= wizard.FindSymbol("DATASOURCE_CLASS");

		var strProjectRC		= GetProjectFile(selProj, "RC", true, false);
		var strRGSFile;

		// Create necessary GUIDS
		CreateGUIDs();

		var oResHelper = wizard.ResourceHelper;
		oResHelper.OpenResourceFile(strProjectRC);

		// add string resources
		var L_RCTEXT1_TEXT =  "Active Sessions";
		oResHelper.AddResource("IDS_DBPROP_ACTIVESESSIONS", L_RCTEXT1_TEXT, "STRING");
		var L_RCTEXT2_TEXT =  "Asynchable Commit";
		oResHelper.AddResource("IDS_DBPROP_ASYNCTXNCOMMIT", L_RCTEXT2_TEXT, "STRING");
		var L_RCTEXT3_TEXT =  "Pass By Ref Accessors";
		oResHelper.AddResource("IDS_DBPROP_BYREFACCESSORS", L_RCTEXT3_TEXT, "STRING");
		var L_RCTEXT4_TEXT =  "Catalog Location";
		oResHelper.AddResource("IDS_DBPROP_CATALOGLOCATION", L_RCTEXT4_TEXT, "STRING");
		var L_RCTEXT5_TEXT =  "Catalog Term";
		oResHelper.AddResource("IDS_DBPROP_CATALOGTERM", L_RCTEXT5_TEXT, "STRING");
		var L_RCTEXT6_TEXT =  "Catalog Usage";
		oResHelper.AddResource("IDS_DBPROP_CATALOGUSAGE", L_RCTEXT6_TEXT, "STRING");
		var L_RCTEXT7_TEXT =  "Column Definition";
		oResHelper.AddResource("IDS_DBPROP_COLUMNDEFINITION", L_RCTEXT7_TEXT, "STRING");
		var L_RCTEXT8_TEXT =  "NULL Concatenation Behavior";
		oResHelper.AddResource("IDS_DBPROP_CONCATNULLBEHAVIOR", L_RCTEXT8_TEXT, "STRING");
		var L_RCTEXT9_TEXT =  "Data Source Name";
		oResHelper.AddResource("IDS_DBPROP_DATASOURCENAME", L_RCTEXT9_TEXT, "STRING");
		var L_RCTEXT10_TEXT =  "Read-Only Data Source";
		oResHelper.AddResource("IDS_DBPROP_DATASOURCEREADONLY", L_RCTEXT10_TEXT, "STRING");
		var L_RCTEXT11_TEXT =  "DBMS Name";
		oResHelper.AddResource("IDS_DBPROP_DBMSNAME", L_RCTEXT11_TEXT, "STRING");
		var L_RCTEXT12_TEXT =  "DBMS Version";
		oResHelper.AddResource("IDS_DBPROP_DBMSVER", L_RCTEXT12_TEXT, "STRING");
		var L_RCTEXT13_TEXT =  "Procedure Term";
		oResHelper.AddResource("IDS_DBPROP_PROCEDURETERM", L_RCTEXT13_TEXT, "STRING");
		var L_RCTEXT14_TEXT =  "OLE DB Version";
		oResHelper.AddResource("IDS_DBPROP_PROVIDEROLEDBVER", L_RCTEXT14_TEXT, "STRING");
		var L_RCTEXT15_TEXT =  "Provider Name";
		oResHelper.AddResource("IDS_DBPROP_PROVIDERNAME", L_RCTEXT15_TEXT, "STRING");
		var L_RCTEXT16_TEXT =  "Provider Version";
		oResHelper.AddResource("IDS_DBPROP_PROVIDERVER", L_RCTEXT16_TEXT, "STRING");
		var L_RCTEXT17_TEXT =  "Quoted Identifier Sensitivity";
		oResHelper.AddResource("IDS_DBPROP_QUOTEDIDENTIFIERCASE", L_RCTEXT17_TEXT, "STRING");
		var L_RCTEXT18_TEXT =  "Schema Term";
		oResHelper.AddResource("IDS_DBPROP_SCHEMATERM", L_RCTEXT18_TEXT, "STRING");
		var L_RCTEXT19_TEXT =  "Schema Usage";
		oResHelper.AddResource("IDS_DBPROP_SCHEMAUSAGE", L_RCTEXT19_TEXT, "STRING");
		var L_RCTEXT20_TEXT =  "SQL Support";
		oResHelper.AddResource("IDS_DBPROP_SQLSUPPORT", L_RCTEXT20_TEXT, "STRING");
		var L_RCTEXT21_TEXT =  "Structured Storage";
		oResHelper.AddResource("IDS_DBPROP_STRUCTUREDSTORAGE", L_RCTEXT21_TEXT, "STRING");
		var L_RCTEXT22_TEXT =  "Subquery Support";
		oResHelper.AddResource("IDS_DBPROP_SUBQUERIES", L_RCTEXT22_TEXT, "STRING");
		var L_RCTEXT23_TEXT =  "Isolation Levels";
		oResHelper.AddResource("IDS_DBPROP_SUPPORTEDTXNISOLEVELS", L_RCTEXT23_TEXT, "STRING");
		var L_RCTEXT24_TEXT =  "Isolation Retention";
		oResHelper.AddResource("IDS_DBPROP_SUPPORTEDTXNISORETAIN", L_RCTEXT24_TEXT, "STRING");
		var L_RCTEXT25_TEXT =     "Table Term";
		oResHelper.AddResource("IDS_DBPROP_TABLETERM", L_RCTEXT25_TEXT, "STRING");
		var L_RCTEXT26_TEXT =      "User Name";
		oResHelper.AddResource("IDS_DBPROP_USERNAME", L_RCTEXT26_TEXT, "STRING");
		var L_RCTEXT27_TEXT =  "Transaction DDL";
		oResHelper.AddResource("IDS_DBPROP_SUPPORTEDTXNDDL", L_RCTEXT27_TEXT, "STRING");
		var L_RCTEXT28_TEXT =  "Asynchable Abort";
		oResHelper.AddResource("IDS_DBPROP_ASYNCTXNABORT", L_RCTEXT28_TEXT, "STRING");
		var L_RCTEXT29_TEXT =  "Data Source Object Threading Model";
		oResHelper.AddResource("IDS_DBPROP_DSOTHREADMODEL", L_RCTEXT29_TEXT, "STRING");
		var L_RCTEXT30_TEXT =  "Multiple Parameter Sets";
		oResHelper.AddResource("IDS_DBPROP_MULTIPLEPARAMSETS", L_RCTEXT30_TEXT, "STRING");
		var L_RCTEXT31_TEXT =  "Output Parameter Availability";
		oResHelper.AddResource("IDS_DBPROP_OUTPUTPARAMETERAVAILABILITY", L_RCTEXT31_TEXT, "STRING");
		var L_RCTEXT32_TEXT =  "Persistent ID Type";
		oResHelper.AddResource("IDS_DBPROP_PERSISTENTIDTYPE", L_RCTEXT32_TEXT, "STRING");
		var L_RCTEXT33_TEXT =  "Column Set Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYCOLUMNSET", L_RCTEXT33_TEXT, "STRING");
		var L_RCTEXT34_TEXT =  "Row Delete Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWDELETE", L_RCTEXT34_TEXT, "STRING");
		var L_RCTEXT35_TEXT =  "Row First Change Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWFIRSTCHANGE", L_RCTEXT35_TEXT, "STRING");
		var L_RCTEXT36_TEXT =  "Row Insert Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWINSERT", L_RCTEXT36_TEXT, "STRING");
		var L_RCTEXT37_TEXT =  "Row Resynchronization Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWRESYNCH", L_RCTEXT37_TEXT, "STRING");
		var L_RCTEXT38_TEXT =  "Rowset Release Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWSETRELEASE", L_RCTEXT38_TEXT, "STRING");
		var L_RCTEXT39_TEXT =  "Rowset Fetch Position Change Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWSETFETCHPOSITIONCHANGE", L_RCTEXT39_TEXT, "STRING");
		var L_RCTEXT40_TEXT =  "Row Undo Change Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWUNDOCHANGE", L_RCTEXT40_TEXT, "STRING");
		var L_RCTEXT41_TEXT =  "Row Undo Delete Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWUNDODELETE", L_RCTEXT41_TEXT, "STRING");
		var L_RCTEXT42_TEXT =       "GROUP BY Support";
		oResHelper.AddResource("IDS_DBPROP_GROUPBY", L_RCTEXT42_TEXT, "STRING");
		var L_RCTEXT43_TEXT =  "Heterogeneous Table Support";
		oResHelper.AddResource("IDS_DBPROP_HETEROGENEOUSTABLES", L_RCTEXT43_TEXT, "STRING");
		var L_RCTEXT44_TEXT =  "Identifier Case Sensitivity";
		oResHelper.AddResource("IDS_DBPROP_IDENTIFIERCASE", L_RCTEXT44_TEXT, "STRING");
		var L_RCTEXT45_TEXT =     "Lock Modes";
		oResHelper.AddResource("IDS_DBPROP_LOCKMODES", L_RCTEXT45_TEXT, "STRING");
		var L_RCTEXT46_TEXT =  "Maximum Index Size";
		oResHelper.AddResource("IDS_DBPROP_MAXINDEXSIZE", L_RCTEXT46_TEXT, "STRING");
		var L_RCTEXT47_TEXT =    "Maximum Row Size";
		oResHelper.AddResource("IDS_DBPROP_MAXROWSIZE", L_RCTEXT47_TEXT, "STRING");
		var L_RCTEXT48_TEXT =  "Maximum Row Size Includes BLOB";
		oResHelper.AddResource("IDS_DBPROP_MAXROWSIZEINCLUDESBLOB", L_RCTEXT48_TEXT, "STRING");
		var L_RCTEXT49_TEXT =  "Maximum Tables in SELECT";
		oResHelper.AddResource("IDS_DBPROP_MAXTABLESINSELECT", L_RCTEXT49_TEXT, "STRING");
		var L_RCTEXT50_TEXT =  "Multiple Storage Objects";
		oResHelper.AddResource("IDS_DBPROP_MULTIPLESTORAGEOBJECTS", L_RCTEXT50_TEXT, "STRING");
		var L_RCTEXT51_TEXT =  "Multi-Table Update";
		oResHelper.AddResource("IDS_DBPROP_MULTITABLEUPDATE", L_RCTEXT51_TEXT, "STRING");
		var L_RCTEXT52_TEXT =  "Notification Phases";
		oResHelper.AddResource("IDS_DBPROP_NOTIFICATIONPHASES", L_RCTEXT52_TEXT, "STRING");
		var L_RCTEXT53_TEXT =  "NULL Collation Order";
		oResHelper.AddResource("IDS_DBPROP_NULLCOLLATION", L_RCTEXT53_TEXT, "STRING");
		var L_RCTEXT54_TEXT =    "OLE Object Support";
		oResHelper.AddResource("IDS_DBPROP_OLEOBJECTS", L_RCTEXT54_TEXT, "STRING");
		var L_RCTEXT55_TEXT =  "ORDER BY Columns in Select List";
		oResHelper.AddResource("IDS_DBPROP_ORDERBYCOLUMNSINSELECT", L_RCTEXT55_TEXT, "STRING");
		var L_RCTEXT56_TEXT =  "Prepare Commit Behavior";
		oResHelper.AddResource("IDS_DBPROP_PREPARECOMMITBEHAVIOR", L_RCTEXT56_TEXT, "STRING");
		var L_RCTEXT57_TEXT =  "Prepare Abort Behavior";
		oResHelper.AddResource("IDS_DBPROP_PREPAREABORTBEHAVIOR", L_RCTEXT57_TEXT, "STRING");
		var L_RCTEXT58_TEXT =  "Row Undo Insert Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWUNDOINSERT", L_RCTEXT58_TEXT, "STRING");
		var L_RCTEXT59_TEXT =  "Row Update Notification";
		oResHelper.AddResource("IDS_DBPROP_NOTIFYROWUPDATE", L_RCTEXT59_TEXT, "STRING");
		var L_RCTEXT60_TEXT =  "Rowset Conversions on Command";
		oResHelper.AddResource("IDS_DBPROP_ROWSETCONVERSIONSONCOMMAND", L_RCTEXT60_TEXT, "STRING");
		var L_RCTEXT61_TEXT =  "Multiple Results";
		oResHelper.AddResource("IDS_DBPROP_MULTIPLERESULTS", L_RCTEXT61_TEXT, "STRING");
		var L_RCTEXT62_TEXT =  "ISequentialStream";
		oResHelper.AddResource("IDS_DBPROP_ISequentialStream", L_RCTEXT62_TEXT, "STRING");
		var L_RCTEXT63_TEXT =  "Preserve on Abort";
		oResHelper.AddResource("IDS_DBPROP_ABORTPRESERVE", L_RCTEXT63_TEXT, "STRING");
		var L_RCTEXT64_TEXT =  "Blocking Storage Objects";
		oResHelper.AddResource("IDS_DBPROP_BLOCKINGSTORAGEOBJECTS", L_RCTEXT64_TEXT, "STRING");
		var L_RCTEXT65_TEXT =  "IRowsetScroll";
		oResHelper.AddResource("IDS_DBPROP_IRowsetScroll", L_RCTEXT65_TEXT, "STRING");
		var L_RCTEXT66_TEXT =  "IRowsetUpdate";
		oResHelper.AddResource("IDS_DBPROP_IRowsetUpdate", L_RCTEXT66_TEXT, "STRING");
		var L_RCTEXT67_TEXT =  "ISupportErrorInfo";
		oResHelper.AddResource("IDS_DBPROP_ISupportErrorInfo", L_RCTEXT67_TEXT, "STRING");
		var L_RCTEXT68_TEXT =  "Change Inserted Rows";
		oResHelper.AddResource("IDS_DBPROP_CHANGEINSERTEDROWS", L_RCTEXT68_TEXT, "STRING");
		var L_RCTEXT69_TEXT =  "Return Pending Inserts";
		oResHelper.AddResource("IDS_DBPROP_RETURNPENDINGINSERTS", L_RCTEXT69_TEXT, "STRING");
		var L_RCTEXT70_TEXT =  "IConvertType";
		oResHelper.AddResource("IDS_DBPROP_IConvertType", L_RCTEXT70_TEXT, "STRING");
		var L_RCTEXT71_TEXT =  "Cache Authentication";
		oResHelper.AddResource("IDS_DBPROP_AUTH_CACHE_AUTHINFO", L_RCTEXT71_TEXT, "STRING");
		var L_RCTEXT72_TEXT =  "Encrypt Password";
		oResHelper.AddResource("IDS_DBPROP_AUTH_ENCRYPT_PASSWORD", L_RCTEXT72_TEXT, "STRING");
		var L_RCTEXT73_TEXT =  "Integrated Security";
		oResHelper.AddResource("IDS_DBPROP_AUTH_INTEGRATED", L_RCTEXT73_TEXT, "STRING");
		var L_RCTEXT74_TEXT =  "Mask Password";
		oResHelper.AddResource("IDS_DBPROP_AUTH_MASK_PASSWORD", L_RCTEXT74_TEXT, "STRING");
		var L_RCTEXT75_TEXT =  "Password";
		oResHelper.AddResource("IDS_DBPROP_AUTH_PASSWORD", L_RCTEXT75_TEXT, "STRING");
		var L_RCTEXT76_TEXT =  "Persist Encrypted";
		oResHelper.AddResource("IDS_DBPROP_AUTH_PERSIST_ENCRYPTED", L_RCTEXT76_TEXT, "STRING");
		var L_RCTEXT77_TEXT =  "Persist Security Info";
		oResHelper.AddResource("IDS_DBPROP_AUTH_PERSIST_SENSITIVE_AUTHINFO", L_RCTEXT77_TEXT, "STRING");
		var L_RCTEXT78_TEXT =   "User ID";
		oResHelper.AddResource("IDS_DBPROP_AUTH_USERID", L_RCTEXT78_TEXT, "STRING");
		var L_RCTEXT79_TEXT =  "Data Source";
		oResHelper.AddResource("IDS_DBPROP_INIT_DATASOURCE", L_RCTEXT79_TEXT, "STRING");
		var L_RCTEXT80_TEXT =     "Window Handle";
		oResHelper.AddResource("IDS_DBPROP_INIT_HWND", L_RCTEXT80_TEXT, "STRING");
		var L_RCTEXT81_TEXT =  "Impersonation Level";
		oResHelper.AddResource("IDS_DBPROP_INIT_IMPERSONATION_LEVEL", L_RCTEXT81_TEXT, "STRING");
		var L_RCTEXT82_TEXT =  "Location";
		oResHelper.AddResource("IDS_DBPROP_INIT_LOCATION", L_RCTEXT82_TEXT, "STRING");
		var L_RCTEXT83_TEXT =     "Mode";
		oResHelper.AddResource("IDS_DBPROP_INIT_MODE", L_RCTEXT83_TEXT, "STRING");
		var L_RCTEXT84_TEXT =   "Prompt";
		oResHelper.AddResource("IDS_DBPROP_INIT_PROMPT", L_RCTEXT84_TEXT, "STRING");
		var L_RCTEXT85_TEXT =  "Protection Level";
		oResHelper.AddResource("IDS_DBPROP_INIT_PROTECTION_LEVEL", L_RCTEXT85_TEXT, "STRING");
		var L_RCTEXT86_TEXT =  "Connect Timeout";
		oResHelper.AddResource("IDS_DBPROP_INIT_TIMEOUT", L_RCTEXT86_TEXT, "STRING");
		var L_RCTEXT87_TEXT =     "Locale Identifier";
		oResHelper.AddResource("IDS_DBPROP_INIT_LCID", L_RCTEXT87_TEXT, "STRING");
		var L_RCTEXT88_TEXT =  "Extended Properties";
		oResHelper.AddResource("IDS_DBPROP_INIT_PROVIDERSTRING", L_RCTEXT88_TEXT, "STRING");
		var L_RCTEXT89_TEXT =  "Autocommit Isolation Levels";
		oResHelper.AddResource("IDS_DBPROP_SESS_AUTOCOMMITISOLEVELS", L_RCTEXT89_TEXT, "STRING");
		var L_RCTEXT90_TEXT =  "Server Cursor";
		oResHelper.AddResource("IDS_DBPROP_SERVERCURSOR", L_RCTEXT90_TEXT, "STRING");
		var L_RCTEXT91_TEXT =  "Objects Transacted";
		oResHelper.AddResource("IDS_DBPROP_TRANSACTEDOBJECT", L_RCTEXT91_TEXT, "STRING");
		var L_RCTEXT92_TEXT =  "Updatability";
		oResHelper.AddResource("IDS_DBPROP_UPDATABILITY", L_RCTEXT92_TEXT, "STRING");
		var L_RCTEXT93_TEXT =  "Strong Row Identity";
		oResHelper.AddResource("IDS_DBPROP_STRONGIDENTITY", L_RCTEXT93_TEXT, "STRING");
		var L_RCTEXT94_TEXT =     "IAccessor";
		oResHelper.AddResource("IDS_DBPROP_IAccessor", L_RCTEXT94_TEXT, "STRING");
		var L_RCTEXT95_TEXT =  "IColumnsInfo";
		oResHelper.AddResource("IDS_DBPROP_IColumnsInfo", L_RCTEXT95_TEXT, "STRING");
		var L_RCTEXT96_TEXT =  "IColumnsRowset";
		oResHelper.AddResource("IDS_DBPROP_IColumnsRowset", L_RCTEXT96_TEXT, "STRING");
		var L_RCTEXT97_TEXT =  "IConnectionPointContainer";
		oResHelper.AddResource("IDS_DBPROP_IConnectionPointContainer", L_RCTEXT97_TEXT, "STRING");
		var L_RCTEXT98_TEXT =  "IProvideMoniker";
		oResHelper.AddResource("IDS_DBPROP_IProvideMoniker", L_RCTEXT98_TEXT, "STRING");
		var L_RCTEXT99_TEXT =       "IRowset";
		oResHelper.AddResource("IDS_DBPROP_IRowset", L_RCTEXT99_TEXT, "STRING");
		var L_RCTEXT100_TEXT =  "IRowsetChange";
		oResHelper.AddResource("IDS_DBPROP_IRowsetChange", L_RCTEXT100_TEXT, "STRING");
		var L_RCTEXT101_TEXT =  "IRowsetIdentity";
		oResHelper.AddResource("IDS_DBPROP_IRowsetIdentity", L_RCTEXT101_TEXT, "STRING");
		var L_RCTEXT102_TEXT =   "IRowsetInfo";
		oResHelper.AddResource("IDS_DBPROP_IRowsetInfo", L_RCTEXT102_TEXT, "STRING");
		var L_RCTEXT103_TEXT =  "IRowsetLocate";
		oResHelper.AddResource("IDS_DBPROP_IRowsetLocate", L_RCTEXT103_TEXT, "STRING");
		var L_RCTEXT104_TEXT =  "IRowsetResynch";
		oResHelper.AddResource("IDS_DBPROP_IRowsetResynch", L_RCTEXT104_TEXT, "STRING");
		var L_RCTEXT105_TEXT =     "Use Bookmarks";
		oResHelper.AddResource("IDS_DBPROP_BOOKMARKS", L_RCTEXT105_TEXT, "STRING");
		var L_RCTEXT106_TEXT =  "Skip Deleted Bookmarks";
		oResHelper.AddResource("IDS_DBPROP_BOOKMARKSKIPPED", L_RCTEXT106_TEXT, "STRING");
		var L_RCTEXT107_TEXT =  "Bookmark Type";
		oResHelper.AddResource("IDS_DBPROP_BOOKMARKTYPE", L_RCTEXT107_TEXT, "STRING");
		var L_RCTEXT108_TEXT =  "Fetch Backwards";
		oResHelper.AddResource("IDS_DBPROP_CANFETCHBACKWARDS", L_RCTEXT108_TEXT, "STRING");
		var L_RCTEXT109_TEXT =   "Hold Rows";
		oResHelper.AddResource("IDS_DBPROP_CANHOLDROWS", L_RCTEXT109_TEXT, "STRING");
		var L_RCTEXT110_TEXT =    "Append-Only Rowset";
		oResHelper.AddResource("IDS_DBPROP_APPENDONLY", L_RCTEXT110_TEXT, "STRING");
		var L_RCTEXT111_TEXT =  "Scroll Backwards";
		oResHelper.AddResource("IDS_DBPROP_CANSCROLLBACKWARDS", L_RCTEXT111_TEXT, "STRING");
		var L_RCTEXT112_TEXT =  "Column Privileges";
		oResHelper.AddResource("IDS_DBPROP_COLUMNRESTRICT", L_RCTEXT112_TEXT, "STRING");
		var L_RCTEXT113_TEXT =  "Command Time Out";
		oResHelper.AddResource("IDS_DBPROP_COMMANDTIMEOUT", L_RCTEXT113_TEXT, "STRING");
		var L_RCTEXT114_TEXT =  "Preserve on Commit";
		oResHelper.AddResource("IDS_DBPROP_COMMITPRESERVE", L_RCTEXT114_TEXT, "STRING");
		var L_RCTEXT115_TEXT =  "Delay Storage Object Updates";
		oResHelper.AddResource("IDS_DBPROP_DELAYSTORAGEOBJECTS", L_RCTEXT115_TEXT, "STRING");
		var L_RCTEXT116_TEXT =  "Immobile Rows";
		oResHelper.AddResource("IDS_DBPROP_IMMOBILEROWS", L_RCTEXT116_TEXT, "STRING");
		var L_RCTEXT117_TEXT =  "Literal Bookmarks";
		oResHelper.AddResource("IDS_DBPROP_LITERALBOOKMARKS", L_RCTEXT117_TEXT, "STRING");
		var L_RCTEXT118_TEXT =  "Literal Row Identity";
		oResHelper.AddResource("IDS_DBPROP_LITERALIDENTITY", L_RCTEXT118_TEXT, "STRING");
		var L_RCTEXT119_TEXT =   "Maximum Open Rows";
		oResHelper.AddResource("IDS_DBPROP_MAXOPENROWS", L_RCTEXT119_TEXT, "STRING");
		var L_RCTEXT120_TEXT =  "Maximum Pending Rows";
		oResHelper.AddResource("IDS_DBPROP_MAXPENDINGROWS", L_RCTEXT120_TEXT, "STRING");
		var L_RCTEXT121_TEXT =       "Maximum Rows";
		oResHelper.AddResource("IDS_DBPROP_MAXROWS", L_RCTEXT121_TEXT, "STRING");
		var L_RCTEXT122_TEXT =   "Others' Inserts Visible";
		oResHelper.AddResource("IDS_DBPROP_OTHERINSERT", L_RCTEXT122_TEXT, "STRING");
		var L_RCTEXT123_TEXT =  "Others' Changes Visible";
		oResHelper.AddResource("IDS_DBPROP_OTHERUPDATEDELETE", L_RCTEXT123_TEXT, "STRING");
		var L_RCTEXT124_TEXT =     "Own Inserts Visible";
		oResHelper.AddResource("IDS_DBPROP_OWNINSERT", L_RCTEXT124_TEXT, "STRING");
		var L_RCTEXT125_TEXT =  "Own Changes Visible";
		oResHelper.AddResource("IDS_DBPROP_OWNUPDATEDELETE", L_RCTEXT125_TEXT, "STRING");
		var L_RCTEXT126_TEXT =  "Quick Restart";
		oResHelper.AddResource("IDS_DBPROP_QUICKRESTART", L_RCTEXT126_TEXT, "STRING");
		var L_RCTEXT127_TEXT =  "Reentrant Events";
		oResHelper.AddResource("IDS_DBPROP_REENTRANTEVENTS", L_RCTEXT127_TEXT, "STRING");
		var L_RCTEXT128_TEXT =  "Remove Deleted Rows";
		oResHelper.AddResource("IDS_DBPROP_REMOVEDELETED", L_RCTEXT128_TEXT, "STRING");
		var L_RCTEXT129_TEXT =  "Report Multiple Changes";
		oResHelper.AddResource("IDS_DBPROP_REPORTMULTIPLECHANGES", L_RCTEXT129_TEXT, "STRING");
		var L_RCTEXT130_TEXT =   "Row Privileges";
		oResHelper.AddResource("IDS_DBPROP_ROWRESTRICT", L_RCTEXT130_TEXT, "STRING");
		var L_RCTEXT131_TEXT =  "Row Threading Model";
		oResHelper.AddResource("IDS_DBPROP_ROWTHREADMODEL", L_RCTEXT131_TEXT, "STRING");
		var L_RCTEXT132_TEXT =  "Bookmarks Ordered";
		oResHelper.AddResource("IDS_DBPROP_ORDEREDBOOKMARKS", L_RCTEXT132_TEXT, "STRING");
		var L_RCTEXT133_TEXT =  "Notification Granularity";
		oResHelper.AddResource("IDS_DBPROP_NOTIFICATIONGRANULARITY", L_RCTEXT133_TEXT, "STRING");
		// 1.5 properties
		var L_RCTEXT134_TEXT =  "Filter Operations";
		oResHelper.AddResource("IDS_DBPROP_FILTERCOMPAREOPS", L_RCTEXT134_TEXT, "STRING");
		var L_RCTEXT135_TEXT =  "Find Operations";
		oResHelper.AddResource("IDS_DBPROP_FINDCOMPAREOPS", L_RCTEXT135_TEXT, "STRING");
		var L_RCTEXT136_TEXT =  "IChapteredRowset";
		oResHelper.AddResource("IDS_DBPROP_IChapteredRowset", L_RCTEXT136_TEXT, "STRING");
		var L_RCTEXT137_TEXT =  "IDBAsynchStatus";
		oResHelper.AddResource("IDS_DBPROP_IDBAsynchStatus", L_RCTEXT137_TEXT, "STRING");
		var L_RCTEXT138_TEXT =  "IRowsetFind";
		oResHelper.AddResource("IDS_DBPROP_IRowsetFind", L_RCTEXT138_TEXT, "STRING");
		var L_RCTEXT139_TEXT =  "IRowsetView";
		oResHelper.AddResource("IDS_DBPROP_IRowsetView", L_RCTEXT139_TEXT, "STRING");
		var L_RCTEXT140_TEXT =  "IViewChapter";
		oResHelper.AddResource("IDS_DBPROP_IViewChapter", L_RCTEXT140_TEXT, "STRING");
		var L_RCTEXT141_TEXT =  "IViewFilter";
		oResHelper.AddResource("IDS_DBPROP_IViewFilter", L_RCTEXT141_TEXT, "STRING");
		var L_RCTEXT142_TEXT =  "IViewRowset";
		oResHelper.AddResource("IDS_DBPROP_IViewRowset", L_RCTEXT142_TEXT, "STRING");
		var L_RCTEXT143_TEXT =  "IViewSort";
		oResHelper.AddResource("IDS_DBPROP_IViewSort", L_RCTEXT143_TEXT, "STRING");
		var L_RCTEXT144_TEXT =  "Asynchronous Processing";
		oResHelper.AddResource("IDS_DBPROP_INIT_ASYNCH", L_RCTEXT144_TEXT, "STRING");
		var L_RCTEXT145_TEXT =  "Maximum Open Chapters";
		oResHelper.AddResource("IDS_DBPROP_MAXOPENCHAPTERS", L_RCTEXT145_TEXT, "STRING");
		var L_RCTEXT146_TEXT =  "Maximum OR Conditions";
		oResHelper.AddResource("IDS_DBPROP_MAXORSINFILTER", L_RCTEXT146_TEXT, "STRING");
		var L_RCTEXT147_TEXT =  "Maximum Sort Columns";
		oResHelper.AddResource("IDS_DBPROP_MAXSORTCOLUMNS", L_RCTEXT147_TEXT, "STRING");
		var L_RCTEXT148_TEXT =  "Asynchronous Rowset Processing";
		oResHelper.AddResource("IDS_DBPROP_ROWSET_ASYNCH", L_RCTEXT148_TEXT, "STRING");
		var L_RCTEXT149_TEXT =  "Sort on Index";
		oResHelper.AddResource("IDS_DBPROP_SORTONINDEX", L_RCTEXT149_TEXT, "STRING");
		// 2.0 properties
		var L_RCTEXT150_TEXT =  "IMultipleResults";
		oResHelper.AddResource("IDS_DBPROP_IMultipleResults", L_RCTEXT150_TEXT, "STRING");
		var L_RCTEXT151_TEXT =  "Data Source Type";
		oResHelper.AddResource("IDS_DBPROP_DATASOURCE_TYPE", L_RCTEXT151_TEXT, "STRING");
//MDPROP
		var L_RCTEXT152_TEXT =  "Number of axes in the dataset";
		oResHelper.AddResource("IDS_MDPROP_AXES", L_RCTEXT152_TEXT, "STRING");
		var L_RCTEXT153_TEXT =  "Flattening Support";
		oResHelper.AddResource("IDS_MDPROP_FLATTENING_SUPPORT", L_RCTEXT153_TEXT, "STRING");
		var L_RCTEXT154_TEXT =  "Support for query joining multiple cubes";
		oResHelper.AddResource("IDS_MDPROP_MDX_JOINCUBES", L_RCTEXT154_TEXT, "STRING");
		var L_RCTEXT155_TEXT =  "Support for named levels";
		oResHelper.AddResource("IDS_MDPROP_NAMED_LEVELS", L_RCTEXT155_TEXT, "STRING");
		//
		var L_RCTEXT156_TEXT =  "RANGEROWSET";
		oResHelper.AddResource("IDS_MDPROP_RANGEROWSET", L_RCTEXT156_TEXT, "STRING");
		var L_RCTEXT157_TEXT =  "The capabilities in the WHERE clause of an MDX statement";
		oResHelper.AddResource("IDS_MDPROP_MDX_SLICER", L_RCTEXT157_TEXT, "STRING");
		//
		var L_RCTEXT158_TEXT =  "MDX_CUBEQUALIFICATION";
		oResHelper.AddResource("IDS_MDPROP_MDX_CUBEQUALIFICATION", L_RCTEXT158_TEXT, "STRING");
		var L_RCTEXT159_TEXT =  "Support for outer reference in an MDX statement";
		oResHelper.AddResource("IDS_MDPROP_MDX_OUTERREFERENCE", L_RCTEXT159_TEXT, "STRING");
		var L_RCTEXT160_TEXT =  "Support for querying by property values in an MDX statement";
		oResHelper.AddResource("IDS_MDPROP_MDX_QUERYBYPROPERTY", L_RCTEXT160_TEXT, "STRING");
		var L_RCTEXT161_TEXT =  "Support for MDX case statements";
		oResHelper.AddResource("IDS_MDPROP_MDX_CASESUPPORT", L_RCTEXT161_TEXT, "STRING");
		var L_RCTEXT162_TEXT =  "Support for string comparison operators other than equals and not-equals operators";
		oResHelper.AddResource("IDS_MDPROP_MDX_STRING_COMPOP", L_RCTEXT162_TEXT, "STRING");
		var L_RCTEXT163_TEXT =  "Support for various <desc flag> values in the DESCENDANTS function";
		oResHelper.AddResource("IDS_MDPROP_MDX_DESCFLAGS", L_RCTEXT163_TEXT, "STRING");
		var L_RCTEXT164_TEXT =  "Support for various set functions";
		oResHelper.AddResource("IDS_MDPROP_MDX_SET_FUNCTIONS", L_RCTEXT164_TEXT, "STRING");
		var L_RCTEXT165_TEXT =  "Support for various member functions";
		oResHelper.AddResource("IDS_MDPROP_MDX_MEMBER_FUNCTIONS", L_RCTEXT165_TEXT, "STRING");
		var L_RCTEXT166_TEXT =  "Support for various numeric functions";
		oResHelper.AddResource("IDS_MDPROP_MDX_NUMERIC_FUNCTIONS", L_RCTEXT166_TEXT, "STRING");
		var L_RCTEXT167_TEXT =  "Support for creation of named sets and calculated members";
		oResHelper.AddResource("IDS_MDPROP_MDX_FORMULAS", L_RCTEXT167_TEXT, "STRING");
		var L_RCTEXT168_TEXT =  "Support for updating aggregated cells";
		oResHelper.AddResource("IDS_MDPROP_AGGREGATECELL_UPDATE", L_RCTEXT168_TEXT, "STRING");
		//
		var L_RCTEXT169_TEXT =  "MDX_AGGREGATECELL_UPDATE";
		oResHelper.AddResource("IDS_MDPROP_MDX_AGGREGATECELL_UPDATE", L_RCTEXT169_TEXT, "STRING");
		var L_RCTEXT170_TEXT =  "Provider's ability to qualify a cube name";
		oResHelper.AddResource("IDS_MDPROP_MDX_OBJQUALIFICATION", L_RCTEXT170_TEXT, "STRING");
		var L_RCTEXT171_TEXT =  "The capabilities in the <numeric_value_expression> argument of set functions";
		oResHelper.AddResource("IDS_MDPROP_MDX_NONMEASURE_EXPRESSONS", L_RCTEXT171_TEXT, "STRING");
// DBPROP
		var L_RCTEXT172_TEXT =  "Access Order";
		oResHelper.AddResource("IDS_DBPROP_ACCESSORDER", L_RCTEXT172_TEXT, "STRING");
		var L_RCTEXT173_TEXT =  "Bookmark Information";
		oResHelper.AddResource("IDS_DBPROP_BOOKMARKINFO", L_RCTEXT173_TEXT, "STRING");
		var L_RCTEXT174_TEXT =  "Initial Catalog";
		oResHelper.AddResource("IDS_DBPROP_INIT_CATALOG", L_RCTEXT174_TEXT, "STRING");
		var L_RCTEXT175_TEXT =  "Bulk Operations";
		oResHelper.AddResource("IDS_DBPROP_ROW_BULKOPS", L_RCTEXT175_TEXT, "STRING");
		var L_RCTEXT176_TEXT =  "Provider Friendly Name";
		oResHelper.AddResource("IDS_DBPROP_PROVIDERFRIENDLYNAME", L_RCTEXT176_TEXT, "STRING");
		var L_RCTEXT177_TEXT =  "Lock Mode";
		oResHelper.AddResource("IDS_DBPROP_LOCKMODE", L_RCTEXT177_TEXT, "STRING");
		var L_RCTEXT178_TEXT =  "Multiple Connections";
		oResHelper.AddResource("IDS_DBPROP_MULTIPLECONNECTIONS", L_RCTEXT178_TEXT, "STRING");
		var L_RCTEXT179_TEXT =  "Unique Rows";
		oResHelper.AddResource("IDS_DBPROP_UNIQUEROWS", L_RCTEXT179_TEXT, "STRING");
		var L_RCTEXT180_TEXT =  "Server Data on Insert";
		oResHelper.AddResource("IDS_DBPROP_SERVERDATAONINSERT", L_RCTEXT180_TEXT, "STRING");
		//
		var L_RCTEXT181_TEXT =  "STORAGEFLAGS";
		oResHelper.AddResource("IDS_DBPROP_STORAGEFLAGS", L_RCTEXT181_TEXT, "STRING");
		var L_RCTEXT182_TEXT =  "Connection Status";
		oResHelper.AddResource("IDS_DBPROP_CONNECTIONSTATUS", L_RCTEXT182_TEXT, "STRING");
		var L_RCTEXT183_TEXT =  "Alter Column Support";
		oResHelper.AddResource("IDS_DBPROP_ALTERCOLUMN", L_RCTEXT183_TEXT, "STRING");
		var L_RCTEXT184_TEXT =  "Column LCID";
		oResHelper.AddResource("IDS_DBPROP_COLUMNLCID", L_RCTEXT184_TEXT, "STRING");
		var L_RCTEXT185_TEXT =  "Reset Datasource";
		oResHelper.AddResource("IDS_DBPROP_RESETDATASOURCE", L_RCTEXT185_TEXT, "STRING");
		var L_RCTEXT186_TEXT =  "OLE DB Services";
		oResHelper.AddResource("IDS_DBPROP_INIT_OLEDBSERVICES", L_RCTEXT186_TEXT, "STRING");
		var L_RCTEXT187_TEXT =  "IRowsetRefresh";
		oResHelper.AddResource("IDS_DBPROP_IRowsetRefresh", L_RCTEXT187_TEXT, "STRING");
		var L_RCTEXT188_TEXT =  "Server Name";
		oResHelper.AddResource("IDS_DBPROP_SERVERNAME", L_RCTEXT188_TEXT, "STRING");
		var L_RCTEXT189_TEXT =  "IParentRowset";
		oResHelper.AddResource("IDS_DBPROP_IParentRowset", L_RCTEXT189_TEXT, "STRING");
		var L_RCTEXT190_TEXT =  "Hidden Column Count";
		oResHelper.AddResource("IDS_DBPROP_HIDDENCOLUMNS", L_RCTEXT190_TEXT, "STRING");
		var L_RCTEXT191_TEXT =  "Provider Owned Memory";
		oResHelper.AddResource("IDS_DBPROP_PROVIDERMEMORY", L_RCTEXT191_TEXT, "STRING");
		var L_RCTEXT192_TEXT =  "Client Cursor";
		oResHelper.AddResource("IDS_DBPROP_CLIENTCURSOR", L_RCTEXT192_TEXT, "STRING");
		// 2.1 properties
		var L_RCTEXT193_TEXT =  "Trustee User Name";
		oResHelper.AddResource("IDS_DBPROP_TRUSTEE_USERNAME", L_RCTEXT193_TEXT, "STRING");
		var L_RCTEXT194_TEXT =  "Authentication String";
		oResHelper.AddResource("IDS_DBPROP_TRUSTEE_AUTHENTICATION", L_RCTEXT194_TEXT, "STRING");
		var L_RCTEXT195_TEXT =  "New Authentication String";
		oResHelper.AddResource("IDS_DBPROP_TRUSTEE_NEWAUTHENTICATION", L_RCTEXT195_TEXT, "STRING");
		var L_RCTEXT196_TEXT =  "IRow";
		oResHelper.AddResource("IDS_DBPROP_IRow", L_RCTEXT196_TEXT, "STRING");
		var L_RCTEXT197_TEXT =  "IRowChange";
		oResHelper.AddResource("IDS_DBPROP_IRowChange", L_RCTEXT197_TEXT, "STRING");
		var L_RCTEXT198_TEXT =  "IRowSchemaChange";
		oResHelper.AddResource("IDS_DBPROP_IRowSchemaChange", L_RCTEXT198_TEXT, "STRING");
		var L_RCTEXT199_TEXT =  "IGetRow";
		oResHelper.AddResource("IDS_DBPROP_IGetRow", L_RCTEXT199_TEXT, "STRING");
		var L_RCTEXT200_TEXT =  "IScopedOperations";
		oResHelper.AddResource("IDS_DBPROP_IScopedOperations", L_RCTEXT200_TEXT, "STRING");
		var L_RCTEXT201_TEXT =  "IBindResource";
		oResHelper.AddResource("IDS_DBPROP_IBindResource", L_RCTEXT201_TEXT, "STRING");
		var L_RCTEXT202_TEXT =  "ICreateRow";
		oResHelper.AddResource("IDS_DBPROP_ICreateRow", L_RCTEXT202_TEXT, "STRING");
		var L_RCTEXT203_TEXT =  "Bind Flags";
		oResHelper.AddResource("IDS_DBPROP_INIT_BINDFLAGS", L_RCTEXT203_TEXT, "STRING");
		var L_RCTEXT204_TEXT =  "Lock Owner";
		oResHelper.AddResource("IDS_DBPROP_INIT_LOCKOWNER", L_RCTEXT204_TEXT, "STRING");
		var L_RCTEXT205_TEXT =  "URL Generation";
		oResHelper.AddResource("IDS_DBPROP_GENERATEURL", L_RCTEXT205_TEXT, "STRING");
		//
		var L_RCTEXT206_TEXT =  "IDBBinderProperties";
		oResHelper.AddResource("IDS_DBPROP_IDBBinderProperties", L_RCTEXT206_TEXT, "STRING");
		var L_RCTEXT207_TEXT =  "IColumnsInfo2";
		oResHelper.AddResource("IDS_DBPROP_IColumnsInfo2", L_RCTEXT207_TEXT, "STRING");
		//
		var L_RCTEXT208_TEXT =  "IRegisterProvider";
		oResHelper.AddResource("IDS_DBPROP_IRegisterProvider", L_RCTEXT208_TEXT, "STRING");
		var L_RCTEXT209_TEXT =  "IGetSession";
		oResHelper.AddResource("IDS_DBPROP_IGetSession", L_RCTEXT209_TEXT, "STRING");
		var L_RCTEXT210_TEXT =  "IGetSourceRow";
		oResHelper.AddResource("IDS_DBPROP_IGetSourceRow", L_RCTEXT210_TEXT, "STRING");
		var L_RCTEXT211_TEXT =  "IRowsetCurrentIndex";
		oResHelper.AddResource("IDS_DBPROP_IRowsetCurrentIndex", L_RCTEXT211_TEXT, "STRING");
		var L_RCTEXT212_TEXT =  "Open Rowset Support";
		oResHelper.AddResource("IDS_DBPROP_OPENROWSETSUPPORT", L_RCTEXT212_TEXT, "STRING");
		var L_RCTEXT213_TEXT =  "Is Long";
		oResHelper.AddResource("IDS_DBPROP_COL_ISLONG", L_RCTEXT213_TEXT, "STRING");
		// 2.5 properties
		var L_RCTEXT214_TEXT =  "Seed";
		oResHelper.AddResource("IDS_DBPROP_COL_SEED", L_RCTEXT214_TEXT, "STRING");
		var L_RCTEXT215_TEXT =  "Increment";
		oResHelper.AddResource("IDS_DBPROP_COL_INCREMENT", L_RCTEXT215_TEXT, "STRING");
		var L_RCTEXT216_TEXT =  "General Timeout";
		oResHelper.AddResource("IDS_DBPROP_INIT_GENERALTIMEOUT", L_RCTEXT216_TEXT, "STRING");
		var L_RCTEXT217_TEXT =  "COM Service Support";
		oResHelper.AddResource("IDS_DBPROP_COMSERVICES", L_RCTEXT217_TEXT, "STRING");
		// 2.6 properties
		var L_RCTEXT218_TEXT =  "Output Stream";
		oResHelper.AddResource("IDS_DBPROP_OUTPUTSTREAM", L_RCTEXT218_TEXT, "STRING");
		var L_RCTEXT219_TEXT =  "Output Encoding";
		oResHelper.AddResource("IDS_DBPROP_OUTPUTENCODING", L_RCTEXT219_TEXT, "STRING");
		var L_RCTEXT220_TEXT =  "Table Statistics Support";
		oResHelper.AddResource("IDS_DBPROP_TABLESTATISTICS", L_RCTEXT220_TEXT, "STRING");
		var L_RCTEXT221_TEXT =  "Skip Row Count Results";
		oResHelper.AddResource("IDS_DBPROP_SKIPROWCOUNTRESULTS", L_RCTEXT221_TEXT, "STRING");
		var L_RCTEXT222_TEXT =  "IRowsetBookmark";
		oResHelper.AddResource("IDS_DBPROP_IRowsetBookmark", L_RCTEXT222_TEXT, "STRING");
//MDPROP
		var L_RCTEXT223_TEXT =  "Defines visibility of precalculated totals";
		oResHelper.AddResource("IDS_MDPROP_VISUALMODE", L_RCTEXT223_TEXT, "STRING");

		if (!bAttributed)
		{
			// Get LibID
			wizard.AddSymbol("LIBID_REGISTRY_FORMAT", oCM.IDLLibraries(1).Attributes.Find("uuid").Value);

			// Get AppID
			var strAppID = wizard.GetAppID();
			if (strAppID.length > 0)
			{
				wizard.AddSymbol("APPID_EXIST", true);
				wizard.AddSymbol("APPID_REGISTRY_FORMAT", strAppID);
			}

			// add RGS file resource
			strRGSFile = GetUniqueFileName(strProjectPath, strShortName + ".rgs");
			var strRGSID = "IDR_" + strUpperShortName;
			RenderAddTemplate("provider.rgs", strRGSFile, false, false);
			var strSymbolValue = oResHelper.AddResource(strRGSID, strProjectPath + strRGSFile, "REGISTRY");
			wizard.AddSymbol("RGS_ID", strSymbolValue.split("=").shift());
	
			// Render provco.idl and insert into strProject.idl
			AddCoclassFromFile(oCM, "provco.idl");
		}
		oResHelper.CloseResourceFile();

		// Add #include <atldb.h> to pchFile, if any
		var nTotal = selProj.Object.Configurations.Count;
		var nCntr;
		var pchFile = "";
		for (nCntr = 1; nCntr <= nTotal; nCntr++)
		{
			var VCCLTool = selProj.Object.Configurations(nCntr).Tools("VCCLCompilerTool");
			if(VCCLTool.UsePrecompiledHeader == pchUseUsingSpecific)
			{
				if(pchFile=="")
					pchFile = VCCLTool.PrecompiledHeaderThrough;
			}
			if(pchFile!="")
			{
				if (!DoesIncludeExist(selProj, "<atldb.h>", pchFile))
					oCM.AddInclude("<atldb.h>", pchFile, vsCMAddPositionEnd);
				break;
			}
		}

		// Add header
		var strTemplatePath	= wizard.FindSymbol("TEMPLATES_PATH");
		if ("\\" != strTemplatePath.charAt(strTemplatePath.length-1))
			strTemplatePath += "\\";

		wizard.RenderTemplate(strTemplatePath + "prowset.h", strRowsetHeader);
		wizard.RenderTemplate(strTemplatePath + "psession.h", strSessionHeader);
		wizard.RenderTemplate(strTemplatePath + "pdatasrc.h", strDataSourceHeader);

		AddFileToProject(strRowsetHeader, selProj, true);
		AddFileToProject(strSessionHeader, selProj, false);
		AddFileToProject(strDataSourceHeader, selProj, false);

		// Add CPP
		RenderAddTemplate("prowset.cpp", strRowsetImpl, selProj, false);
		
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

function CreateGUIDs()
{
	try
	{
		// create CLSID
		var strRawGUID = wizard.CreateGuid();
		var strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
		wizard.AddSymbol("CLSID_REGISTRY_FORMAT", strFormattedGUID);

		strRawGUID = wizard.CreateGuid();
		strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
		wizard.AddSymbol("CLSID_COMMAND_REGISTRY_FORMAT", strFormattedGUID);

		strRawGUID = wizard.CreateGuid();
		strFormattedGUID = wizard.FormatGuid(strRawGUID, 0);
		wizard.AddSymbol("CLSID_SESSION_REGISTRY_FORMAT", strFormattedGUID);
	}
	catch(e)
	{
		throw e;
	}
}
