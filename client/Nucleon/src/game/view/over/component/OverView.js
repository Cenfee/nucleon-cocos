/**
 * Created by baoli on 2015/2/28.
 */
puremvc.declare("game.view.over.component.OverView", cc.Layer.extend({

    _ui:null,

    _replayBtn:null,
    _homeBtn:null,
    _levelText:null,

    _resizeListener:null,



    ctor: function ()
    {
        this.ResponsiveManager = game.manager.responsive.ResponsiveManager;
        this.OverEvent = game.view.over.event.OverEvent;
        this.GameProxy = game.model.game.GameProxy;
        this.DataManager = game.manager.data.DataManager;

        this._super();



        this._ui = ccs.load("res/ui/over.json");
        this.addChild(this._ui.node);
        this.ResponsiveManager.getInstance().doCcsViewUiByVisible(this._ui);


        var self = this;
        _replayBtn = this._ui.node.getChildByName("replay_btn");
        _replayBtn.addTouchEventListener(replayHandler, this);

        _homeBtn = this._ui.node.getChildByName("home_btn");
        _homeBtn.addTouchEventListener(homeHandler, this);

        this._levelText = this._ui.node.getChildByName("level").getChildByName("text");

        var recordText = this._ui.node.getChildByName("record").getChildByName("text");
        recordText.setString(game.Application.getCoreFacade().retrieveProxy(this.GameProxy.NAME).getMaxLevel());



        function replayHandler(sender, type)
        {
            switch(type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.eventManager.dispatchCustomEvent(self.OverEvent.SHOW_GAME);
                    break;
            }
        }
        function homeHandler(sender, type)
        {
            switch(type) {
                case ccui.Widget.TOUCH_ENDED:
                    cc.eventManager.dispatchCustomEvent(self.OverEvent.SHOW_LOGIN);
                    break;
            }
        }

        var self = this;
        this._resizeListener = cc.EventListener.create
        ({
            event:cc.EventListener.CUSTOM,
            eventName:game.GameEvent.RESIZE,
            callback:function()
            {
                self.ResponsiveManager.getInstance().doCcsViewUiByVisible(self._ui);
            }
        });
        cc.eventManager.addListener(this._resizeListener, 1);

    },

    cleanup:function()
    {
        _replayBtn.addTouchEventListener(null, null);
        _homeBtn.addTouchEventListener(null, null);

        this._ui.node.cleanup();
        this._ui.node.removeFromParent(false);

        cc.eventManager.removeListener(this._resizeListener);


        this._super();
    },

    update:function(data)
    {
        this._levelText.setString(data["data"]);
    }




}));