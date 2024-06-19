// compreg.h : Declaration of the CCompReg

#pragma once

#include "resource.h"       // main symbols
[!if !ATTRIBUTED]
#include "[!output PROJECT_NAME].h"
[!endif]

[!if ATTRIBUTED]

// IComponentRegistrar
[
	object,
	uuid(a817e7a2-43fa-11d0-9e44-00aa00b6770a),
	dual,
	helpstring("IComponentRegistrar Interface"),
	pointer_default(unique)
]
__interface IComponentRegistrar : IDispatch
{
	[id(1)]	HRESULT Attach([in] BSTR bstrPath);
	[id(2)]	HRESULT RegisterAll();
	[id(3)]	HRESULT UnregisterAll();
	[id(4)]	HRESULT GetComponents([out, satype(BSTR)] SAFEARRAY** pbstrCLSIDs, [out, satype(BSTR)] SAFEARRAY** pbstrDescriptions);
	[id(5)]	HRESULT RegisterComponent([in] BSTR bstrCLSID);
	[id(6)] HRESULT UnregisterComponent([in] BSTR bstrCLSID);
};
[!endif]


// CCompReg
[!if ATTRIBUTED]
[
	coclass,
	threading("single"),
	uuid([!output COMPREG_REGISTRY_FORMAT]),
	helpstring("ComponentRegistrar Class")
]
[!endif]
class ATL_NO_VTABLE CCompReg : 
[!if ATTRIBUTED]
	public IComponentRegistrar
[!else]
	public CComObjectRootEx<CComSingleThreadModel>,
	public CComCoClass<CCompReg, &CLSID_CompReg>,
	public IDispatchImpl<IComponentRegistrar, &IID_IComponentRegistrar, &LIBID_[!output LIB_NAME]Lib, /*wMajor =*/ 1, /*wMinor =*/ 0>
[!endif]
{
public:
	CCompReg()
	{
	}
[!if !ATTRIBUTED]

DECLARE_NO_REGISTRY()

BEGIN_COM_MAP(CCompReg)
	COM_INTERFACE_ENTRY(IComponentRegistrar)
	COM_INTERFACE_ENTRY(IDispatch)
END_COM_MAP()
[!endif]

// IComponentRegistrar
public:
    STDMETHOD(Attach)(BSTR bstrPath)
	{
		return S_OK;
	}
	STDMETHOD(RegisterAll)()
	{
		return _pModule->RegisterServer(TRUE);
	}
	STDMETHOD(UnregisterAll)()    
	{
		_pModule->UnregisterServer(TRUE);
		return S_OK;
	}
	STDMETHOD(GetComponents)(SAFEARRAY **ppCLSIDs, SAFEARRAY **ppDescriptions)
	{
		_ATL_OBJMAP_ENTRY* pEntry = _pModule->m_pObjMap;
		int nComponents = 0;
		while (pEntry->pclsid != NULL)
		{
			LPCTSTR pszDescription = pEntry->pfnGetObjectDescription();
			if (pszDescription)
				nComponents++;
			pEntry++;
		}
		SAFEARRAYBOUND rgBound[1];
		rgBound[0].lLbound = 0;
		rgBound[0].cElements = nComponents;
		*ppCLSIDs = SafeArrayCreate(VT_BSTR, 1, rgBound);
		*ppDescriptions = SafeArrayCreate(VT_BSTR, 1, rgBound);
		pEntry = _pModule->m_pObjMap;
		for (long i=0; pEntry->pclsid != NULL; pEntry++)
		{
			LPCTSTR pszDescription = pEntry->pfnGetObjectDescription();
			if (pszDescription)
			{
				LPOLESTR pszCLSID;
				StringFromCLSID(*pEntry->pclsid, &pszCLSID);
				SafeArrayPutElement(*ppCLSIDs, &i, OLE2BSTR(pszCLSID));
				CoTaskMemFree(pszCLSID);
				SafeArrayPutElement(*ppDescriptions, &i, T2BSTR(pszDescription));
				i++;
			}
		}

		return S_OK;
	}
	STDMETHOD(RegisterComponent)(BSTR bstrCLSID)
	{
		CLSID clsid;
		CLSIDFromString(bstrCLSID, &clsid);
		_pModule->RegisterServer(TRUE, &clsid);
		return S_OK;
	}
	STDMETHOD(UnregisterComponent)(BSTR bstrCLSID)
	{
		CLSID clsid;
		CLSIDFromString(bstrCLSID, &clsid);
		_pModule->UnregisterServer(FALSE, &clsid);
		return S_OK;
	}
};

[!if !ATTRIBUTED]
OBJECT_ENTRY_AUTO(CLSID_CompReg, CCompReg)
[!endif]
