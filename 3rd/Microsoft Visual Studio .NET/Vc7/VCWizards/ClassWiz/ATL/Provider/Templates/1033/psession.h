// [!output SESSION_HEADER] : Declaration of the [!output SESSION_CLASS]

#pragma once

#include "resource.h"       // main symbols
#include "[!output ROWSET_HEADER]"

class [!output SESSION_CLASS]TRSchemaRowset;
class [!output SESSION_CLASS]ColSchemaRowset;
class [!output SESSION_CLASS]PTSchemaRowset;


// [!output SESSION_CLASS]
[!if ATTRIBUTED]
[
	coclass,
	noncreatable,
	uuid("[!output CLSID_SESSION_REGISTRY_FORMAT]"),
	threading("apartment"),
	registration_script("none")
]
[!endif]
class ATL_NO_VTABLE [!output SESSION_CLASS] : 
[!if !ATTRIBUTED]
	public CComObjectRootEx<CComSingleThreadModel>,
[!endif]
	public IGetDataSourceImpl<[!output SESSION_CLASS]>,
	public IOpenRowsetImpl<[!output SESSION_CLASS]>,
	public ISessionPropertiesImpl<[!output SESSION_CLASS]>,
	public IObjectWithSiteSessionImpl<[!output SESSION_CLASS]>,
	public IDBSchemaRowsetImpl<[!output SESSION_CLASS]>,
	public IDBCreateCommandImpl<[!output SESSION_CLASS], [!output COMMAND_CLASS]>
{
public:
	[!output SESSION_CLASS]()
	{
	}

	DECLARE_PROTECT_FINAL_CONSTRUCT()

	HRESULT FinalConstruct()
	{
		return FInit();
	}
	
	void FinalRelease() 
	{
	}

	STDMETHOD(OpenRowset)(IUnknown *pUnk, DBID *pTID, DBID *pInID, REFIID riid,
					   ULONG cSets, DBPROPSET rgSets[], IUnknown **ppRowset)
	{
		[!output ROWSET_CLASS]* pRowset;
		return CreateRowset(pUnk, pTID, pInID, riid, cSets, rgSets, ppRowset, pRowset);
	}

	void SetRestrictions(ULONG cRestrictions, GUID* rguidSchema, ULONG* rgRestrictions)
	{
		for (ULONG l=0; l<cRestrictions; l++)
		{
			// We support restrictions on the table name but nothing else
			if (InlineIsEqualGUID(rguidSchema[l], DBSCHEMA_TABLES))
				rgRestrictions[l] = 0x04;
			else if (InlineIsEqualGUID(rguidSchema[l], DBSCHEMA_COLUMNS))
				rgRestrictions[l] = 0x04;
			else if (InlineIsEqualGUID(rguidSchema[l], DBSCHEMA_PROVIDER_TYPES))
				rgRestrictions[l] = 0x00;
		}
	}

BEGIN_PROPSET_MAP([!output SESSION_CLASS])
	BEGIN_PROPERTY_SET(DBPROPSET_SESSION)
		PROPERTY_INFO_ENTRY(SESS_AUTOCOMMITISOLEVELS)
	END_PROPERTY_SET(DBPROPSET_SESSION)
END_PROPSET_MAP()

[!if !ATTRIBUTED]
BEGIN_COM_MAP([!output SESSION_CLASS])
	COM_INTERFACE_ENTRY(IGetDataSource)
	COM_INTERFACE_ENTRY(IOpenRowset)
	COM_INTERFACE_ENTRY(ISessionProperties)
	COM_INTERFACE_ENTRY(IObjectWithSite)
	COM_INTERFACE_ENTRY(IDBCreateCommand)
	COM_INTERFACE_ENTRY(IDBSchemaRowset)
END_COM_MAP()
[!endif]

BEGIN_SCHEMA_MAP([!output SESSION_CLASS])
	SCHEMA_ENTRY(DBSCHEMA_TABLES, [!output SESSION_CLASS]TRSchemaRowset)
	SCHEMA_ENTRY(DBSCHEMA_COLUMNS, [!output SESSION_CLASS]ColSchemaRowset)
	SCHEMA_ENTRY(DBSCHEMA_PROVIDER_TYPES, [!output SESSION_CLASS]PTSchemaRowset)
END_SCHEMA_MAP()

};

