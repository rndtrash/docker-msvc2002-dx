// stdafx.h : include file for standard system include files,
// or project specific include files that are used frequently, but
// are changed infrequently
//

#pragma once

#define WIN32_LEAN_AND_MEAN		// Exclude rarely-used stuff from Windows headers

#define _ATL_CSTRING_EXPLICIT_CONSTRUCTORS	// some CString constructors will be explicit

// turns off ATL's hiding of some common and often safely ignored warning messages
#define _ATL_ALL_WARNINGS

// critical error descriptions will only be shown to the user
// in debug builds. they will always be logged to the event log
#ifndef _DEBUG
#define ATL_CRITICAL_ISAPI_ERROR_LOGONLY
#endif

[!if GENERATING_APP]
[!if SOAP]
#define _ATL_APARTMENT_THREADED
[!endif]
[!endif]

#ifndef _WIN32_WINNT
#define _WIN32_WINNT 0x0403
#endif

[!if TODO]
// TODO: this disables support for registering COM objects
// exported by this project since the project contains no
// COM objects or typelib. If you wish to export COM objects
// from this project, add a typelib and remove this line
[!endif]
#define _ATL_NO_COM_SUPPORT

[!if PERFMON && GENERATING_ISAPI]
#define _ATL_PERF_REGISTER
[!endif]

[!if GENERATING_ISAPI]
#include "resource.h"
#include <atlsrvres.h>
#include <atlisapi.h>
#include <atlstencil.h>
[!endif]
[!if GENERATING_APP]
[!if !GENERATING_ISAPI]
[!if STENCIL || VALIDATION || ATTRIBUTED]
#include <atlstencil.h>
[!else]
#include <atlisapi.h>
[!endif]
[!endif]
[!if SOAP]
#include <atlsoap.h>
[!endif]
[!endif]
[!if SESSION_MEM || SESSION_DB]
#include <atlsession.h>
[!endif]

[!if PERFMON && GENERATING_ISAPI]
#include <atlperf.h>
#include <atlsync.h>
[!endif]
[!if TODO]

// TODO: reference additional headers your program requires here
[!endif]
