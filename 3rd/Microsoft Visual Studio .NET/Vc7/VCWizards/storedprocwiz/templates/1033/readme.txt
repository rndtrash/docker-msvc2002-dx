=========================================================================
    EXTENDED STORED PROCEDURE : [!output PROJECT_NAME] Project Overview
========================================================================


AppWizard has created [!output PROJECT_NAME].dll for you.  

This file contains a summary of what you will find in each of the files that
make up your [!output PROJECT_NAME] application.

[!output PROJECT_NAME].vcproj
    This is the main project file for VC++ projects generated using an Application Wizard. 
    It contains information about the version of Visual C++ that generated the file, and 
    information about the platforms, configurations, and project features selected with the
    Application Wizard.

[!output PROJECT_NAME].cpp
    This is the main dll source file.

proc.cpp
    This file contains the stored procedure [!output STORED_PROC_NAME]

/////////////////////////////////////////////////////////////////////////////
Other standard files:

StdAfx.h, StdAfx.cpp
    These files are used to build a precompiled header (PCH) file
    named [!output PROJECT_NAME].pch and a precompiled types file named StdAfx.obj.


/////////////////////////////////////////////////////////////////////////////
Other notes:

After completing this Wizard, copy the [!output PROJECT_NAME].dll over to your SQL Server 
\Binn directory.

Add your new Extended Stored Procedure from a Visual Studio Data Project, 
or using the SQL Server Enterprise Manager, or by executing the following 
SQL command:
  sp_addextendedproc '[!output STORED_PROC_NAME]', '[!output PROJECT_NAME].DLL'

You may drop the extended stored procedure by using the SQL command:
  sp_dropextendedproc '[!output STORED_PROC_NAME]'

You may release the DLL from the Server (to delete or replace the file), by 
using the SQL command:
  DBCC [!output STORED_PROC_NAME](FREE)


/////////////////////////////////////////////////////////////////////////////
