
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

            this.facade.registerMediator(new game.view.load.LoadMediator());
            this.facade.registerMediator(new game.view.login.LoginMediator());
            this.facade.registerMediator(new game.view.game.GameMediator());
            this.facade.registerMediator(new game.view.over.OverMediator());

        }
    }     
);
