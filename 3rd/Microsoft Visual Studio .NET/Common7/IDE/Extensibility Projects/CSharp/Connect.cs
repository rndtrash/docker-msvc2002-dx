namespace $SAFEOBJNAME$
{
	using System;
	using Microsoft.Office.Core;
	using Extensibility;
	using System.Runtime.InteropServices;
	//BEGIN VSOnlyusing EnvDTE;//END VSOnly

	#region Read me for Add-in installation and setup information.
	// When run, the Add-in wizard prepared the registry for the Add-in.
	// At a later time, if the Add-in becomes unavailable for reasons such as:
	//   1) You moved this project to a computer other than which is was originally created on.
	//   2) You chose 'Yes' when presented with a message asking if you wish to remove the Add-in.
	//   3) Registry corruption.
	// you will need to re-register the Add-in by building the MyAddin21Setup project 
	// by right clicking the project in the Solution Explorer, then choosing install.
	#endregion
	
	/// <summary>
	///   The object for implementing an Add-in.
	/// </summary>
	/// <seealso class='IDTExtensibility2' />
	[GuidAttribute("$ICONNECTCLSID$"), ProgId("$VERPROGID$")]
	//BEGIN NOT VSOnlypublic class Connect : Object, Extensibility.IDTExtensibility2//END NOT VSOnly//BEGIN VSOnly//BEGIN VSCommandpublic class Connect : Object, Extensibility.IDTExtensibility2, IDTCommandTarget//END VSCommand//BEGIN NOT VSCommandpublic class Connect : Object, Extensibility.IDTExtensibility2//END NOT VSCommand//END VSOnly
	{
		/// <summary>
		///		Implements the constructor for the Add-in object.
		///		Place your initialization code within this method.
		/// </summary>
		public Connect()
		{
		}

		/// <summary>
		///      Implements the OnConnection method of the IDTExtensibility2 interface.
		///      Receives notification that the Add-in is being loaded.
		/// </summary>
		/// <param term='application'>
		///      Root object of the host application.
		/// </param>
		/// <param term='connectMode'>
		///      Describes how the Add-in is being loaded.
		/// </param>
		/// <param term='addInInst'>
		///      Object representing this Add-in.
		/// </param>
		/// <seealso class='IDTExtensibility2' />
		public void OnConnection(object application, Extensibility.ext_ConnectMode connectMode, object addInInst, ref System.Array custom)
		{
			//BEGIN VSOnlyapplicationObject = (_DTE)application;
			addInInstance = (AddIn)addInInst;//END VSOnly
			//BEGIN VSOnly//BEGIN VSCommandif(connectMode == Extensibility.ext_ConnectMode.ext_cm_UISetup)
			{
				object []contextGUIDS = new object[] { };
				Commands commands = applicationObject.Commands;
				_CommandBars commandBars = applicationObject.CommandBars;

				// When run, the Add-in wizard prepared the registry for the Add-in.
				// At a later time, the Add-in or its commands may become unavailable for reasons such as:
				//   1) You moved this project to a computer other than which is was originally created on.
				//   2) You chose 'Yes' when presented with a message asking if you wish to remove the Add-in.
				//   3) You add new commands or modify commands already defined.
				// You will need to re-register the Add-in by building the $SAFEOBJNAME$Setup project,
				// right-clicking the project in the Solution Explorer, and then choosing install.
				// Alternatively, you could execute the ReCreateCommands.reg file the Add-in Wizard generated in
				// the project directory, or run 'devenv /setup' from a command prompt.
				try
				{
					Command command = commands.AddNamedCommand(addInInstance, "$SAFEOBJNAME$", "$SAFEOBJNAME$", "Executes the command for $SAFEOBJNAME$", true, 59, ref contextGUIDS, (int)vsCommandStatus.vsCommandStatusSupported+(int)vsCommandStatus.vsCommandStatusEnabled);
					CommandBar commandBar = (CommandBar)commandBars["Tools"];
					CommandBarControl commandBarControl = command.AddControl(commandBar, 1);
				}
				catch(System.Exception /*e*/)
				{
				}
			}//END VSCommand//END VSOnly
			//BEGIN NOT VSOnlyapplicationObject = application;
			addInInstance = addInInst;//END NOT VSOnly
		}

		/// <summary>
		///     Implements the OnDisconnection method of the IDTExtensibility2 interface.
		///     Receives notification that the Add-in is being unloaded.
		/// </summary>
		/// <param term='disconnectMode'>
		///      Describes how the Add-in is being unloaded.
		/// </param>
		/// <param term='custom'>
		///      Array of parameters that are host application specific.
		/// </param>
		/// <seealso class='IDTExtensibility2' />
		public void OnDisconnection(Extensibility.ext_DisconnectMode disconnectMode, ref System.Array custom)
		{
		}

		/// <summary>
		///      Implements the OnAddInsUpdate method of the IDTExtensibility2 interface.
		///      Receives notification that the collection of Add-ins has changed.
		/// </summary>
		/// <param term='custom'>
		///      Array of parameters that are host application specific.
		/// </param>
		/// <seealso class='IDTExtensibility2' />
		public void OnAddInsUpdate(ref System.Array custom)
		{
		}

		/// <summary>
		///      Implements the OnStartupComplete method of the IDTExtensibility2 interface.
		///      Receives notification that the host application has completed loading.
		/// </summary>
		/// <param term='custom'>
		///      Array of parameters that are host application specific.
		/// </param>
		/// <seealso class='IDTExtensibility2' />
		public void OnStartupComplete(ref System.Array custom)
		{
		}

		/// <summary>
		///      Implements the OnBeginShutdown method of the IDTExtensibility2 interface.
		///      Receives notification that the host application is being unloaded.
		/// </summary>
		/// <param term='custom'>
		///      Array of parameters that are host application specific.
		/// </param>
		/// <seealso class='IDTExtensibility2' />
		public void OnBeginShutdown(ref System.Array custom)
		{
		}
		//BEGIN VSOnly//BEGIN VSCommand
		/// <summary>
		///      Implements the QueryStatus method of the IDTCommandTarget interface.
		///      This is called when the command's availability is updated
		/// </summary>
		/// <param term='commandName'>
		///		The name of the command to determine state for.
		/// </param>
		/// <param term='neededText'>
		///		Text that is needed for the command.
		/// </param>
		/// <param term='status'>
		///		The state of the command in the user interface.
		/// </param>
		/// <param term='commandText'>
		///		Text requested by the neededText parameter.
		/// </param>
		/// <seealso class='Exec' />
		public void QueryStatus(string commandName, EnvDTE.vsCommandStatusTextWanted neededText, ref EnvDTE.vsCommandStatus status, ref object commandText)
		{
			if(neededText == EnvDTE.vsCommandStatusTextWanted.vsCommandStatusTextWantedNone)
			{
				if(commandName == "$SAFEOBJNAME$.Connect.$SAFEOBJNAME$")
				{
					status = (vsCommandStatus)vsCommandStatus.vsCommandStatusSupported|vsCommandStatus.vsCommandStatusEnabled;
				}
			}
		}

		/// <summary>
		///      Implements the Exec method of the IDTCommandTarget interface.
		///      This is called when the command is invoked.
		/// </summary>
		/// <param term='commandName'>
		///		The name of the command to execute.
		/// </param>
		/// <param term='executeOption'>
		///		Describes how the command should be run.
		/// </param>
		/// <param term='varIn'>
		///		Parameters passed from the caller to the command handler.
		/// </param>
		/// <param term='varOut'>
		///		Parameters passed from the command handler to the caller.
		/// </param>
		/// <param term='handled'>
		///		Informs the caller if the command was handled or not.
		/// </param>
		/// <seealso class='Exec' />
		public void Exec(string commandName, EnvDTE.vsCommandExecOption executeOption, ref object varIn, ref object varOut, ref bool handled)
		{
			handled = false;
			if(executeOption == EnvDTE.vsCommandExecOption.vsCommandExecOptionDoDefault)
			{
				if(commandName == "$SAFEOBJNAME$.Connect.$SAFEOBJNAME$")
				{
					handled = true;
					return;
				}
			}
		}//END VSCommand//END VSOnly
		//BEGIN VSOnlyprivate _DTE applicationObject;
		private AddIn addInInstance;//END VSOnly
		//BEGIN NOT VSOnlyprivate object applicationObject;
		private object addInInstance;//END NOT VSOnly
	}
}