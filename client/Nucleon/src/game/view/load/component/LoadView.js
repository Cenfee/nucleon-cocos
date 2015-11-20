/**
 * Created by baoli on 2015/2/28.
 */
puremvc.declare("game.view.load.component.LoadView", cc.Layer.extend({

    _ui:null,
    _resizeListener:null,

    ctor: function ()
    {
        this.ResponsiveManager = game.manager.responsive.ResponsiveManager;
        this.AssetManager = game.manager.asset.AssetManager;
        this.AssetConstants = game.manager.asset.AssetConstants;
        this.LoadEvent = game.view.load.event.LoadEvent;

        this._super();

        this._ui = ccs.load("res/ui/load.json");
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
    },

    onEnter: function ()
    {
        this._super();


        this.AssetManager.getInstance().load(
            this.AssetConstants.globalAssets,
            function(progress)
            {

            },
            function()
            {
                cc.eventManager.dispatchCustomEvent(game.view.load.event.LoadEvent.COMLETE);
            }
        )
    }


}));