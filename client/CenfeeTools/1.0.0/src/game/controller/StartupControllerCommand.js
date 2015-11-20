
puremvc.define({
        name: 'game.controller.StartupControllerCommand',
        parent: puremvc.SimpleCommand
    },
  
    // INSTANCE MEMBERS
    {
        /** 
         * Register Commands with the Controller
         * @override
         */
        execute: function (note) {   
            // This registers multiple notes to a single command which performs different logic based on the note name.
            // In a more complex app, we'd usually be registering a different command to each notification name.
           // this.facade.registerCommand( todomvc.AppConstants.ADD_TODO,                  todomvc.controller.command.TodoCommand );

        }
    }    
);
