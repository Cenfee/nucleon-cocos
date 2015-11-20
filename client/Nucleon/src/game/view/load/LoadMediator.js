/**
 * @author Cliff Hall
 * 
 * @class RoutesMediator
 * @link https://github.com/PureMVC/puremvc-js-demo-todomvc.git
 */
puremvc.define({
        name: 'game.view.load.LoadMediator',
        parent: puremvc.Mediator,

        constructor:function()
        {
            puremvc.Mediator.call(this, this.constructor.NAME);
            //import
            this.LoadMediator = game.view.load.LoadMediator;
            this.SceneManager = game.manager.scene.SceneManager;
            this.SceneConstants = game.manager.scene.SceneConstants;
            this.ViewConstants = game.manager.view.ViewConstants;
            this.ViewManager = game.manager.view.ViewManager;
            this.LoadEvent = game.view.load.event.LoadEvent;
            this.LoginMediator = game.view.login.LoginMediator;
            this.GameMediator = game.view.game.GameMediator;
            this.GameProxy = game.model.game.GameProxy;


        }
    },

    // INSTANCE MEMBERS
    {
        listNotificationInterests:function()
        {
            var arr = [];
            arr.push(this.LoadMediator.NAME + "Show");
            arr.push(this.LoadMediator.NAME + "Hide");
            return arr;
        },
        handleNotification:function(note)
        {
            switch ( note.getName() )
            {
                case this.LoadMediator.NAME + "Show":

                    this.show();

                    break;

                case this.LoadMediator.NAME + "Hide":

                    this.hide();

                    break;

            }

        },
        onRegister: function ()
        {

        },


        show:function()
        {
            var self = this;

            this.SceneManager.getInstance().switchScene(this.SceneConstants.LOAD, function()
            {
                self.ViewManager.getInstance().showView(self.ViewConstants.LOAD_VIEW, {complete:self.showViewCompleteHandler});
            });

            cc.eventManager.addCustomListener(this.LoadEvent.COMLETE, function viewCompleteHandler()
            {
                self.facade.retrieveProxy(self.GameProxy.NAME).updateFromStorage(function()
                {
                    self.hide();

                    self.facade.sendNotification(self.LoginMediator.NAME+"Show");
                });
            });
        },

        hide:function()
        {
            cc.eventManager.removeCustomListeners(this.LoadEvent.COMLETE);
            this.ViewManager.getInstance().hideView(this.ViewConstants.LOAD_VIEW, true);
        },

        showViewCompleteHandler:function(viewComponent)
        {
        }
    },
     
     // STATIC MEMBERS
     {
         NAME: 'LoadMediator'
     }    
);
