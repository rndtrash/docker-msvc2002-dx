// [!output IMPL_FILE] : implementation file
//

#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "[!output HEADER_FILE]"
[!if !MERGE_FILE]

#ifdef _DEBUG
#define new DEBUG_NEW
#endif
[!endif]


// [!output CLASS_NAME]

[!if CINTERNETSESSION]
[!output CLASS_NAME]::[!output CLASS_NAME](LPCTSTR pstrAgent /*= NULL*/,
		DWORD dwContext /*= 1*/,
		DWORD dwAccessType /*= PRE_CONFIG_INTERNET_ACCESS*/,
		LPCTSTR pstrProxyName /*= NULL*/,
		LPCTSTR pstrProxyBypass /*= NULL*/,
		DWORD dwFlags /*= 0*/)
		: CInternetSession (pstrAgent, dwContext, dwAccessType, pstrProxyName, 
							pstrProxyBypass, dwFlags)
[!else]
[!output CLASS_NAME]::[!output CLASS_NAME]()
[!endif]
{
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
}
[!if CCONNECTIONPOINT]

REFIID [!output CLASS_NAME]::GetIID()
{
	return GUID_NULL;
}
[!endif]


// [!output CLASS_NAME] member functions
