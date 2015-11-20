/**
 * Created by Administrator on 2015/6/26.
 */
puremvc.declare("game.view.game.component.QuestionPanel", cc.Node.extend({

    onItemSelectThis:null,
    onItemSelect:null,

    _items:[],
    _itemsLayoutContainer:null,

    _itemListeners:[],


    ctor: function ()
    {
        this.CocosFunction = game.manager.extend.CocosFunction;
        this.QuestionItem = game.view.game.component.QuestionItem;
        this._super();


    },

    cleanup:function()
    {
        var itemIndex=0;
        for(itemIndex = 0; itemIndex < this._items.length; ++itemIndex)
        {
            var item = this._items[itemIndex];
            cc.eventManager.removeListener(this._itemListeners[itemIndex]);

            item.cleanup();
            if(item.getParent())
            {
                item.removeFromParent(false);
            }

            item.release();
        }
        this._items.length = 0;
        this._itemListeners.length = 0;

        this._itemsLayoutContainer.cleanup();
        this._itemsLayoutContainer.removeFromParent(false);


        this.onItemSelectThis = null;
        this.onItemSelect = null;



        this._super();
    },

    update:function(data)
    {
        var itemCount = data.length;

        if(!this._itemsLayoutContainer)
        {
            this._itemsLayoutContainer = new cc.Sprite();
            this.addChild(this._itemsLayoutContainer);
        }

        this._itemsLayoutContainer.setScale(1, 1);

        var itemIndex = 0;
        for(itemIndex = 0; itemIndex < this._items.length; ++itemIndex)
        {
            if(this._items[itemIndex].getParent())
            {
                this._itemsLayoutContainer.removeChild(this._items[itemIndex], false);
            }
        }

        for(itemIndex = 0; itemIndex < itemCount; ++itemIndex)
        {
            var item;

            if(this._items.length <= itemIndex)
            {
                item = new this.QuestionItem();
                this._itemListeners[itemIndex] = cc.eventManager.addListener(
                    this.CocosFunction.createSpriteTouchListener(null, null, this.itemHandler, {onItemSelect:this.onItemSelect, onItemSelectThis:this.onItemSelectThis})
                    , item);

                item.retain();
                this._items.push(item);
            }
            else
            {
                item = this._items[itemIndex];
            }

            var row = parseInt(itemIndex / 3);
            var col = parseInt(itemIndex - row * 3);
            item.setPosition(col * 180, -row * (180 + 10));
            this._itemsLayoutContainer.addChild(item);

            var itemData = data[itemIndex];
            item.update(itemData.shape, itemData.bgColor, itemData.textureColor, itemData.texture);
            item.data = itemData;
        }

        var itemsSize = this._itemsLayoutContainer.getBoundingBoxToWorld();
        if(itemsSize.height > 530)
        {
            this._itemsLayoutContainer.setScale(530 / itemsSize.height);
        }

        var itemsSize = this._itemsLayoutContainer.getBoundingBoxToWorld();
        this._itemsLayoutContainer.x = -itemsSize.width * 0.5;
        this._itemsLayoutContainer.y = itemsSize.height * 0.5;

    },

    itemHandler:function(touches, event)
    {
        var item = event.getCurrentTarget();

        if(this.data["onItemSelect"])
            this.data["onItemSelect"].call(this.data["onItemSelectThis"], item);
    }


}));

