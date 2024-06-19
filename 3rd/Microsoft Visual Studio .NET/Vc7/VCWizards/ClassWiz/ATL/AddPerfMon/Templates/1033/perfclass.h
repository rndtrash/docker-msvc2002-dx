// [!output HEADER_FILE]: interface for the [!output CLASS_NAME] class.
//


#pragma once

[!if ATTRIBUTED]
[!if SAMPLE_PERFMON_OBJECT]
[ perf_object(
		namestring="[!output PERFMON_NAME] Sample Object",
		helpstring="A Sample PerfMon Object for [!output PERFMON_NAME]",
		detail=PERF_DETAIL_NOVICE) ]
class [!output CLASS_NAME]SampleObject
{
public:
	[ perf_counter(
			namestring="[!output PERFMON_NAME] Sample Counter",
			helpstring="A Sample PerfMon Counter for [!output PERFMON_NAME]",
			countertype=PERF_COUNTER_RAWCOUNT,
			defscale=0,
			detail=PERF_DETAIL_NOVICE,
			default_counter=true) ]
	ULONG m_nCounter;
};
[!endif]

[!if TODO_COMMENTS]
// TODO:  First add Performance Monitor objects to your project.
// You can then add counters to those objects.  Use the context
// menu of [!output CLASS_NAME] in ClassView to add a PerfMon Object
// to your project.  Then use the context menu of the newly
// created PerfMon Object to add a PerfMon Counter.
[!endif]
[ perfmon(name="[!output PERFMON_NAME]", register=true) ]
class [!output CLASS_NAME]
{
public:
};
[!else]
[!if SAMPLE_PERFMON_OBJECT]
class [!output CLASS_NAME]SampleObject :
	public CPerfObject
{
public:
	DECLARE_PERF_OBJECT([!output CLASS_NAME]SampleObject, 1, "[!output PERFMON_NAME] Sample Object", "A Sample PerfMon Object for [!output PERFMON_NAME]", -1);
	BEGIN_COUNTER_MAP([!output CLASS_NAME]SampleObject)
		DEFINE_COUNTER(m_nCounter, "[!output PERFMON_NAME] Sample Counter", "A Sample PerfMon Counter for [!output PERFMON_NAME]", PERF_COUNTER_RAWCOUNT, 0)
	END_COUNTER_MAP()

	ULONG m_nCounter;
};
[!endif]

[!if TODO_COMMENTS]
// TODO:  First add Performance Monitor objects to your project.
// You can then add counters to those objects.  Use the context
// menu of [!output CLASS_NAME] in ClassView to add a PerfMon Object
// to your project.  Then use the context menu of the newly
// created PerfMon Object to add a PerfMon Counter.
[!endif]
class [!output CLASS_NAME] :
	public CPerfMon
{
public:
#define [!output PERFMON_NAME] _T("[!output PERFMON_NAME]")
	BEGIN_PERF_MAP([!output PERFMON_NAME])
[!if SAMPLE_PERFMON_OBJECT]
		CHAIN_PERF_OBJECT([!output CLASS_NAME]SampleObject)
[!endif]
	END_PERF_MAP()
};

PERFREG_ENTRY([!output CLASS_NAME]);
[!endif]
