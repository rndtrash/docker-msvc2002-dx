// Connect.h : Declaration of the CConnect

#pragma once
#include "resource.h"       // main symbols

//BEGIN VSOnly#pragma warning( disable : 4278 )
//The following #import imports DTE based on it's LIBID
#import "libid:80cc9f66-e7d8-4ddd-85b6-d9e6cd0e93e2" version("7.0") lcid("0") raw_interfaces_only named_guids
#pragma warning( default : 4278 )//END VSOnly

// CConnect
class ATL_NO_VTABLE CConnect : 
	public CComObjectRootEx<CComSingleThreadModel>,
	public CComCoClass<CConnect, &CLSID_Connect>,
	//BEGIN VSOnly//BEGIN VSCommand	public IDispatchImpl<EnvDTE::IDTCommandTarget, &EnvDTE::IID_IDTCommandTarget, &EnvDTE::LIBID_EnvDTE, 7, 0>,//END VSCommand//END VSOnly
	public IDispatchImpl<AddInDesignerObjects::_IDTExtensibility2, &AddInDesignerObjects::IID__IDTExtensibility2, &AddInDesignerObjects::LIBID_AddInDesignerObjects, 1, 0>
{
public:
	CConnect()
	{
	}

DECLARE_REGISTRY_RESOURCEID(IDR_ADDIN)
DECLARE_NOT_AGGREGATABLE(CConnect)

//BEGIN NOT VSOnlyBEGIN_COM_MAP(CConnect)
	COM_INTERFACE_ENTRY(IDispatch)
	COM_INTERFACE_ENTRY(AddInDesignerObjects::IDTExtensibility2)
END_COM_MAP()//END NOT VSOnly
//BEGIN VSOnly//BEGIN VSCommandBEGIN_COM_MAP(CConnect)
	COM_INTERFACE_ENTRY(AddInDesignerObjects::IDTExtensibility2)
	COM_INTERFACE_ENTRY(EnvDTE::IDTCommandTarget)
	COM_INTERFACE_ENTRY2(IDispatch, AddInDesignerObjects::IDTExtensibility2)
END_COM_MAP()//END VSCommand
//BEGIN NOT VSCommandBEGIN_COM_MAP(CConnect)
	COM_INTERFACE_ENTRY(IDispatch)
	COM_INTERFACE_ENTRY(AddInDesignerObjects::IDTExtensibility2)
END_COM_MAP()//END NOT VSCommand//END VSOnly


	DECLARE_PROTECT_FINAL_CONSTRUCT()

	HRESULT FinalConstruct()
	{
		return S_OK;
	}
	
	void FinalRelease() 
	{
	}

public:
	//IDTExtensibility2 implementation:
	STDMETHOD(OnConnection)(IDispatch * Application, AddInDesignerObjects::ext_ConnectMode ConnectMode, IDispatch *AddInInst, SAFEARRAY **custom);
	STDMETHOD(OnDisconnection)(AddInDesignerObjects::ext_DisconnectMode RemoveMode, SAFEARRAY **custom );
	STDMETHOD(OnAddInsUpdate)(SAFEARRAY **custom );
	STDMETHOD(OnStartupComplete)(SAFEARRAY **custom );
	STDMETHOD(OnBeginShutdown)(SAFEARRAY **custom );
	//BEGIN VSOnly
	//BEGIN VSCommand//IDTCommandTarget implementation:
	STDMETHOD(QueryStatus)(BSTR CmdName, EnvDTE::vsCommandStatusTextWanted NeededText, EnvDTE::vsCommandStatus *StatusOption, VARIANT *CommandText);
	STDMETHOD(Exec)(BSTR CmdName, EnvDTE::vsCommandExecOption ExecuteOption, VARIANT *VariantIn, VARIANT *VariantOut, VARIANT_BOOL *Handled);//END VSCommand//END VSOnly

	//BEGIN VSOnlyCComPtr<EnvDTE::_DTE> m_pDTE;
	CComPtr<EnvDTE::AddIn> m_pAddInInstance;//END VSOnly
	//BEGIN NOT VSOnlyCComPtr<IDispatch> m_pApplication;
	CComPtr<IDispatch> m_pAddInInstance;
	//END NOT VSOnly
};

OBJECT_ENTRY_AUTO(__uuidof(Connect), CConnect)
