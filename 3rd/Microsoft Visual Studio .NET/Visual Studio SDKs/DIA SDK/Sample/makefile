## Makefile - DIA sample makefile
##-----------------------------------------------------------------
## 
## Copyright Microsoft Corporation.  All Rights Reserved.
##
##---------------------------------------------------------------
TARGET  = dia2dump

CFLAGS	= /c /Fd$(ODIR)\$(TARGET).pdb /GF /Gy /W3 /I..\include

!ifdef	RELEASE
ODIR	= release
LFLAGS	= /debug /incremental:no /map /opt:icf /opt:ref
CFLAGS	= $(CFLAGS) /DNDEBUG /MD /O2 /Zi
!else
BROWSER = 1
ODIR	= debug
LFLAGS	= /debug /map /NODEFAULTLIB:msvcrt.lib
CFLAGS	= $(CFLAGS) /MDd /Od /Zi /FR$(ODIR)/  
!endif

!ifdef NOCOM
CFLAGS	= $(CFLAGS) /DNOCOM
!endif

!ifdef NOREG
CFLAGS	= $(CFLAGS) /DNOCOM /DNOREG
!endif

.cpp{$(ODIR)}.obj::
	$(CC) $(CFLAGS) /Fo$(ODIR)\ $<

OBJS	= \
	$(ODIR)\$(TARGET).obj	\
	$(ODIR)\stdafx.obj

all: $(ODIR)\$(TARGET).exe

clean: $(ODIR)
        @-del $(ODIR)\*.obj $(ODIR)\*.sbr $(ODIR)\*.?db $(ODIR)\*.pch $(ODIR)\*.res $(ODIR)\*.rsp $(ODIR)\*.exe $(ODIR)\*.exp $(ODIR)\*.ilk $(ODIR)\*.bsc
        @-echo $(ODIR) clean

$(ODIR):
	@-mkdir $(ODIR)

$(ODIR)\$(TARGET).exe: $(ODIR) $(OBJS)
	link @<<$(ODIR)\link.rsp
$(LFLAGS)
-out:$@
$(OBJS: = ^
)
/libpath:..\lib diaguids.lib 
<<keep
!ifndef RELEASE
	bscmake /n /o$(ODIR)\$(TARGET).bsc $(ODIR)\*.sbr
!endif

