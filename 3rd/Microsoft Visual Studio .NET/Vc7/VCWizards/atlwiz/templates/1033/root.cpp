[!if DLL_APP]
// [!output PROJECT_NAME].cpp : Implementation of DLL Exports.
[!else]
// [!output PROJECT_NAME].cpp : Implementation of WinMain
[!endif]

[!if SUPPORT_COMPLUS]
//
// Note: COM+ 1.0 Information:
//      Please remember to run Microsoft Transaction Explorer to install the component(s).
//      Registration is not done by default. 
[!endif]

#include "stdafx.h"
#include "resource.h"
[!if !ATTRIBUTED]
#include "[!output PROJECT_NAME].h"
[!endif]
[!if SUPPORT_COMPONENT_REGISTRAR]
#include "compreg.h"
[!endif]
[!if MERGE_PROXY_STUB]
#include "dlldatax.h"
[!endif]

[!if ATTRIBUTED]
[!if DLL_APP]

// The module attribute causes DllMain, DllRegisterServer and DllUnregisterServer to be automatically implemented for you
[ module(dll, uuid = "{[!output LIBID_REGISTRY_FORMAT]}", 
		 name = "[!output SAFE_PROJECT_NAME]", 
		 helpstring = "[!output PROJECT_NAME] 1.0 Type Library",
		 resource_name = "IDR_[!output UPPER_CASE_PROJECT_NAME]"[!if SUPPORT_COMPONENT_REGISTRAR], 
		 custom = { "a817e7a1-43fa-11d0-9e44-00aa00b6770a", "{[!output COMPREG_REGISTRY_FORMAT]}"}[!endif]) ];
[!endif]
[!if EXE_APP]

// The module attribute causes WinMain to be automatically implemented for you
[ module(EXE, uuid = "{[!output LIBID_REGISTRY_FORMAT]}", 
		 name = "[!output SAFE_PROJECT_NAME]", 
		 helpstring = "[!output PROJECT_NAME] 1.0 Type Library",
		 resource_name = "IDR_[!output UPPER_CASE_PROJECT_NAME]") ];
[!endif]
[!if SERVICE_APP]

// The module attribute causes WinMain to be automatically implemented for you
[ module(SERVICE, uuid = "{[!output LIBID_REGISTRY_FORMAT]}", 
		 name = "[!output SAFE_PROJECT_NAME]", 
		 helpstring = "[!output PROJECT_NAME] 1.0 Type Library", 
		 resource_name="IDS_SERVICENAME") ];
[!endif]
[!else]
[!if DLL_APP]

class C[!output SAFE_PROJECT_NAME]Module : public CAtlDllModuleT< C[!output SAFE_PROJECT_NAME]Module >
[!endif]
[!if EXE_APP]

class C[!output SAFE_PROJECT_NAME]Module : public CAtlExeModuleT< C[!output SAFE_PROJECT_NAME]Module >
[!endif]
[!if SERVICE_APP]
#include <stdio.h>

class C[!output SAFE_PROJECT_NAME]Module : public CAtlServiceModuleT< C[!output SAFE_PROJECT_NAME]Module, IDS_SERVICENAME >
[!endif]
{
public :
	DECLARE_LIBID(LIBID_[!output LIB_NAME]Lib)
	DECLARE_REGISTRY_APPID_RESOURCEID(IDR_[!output UPPER_CASE_PROJECT_NAME], "{[!output APPID_REGISTRY_FORMAT]}")
};

C[!output SAFE_PROJECT_NAME]Module _AtlModule;

[!if DLL_APP]
[!if SUPPORT_MFC]
class C[!output SAFE_PROJECT_NAME]App : public CWinApp
{
public:

// Overrides
    virtual BOOL InitInstance();
    virtual int ExitInstance();

    DECLARE_MESSAGE_MAP()
};

BEGIN_MESSAGE_MAP(C[!output SAFE_PROJECT_NAME]App, CWinApp)
END_MESSAGE_MAP()

