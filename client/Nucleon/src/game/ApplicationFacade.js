/**
 * Created by baoli on 2015/2/13.
 */
puremvc.define({
        name: 'game.Application',
        constructor: function()
        {
            game.manager.bugCorrect.BugCorrectManager.getInstance().correct();

            new game.manager.extend.ResizeHandler();

            this.LoadMediator = game.view.load.LoadMediator;
            this.StartupCommand = game.controller.StartupCommand;
            this.AppConstants = game.AppConstants;

            // register the startup command and trigger it.
            this.facade.registerCommand( this.AppConstants.STARTUP, this.StartupCommand );
            this.facade.sendNotification( this.AppConstants.STARTUP);
            this.facade.sendNotification( this.LoadMediator.NAME+"Show");
        }
    },

    // INSTANCE MEMBERS
    {
        // Define the startup notification name
        STARTUP: 'startup',

        // Get an instance of the PureMVC Facade. This creates the Model, View, and Controller instances.
        facade: puremvc.Facade.getInstance( game.AppConstants.CORE_NAME )
    },

    {
        getCoreFacade:function(){return puremvc.Facade.getInstance( game.AppConstants.CORE_NAME )}
    }
);