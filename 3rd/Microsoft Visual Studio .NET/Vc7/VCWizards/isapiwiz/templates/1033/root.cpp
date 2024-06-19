[!if GENERATE_FILTER]
[!if GENERATE_EXTENSION]
// [!output PROJECT_NAME].cpp - Implementation file for ISAPI
//    [!output FILTER_DESC] and [!output EXTENSION_DESC]
[!else]
// [!output PROJECT_NAME].cpp - Implementation file for ISAPI
//    [!output FILTER_DESC]
[!endif]
[!else]
// [!output PROJECT_NAME].cpp - Implementation file for ISAPI
//    [!output EXTENSION_DESC]
[!endif]

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"


// The one and only CWinApp object
// NOTE: You may remove this object if you alter your project to no
// longer use MFC in a DLL.

CWinApp theApp;

[!if GENERATE_EXTENSION]

// command-parsing map

BEGIN_PARSE_MAP([!output EXTENSION_CLASS], CHttpServer)
	// TODO: insert your ON_PARSE_COMMAND() and 
	// ON_PARSE_COMMAND_PARAMS() here to hook up your commands.
	// For example:

	ON_PARSE_COMMAND(Default, [!output EXTENSION_CLASS], ITS_EMPTY)
	DEFAULT_PARSE_COMMAND(Default, [!output EXTENSION_CLASS])
END_PARSE_MAP([!output EXTENSION_CLASS])



// The one and only [!output EXTENSION_CLASS] object

[!output EXTENSION_CLASS] theExtension;



// [!output EXTENSION_CLASS] implementation

[!output EXTENSION_CLASS]::[!output EXTENSION_CLASS]()
{
}

[!output EXTENSION_CLASS]::~[!output EXTENSION_CLASS]()
{
}

BOOL [!output EXTENSION_CLASS]::GetExtensionVersion(HSE_VERSION_INFO* pVer)
{
	// Call default implementation for initialization
	CHttpServer::GetExtensionVersion(pVer);

	// Load description string
	TCHAR sz[HSE_MAX_EXT_DLL_NAME_LEN+1];
	ISAPIVERIFY(::LoadString(AfxGetResourceHandle(),
			IDS_SERVER, sz, HSE_MAX_EXT_DLL_NAME_LEN));
	_tcscpy(pVer->lpszExtensionDesc, sz);
	return TRUE;
}

BOOL [!output EXTENSION_CLASS]::TerminateExtension(DWORD dwFlags)
{
	// extension is being terminated
	//TODO: Clean up any per-instance resources
	return TRUE;
}


// [!output EXTENSION_CLASS] command handlers

void [!output EXTENSION_CLASS]::Default(CHttpServerContext* pCtxt)
{
	StartContent(pCtxt);
	WriteTitle(pCtxt);

	*pCtxt << _T("This default message was produced by the Internet");
	*pCtxt << _T(" Server DLL Wizard. Edit your [!output EXTENSION_CLASS]::Default()");
	*pCtxt << _T(" implementation to change it.\r\n");

	EndContent(pCtxt);
}

[!endif]


[!if GENERATE_FILTER]

// The one and only [!output FILTER_CLASS] object

[!output FILTER_CLASS] theFilter;



// [!output FILTER_CLASS] implementation

[!output FILTER_CLASS]::[!output FILTER_CLASS]()
{
}

[!output FILTER_CLASS]::~[!output FILTER_CLASS]()
{
}

BOOL [!output FILTER_CLASS]::GetFilterVersion(PHTTP_FILTER_VERSION pVer)
{
	// Call default implementation for initialization
	CHttpFilter::GetFilterVersion(pVer);

	// Clear the flags set by base class
	pVer->dwFlags &= ~SF_NOTIFY_ORDER_MASK;

	// Set the flags we are interested in
	pVer->dwFlags |= [!output FILTER_FLAGS];

[!if PRIORITY_HIGH]
	// Set Priority
	pVer->dwFlags |= SF_NOTIFY_ORDER_HIGH;
[!endif]
[!if PRIORITY_MEDIUM]
	// Set Priority
	pVer->dwFlags |= SF_NOTIFY_ORDER_MEDIUM;
[!endif]
[!if PRIORITY_LOW]	
	// Set Priority
	pVer->dwFlags |= SF_NOTIFY_ORDER_LOW;
[!endif]	

	// Load description string
	TCHAR sz[SF_MAX_FILTER_DESC_LEN+1];
	ISAPIVERIFY(::LoadString(AfxGetResourceHandle(),
			IDS_FILTER, sz, SF_MAX_FILTER_DESC_LEN));
	_tcscpy(pVer->lpszFilterDesc, sz);
	return TRUE;
}
[!if NOTIFY_PREPROC_HEADERS]

