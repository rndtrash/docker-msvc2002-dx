// (c) 2001 Microsoft Corporation
// Script for Add Command Handler

function OnFinish(selProj, selObj)
{
	try
	{
		var oSelctedClassDescription = wizard.FindSymbol("CLASSDESC_DISPATCH");
		var memID = wizard.FindSymbol("CLASSDESC_MEMID");
		var strHandlerName = wizard.FindSymbol("CLASSDESC_HANDLER_NAME");

		wizard.NavigateToCommandHandler(oSelctedClassDescription, memID, strHandlerName);
	}
	catch(e)
	{
		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}
