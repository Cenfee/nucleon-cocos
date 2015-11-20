/**
 * Created by baoli on 2015/2/28.
 */
puremvc.declare("game.view.login.component.LoginView", cc.Layer.extend({

    _ui:null,
    _startBtnListener:null,
    _resizeListener:null,

    ctor: function ()
    {
        this.ResponsiveManager = game.manager.responsive.ResponsiveManager;
        this.LoginEvent = game.view.login.event.LoginEvent;
        this.GameProxy = game.model.game.GameProxy;

        this._super();



        this._ui = ccs.load("res/ui/login.json");
        this.addChild(this._ui.node);
        this.ResponsiveManager.getInstance().doCcsViewUiByVisible(this._ui);

        var self = this;
        var startBtn = this._ui.node.getChildByName("start_btn_panel").getChildByName("start_btn");
        startBtn.addTouchEventListener(startBtnHandler, this);

        var levelText = this._ui.node.getChildByName("level").getChildByName("text");
        levelText.setString(game.Application.getCoreFacade().retrieveProxy(this.GameProxy.NAME).getMaxLevel());


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


        function startBtnHandler(sender, type) {
            switch(type) {
                case ccui.Widget.TOUCH_BEGAN:

                    return true;
                case ccui.Widget.TOUCH_MOVED:

                    break;
                case ccui.Widget.TOUCH_ENDED:
                    cc.eventManager.dispatchCustomEvent(self.LoginEvent.START_GAME);
                    break;
            }
        }


       // game.manager.responsive.ResponsiveManager.getInstance().doCcsViewUiByVisible(loginUi);

        //var ui = ccs.load("res/ui/login_register.json");
       // ui.node.setPosition(100, 400);
        //this.addChild(ui.node);

       // var ui = ccs.load("res/ui/login_login.json");
        //loginUi.node.getChildByName("right_rs").addChild(ui.node);

        //game.manager.particle.ParticleManager.getInstance().playWidthUrl(game.manager.view.ViewConstants.LOGIN_VIEW, "res/particle/BurstPipe.plist", null, null, {x:800 *  Math.random(), y:600 *  Math.random(), isAutoRemoveOnFinish:true});
        //game.manager.animation.AnimationManager.getInstance().playSpineWidthUrlFromSpineUrl(game.manager.view.ViewConstants.LOGIN_VIEW, "res/animation/spineboy", null, {x:800 *  Math.random(), y:600 *  Math.random(), animation:"walk", isAutoRemoveOnFinish:true});

        //game.manager.socket.SocketManager.getInstance().connect();
    },

    cleanup:function()
    {
        var startBtn = this._ui.node.getChildByName("start_btn_panel").getChildByName("start_btn");
        startBtn.addTouchEventListener(null, null);

        this._ui.node.cleanup();
        this._ui.node.removeFromParent(false);

        cc.eventManager.removeListener(this._resizeListener);

        this._super();
    }

}));