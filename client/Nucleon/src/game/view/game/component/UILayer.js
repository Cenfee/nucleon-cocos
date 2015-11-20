/**
 * Created by Administrator on 2015/6/26.
 */
puremvc.declare("game.view.game.component.UILayer", cc.Layer.extend({

    _ui:null,

    _resizeListener:null,


    pauseBtn:null,
    ctor: function ()
    {
        this.ResponsiveManager = game.manager.responsive.ResponsiveManager;
        this._super();


        this._ui = ccs.load("res/ui/game.json");
        this.addChild(this._ui.node);
        this.ResponsiveManager.getInstance().doCcsViewUiByVisible(this._ui);

        this.pauseBtn = this._ui.node.getChildByName("pause_btn");

        this.setCountDown(100, 100);
        this.setLevel(1);

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
        this._ui.node.cleanup();
        this._ui.node.removeFromParent(false);

        cc.eventManager.removeListener(this._resizeListener);


        this._super();
    },

    setCountDown:function(value, total)
    {
        var progress = this._ui.node.getChildByName("progress");
        progress.setPercent(value / total * 100);
    },
    setLevel:function(level)
    {
        var levelText = this._ui.node.getChildByName("level").getChildByName("text");
        levelText.setString(level);
    }



}));