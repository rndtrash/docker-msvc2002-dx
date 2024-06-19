// [!output APP_FILE] : Defines the ATL Server request handler class
//
#pragma once

[!if __dbgcmt]
// The following should be only generated when creating an
// application DLL WITH the web-service checkbox checked
[!endif]
[!if GENERATING_APP && SOAP]
namespace [!output APP_CLASS]
{
// all struct, enum, and typedefs for your webservice should go inside the namespace

// I[!output APP_CLASS] - web service interface declaration
//
[
	uuid("[!output SOAP_INTERFACE_GUID]"), 
	object
]
__interface I[!output APP_CLASS]
{
[!if TODO]
	// HelloWorld is a sample ATL Server web service method.  It shows how to
	// declare a web service method and its in-parameters and out-parameters
[!endif]
	[id(1)] HRESULT HelloWorld([in] BSTR bstrInput, [out, retval] BSTR *bstrOutput);
[!if TODO]
	// TODO: Add additional web service methods here
[!endif]
};


// [!output APP_CLASS] - web service implementation
//
[
	request_handler(name="Default", sdl="Gen[!output SAFE_PROJECT_NAME]WSDL"),
	soap_handler(
		name="[!output APP_CLASS]", 
		namespace="urn:[!output APP_CLASS]",
		protocol="soap"
	)
]
class C[!output APP_CLASS] :
	public I[!output APP_CLASS]
{
public:
[!if SESSION_MEM || SESSION_DB || FILE_CACHE || BLOB_CACHE || BROWSCAPS]
	// uncomment the service declaration(s) if you want to use
	// a service that was generated with your ISAPI extension
[!endif]
[!if SESSION_MEM || SESSION_DB]
//	CComPtr<ISessionStateService> m_spSessionSvc;
//	CComPtr<ISession> m_spSession;
[!endif]
[!if FILE_CACHE]
//	CComPtr<IFileCache> m_spFileCache;
[!endif]
[!if BLOB_CACHE]
//	CComPtr<IMemoryCache> m_spBlobCache;
[!endif]
[!if BROWSCAPS]
//	CComPtr<IBrowserCapsSvc> m_spBrowserCaps;
[!endif]
[!if SESSION_MEM || SESSION_DB || FILE_CACHE || BLOB_CACHE || DATASOURCE_CACHE]
	HTTP_CODE InitializeHandler(AtlServerRequest *pRequestInfo, IServiceProvider *pProvider)
	{
		if (HTTP_SUCCESS != CSoapHandler<C[!output APP_CLASS]>::InitializeHandler(pRequestInfo, pProvider))
			return HTTP_FAIL;
[!if SESSION_MEM || SESSION_DB]

		// Get the ISessionStateService from the ISAPI extension
//		if (FAILED(pProvider->QueryService(__uuidof(ISessionStateService), 
//						&m_spSessionSvc)))
//			return HTTP_FAIL;
[!endif]
[!if FILE_CACHE]

		// Get the IFileCache service from the ISAPI extension
//		if (FAILED(pProvider->QueryService(__uuidof(IFileCache), 
//						&m_spFileCache)))
//			return HTTP_FAIL;
[!endif]
[!if BLOB_CACHE]

		// Get the IMemoryCache service from the ISAPI extension
//		if (FAILED(pProvider->QueryService(__uuidof(IMemoryCache), 
//						&m_spBlobCache)))
//			return HTTP_FAIL;
[!endif]
[!if DATASOURCE_CACHE]

		// Uncomment the following code to retrieve a data source
		// connection from the data source cache. Replace connection_name
		// with a string used to identify the connection and
		// connection_string with an OLEDB connection string
		// which is valid for your data source. This code assumes that 
		// the service provider pointed to by m_spServiceProvider
		// can provide an IDataSourceCache pointer to a data source 
		// cache service (usually implemented in the ISAPI extension).
//		CDataConnection dc;
//		if (S_OK != GetDataSource(  pProvider, 
//									_T("connection_name"),
//									L"connection_string", 
//									&dc ))
//			return HTTP_FAIL;
[!endif]
[!if BROWSCAPS]

		// Get the IBrowserCapsSvc service from the ISAPI extension
//		if (FAILED(pProvider->QueryService(__uuidof(IBrowserCapsSvc), 
//						&m_spBrowserCaps)))
//			return HTTP_FAIL;
[!endif]
		return HTTP_SUCCESS;
	}	
[!endif]	
[!if TODO]
	// This is a sample web service method that shows how to use the 
	// soap_method attribute to expose a method as a web method
[!endif]
	[ soap_method ]
	HRESULT HelloWorld(/*[in]*/ BSTR bstrInput, /*[out, retval]*/ BSTR *bstrOutput)
	{
		CComBSTR bstrOut(L"Hello ");
		bstrOut += bstrInput;
		bstrOut += L"!";
		*bstrOutput = bstrOut.Detach();
		
		return S_OK;
	}
[!if TODO]
	// TODO: Add additional web service methods here
[!endif]
}; // class C[!output APP_CLASS]
[!endif]
[!if __dbgcmt]
// The following should be only generated when creating an
// application DLL WITHOUT the web-service checkbox checked
[!endif]
[!if GENERATING_APP && !SOAP]
[!if ATTRIBUTED]
[ request_handler("Default") ]
[!endif]
class [!output APP_CLASS]
[!if !ATTRIBUTED]
[!if STENCIL || VALIDATION]
	: public CRequestHandlerT<[!output APP_CLASS]>
[!else]
	: public IRequestHandlerImpl<[!output APP_CLASS]>, public CComObjectRootEx<CComSingleThreadModel>
[!endif]
[!endif]
{
private:
[!if TODO]
	// Put private members here
[!if SESSION_MEM || SESSION_DB || FILE_CACHE || BLOB_CACHE || BROWSCAPS]
	// uncomment the service declaration(s) if you want to use
	// a service that was generated with your ISAPI extension
[!endif]
[!if SESSION_MEM || SESSION_DB]

	// Session service support
//	CComPtr<ISessionStateService> m_spSessionSvc;
//	CComPtr<ISession> m_spSession;
[!endif]
[!if FILE_CACHE]

	// File cache support
//	CComPtr<IFileCache> m_spFileCache;
[!endif]
[!if BLOB_CACHE]

	// Blob cache support
//	CComPtr<IMemoryCache> m_spBlobCache;
[!endif]
[!if BROWSCAPS]

	// Data Source cache support
//	CComPtr<IBrowserCapsSvc> m_spBrowserCaps;
[!endif]
[!endif]

protected:
[!if TODO]
	// Put protected members here

[!endif]	
public:
[!if TODO]
	// Put public members here

[!endif]
[!if !STENCIL && !VALIDATION && !ATTRIBUTED]

	BEGIN_COM_MAP([!output APP_CLASS])
		COM_INTERFACE_ENTRY(IRequestHandler)
	END_COM_MAP()
	
[!endif]
[!if STENCIL && !ATTRIBUTED]
[!if TODO]
	// TODO: Add additional tags to the replacement method map
[!endif]
	BEGIN_REPLACEMENT_METHOD_MAP([!output APP_CLASS])
		REPLACEMENT_METHOD_ENTRY("Hello", OnHello)
	END_REPLACEMENT_METHOD_MAP()

[!endif]
[!if VALIDATION]
	HTTP_CODE ValidateAndExchange()
	{
[!if TODO]
		// TODO: Put all initialization and validation code here
		
[!endif]
[!if TODO]
		// Set the content-type
[!endif]		
		m_HttpResponse.SetContentType("text/html");
[!if TODO]		
[!if SESSION_MEM || SESSION_DB || FILE_CACHE || BLOB_CACHE || DATASOURCE_CACHE]

		// uncomment the service initialization(s) if you want to use
		// a service that was generated with your ISAPI extension
		
[!endif]
[!if SESSION_MEM || SESSION_DB]

		// Get the ISessionStateService from the ISAPI extension
//		if (FAILED(m_spServiceProvider->QueryService(__uuidof(ISessionStateService), 
//						&m_spSessionSvc)))
//			return HTTP_FAIL;
[!endif]
[!if FILE_CACHE]

		// Get the IFileCache service from the ISAPI extension
//		if (FAILED(m_spServiceProvider->QueryService(__uuidof(IFileCache), 
//						&m_spFileCache)))
//			return HTTP_FAIL;
[!endif]
[!if BLOB_CACHE]

		// Get the IMemoryCache service from the ISAPI extension
//		if (FAILED(m_spServiceProvider->QueryService(__uuidof(IMemoryCache), 
//						&m_spBlobCache)))
//			return HTTP_FAIL;
[!endif]
[!if DATASOURCE_CACHE]
		// Uncomment the following code to retrieve a data source
		// connection from the data source cache. Replace connection_name
		// with a string used to identify the connection and
		// connection_string with an OLEDB connection string
		// which is valid for your data source. This code assumes that 
		// the service provider pointed to by m_spServiceProvider
		// can provide an IDataSourceCache pointer to a data source 
		// cache service (usually implemented in the ISAPI extension).
//		CDataConnection dc;
//		if (S_OK != GetDataSource(  m_spServiceProvider, 
//									_T("connection_name"),
//									L"connection_string", 
//									&dc ))
//			return HTTP_FAIL;
[!endif]
[!if BROWSCAPS]

		// Get the IBrowserCapsSvc service from the ISAPI extension
//		if (FAILED(m_spServiceProvider->QueryService(__uuidof(IBrowserCapsSvc), 
//						&m_spBrowserCaps)))
//			return HTTP_FAIL;
[!endif]
[!endif]
		
		return HTTP_SUCCESS;
	}
[!endif]
[!if STENCIL]
 
protected:
[!if TODO]
	// Here is an example of how to use a replacement tag with the stencil processor
[!endif]
[!if ATTRIBUTED]
	[ tag_name(name="Hello") ]
[!endif]	
	HTTP_CODE OnHello(void)
	{
		m_HttpResponse << "Hello World!";
		return HTTP_SUCCESS;
	}
[!endif]
[!if !STENCIL && !VALIDATION]
public:
	HTTP_CODE HandleRequest(AtlServerRequest *pRequest, IServiceProvider *pProvider)
	{
[!if TODO]	
		// Initialize the CHttpResponse
[!endif]		
		CHttpResponse Response;
		BOOL bRet = Response.Initialize(pRequest->pServerContext);
		if (!bRet)
			return HTTP_FAIL;

[!if TODO]		
		// Set the content-type
[!endif]		
		Response.SetContentType("text/html");
[!if TODO]

		// TODO: Add your handler code here
[!endif]

[!if TODO]
		// Write the response
[!endif]		
		Response << "<html><body><H1>Hello World!</H1></body></html>";
		return HTTP_SUCCESS;
	}
[!endif]
}; // class [!output APP_CLASS]
[!endif]
[!if GENERATING_APP && SOAP]

} // namespace [!output APP_CLASS]
[!endif]