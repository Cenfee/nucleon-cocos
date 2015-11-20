
puremvc.define({
        name: 'game.controller.StartupModelCommand',
        parent: puremvc.SimpleCommand
    },
  
    // INSTANCE MEMBERS
    {
        /** 
         * Register Proxies with the Model
         * @override
         */
        execute: function (note) {
          //  this.facade.registerProxy( new todomvc.model.proxy.TodoProxy() );

            this.facade.registerProxy(new game.model.login.LoginProxy());
        }
    }    
);
