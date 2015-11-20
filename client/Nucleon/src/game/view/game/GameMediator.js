/**
 * @author Cliff Hall
 * 
 * @class RoutesMediator
 * @link https://github.com/PureMVC/puremvc-js-demo-todomvc.git
 */
puremvc.define({
        name: 'game.view.game.GameMediator',
        parent: puremvc.Mediator,

        constructor: function()
        {
            puremvc.Mediator.call(this, this.constructor.NAME);

            //import
            this.SceneManager = game.manager.scene.SceneManager;
            this.SceneConstants = game.manager.scene.SceneConstants;
            this.ViewConstants = game.manager.view.ViewConstants;
            this.ViewManager = game.manager.view.ViewManager;
            this.GameMediator = game.view.game.GameMediator;
            this.LoginMediator = game.view.login.LoginMediator;
            this.OverMediator = game.view.over.OverMediator;
            this.GameEvent = game.view.game.event.GameEvent;

        }
    },
 
    // INSTANCE MEMBERS
    {

        listNotificationInterests:function()
        {
            var arr = [];
            arr.push(this.GameMediator.NAME + "Show");
            arr.push(this.GameMediator.NAME + "Hide");

            return arr;
        },
        handleNotification:function(note)
        {
            switch ( note.getName() )
            {
                case this.GameMediator.NAME + "Show":

                    this.show();

                    break;

                case this.GameMediator.NAME + "Hide":

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
            this.SceneManager.getInstance().switchScene(this.SceneConstants.GAME, function()
            {
                self.ViewManager.getInstance().showView(self.ViewConstants.GAME_VIEW, {complete:self.showViewCompleteHandler});
            });

            cc.eventManager.addCustomListener(this.GameEvent.SHOW_LOGIN, function showLoginHandler()
            {
                self.hide();

                self.facade.sendNotification(self.LoginMediator.NAME+"Show");
            });
            cc.eventManager.addCustomListener(this.GameEvent.SHOW_OVER, function showOverHandler(event)
            {
                self.hide();

                self.facade.sendNotification(self.OverMediator.NAME+"Show", event.getUserData());
            });

            cc.eventManager.addCustomListener(this.GameEvent.REPLAY, function showLoginHandler()
            {
                self.ViewManager.getInstance().hideView(self.ViewConstants.GAME_VIEW, true)
                self.ViewManager.getInstance().showView(self.ViewConstants.GAME_VIEW, {complete:self.showViewCompleteHandler});
            });
        },

        hide:function()
        {
            cc.eventManager.removeCustomListeners(this.GameEvent.SHOW_LOGIN);
            cc.eventManager.removeCustomListeners(this.GameEvent.SHOW_OVER);
            cc.eventManager.removeCustomListeners(this.GameEvent.REPLAY);

            this.ViewManager.getInstance().hideView(this.ViewConstants.GAME_VIEW, true);
        },

        showViewCompleteHandler:function(viewComponent)
        {

        }
    },
     
     // STATIC MEMBERS
     {
         NAME: 'GameMediator'
     }    
);
