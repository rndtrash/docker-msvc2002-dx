========================================================================
    ISAPI Project : [!output PROJECT_NAME] Project Overview
========================================================================

[!if GENERATE_FILTER && GENERATE_EXTENSION]
AppWizard has created this [!output PROJECT_NAME] project containing ISAPI notifications and server
extension objects.
[!else]
[!if GENERATE_FILTER]
AppWizard has created this [!output PROJECT_NAME] project containing ISAPI notification objects.
[!endif]
[!if GENERATE_EXTENSION]
AppWizard has created this [!output PROJECT_NAME] project containing ISAPI server extension objects.
[!endif]
[!endif]

This file contains a summary of what you will find in each of the files that
make up your project.

[!output PROJECT_NAME].vcproj
    This is the main project file for VC++ projects generated using an Application Wizard. 
    It contains information about the version of Visual C++ that generated the file, and 
    information about the platforms, configurations, and project features selected with the
    Application Wizard.

[!output PROJECT_NAME].h
    This file contains the C++ interface definitions and space to insert your
    command handlers.

[!output PROJECT_NAME].cpp
    This file contains the object map and the implementation of your filter 
    object notifications. This file contains the server extension map and the
    implementation of the CHttpServer object.

[!output PROJECT_NAME].rc
    This is a listing of all of the Microsoft Windows resources that the
    program uses.

[!output SAFE_PROJECT_NAME].rc2
    This is a listing of all the resouces you include in your project that 
    Microsoft Visual C++ do not work with directly. These resources are not
    editable using the VC++ resource editors.

[!output PROJECT_NAME].def
    This module-definition file provides the linker with information about the 
    exports required by your DLL. It contains exports for:
[!if GENERATE_FILTER]
        HttpFilterProc
        GetFilterVersion
[!endif] 
[!if GENERATE_EXTENSION]
        HttpExtensionProc
        GetExtensionVersion
        TerminateExtension
[!endif]

/////////////////////////////////////////////////////////////////////////////
Other standard files:

StdAfx.h, StdAfx.cpp
    These files are used to build a precompiled header (PCH) file
    named [!output PROJECT_NAME].pch and a precompiled types file named StdAfx.obj.

Resource.h
    This is the standard header file that defines resource IDs.

/////////////////////////////////////////////////////////////////////////////
