
puremvc.define ({
        name: 'game.controller.StartupViewCommand',
        parent: puremvc.SimpleCommand
    },
 
    // INSTANCE MEMBERS
    {
        /** 
         * Register Mediators with the View
         * @override
         */
        execute: function (note) {
           // this.facade.registerMediator( new todomvc.view.mediator.TodoFormMediator() );

            var loginMediator = new game.view.login.LoginMediator();
            this.facade.registerMediator(new game.view.login.LoginMediator());

        }
    }     
);
