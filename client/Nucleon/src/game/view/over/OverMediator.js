/**
 * @author Cliff Hall
 * 
 * @class RoutesMediator
 * @link https://github.com/PureMVC/puremvc-js-demo-todomvc.git
 */
puremvc.define({
        name: 'game.view.over.OverMediator',
        parent: puremvc.Mediator,

        constructor:function()
        {
            puremvc.Mediator.call(this, this.constructor.NAME);

            this.OverMediator = game.view.over.OverMediator;
            this.SceneManager = game.manager.scene.SceneManager;
            this.SceneConstants = game.manager.scene.SceneConstants;
            this.ViewConstants = game.manager.view.ViewConstants;
            this.ViewManager = game.manager.view.ViewManager;
            this.OverEvent = game.view.over.event.OverEvent;
            this.GameMediator = game.view.game.GameMediator;
            this.LoginMediator = game.view.login.LoginMediator;
            this.GameProxy = game.model.game.GameProxy;
        }
    },
 
    // INSTANCE MEMBERS
    {
        _data:null,

        listNotificationInterests:function()
        {
            var arr = [];
            arr.push(this.OverMediator.NAME + "Show");
            arr.push(this.OverMediator.NAME + "Hide");
            return arr;
        },
        handleNotification:function(note)
        {
            switch ( note.getName() )
            {
                case this.OverMediator.NAME + "Show":

                    this._data = note.getBody();
                    this.show();

                    break;

                case this.OverMediator.NAME + "Hide":

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

            this.SceneManager.getInstance().switchScene(this.SceneConstants.OVER, function()
            {
                self.ViewManager.getInstance().showView(self.ViewConstants.OVER_VIEW, {complete:self.showViewCompleteHandler, completeThis:self});
            });

            cc.eventManager.addCustomListener(this.OverEvent.SHOW_GAME, function showGameHandler()
            {
                self.hide();

                self.facade.sendNotification(self.GameMediator.NAME+"Show");
            });

            cc.eventManager.addCustomListener(this.OverEvent.SHOW_LOGIN, function showLoginHandler()
            {
                self.hide();

                self.facade.sendNotification(self.LoginMediator.NAME+"Show");
            });
        },

        hide:function()
        {
            cc.eventManager.removeCustomListeners(this.OverEvent.SHOW_GAME);
            cc.eventManager.removeCustomListeners(this.OverEvent.SHOW_LOGIN);

            this.ViewManager.getInstance().hideView(this.ViewConstants.OVER_VIEW, true);
        },

        showViewCompleteHandler:function(viewComponent)
        {
            var gameProxy = this.facade.retrieveProxy(this.GameProxy.NAME);
            gameProxy.setCurLevel(this._data["data"]);

            var self = this;
            gameProxy.updateToStorage(function()
            {
                viewComponent.update(self._data);
            });

        }
    },
     
     // STATIC MEMBERS
     {
         NAME: 'OverMediator'
     }    
);
