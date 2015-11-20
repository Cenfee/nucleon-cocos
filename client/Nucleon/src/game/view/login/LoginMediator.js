/**
 * @author Cliff Hall
 * 
 * @class RoutesMediator
 * @link https://github.com/PureMVC/puremvc-js-demo-todomvc.git
 */
puremvc.define({
        name: 'game.view.login.LoginMediator',
        parent: puremvc.Mediator,

        constructor:function()
        {
            puremvc.Mediator.call(this, this.constructor.NAME);

            this.LoginMediator = game.view.login.LoginMediator;
            this.SceneManager = game.manager.scene.SceneManager;
            this.SceneConstants = game.manager.scene.SceneConstants;
            this.ViewConstants = game.manager.view.ViewConstants;
            this.ViewManager = game.manager.view.ViewManager;
            this.LoginEvent = game.view.login.event.LoginEvent;
            this.GameMediator = game.view.game.GameMediator;
        }
    },
 
    // INSTANCE MEMBERS
    {

        listNotificationInterests:function()
        {
            var arr = [];
            arr.push(this.LoginMediator.NAME + "Show");
            arr.push(this.LoginMediator.NAME + "Hide");
            return arr;
        },
        handleNotification:function(note)
        {
            switch ( note.getName() )
            {
                case this.LoginMediator.NAME + "Show":

                    this.show();

                    break;

                case this.LoginMediator.NAME + "Hide":

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

            this.SceneManager.getInstance().switchScene(this.SceneConstants.LOGIN, function()
            {
                self.ViewManager.getInstance().showView(self.ViewConstants.LOGIN_VIEW, {complete:self.showViewCompleteHandler});
            });

            cc.eventManager.addCustomListener(this.LoginEvent.START_GAME, function startGameHandler()
            {
                self.hide();

                self.facade.sendNotification(self.GameMediator.NAME+"Show");
            });
        },

        hide:function()
        {
            cc.eventManager.removeCustomListeners(this.LoginEvent.START_GAME);
            this.ViewManager.getInstance().hideView(this.ViewConstants.LOGIN_VIEW, true);
        },

        showViewCompleteHandler:function(viewComponent)
        {

        }
    },
     
     // STATIC MEMBERS
     {
         NAME: 'LoginMediator'
     }    
);
