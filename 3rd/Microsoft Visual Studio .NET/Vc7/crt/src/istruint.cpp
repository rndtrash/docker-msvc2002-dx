/***
* istruint.cpp - definitions for istream class operaotor>>(unsigned int) funct
*
*       Copyright (c) 1991-2001, Microsoft Corporation.  All rights reserved.
*
*Purpose:
*       Definitions of operator>>(unsigned int) member function for istream
*       class.
*       [AT&T C++]
*
*******************************************************************************/

#include <cruntime.h>
#include <internal.h>
#include <stdlib.h>
#include <limits.h>
#include <errno.h>
#include <iostream.h>
#pragma hdrstop

/***
*istream& istream::operator>>(unsigned int& n) - extract unsigned int
*
*Purpose:
*       Extract unsigned int value from stream
*       Valid range is INT_MIN to UINT_MAX.
*
*Entry:
*       n = value to update
*
*Exit:
*       n updated, or ios::failbit and n=UINT_MAX if error
*
*Exceptions:
*       Stream error on entry or value out of range
*
*******************************************************************************/
istream& istream::operator>>(unsigned int& n)
{
_WINSTATIC char ibuffer[MAXLONGSIZ];
    unsigned long value;
    char ** endptr = (char**)NULL;
    if (ipfx(0)) {
        value = strtoul(ibuffer, endptr, getint(ibuffer));

        if (((value>UINT_MAX) && (value<=(ULONG_MAX-(unsigned long)(-INT_MIN))))
                || ((value==ULONG_MAX) && (errno==ERANGE)))
            {
            n = UINT_MAX;
            state |= ios::failbit;
            }
        else
            n = (unsigned int) value;

        isfx();
        }
return *this;
}
