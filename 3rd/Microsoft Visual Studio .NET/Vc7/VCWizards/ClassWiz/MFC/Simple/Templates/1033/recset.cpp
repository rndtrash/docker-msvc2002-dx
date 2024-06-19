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

IMPLEMENT_DYNAMIC([!output CLASS_NAME], CRecordset)

[!output CLASS_NAME]::[!output CLASS_NAME](CDatabase* pdb)
	: CRecordset(pdb)
{
	m_nDefaultType = %6;
}


CString [!output CLASS_NAME]::GetDefaultConnect()
{
	return _T("ODBC;DSN=[!output CONNECT_STRING]");
}

CString [!output CLASS_NAME]::GetDefaultSQL()
{
	return _T("[!output DATASOURCE_NAME]");
}

void [!output CLASS_NAME]::DoFieldExchange(CFieldExchange* pFX)
{
}


// [!output CLASS_NAME] diagnostics

#ifdef _DEBUG
void [!output CLASS_NAME]::AssertValid() const
{
	CRecordset::AssertValid();
}

void [!output CLASS_NAME]::Dump(CDumpContext& dc) const
{
	CRecordset::Dump(dc);
}
#endif //_DEBUG
