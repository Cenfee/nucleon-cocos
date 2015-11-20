/**
 * Created by Administrator on 2015/6/26.
 */
puremvc.declare("game.view.game.component.QuestionItem", cc.Node.extend({

    _textureMask:null,
    _textureSprite:null,
    _shapeObject:null,

    _clipObject:null,

    _data:null,

    ctor: function ()
    {
        this.AssetsManager = game.manager.asset.AssetManager;

        this._super();

    },

    cleanup:function()
    {
        this._data = null;
        this._super();
    },

    update:function(shape, bgColor, textureColor, texture)
    {
        if(!this._textureMask)
        {
            this._textureMask = new cc.Sprite(this.AssetsManager.getInstance().getAsset("res/ui/game/shape1/0.png"));
            this._textureSprite = new cc.Sprite(this.AssetsManager.getInstance().getAsset("res/ui/game/shape1/0.png"));
            this._shapeObject = new cc.Sprite(this.AssetsManager.getInstance().getAsset("res/ui/game/shape1/0.png"));
            this.addChild(this._shapeObject);

            this._clipObject = new cc.ClippingNode();
            this._clipObject.setStencil(this._textureMask);
            this._clipObject.setInverted(false);
            this._clipObject.setAlphaThreshold(0.9);
            this._clipObject.addChild(this._textureSprite);
            this.addChild(this._clipObject);
        }



        this._textureMask.setTexture(this.AssetsManager.getInstance().getAsset("res/ui/game/shape" + shape + "/0.png"));
        this._textureSprite.setTexture(this.AssetsManager.getInstance().getAsset("res/ui/game/shape" + shape + "/" + texture + ".png"));
        this._shapeObject.setTexture(this.AssetsManager.getInstance().getAsset("res/ui/game/shape" + shape + "/0.png"));

        this._textureSprite.setColor(textureColor);
        this._shapeObject.setColor(bgColor);
    }


}));