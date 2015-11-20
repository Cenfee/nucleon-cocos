puremvc.define({
        name: 'game.controller.StartupCommand',
        parent: puremvc.MacroCommand
    },

    // INSTANCE MEMBERS 
    {
        /** 
         * Add the sub-commands for this MacroCommand
         * @override
         */
        initializeMacroCommand: function () {
            this.addSubCommand( game.controller.StartupControllerCommand );
            this.addSubCommand( game.controller.StartupModelCommand );
            this.addSubCommand( game.controller.StartupViewCommand );
        }
    }    
);
