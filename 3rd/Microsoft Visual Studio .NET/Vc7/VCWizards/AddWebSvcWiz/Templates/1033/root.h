// [!output HEADER_FILE] : Defines the ATL Server request handler class
//
#pragma once

[!if NO_PCH]
#include <atlsoap.h>
[!endif]


namespace [!output APP_CLASS]Service
{
// all struct, enum, and typedefs for your webservice should go inside the namespace

// I[!output APP_CLASS]Service - web service interface declaration
//
[
	uuid("[!output SOAP_INTERFACE_GUID]"), 
	object
]
__interface I[!output APP_CLASS]Service
{
[!if SAMPLE_CODE]
	// HelloWorld is a sample ATL Server web service method.  It shows how to
	// declare a web service method and its in-parameters and out-parameters
	[id(1)] HRESULT HelloWorld([in] BSTR bstrInput, [out, retval] BSTR *bstrOutput);
[!endif]

[!if TODO_COMMENTS]
	// TODO: Add additional web service methods here
[!endif]
};


// [!output APP_CLASS]Service - web service implementation
//
[
	request_handler(name="[!output APP_CLASS]Service", sdl="Gen[!output APP_CLASS]WSDL"),
	soap_handler(
		name="[!output APP_CLASS]Service", 
		namespace="urn:[!output APP_CLASS]Service",
		protocol="soap"
	)
]
class C[!output APP_CLASS]Service :
	public I[!output APP_CLASS]Service
{
public:
[!if SAMPLE_CODE]
	[ soap_method ]
	HRESULT HelloWorld(/*[in]*/ BSTR bstrInput, /*[out, retval]*/ BSTR *bstrOutput)
	{
		CComBSTR bstrOut(L"Hello ");
		bstrOut += bstrInput;
		bstrOut += L"!";
		*bstrOutput = bstrOut.Detach();
		
		return S_OK;
	}
[!endif]

[!if TODO_COMMENTS]
	// TODO: Add additional web service methods here
[!endif]
}; // class C[!output APP_CLASS]Service
} // namespace [!output APP_CLASS]Service
