/**
 * Created by baoli on 2015/2/28.
 */
puremvc.declare("game.view.game.component.GameView", cc.Layer.extend({


    _uiLayer:null,
    _gameLayer:null,

    ctor: function ()
    {
        this.UILayer = game.view.game.component.UILayer;
        this.GameLayer = game.view.game.component.GameLayer;
        this.ViewManager = game.manager.view.ViewManager;
        this.ViewConstants = game.manager.view.ViewConstants;
        this.GameEvent = game.view.game.event.GameEvent;

        this._super();

        this._uiLayer = new this.UILayer();
        this._uiLayer.pauseBtn.addTouchEventListener(this.pauseHandler, this);
        this.addChild(this._uiLayer);

        this._gameLayer = new this.GameLayer();
        this._gameLayer.onTimeCounter = this.timeCounterHandler;
        this._gameLayer.onTimeCounterThis = this;
        this._gameLayer.onUpLevel = this.upLevelHandler;
        this._gameLayer.onUpLevelThis = this;
        this._gameLayer.onTimeup = this.timeupHandler;
        this._gameLayer.onTimeupThis = this;

        this.addChild(this._gameLayer);
    },

    cleanup:function()
    {
        this.ViewManager.getInstance().hideView(this.ViewConstants.PAUSE_VIEW, true);
        this.ViewManager.getInstance().hideView(this.ViewConstants.TIMEUP_VIEW, true);

        this._uiLayer.pauseBtn.addTouchEventListener(null, null);
        this._uiLayer.cleanup();
        this._uiLayer.removeFromParent(false);

        this._gameLayer.onTimeCounter = null;
        this._gameLayer.onTimeCounterThis = null;
        this._gameLayer.onUpLevel = null;
        this._gameLayer.onUpLevelThis = null;
        this._gameLayer.onTimeup = null;
        this._gameLayer.onTimeupThis = null;
        this._gameLayer.cleanup();
        this._gameLayer.removeFromParent(false);

        this._super();
    },

    pauseHandler:function(sender, type)
    {
        switch(type)
        {
            case ccui.Widget.TOUCH_BEGAN:

                return true;
            case ccui.Widget.TOUCH_MOVED:

                break;
            case ccui.Widget.TOUCH_ENDED:
                this._gameLayer.pause();
                this.ViewManager.getInstance().showView(this.ViewConstants.PAUSE_VIEW, {complete:this.pauseViewGettedHandler, completeThis:this});
                break;
        }
    },
    pauseViewGettedHandler:function(view)
    {
        var self = this;
        view.onReplay = function()
        {
            self.ViewManager.getInstance().hideView(self.ViewConstants.PAUSE_VIEW, false);
            cc.eventManager.dispatchCustomEvent(self.GameEvent.REPLAY);
        };
        view.onPlay = function()
        {
            self.ViewManager.getInstance().hideView(self.ViewConstants.PAUSE_VIEW, false);
            self._gameLayer.resume();
        };
        view.onHome = function()
        {
            self.ViewManager.getInstance().hideView(self.ViewConstants.PAUSE_VIEW, false);
            cc.eventManager.dispatchCustomEvent(self.GameEvent.SHOW_LOGIN);
        };

    },

    timeCounterHandler:function(time, total)
    {
        var a = this._uiLayer;
        this._uiLayer.setCountDown(time, total);
    },
    upLevelHandler:function(level)
    {
        this._uiLayer.setLevel(level);
    },
    timeupHandler:function(level)
    {
        this.ViewManager.getInstance().showView(this.ViewConstants.TIMEUP_VIEW);
        var self = this;
        cc.director.getScheduler().schedule(function()
            {
                this.ViewManager.getInstance().hideView(this.ViewConstants.TIMEUP_VIEW, false);
                cc.eventManager.dispatchCustomEvent(self.GameEvent.SHOW_OVER, {data:level});
            },
            this, 2, false, 0, false, "game.view.game.component.GameView.timeupHandler"
        );
    },

    showTimeup:function()
    {
        this.ViewManager.getInstance().showView(this.ViewConstants.TIMEUP_VIEW);
    }


}));