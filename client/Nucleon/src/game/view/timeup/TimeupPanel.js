/**
 * Created by baoli on 2015/2/28.
 */
puremvc.declare("game.view.timeup.TimeupView", cc.Layer.extend({

    _ui:null,
    _resizeListener:null,

    ctor: function ()
    {
        this.ResponsiveManager = game.manager.responsive.ResponsiveManager;
        this.LoginEvent = game.view.login.event.LoginEvent;



        this._super();



        this._ui = ccs.load("res/ui/timeup.json");
        this.addChild(this._ui.node);
        this.ResponsiveManager.getInstance().doCcsViewUiByVisible(this._ui);

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
    }


}));