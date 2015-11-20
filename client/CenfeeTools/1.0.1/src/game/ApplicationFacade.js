/**
 * Created by baoli on 2015/2/13.
 */
puremvc.define({
        name: 'game.Application',
        constructor: function() {
            // register the startup command and trigger it.
            this.facade.registerCommand( game.AppConstants.STARTUP, game.controller.StartupCommand );
            this.facade.sendNotification( game.AppConstants.STARTUP);
            this.facade.sendNotification(game.view.login.LoginMediator.NAME+"Show");
        }
    },

    // INSTANCE MEMBERS
    {
        // Define the startup notification name
        STARTUP: 'startup',

        // Get an instance of the PureMVC Facade. This creates the Model, View, and Controller instances.
        facade: puremvc.Facade.getInstance( game.AppConstants.CORE_NAME )
    }
);