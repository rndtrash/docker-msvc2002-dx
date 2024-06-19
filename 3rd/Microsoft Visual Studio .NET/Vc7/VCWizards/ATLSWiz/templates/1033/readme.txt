========================================================================
       ATL SERVER : [!output PROJECT_NAME] Project Overview
========================================================================

AppWizard has created this [!output PROJECT_NAME] application for you.  This application
not only demonstrates the basics of using the ATL Server Classes but is also a starting 
point for writing your application.

This file contains a summary of what you will find in each of the files that
make up your [!output PROJECT_NAME] application.

[!output PROJECT_NAME].vcproj
    This is the main project file for VC++ projects generated using an Application Wizard. 
    It contains information about the version of Visual C++ that generated the file, and 
    information about the platforms, configurations, and project features selected with the
    Application Wizard.
[!if GENERATING_ISAPI]
 
[!output PROJECT_NAME].cpp
    This file is your root ISAPI Extension file.  It contains the ISAPI Extension code 
    and additional ATL Server code.  You can customize the ATL Server code to the 
    specific needs of your projects.
[!endif]
[!if GENERATING_APP]
 
[!output PROJECT_NAME].h
    This file contains your ATL Server request handler class customized based on the 
    options you chose in the the ATL Server Wizard.
[!endif]
[!if GENERATING_ISAPI]
 
[!output PROJECT_NAME].def
    This file contains the functions that will be exported from your ISAPI Extension DLL.  
    This includes the ISAPI Extension functions HttpExtensionProc, GetExtensionVersion, 
    and TerminateExtension. These functions are delegated to the instance of your
    [!output EXTENSION_CLASS] class.
[!if PERFMON]
    The DLL also exports functions needed for perfmormance monitoring 
    support, however these do not appear in the [!output PROJECT_NAME].def file.
[!endif]
 
[!output PROJECT_NAME].rc
    This is a listing of all of the Microsoft Windows resources that the
    program uses.  It contains the version resource for your ISAPI DLL, and it
    also includes the atlsrv.rc file for the language you specified in the wizard.  
    This file can be directly edited in Microsoft Visual C++.
[!if BLOB_CACHE || FILE_CACHE || SESSION_MEM || SESSION_DB || DATASOURCE_CACHE || BROWSCAPS]
 
[!output EXTENSION_FILE]
    This file contains your CIsapiExtension derived ISAPI Extension class:
    [!output EXTENSION_CLASS] that is customized based on the options you chose 
    in the AppWizard.
[!endif]
[!endif]
[!if GENERATING_APP && STENCIL && !SOAP]
 
[!output SRF_FILE]
    This file contains a starter SRF (Server Response File) for your application.
    It shows a sample usage of the replacement tag {{Hello}} which is 
    associated with the OnHello method in the [!output APP_CLASS] class.
[!endif]
[!if GENERATING_APP && SOAP]
 
[!output PROJECT_NAME].disco
    This file contains information that allows your web service to be exposed via
    web servers supporting the DISCO protocol.
	
[!output PROJECT_NAME].htm
    This is a webpage containing a description of your web service.  It is referenced
    in [!output PROJECT_NAME].disco.  You should update this file when adding or
    removing methods from your web service.
[!endif]

/////////////////////////////////////////////////////////////////////////////
Other standard files:

StdAfx.h, StdAfx.cpp
    These files are used to build a precompiled header (PCH) file
    and a precompiled types file.

/////////////////////////////////////////////////////////////////////////////

Other notes:
[!if TODO]
 
AppWizard uses "TODO:" to indicate parts of the source code you
should add to or customize.
[!endif]

/////////////////////////////////////////////////////////////////////////////
