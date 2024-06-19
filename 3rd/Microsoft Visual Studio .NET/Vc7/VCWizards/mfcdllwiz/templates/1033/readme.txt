========================================================================
    MICROSOFT FOUNDATION CLASS LIBRARY : [!output PROJECT_NAME] Project Overview
========================================================================


AppWizard has created this [!output PROJECT_NAME] DLL for you.  This DLL not only
demonstrates the basics of using the Microsoft Foundation classes but
is also a starting point for writing your DLL.

This file contains a summary of what you will find in each of the files that
make up your [!output PROJECT_NAME] DLL.

[!output PROJECT_NAME].vcproj
    This is the main project file for VC++ projects generated using an Application Wizard. 
    It contains information about the version of Visual C++ that generated the file, and 
    information about the platforms, configurations, and project features selected with the
    Application Wizard.

[!if DLL_TYPE_EXTENSION]
[!output PROJECT_NAME].cpp
    This is the main DLL source file that contains the definition of
    DllMain().
[!else]
[!output PROJECT_NAME].h
    This is the main header file for the DLL.  It declares the
    [!output APP_CLASS] class.

[!output PROJECT_NAME].cpp
    This is the main DLL source file.  It contains the class [!output APP_CLASS].
[!if AUTOMATION]
    It also contains the OLE entry points required of inproc servers.
[!endif]
[!endif]
[!if AUTOMATION]

[!output PROJECT_NAME].idl
    This file contains the Object Description Language source code for the
    type library of your DLL.
[!endif]

[!output PROJECT_NAME].rc
    This is a listing of all of the Microsoft Windows resources that the
    program uses.  It includes the icons, bitmaps, and cursors that are stored
    in the RES subdirectory.  This file can be directly edited in Microsoft
    Visual C++.

res\[!output SAFE_PROJECT_NAME].rc2
    This file contains resources that are not edited by Microsoft 
    Visual C++.  You should place all resources not editable by
    the resource editor in this file.

[!output PROJECT_NAME].def
    This file contains information about the DLL that must be
    provided to run with Microsoft Windows.  It defines parameters
    such as the name and description of the DLL.  It also exports
    functions from the DLL.

/////////////////////////////////////////////////////////////////////////////
Other standard files:

StdAfx.h, StdAfx.cpp
    These files are used to build a precompiled header (PCH) file
    named [!output PROJECT_NAME].pch and a precompiled types file named StdAfx.obj.

Resource.h
    This is the standard header file, which defines new resource IDs.
    Microsoft Visual C++ reads and updates this file.

/////////////////////////////////////////////////////////////////////////////
Other notes:

AppWizard uses "TODO:" to indicate parts of the source code you
should add to or customize.

/////////////////////////////////////////////////////////////////////////////
