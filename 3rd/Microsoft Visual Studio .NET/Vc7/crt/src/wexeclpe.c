/***
*wexeclpe.c - execute a file (search along PATH) (wchar_t version)
*
*       Copyright (c) 1993-2001, Microsoft Corporation. All rights reserved.
*
*Purpose:
*       defines _wexeclpe() - execute a file and search along PATH
*
*******************************************************************************/


#define WPRFLAG 1

#ifndef _UNICODE
#define _UNICODE 1
#endif  /* _UNICODE */

#ifndef UNICODE
#define UNICODE 1
#endif  /* UNICODE */

#undef _MBCS /* UNICODE not _MBCS */

#include "execlpe.c"

