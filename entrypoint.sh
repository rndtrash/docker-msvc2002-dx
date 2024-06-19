#!/bin/sh
rm -f ./autoexec.bat
echo 'call "C:/Program Files/Microsoft Visual Studio .NET/Common7/Tools/vsvars32.bat"' >> autoexec.bat
echo "$@" >> autoexec.bat
wine cmd /C autoexec.bat
