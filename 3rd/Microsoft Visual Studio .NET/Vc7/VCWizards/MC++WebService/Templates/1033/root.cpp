#include "stdafx.h"
#include "[!output PROJECT_NAME].h"
#include "Global.asax.h"

namespace [!output SAFE_NAMESPACE_NAME]
{
	// WEB SERVICE EXAMPLE
	// The HelloWorld() example service returns the string "Hello, World!".
	// To test this web service, ensure that the .asmx file in the deployment path is
	// set as your Debug HTTP URL, in project properties.
	// and press F5.

    String __gc* Class1::HelloWorld()
    {

		// TODO: Add the implementation of your Web Service here

		return S"Hello World!";
        
    }

};
