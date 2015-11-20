/**
 * Created by baoli on 2015/2/28.
 */
game
puremvc.declare("game.view.login.component.LoginView", cc.Layer.extend({

    ctor: function () {
        this._super();


        var ui = ccs.load("res/login.json");
        this.addChild(ui.node);

        //game.manager.responsive.ResponsiveManager.getInstance().doCcsViewUiByVisible(ui);

        game.manager.particle.ParticleManager.getInstance().playWidthUrl("res/particle/BurstPipe.plist", true, null, {x:800 *  Math.random(), y:600 *  Math.random()});
        game.manager.animation.AnimationManager.getInstance().playSpineWidthUrlFromSpineUrl("res/animation/spineboy", null, {x:800 *  Math.random(), y:600 *  Math.random(), animation:"walk"});


        //game.manager.socket.SocketManager.getInstance().connect();
    },

    onEnter: function () {
        this._super();
        cc.log("game.view.login.component.LoginView.onEnter");
    }


}));