C[!output SAFE_PROJECT_NAME]App theApp;

BOOL C[!output SAFE_PROJECT_NAME]App::InitInstance()
{
[!if MERGE_PROXY_STUB]
#ifdef _MERGE_PROXYSTUB
    if (!PrxDllMain(m_hInstance, DLL_PROCESS_ATTACH, NULL))
		return FALSE;
#endif
[!endif]
    return CWinApp::InitInstance();
}

int C[!output SAFE_PROJECT_NAME]App::ExitInstance()
{
    return CWinApp::ExitInstance();
}
[!else]

// DLL Entry Point
extern "C" BOOL WINAPI DllMain(HINSTANCE hInstance, DWORD dwReason, LPVOID lpReserved)
{
[!if MERGE_PROXY_STUB]
#ifdef _MERGE_PROXYSTUB
    if (!PrxDllMain(hInstance, dwReason, lpReserved))
        return FALSE;
#endif
[!endif]
	hInstance;
    return _AtlModule.DllMain(dwReason, lpReserved); 
}
[!endif]


// Used to determine whether the DLL can be unloaded by OLE
STDAPI DllCanUnloadNow(void)
{
[!if MERGE_PROXY_STUB]
#ifdef _MERGE_PROXYSTUB
    HRESULT hr = PrxDllCanUnloadNow();
    if (FAILED(hr))
        return hr;
#endif
[!endif]
[!if SUPPORT_MFC]
    AFX_MANAGE_STATE(AfxGetStaticModuleState());
    return (AfxDllCanUnloadNow()==S_OK && _AtlModule.GetLockCount()==0) ? S_OK : S_FALSE;
[!else]
    return _AtlModule.DllCanUnloadNow();
[!endif]
}


// Returns a class factory to create an object of the requested type
STDAPI DllGetClassObject(REFCLSID rclsid, REFIID riid, LPVOID* ppv)
{
[!if MERGE_PROXY_STUB]
#ifdef _MERGE_PROXYSTUB
    if (PrxDllGetClassObject(rclsid, riid, ppv) == S_OK)
        return S_OK;
#endif
[!endif]
    return _AtlModule.DllGetClassObject(rclsid, riid, ppv);
}


// DllRegisterServer - Adds entries to the system registry
STDAPI DllRegisterServer(void)
{
    // registers object, typelib and all interfaces in typelib
    HRESULT hr = _AtlModule.DllRegisterServer();
[!if MERGE_PROXY_STUB]
#ifdef _MERGE_PROXYSTUB
    if (FAILED(hr))
        return hr;
    hr = PrxDllRegisterServer();
#endif
[!endif]
	return hr;
}


// DllUnregisterServer - Removes entries from the system registry
STDAPI DllUnregisterServer(void)
{
	HRESULT hr = _AtlModule.DllUnregisterServer();
[!if MERGE_PROXY_STUB]
#ifdef _MERGE_PROXYSTUB
    if (FAILED(hr))
        return hr;
    hr = PrxDllRegisterServer();
    if (FAILED(hr))
        return hr;
    hr = PrxDllUnregisterServer();
#endif
[!endif]
	return hr;
}
[!endif]

[!if EXE_APP]

//
extern "C" int WINAPI _tWinMain(HINSTANCE /*hInstance*/, HINSTANCE /*hPrevInstance*/, 
                                LPTSTR /*lpCmdLine*/, int nShowCmd)
{
    return _AtlModule.WinMain(nShowCmd);
}

[!endif]
[!if SERVICE_APP]

//
extern "C" int WINAPI _tWinMain(HINSTANCE /*hInstance*/, HINSTANCE /*hPrevInstance*/, 
                                LPTSTR /*lpCmdLine*/, int nShowCmd)
{
    return _AtlModule.WinMain(nShowCmd);
}

[!endif]
[!endif]