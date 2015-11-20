/**
 * Created by baoli on 2015/2/15.
 */

puremvc.declare("game.manager.scene.SceneManager", cc.Class.extend({

    _currentSceneName:"",

    getRunningScene:function()
    {
        return cc.director.getRunningScene();
    },

    switchScene:function(name, onEnterCallback)
    {
        if(this._currentSceneName == name)
            return;

        if(this._currentSceneName && this.getRunningScene())
            game.manager.layer.LayerManager.getInstance().removeAllLayerWidthContainer(this.getRunningScene());

        this._currentSceneName = name;
        var newScene = new game.manager.scene.SceneBase();
        newScene.setCallbackEnter(onEnterCallback);
        cc.director.runScene(newScene);

        game.manager.layer.LayerManager.getInstance().addAllLayerWidthContainer(newScene);
    }



}));

game.manager.scene.SceneManager._instance;
game.manager.scene.SceneManager.getInstance = function()
{
    if(!game.manager.scene.SceneManager._instance)
    {
        game.manager.scene.SceneManager._instance = new game.manager.scene.SceneManager();
    }
    return game.manager.scene.SceneManager._instance;
}

