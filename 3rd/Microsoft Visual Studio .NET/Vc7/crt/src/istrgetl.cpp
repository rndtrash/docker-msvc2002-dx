/***
* istrgetl.cpp - definitions for istream class get() member function
*
*       Copyright (c) 1991-2001, Microsoft Corporation.  All rights reserved.
*
*Purpose:
*       Definitions of get and getline member functions istream class.
*       [AT&T C++]
*
*******************************************************************************/

#include <cruntime.h>
#include <internal.h>
#include <iostream.h>
#pragma hdrstop

// unformatted input functions

// signed and unsigned char make inline calls to this:
// all versions of getline also share this code:

istream& istream::get( char *b, int lim, int delim)
{
        int c;
        unsigned int i = 0;
        if (ipfx(1))    // resets x_gcount
        {
            if (lim--)
            {
                while (i < (unsigned)lim)
                {
                    c = bp->sgetc();
                    if (c == EOF)
                    {
                        state |= ios::eofbit;
                        if (!i)
                            state |= ios::failbit;
                        break;
                    }
                    else if (c == delim)
                    {
                        if (_fGline)
                        {
                            x_gcount++;
                            bp->stossc(); // extract delim if called from getline
                        }
                        break;
                    }
                    else
                    {
                        if (b)
                            b[i] = (char)c;
                        bp->stossc(); // advance pointer
                    }
                    i++;
                }
                x_gcount += i;      // set gcount()
            }
            isfx();
            lim++;      // restore lim for test below
        }
        if ((b) && (lim))   // always null-terminate, if possible
            b[i] = '\0';
        _fGline = 0;

        return *this;
}
