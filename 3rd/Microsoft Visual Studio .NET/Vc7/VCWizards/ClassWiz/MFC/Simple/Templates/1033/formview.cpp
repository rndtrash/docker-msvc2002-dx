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

IMPLEMENT_DYNCREATE([!output CLASS_NAME], CFormView)

[!output CLASS_NAME]::[!output CLASS_NAME]()
	: CFormView([!output CLASS_NAME]::IDD)
{
[!if ACCESSIBILITY]
	EnableActiveAccessibility();
[!endif]
[!if AUTOMATION || CREATABLE]
	EnableAutomation();
[!endif]
[!if CREATABLE]
	
	// To keep the application running as long as an OLE automation 
	//	object is active, the constructor calls AfxOleLockApp.
	
	AfxOleLockApp();

[!endif]
}

[!output CLASS_NAME]::~[!output CLASS_NAME]()
{
[!if CREATABLE]
	// To terminate the application when all objects created with
	// 	with OLE automation, the destructor calls AfxOleUnlockApp.
	
	AfxOleUnlockApp();
[!endif]
}
[!if AUTOMATION || CREATABLE]

void [!output CLASS_NAME]::OnFinalRelease()
{
	// When the last reference for an automation object is released
	// OnFinalRelease is called.  The base class will automatically
	// deletes the object.  Add additional cleanup required for your
	// object before calling the base class.

	CFormView::OnFinalRelease();
}
[!endif]

void [!output CLASS_NAME]::DoDataExchange(CDataExchange* pDX)
{
	CFormView::DoDataExchange(pDX);
}

BEGIN_MESSAGE_MAP([!output CLASS_NAME], CFormView)
END_MESSAGE_MAP()
[!if AUTOMATION || CREATABLE]

BEGIN_DISPATCH_MAP([!output CLASS_NAME], CFormView)
END_DISPATCH_MAP()

// Note: we add support for IID_I[!output CLASS_NAME_ROOT] to support typesafe binding
//  from VBA.  This IID must match the GUID that is attached to the 
//  dispinterface in the .IDL file.

// {[!output DISPIID_REGISTRY_FORMAT]}
static const IID IID_I[!output CLASS_NAME_ROOT] =
[!output DISPIID_STATIC_CONST_GUID_FORMAT];

BEGIN_INTERFACE_MAP([!output CLASS_NAME], CFormView)
	INTERFACE_PART([!output CLASS_NAME], IID_I[!output CLASS_NAME_ROOT], Dispatch)
END_INTERFACE_MAP()
[!endif]
[!if CREATABLE]

// {[!output CLSID_REGISTRY_FORMAT]}
IMPLEMENT_OLECREATE([!output CLASS_NAME], "[!output TYPEID]", [!output CLSID_IMPLEMENT_OLECREATE_FORMAT])
[!endif]


// [!output CLASS_NAME] diagnostics

#ifdef _DEBUG
void [!output CLASS_NAME]::AssertValid() const
{
	CFormView::AssertValid();
}

void [!output CLASS_NAME]::Dump(CDumpContext& dc) const
{
	CFormView::Dump(dc);
}
#endif //_DEBUG


// [!output CLASS_NAME] message handlers
