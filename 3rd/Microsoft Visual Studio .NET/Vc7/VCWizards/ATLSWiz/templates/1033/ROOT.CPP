// [!output PROJECT_NAME].cpp : Defines the entry point for the DLL application.
//

#include "stdafx.h"
[!if WEBDBG]
// For custom assert and trace handling with WebDbg.exe
#ifdef _DEBUG
CDebugReportHook g_ReportHook;
#endif
[!endif]
[!if GENERATING_APP]

#include "[!output APP_FILE]"
[!endif]
[!if ATTRIBUTED]
[ module(name="My[!output SAFE_PROJECT_NAME]", type="dll") ][!if !GENERATING_APP];[!endif]
[!if GENERATING_APP]

class CDllMainOverride
{
public:
	BOOL WINAPI DllMain(DWORD dwReason, LPVOID lpReserved)
	{
#if defined(_M_IX86)
		if (dwReason == DLL_PROCESS_ATTACH)
		{
			// stack overflow handler
			_set_security_error_handler( AtlsSecErrHandlerFunc );
		}
#endif
		return __super::DllMain(dwReason, lpReserved);
	}
};
[!endif]

[ emitidl(restricted) ];
[!else]

class C[!output SAFE_PROJECT_NAME]Module : public CAtlDllModuleT<C[!output SAFE_PROJECT_NAME]Module>
{
public:
	BOOL WINAPI DllMain(DWORD dwReason, LPVOID lpReserved) throw()
	{
[!if GENERATING_APP]
#if defined(_M_IX86)
		if (dwReason == DLL_PROCESS_ATTACH)
		{
			// stack overflow handler
			_set_security_error_handler( AtlsSecErrHandlerFunc );
		}
#endif
[!endif]
		return __super::DllMain(dwReason, lpReserved);
	}
};

C[!output SAFE_PROJECT_NAME]Module _AtlModule;

[!if !ATTRIBUTED && GENERATING_APP]
[!if TODO]

// TODO: Add additional request handlers to the handler map
[!endif]

BEGIN_HANDLER_MAP()
	HANDLER_ENTRY("Default", [!output APP_CLASS])
END_HANDLER_MAP()
[!endif]
[!endif]
[!if GENERATING_ISAPI]
[!if DATASOURCE_CACHE || BLOB_CACHE || FILE_CACHE || SESSION_MEM || SESSION_DB || BROWSCAPS]

#include "[!output EXTENSION_FILE]"
[!endif]
[!if PERFMON]

BEGIN_PERFREG_MAP()
	PERFREG_ENTRY(CRequestPerfMon)
END_PERFREG_MAP()
[!endif]
[!endif]
[!if GENERATING_ISAPI]
[!if PERFMON]

typedef [!output EXTENSION_CLASS]<CThreadPool<[!if DATASOURCE_CACHE][!output EXTENSION_CLASS]Worker[!else]CIsapiWorker[!endif]>, CPerfMonRequestStats > ExtensionType;
[!else]

typedef [!output EXTENSION_CLASS]<[!if DATASOURCE_CACHE]CThreadPool<[!output EXTENSION_CLASS]Worker> [!endif]> ExtensionType;
[!endif]

// The ATL Server ISAPI extension
ExtensionType theExtension;
[!endif]
[!if GENERATING_ISAPI]


// Delegate ISAPI exports to theExtension
//
extern "C" DWORD WINAPI HttpExtensionProc(LPEXTENSION_CONTROL_BLOCK lpECB)
{
	return theExtension.HttpExtensionProc(lpECB);
}

extern "C" BOOL WINAPI GetExtensionVersion(HSE_VERSION_INFO* pVer)
{
	return theExtension.GetExtensionVersion(pVer);
}

extern "C" BOOL WINAPI TerminateExtension(DWORD dwFlags)
{
	return theExtension.TerminateExtension(dwFlags);
}
[!endif]
[!if !ATTRIBUTED]


// DLL Entry Point
//
extern "C"
BOOL WINAPI DllMain(HINSTANCE hInstance, DWORD dwReason, LPVOID lpReserved)
{
	hInstance;
	return _AtlModule.DllMain(dwReason, lpReserved); 
}
[!if GENERATING_ISAPI && PERFMON]


// DllRegisterServer - Adds entries to the system registry
//
STDAPI DllRegisterServer(void)
{
	return _AtlModule.DllRegisterServer(FALSE);
}


// DllUnregisterServer - Removes entries from the system registry
//
STDAPI DllUnregisterServer(void)
{
	return _AtlModule.DllUnregisterServer(FALSE);
}
[!endif]
[!endif]