class [!output SESSION_CLASS]TRSchemaRowset : 
	public CSchemaRowsetImpl< [!output SESSION_CLASS]TRSchemaRowset, CTABLESRow, [!output SESSION_CLASS]>
{
public:
BEGIN_PROPSET_MAP([!output SESSION_CLASS]TRSchemaRowset)
	BEGIN_PROPERTY_SET(DBPROPSET_ROWSET)
		PROPERTY_INFO_ENTRY(IAccessor)
		PROPERTY_INFO_ENTRY(IColumnsInfo)
		PROPERTY_INFO_ENTRY(IConvertType)
		PROPERTY_INFO_ENTRY(IRowset)
		PROPERTY_INFO_ENTRY(IRowsetIdentity)
		PROPERTY_INFO_ENTRY(IRowsetInfo)
		PROPERTY_INFO_ENTRY(CANFETCHBACKWARDS)
		PROPERTY_INFO_ENTRY(CANHOLDROWS)
		PROPERTY_INFO_ENTRY(CANSCROLLBACKWARDS)
		PROPERTY_INFO_ENTRY_VALUE(MAXOPENROWS, 0)
		PROPERTY_INFO_ENTRY_VALUE(MAXROWS, 0)
	END_PROPERTY_SET(DBPROPSET_ROWSET)
END_PROPSET_MAP()

	HRESULT Execute(LONG* pcRowsAffected, ULONG, const VARIANT*)
	{
		USES_CONVERSION;
		C[!output SHORT_NAME]WindowsFile wf;
		CTABLESRow trData;
		lstrcpyW(trData.m_szType, OLESTR("TABLE"));
		lstrcpyW(trData.m_szDesc, OLESTR("The Directory Table"));

		HANDLE hFile = INVALID_HANDLE_VALUE;
		TCHAR szDir[MAX_PATH + 1];
		DWORD cbCurDir = GetCurrentDirectory(MAX_PATH, szDir);
		lstrcat(szDir, _T("\\*.*"));
		hFile = FindFirstFile(szDir, &wf);
		if (hFile == INVALID_HANDLE_VALUE)
			return E_FAIL; // User doesn't have a c:\ drive
		FindClose(hFile);
		lstrcpynW(trData.m_szTable, T2OLE(szDir), SIZEOF_MEMBER(CTABLESRow, m_szTable));
		if (!m_rgRowData.Add(trData))
			return E_OUTOFMEMORY;
		*pcRowsAffected = 1;
		return S_OK;
	}

	DBSTATUS GetDBStatus(CSimpleRow*, ATLCOLUMNINFO* pInfo)
	{
		if (pInfo->iOrdinal == 1 || pInfo->iOrdinal == 2)
			return DBSTATUS_S_ISNULL;
		return DBSTATUS_S_OK;
	}
};


class [!output SESSION_CLASS]ColSchemaRowset : 
	public CSchemaRowsetImpl< [!output SESSION_CLASS]ColSchemaRowset, CCOLUMNSRow, [!output SESSION_CLASS]>
{
public:
BEGIN_PROPSET_MAP([!output SESSION_CLASS]ColSchemaRowset)
	BEGIN_PROPERTY_SET(DBPROPSET_ROWSET)
		PROPERTY_INFO_ENTRY(IAccessor)
		PROPERTY_INFO_ENTRY(IColumnsInfo)
		PROPERTY_INFO_ENTRY(IConvertType)
		PROPERTY_INFO_ENTRY(IRowset)
		PROPERTY_INFO_ENTRY(IRowsetIdentity)
		PROPERTY_INFO_ENTRY(IRowsetInfo)
		PROPERTY_INFO_ENTRY(CANFETCHBACKWARDS)
		PROPERTY_INFO_ENTRY(CANHOLDROWS)
		PROPERTY_INFO_ENTRY(CANSCROLLBACKWARDS)
		PROPERTY_INFO_ENTRY_VALUE(MAXOPENROWS, 0)
		PROPERTY_INFO_ENTRY_VALUE(MAXROWS, 0)
	END_PROPERTY_SET(DBPROPSET_ROWSET)
END_PROPSET_MAP()

	HRESULT Execute(LONG* pcRowsAffected, ULONG, const VARIANT*)
	{
		USES_CONVERSION;
		C[!output SHORT_NAME]WindowsFile wf;
		HANDLE hFile = INVALID_HANDLE_VALUE;
		TCHAR szDir[MAX_PATH + 1];
		DWORD cbCurDir = GetCurrentDirectory(MAX_PATH, szDir);
		lstrcat(szDir, _T("\\*.*"));
		hFile = FindFirstFile(szDir, &wf);
		if (hFile == INVALID_HANDLE_VALUE)
			return E_FAIL; // User doesn't have a c:\ drive
		FindClose(hFile);// szDir has got the tablename

		DBID dbid;
		memset(&dbid, 0, sizeof(DBID));
		dbid.uName.pwszName = T2OLE(szDir);
		dbid.eKind = DBKIND_NAME;
		return InitFromRowset < _RowsetArrayType > (m_rgRowData, &dbid, NULL, m_spUnkSite, pcRowsAffected);
	}
	DBSTATUS GetDBStatus(CSimpleRow*, ATLCOLUMNINFO* pInfo)
	{
		switch(pInfo->iOrdinal)
		{
		case 1:
		case 2:
		case 19:
		case 20:
		case 22:
		case 23:
		case 25:
		case 26:
			return DBSTATUS_S_ISNULL;
		default:
			return DBSTATUS_S_OK;
		}

	}
};

class [!output SESSION_CLASS]PTSchemaRowset : 
	public CSchemaRowsetImpl< [!output SESSION_CLASS]PTSchemaRowset, CPROVIDER_TYPERow, [!output SESSION_CLASS]>
{
public:
BEGIN_PROPSET_MAP([!output SESSION_CLASS]PTSchemaRowset)
	BEGIN_PROPERTY_SET(DBPROPSET_ROWSET)
		PROPERTY_INFO_ENTRY(IAccessor)
		PROPERTY_INFO_ENTRY(IColumnsInfo)
		PROPERTY_INFO_ENTRY(IConvertType)
		PROPERTY_INFO_ENTRY(IRowset)
		PROPERTY_INFO_ENTRY(IRowsetIdentity)
		PROPERTY_INFO_ENTRY(IRowsetInfo)
		PROPERTY_INFO_ENTRY(CANFETCHBACKWARDS)
		PROPERTY_INFO_ENTRY(CANHOLDROWS)
		PROPERTY_INFO_ENTRY(CANSCROLLBACKWARDS)
		PROPERTY_INFO_ENTRY_VALUE(MAXOPENROWS, 0)
		PROPERTY_INFO_ENTRY_VALUE(MAXROWS, 0)
	END_PROPERTY_SET(DBPROPSET_ROWSET)
END_PROPSET_MAP()

	HRESULT Execute(LONG* pcRowsAffected, ULONG, const VARIANT*)
	{
		return S_OK;
	}
};

