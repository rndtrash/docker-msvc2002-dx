// [!output IMPL_FILE] : Implementation of [!output CLASS_NAME]
#include "stdafx.h"
#include "[!output HEADER_FILE]"

[!if !HTML_CONTROL && !COMPOSITE_CONTROL]
[!if USE_COMMON_CONTROLS || USE_COMMON_CONTROLS_EX]
#pragma comment(lib, "comctl32.lib")
[!endif]
[!endif]

// [!output CLASS_NAME]
