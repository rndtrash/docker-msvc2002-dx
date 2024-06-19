#pragma once

#include <atlisapi.h>
[!if SESSION_DB]
#include <atldbcli.h>
[!endif]
[!if SESSION_MEM || SESSION_DB]
#include <atlsession.h>
[!endif]
[!if DATASOURCE_CACHE || SESSION_DB || BROWSCAPS]

[!if DATASOURCE_CACHE || SESSION_DB]
#define _DATASOURCE_CACHE 1
[!endif]
[!if BROWSCAPS]
#define _BROWSERCAPS 2
[!endif]

[!if TODO]
// [!output EXTENSION_CLASS]Worker - custom thread worker class
// for per-thread services
[!endif]

class [!output EXTENSION_CLASS]Worker : public CIsapiWorker
{
[!if DATASOURCE_CACHE || SESSION_DB]
	// per thread datasource cache
	typedef CDataSourceCache<> ds_cache_type;
	CComObjectGlobal<ds_cache_type> m_dsCache;
[!endif]
[!if BROWSCAPS]
	// per thread browser capabilities support
	CComObjectGlobal<CBrowserCapsSvc> m_BrowserCaps;		
[!endif]
	
public:

	[!output EXTENSION_CLASS]Worker()
	{
	}
	
	~[!output EXTENSION_CLASS]Worker()
	{
	}
	
[!if BROWSCAPS]
    virtual BOOL Initialize(void *pvParam)
	{
		if (!CIsapiWorker::Initialize(pvParam))
            return FALSE;

		if (S_OK != m_BrowserCaps.Initialize(_pModule->GetModuleInstance()))
		{
			ATLTRACE("Failed to initialize browser capabilities service.\n");
			return FALSE;
		}

        return TRUE;
	}
[!endif]

	virtual BOOL GetWorkerData(DWORD dwParam, void **ppvData)
	{
[!if DATASOURCE_CACHE || SESSION_DB]
		if (dwParam == _DATASOURCE_CACHE && ppvData)
		{
			*ppvData = (void *)&m_dsCache;
			m_dsCache.AddRef();
			return TRUE;
		}
[!endif]
[!if BROWSCAPS]
		if (dwParam == _BROWSERCAPS && ppvData)
		{
			*ppvData = (void *)&m_BrowserCaps;
			m_BrowserCaps.AddRef();
			return TRUE;
		}
[!endif]
		return FALSE;
	}
}; // class [!output EXTENSION_CLASS]Worker
[!endif]

// [!output EXTENSION_CLASS] - the ISAPI extension class
[!if DATASOURCE_CACHE || SESSION_DB || BROWSCAPS]
template <class ThreadPoolClass=CThreadPool<[!output EXTENSION_CLASS]Worker>, 
[!else]
template <class ThreadPoolClass=CThreadPool<CIsapiWorker>, 
[!endif]
	class CStatClass=CNoRequestStats, 
	class HttpUserErrorTextProvider=CDefaultErrorProvider, 
	class WorkerThreadTraits=DefaultThreadTraits >
