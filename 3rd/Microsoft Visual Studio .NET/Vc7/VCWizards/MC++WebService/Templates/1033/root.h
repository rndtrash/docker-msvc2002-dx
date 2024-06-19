// [!output SAFE_NAMESPACE_NAME].h

#pragma once

#using <System.Web.Services.dll>

using namespace System;
using namespace System::Web;
using namespace System::Web::Services;

namespace [!output SAFE_NAMESPACE_NAME]
{
    public __gc 
        class Class1 : public WebService
    {
        
    public:
		// WEB SERVICE EXAMPLE
		// The HelloWorld() example service returns the string "Hello, World!".
		// To test this web service, ensure that the .asmx file in the deployment path is
		// set as your Debug HTTP URL, in project properties.
		// and press F5.

        [System::Web::Services::WebMethod] 
        String __gc* HelloWorld();

        // TODO: Add the methods of your Web Service here
       
    };
}