DWORD [!output FILTER_CLASS]::OnPreprocHeaders(CHttpFilterContext* pCtxt,
	PHTTP_FILTER_PREPROC_HEADERS pHeaderInfo)
{
	// TODO: React to this notification accordingly and
	// return the appropriate status code
	return SF_STATUS_REQ_NEXT_NOTIFICATION;
}
[!endif]
[!if NOTIFY_AUTHENTICATION]

DWORD [!output FILTER_CLASS]::OnAuthentication(CHttpFilterContext* pCtxt,
	PHTTP_FILTER_AUTHENT pAuthent)
{
	// TODO: React to this notification accordingly and
	// return the appropriate status code
	return SF_STATUS_REQ_NEXT_NOTIFICATION;
}
[!endif]
[!if NOTIFY_AUTH_COMPLETE]

DWORD [!output FILTER_CLASS]::OnAuthComplete(CHttpFilterContext* pCtxt,
	PHTTP_FILTER_AUTH_COMPLETE_INFO pAuthCompInfo)
{
	// TODO: React to this notification accordingly and
	// return the appropriate status code
	return SF_STATUS_REQ_NEXT_NOTIFICATION;
}
[!endif]
[!if NOTIFY_URL_MAP]

DWORD [!output FILTER_CLASS]::OnUrlMap(CHttpFilterContext* pCtxt,
	PHTTP_FILTER_URL_MAP pMapInfo)
{
	// TODO: React to this notification accordingly and
	// return the appropriate status code
	return SF_STATUS_REQ_NEXT_NOTIFICATION;
}
[!endif]
[!if NOTIFY_SEND_RAW_DATA]

DWORD [!output FILTER_CLASS]::OnSendRawData(CHttpFilterContext* pCtxt,
	PHTTP_FILTER_RAW_DATA pRawData)
{
	// TODO: React to this notification accordingly and
	// return the appropriate status code
	return SF_STATUS_REQ_NEXT_NOTIFICATION;
}
[!endif]
[!if NOTIFY_READ_RAW_DATA]

DWORD [!output FILTER_CLASS]::OnReadRawData(CHttpFilterContext* pCtxt,
	PHTTP_FILTER_RAW_DATA pRawData)
{
	// TODO: React to this notification accordingly and
	// return the appropriate status code
	return SF_STATUS_REQ_NEXT_NOTIFICATION;
}
[!endif]
[!if NOTIFY_LOG]

DWORD [!output FILTER_CLASS]::OnLog(CHttpFilterContext *pCtxt, PHTTP_FILTER_LOG pLog)
{
	// TODO: React to this notification accordingly and
	// return the appropriate status code
	return SF_STATUS_REQ_NEXT_NOTIFICATION;
}
[!endif]
[!if NOTIFY_END_OF_NET_SESSION]

DWORD [!output FILTER_CLASS]::OnEndOfNetSession(CHttpFilterContext* pCtxt)
{
	// TODO: React to this notification accordingly and
	// return the appropriate status code
	return SF_STATUS_REQ_NEXT_NOTIFICATION;
}
[!endif]
[!if NOTIFY_END_OF_REQUEST]

DWORD [!output FILTER_CLASS]::OnEndOfRequest(CHttpFilterContext* pfc)
{
	// TODO: React to this notification accordingly and
	// return the appropriate status code
	return SF_STATUS_REQ_NEXT_NOTIFICATION;
}
[!endif]
[!if NOTIFY_SEND_RESPONSE]

DWORD [!output FILTER_CLASS]::OnSendResponse(CHttpFilterContext*, PHTTP_FILTER_SEND_RESPONSE)
{
	// TODO: React to this notification accordingly and
	// return the appropriate status code
	return SF_STATUS_REQ_NEXT_NOTIFICATION;
}
[!endif]
[!if NOTIFY_ACCESS_DENIED]

DWORD [!output FILTER_CLASS]::OnAccessDenied(CHttpFilterContext*, PHTTP_FILTER_ACCESS_DENIED)
{
	// TODO: React to this notification accordingly and
	// return the appropriate status code
	return SF_STATUS_REQ_NEXT_NOTIFICATION;
}
[!endif]
[!endif]


// If your extension will not use MFC, you'll need this code to make
// sure the extension objects can find the resource handle for the
// module.  If you convert your extension to not be dependent on MFC,
// remove the comments around the following AfxGetResourceHandle()
// and DllMain() functions, as well as the g_hInstance global.

/****

static HINSTANCE g_hInstance;

HINSTANCE AFXISAPI AfxGetResourceHandle()
{
	return g_hInstance;
}

BOOL WINAPI DllMain(HINSTANCE hInst, ULONG ulReason,
					LPVOID lpReserved)
{
	if (ulReason == DLL_PROCESS_ATTACH)
	{
		g_hInstance = hInst;
	}

	return TRUE;
}

****/
