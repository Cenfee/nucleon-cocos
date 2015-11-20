/**
 * Created by Administrator on 2015/7/3.
 */
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();



        var Test = cc.Node.extend({

            cleanup:function()
            {
                cc.log("cleanup")
            },
            onExit:function()
            {
                cc.log("onExit")
            }
        });

        var test = new Test();
        scene.addChild(test);
        scene.removeChild(test, true);
    }
});
var scene = new HelloWorldScene();
cc.director.runScene(scene);


for(var key in cc.loader.cache)
{
    cc.log("cc.loader"+key);
}
for(var key in cc.textureCache._textures)
{
    cc.log("cc.textureCache"+key);
}


        cc.director.getScheduler().schedule(function()
            {
                cc.eventManager.dispatchCustomEvent(game.view.game.event.GameEvent.REPLAY);
            },
            this, 0.5, true, 0, false, "test");



        cc.director.getScheduler().unschedule("test",this );