FROM debian:stable-slim

RUN apt-get update \
    && DEBIAN_FRONTEND="noninteractive" apt-get install -y --no-install-recommends \
        apt-transport-https \
        ca-certificates \
        cabextract \
        git \
        gnupg \
        locales \
        p7zip \
        tzdata \
        unzip \
        wget \
    && rm -rf /var/lib/apt/lists/*

# Install wine
ARG WINE_BRANCH="stable"
RUN wget -nv -O- https://dl.winehq.org/wine-builds/winehq.key | APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=1 apt-key add - \
    && echo "deb https://dl.winehq.org/wine-builds/debian/ $(grep VERSION_CODENAME= /etc/os-release | cut -d= -f2) main" >> /etc/apt/sources.list \
    && dpkg --add-architecture i386 \
    && apt-get update \
    && DEBIAN_FRONTEND="noninteractive" apt-get install -y --install-recommends winehq-${WINE_BRANCH} \
    && rm -rf /var/lib/apt/lists/*

# Install winetricks
RUN wget -nv -O /usr/bin/winetricks https://raw.githubusercontent.com/Winetricks/winetricks/master/src/winetricks \
    && chmod +x /usr/bin/winetricks

# Configure locale for unicode
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8

# Install VS2002 dependencies
ENV WINEARCH="win32"
RUN winetricks -q winxp mfc70 #dotnet11

# Copy the VC++2002 runtime
COPY 3rd/msvcp70.dll /root/.wine/drive_c/windows/system32/
COPY 3rd/msvcr70.dll /root/.wine/drive_c/windows/system32/

# Install CMake 3.5.2 (the last CMake that supports VS2002)
COPY 3rd/cmake-3.5.2-win32-x86.msi /root
RUN wine msiexec.exe /i /root/cmake-3.5.2-win32-x86.msi /QN && rm /root/cmake-3.5.2-win32-x86.msi
ENV WINEPATH="C:/Program Files/CMake/bin"

# Copy the VS2002 itself
ARG COPY_SRC="3rd/Microsoft Visual Studio .NET/"
ARG COPY_DEST="/root/.wine/drive_c/Program Files/Microsoft Visual Studio .NET/"
ADD ${COPY_SRC} ${COPY_DEST}

# Install DirectX 8.1 SDK
ADD 3rd/DXSDK /root/.wine/drive_c/DXSDK

# Clear the winetricks cache
RUN rm -rf /root/.cache/winetricks

ADD entrypoint.sh /usr/bin/entrypoint

WORKDIR "/root"
ENTRYPOINT "/usr/bin/entrypoint" "$0" "$@"
CMD ""
