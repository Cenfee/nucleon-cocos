/**
 * Created by baoli on 2015/2/26.
 */
puremvc.declare("game.manager.scene.SceneBase", cc.Scene.extend({
    _callbackEnter:null,
    _targetEnter:null,

    setCallbackEnter:function(callback, target)
    {
        this._callbackEnter = callback;
        this._target = target;
    },

    cleanup: function ()
    {
        this._super();
        this._callbackEnter = null;
        this._targetEnter = null;
    },

    onEnter:function ()
    {
        this._super();

        if(this._callbackEnter)
        {
           if(this._target) this._callbackEnter.call(this._target);
           else               this._callbackEnter.call(this);
        }
    }

}));