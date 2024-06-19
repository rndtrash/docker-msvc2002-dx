// Connect.cpp : Implementation of CConnect
#include "stdafx.h"
#include "AddIn.h"
#include "Connect.h"

extern CAddInModule _AtlModule;

// When run, the Add-in wizard prepared the registry for the Add-in.
// At a later time, if the Add-in becomes unavailable for reasons such as:
//   1) You moved this project to a computer other than which is was originally created on.
//   2) You chose 'Yes' when presented with a message asking if you wish to remove the Add-in.
//   3) Registry corruption.
// you will need to re-register the Add-in by building the MyAddin21Setup project 
// by right clicking the project in the Solution Explorer, then choosing install.


// CConnect
STDMETHODIMP CConnect::OnConnection(IDispatch *pApplication, AddInDesignerObjects::ext_ConnectMode ConnectMode, IDispatch *pAddInInst, SAFEARRAY ** /*custom*/ )
{
	//BEGIN NOT VSOnlypApplication->QueryInterface(__uuidof(IDispatch), (LPVOID*)&m_pApplication);
	pAddInInst->QueryInterface(__uuidof(IDispatch), (LPVOID*)&m_pAddInInstance);
	return S_OK;//END NOT VSOnly//BEGIN VSOnlyHRESULT hr = S_OK;
	pApplication->QueryInterface(__uuidof(EnvDTE::_DTE), (LPVOID*)&m_pDTE);
	pAddInInst->QueryInterface(__uuidof(EnvDTE::AddIn), (LPVOID*)&m_pAddInInstance);
	//BEGIN VSCommandif(ConnectMode == 5) //5 == AddInDesignerObjects::ext_cm_UISetup)
	{
		HRESULT hr = S_OK;
		CComPtr<EnvDTE::Commands> pCommands;
		CComPtr<Office::_CommandBars> pCommandBars;
		CComPtr<Office::CommandBarControl> pCommandBarControl;
		CComPtr<EnvDTE::Command> pCreatedCommand;
		CComPtr<Office::CommandBar> pMenuBarCommandBar;

    // When run, the Add-in wizard prepared the registry for the Add-in.
    // At a later time, the Add-in or its commands may become unavailable for reasons such as:
    //   1) You moved this project to a computer other than which is was originally created on.
    //   2) You chose 'Yes' when presented with a message asking if you wish to remove the Add-in.
    //   3) You add new commands or modify commands already defined.
    // You will need to re-register the Add-in by building the $SAFEOBJNAME$Setup project,
    // right-clicking the project in the Solution Explorer, and then choosing install.
    // Alternatively, you could execute the ReCreateCommands.reg file the Add-in Wizard generated in 
    // the project directory, or run 'devenv /setup' from a command prompt.
		IfFailGoCheck(m_pDTE->get_Commands(&pCommands), pCommands);
		if(SUCCEEDED(pCommands->AddNamedCommand(m_pAddInInstance, CComBSTR("$SAFEOBJNAME$"), CComBSTR("$SAFEOBJNAME$"), CComBSTR("Executes the command for $SAFEOBJNAME$"), VARIANT_TRUE, 59, NULL, EnvDTE::vsCommandStatusSupported+EnvDTE::vsCommandStatusEnabled, &pCreatedCommand)) && (pCreatedCommand))
		{
			//Add a button to the tools menu bar.
			IfFailGoCheck(m_pDTE->get_CommandBars(&pCommandBars), pCommandBars);
			IfFailGoCheck(pCommandBars->get_Item(CComVariant(L"Tools"), &pMenuBarCommandBar), pMenuBarCommandBar);
			IfFailGoCheck(pCreatedCommand->AddControl(pMenuBarCommandBar, 1, &pCommandBarControl), pCommandBarControl);
		}
		return S_OK;
	}
Error://END VSCommand
	return hr;//END VSOnly
}

STDMETHODIMP CConnect::OnDisconnection(AddInDesignerObjects::ext_DisconnectMode /*RemoveMode*/, SAFEARRAY ** /*custom*/ )
{
	//BEGIN NOT VSOnlym_pApplication = NULL;//END NOT VSOnly
	//BEGIN VSOnlym_pDTE = NULL;//END VSOnly
	return S_OK;
}

STDMETHODIMP CConnect::OnAddInsUpdate (SAFEARRAY ** /*custom*/ )
{
	return S_OK;
}

STDMETHODIMP CConnect::OnStartupComplete (SAFEARRAY ** /*custom*/ )
{
	return S_OK;
}

STDMETHODIMP CConnect::OnBeginShutdown (SAFEARRAY ** /*custom*/ )
{
	return S_OK;
}

//BEGIN VSOnly//BEGIN VSCommandSTDMETHODIMP CConnect::QueryStatus(BSTR bstrCmdName, EnvDTE::vsCommandStatusTextWanted NeededText, EnvDTE::vsCommandStatus *pStatusOption, VARIANT *pvarCommandText)
{
  if(NeededText == EnvDTE::vsCommandStatusTextWantedNone)
	{
	  if(!_wcsicmp(bstrCmdName, L"$SAFEOBJNAME$.Connect.$SAFEOBJNAME$"))
	  {
		  *pStatusOption = (EnvDTE::vsCommandStatus)(EnvDTE::vsCommandStatusEnabled+EnvDTE::vsCommandStatusSupported);
	  }
  }
	return S_OK;
}

STDMETHODIMP CConnect::Exec(BSTR bstrCmdName, EnvDTE::vsCommandExecOption ExecuteOption, VARIANT * /*pvarVariantIn*/, VARIANT * /*pvarVariantOut*/, VARIANT_BOOL *pvbHandled)
{
	*pvbHandled = VARIANT_FALSE;
	if(ExecuteOption == EnvDTE::vsCommandExecOptionDoDefault)
	{
		if(!_wcsicmp(bstrCmdName, L"$SAFEOBJNAME$.Connect.$SAFEOBJNAME$"))
		{
			*pvbHandled = VARIANT_TRUE;
			return S_OK;
		}
	}
	return S_OK;
}//END VSCommand//END VSOnly