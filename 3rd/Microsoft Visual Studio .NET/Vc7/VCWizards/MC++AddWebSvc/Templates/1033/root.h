#using <mscorlib.dll>
#using <System.dll>
#using <System.Web.dll>
#using <System.Web.Services.dll>
#using <System.EnterpriseServices.dll>

// [!output SAFE_ITEM_NAME].h
[!output COMMENTS_MANAGED_SWITCHES]
#pragma once

using namespace System;
using namespace System::Web;
using namespace System::Web::Services;

namespace [!output SAFE_ITEM_NAME]
{
    public __gc 
        class C[!output SAFE_ITEM_NAME] : public WebService
    {
        
    public:
		// WEB SERVICE EXAMPLE
		// Add your methods and their implementation, for this class.
		// To test this web service, ensure that the .asmx file in the deployment path is
		// set as your Debug HTTP URL, in project properties and press F5.
		// An example HelloWorld template, is given below.


        [System::Web::Services::WebMethod] 
        String __gc* HelloWorld()
        {
            return S"Hello World";
        };

        // TODO: Add the methods of your Web Service here
       
    };
}
