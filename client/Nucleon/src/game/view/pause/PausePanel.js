/**
 * Created by baoli on 2015/2/28.
 */
puremvc.declare("game.view.pause.PauseView", cc.Layer.extend({

    _ui:null,

    onReplay:null,
    onPlay:null,
    onHome:null,

    _replayBtn:null,
    _playBtn:null,
    _homeBtn:null,

    _resizeListener:null,



    ctor: function ()
    {
        this.LoginEvent = game.view.login.event.LoginEvent;
        this.ResponsiveManager = game.manager.responsive.ResponsiveManager;


        this._super();



        this._ui = ccs.load("res/ui/pause.json");
        this.addChild(this._ui.node);
        this.ResponsiveManager.getInstance().doCcsViewUiByVisible(this._ui);

        _replayBtn = this._ui.node.getChildByName("replay_btn");
        _replayBtn.addTouchEventListener(replayBtnHandler, this);
        _playBtn = this._ui.node.getChildByName("play_btn");
        _playBtn.addTouchEventListener(playBtnHandler, this);
        _homeBtn = this._ui.node.getChildByName("home_btn");
        _homeBtn.addTouchEventListener(homeBtnHandler, this);


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


        var self = this;
        function replayBtnHandler(sender, type)
        {
            switch(type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(self.onReplay)
                    {
                        self.onReplay.call();
                    }
                    break;
            }
        }
        function playBtnHandler(sender, type)
        {
            switch(type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(self.onPlay)
                    {
                        self.onPlay.call();
                    }
                    break;
            }
        }
        function homeBtnHandler(sender, type)
        {
            switch(type)
            {
                case ccui.Widget.TOUCH_ENDED:
                    if(self.onHome)
                    {
                        self.onHome.call();
                    }
                    break;
            }
        }
    },

    cleanup:function()
    {
        _replayBtn.addTouchEventListener(null, null);
        _playBtn.addTouchEventListener(null, null);
        _homeBtn.addTouchEventListener(null, null);

        this._ui.node.cleanup();
        this._ui.node.removeFromParent(false);

        cc.eventManager.removeListener(this._resizeListener);


        this._super();
    }


}));