class [!output EXTENSION_CLASS] : 
	public CIsapiExtension<ThreadPoolClass, 
		CStatClass, 
		HttpUserErrorTextProvider, 
		WorkerThreadTraits>
{

protected:

	typedef CIsapiExtension<ThreadPoolClass, CStatClass, HttpUserErrorTextProvider, 
		WorkerThreadTraits> baseISAPI;
	typedef CWorkerThread<WorkerThreadTraits> WorkerThreadClass;
[!if BLOB_CACHE]

	// blob cache support
	CBlobCache<WorkerThreadClass, CStdStatClass > m_BlobCache;
[!endif]
[!if FILE_CACHE]

	// file cache support
	CFileCache<WorkerThreadClass, CStdStatClass > m_FileCache;
[!endif]
[!if SESSION_MEM]

	// session state support
	typedef CSessionStateService<WorkerThreadClass, CMemSessionServiceImpl> sessionSvcType;
[!endif]
[!if SESSION_DB]

	// session state support
	typedef CSessionStateService<WorkerThreadClass, CDBSessionServiceImpl> sessionSvcType;
[!endif]
[!if SESSION_MEM || SESSION_DB]
	CComObjectGlobal<sessionSvcType> m_SessionStateSvc;
[!endif]

public:

[!if DATASOURCE_CACHE || BLOB_CACHE || FILE_CACHE || SESSION_DB || SESSION_MEM || BROWSCAPS]
	BOOL GetExtensionVersion(HSE_VERSION_INFO* pVer)
	{
		if (!baseISAPI::GetExtensionVersion(pVer))
		{
			return FALSE;
		}
		
		if (GetCriticalIsapiError() != 0)
		{
			return TRUE;
		}
		
[!if SESSION_DB]
		if (S_OK != m_SessionStateSvc.Initialize(&m_WorkerThread, 
							static_cast<IServiceProvider*>(this),

#error Security Issue: The connection string may contain a password
// The connection string below may contain plain text passwords and/or 
// other sensitive information. Please remove the #error after reviewing
// the connection string for any security related issues. You may want to
// store the password in some other form or use a different user authentication.
							L"[!output DB_CONNECTION_STRING]",
							ATL_SESSION_TIMEOUT))
		{
			ATLTRACE("Session service failed to initialize\n");
			TerminateExtension(0);
			return SetCriticalIsapiError(IDS_ATLSRV_CRITICAL_SESSIONSTATEFAILED);
		}
[!endif]
[!if SESSION_MEM]
		if (S_OK != m_SessionStateSvc.Initialize(&m_WorkerThread,  static_cast<IServiceProvider*>(this)))
		{
			ATLTRACE("Session service failed to initialize\n");
			TerminateExtension(0);
			return SetCriticalIsapiError(IDS_ATLSRV_CRITICAL_SESSIONSTATEFAILED);
		}
[!endif]
[!if BLOB_CACHE]

		if (S_OK != m_BlobCache.Initialize(static_cast<IServiceProvider*>(this), &m_WorkerThread))
		{
			ATLTRACE("Blob cache service failed to initialize\n");
			TerminateExtension(0);
			return SetCriticalIsapiError(IDS_ATLSRV_CRITICAL_BLOBCACHEFAILED);
		}
[!endif]
[!if FILE_CACHE]

		if (S_OK != m_FileCache.Initialize(&m_WorkerThread))
		{
			ATLTRACE("File cache service failed to initialize\n");
			TerminateExtension(0);
			return SetCriticalIsapiError(IDS_ATLSRV_CRITICAL_FILECACHEFAILED);
		}
[!endif]

		return TRUE;
	}

	BOOL TerminateExtension(DWORD dwFlags)
	{
[!if BLOB_CACHE]
		m_BlobCache.Uninitialize();
[!endif]
[!if FILE_CACHE]
		m_FileCache.Uninitialize();
[!endif]
[!if SESSION_MEM || SESSION_DB]
		m_SessionStateSvc.Shutdown();
[!endif]
		BOOL bRet = baseISAPI::TerminateExtension(dwFlags);
		return bRet;
	}
	
	HRESULT STDMETHODCALLTYPE QueryService(REFGUID guidService, 
			REFIID riid, void** ppvObject)
	{
[!if FILE_CACHE]
		if (InlineIsEqualGUID(guidService, IID_IFileCache))
			return m_FileCache.QueryInterface(riid, ppvObject);
[!endif]
[!if BLOB_CACHE]
		if (InlineIsEqualGUID(guidService, IID_IMemoryCache))
			return m_BlobCache.QueryInterface(riid, ppvObject);
[!endif]
[!if SESSION_MEM || SESSION_DB]
		if (InlineIsEqualGUID(guidService, __uuidof(ISessionStateService)))
			return m_SessionStateSvc.QueryInterface(riid, ppvObject);
[!endif]
[!if DATASOURCE_CACHE || SESSION_DB]
		if (InlineIsEqualGUID(guidService, __uuidof(IDataSourceCache)))
		{
			CIsapiWorker *pWorker = GetThreadWorker();
			if (pWorker)
			{
				CDataSourceCache<> *pCache = NULL;
				if (pWorker->GetWorkerData(_DATASOURCE_CACHE, (void **)&pCache))
				{
					*ppvObject = static_cast<IDataSourceCache *>(pCache);
					return S_OK;
				}
			}
		}
[!endif]
[!if BROWSCAPS]
		if (InlineIsEqualGUID(guidService, __uuidof(IBrowserCapsSvc)))
		{
			CIsapiWorker *pWorker = GetThreadWorker();
			if (pWorker)
			{
				CBrowserCapsSvc *pBrowserCaps = NULL;
				if (pWorker->GetWorkerData(_BROWSERCAPS, (void **)&pBrowserCaps))
				{
					*ppvObject = static_cast<IBrowserCapsSvc *>(pBrowserCaps);
					return S_OK;
				}
			}
		}
[!endif]
		return baseISAPI::QueryService(guidService, riid, ppvObject);
	}
[!if DATASOURCE_CACHE || SESSION_DB]

	virtual void OnThreadTerminate(DWORD /*dwThreadId*/)
	{
	}
[!endif]
[!endif]
}; // class [!output EXTENSION_CLASS]