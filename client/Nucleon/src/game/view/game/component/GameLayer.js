/**
 * Created by Administrator on 2015/6/26.
 */
puremvc.declare("game.view.game.component.GameLayer", cc.Layer.extend({

    onTimeup:null,
    onTimeupThis:null,
    onTimeCounter:null,
    onTimeCounterThis:null,
    onUpLevel:null,
    onUpLevelThis:null,

    _timeCounter:0,
    _timeTotal:0,

    _level:0,
    _levelConfig:null,

    _questionPanel:null,
    _answerData:null,

    _answerItem:null,

    ctor: function ()
    {
        this.QuestionPanel = game.view.game.component.QuestionPanel;
        this.ConfigManager = game.manager.config.ConfigManager;
        this.MathUtil = game.manager.util.MathUtil;
        this.QuestionItem = game.view.game.component.QuestionItem;

        this._super();


        this._questionPanel = new this.QuestionPanel;
        this._questionPanel.setPosition(855, 200);
        this._questionPanel.onItemSelect = this.itemSelectHandler;
        this._questionPanel.onItemSelectThis = this;
        this.addChild(this._questionPanel);

        this._answerItem = new this.QuestionItem();
        this._answerItem.x = 300;
        this._answerItem.y = 300;
        this.addChild(this._answerItem);

        this.startLevel();
    },

    cleanup:function()
    {

        this.onTimeup = null;
        this.onTimeupThis = null;
        this.onTimeCounter = null;
        this.onTimeCounterThis = null;
        this.onUpLevel = null;
        this.onUpLevelThis = null;

        this._questionPanel.onItemSelect = null;
        this._questionPanel.onItemSelectThis = null;
        this._questionPanel.cleanup();
        this._questionPanel.removeFromParent(false);

        this._answerItem.cleanup();
        this._answerItem.removeFromParent(false);

        this.pause();

        this._super();
    },


    update:function(delteTime)
    {
        if(this.onTimeCounter)
        {
            this.onTimeCounter.call(this.onTimeCounterThis, this._timeCounter, this._timeTotal);
        }

        this._timeCounter -= delteTime;
        if(this._timeCounter <= 0)
        {
            this._timeCounter = 0;
            if(this.onTimeup)
            {
                this.pause();
                this.onTimeup.call(this.onTimeupThis, this._level);
            }
        }
    },

    startLevel:function()
    {
        this._timeTotal = this.ConfigManager.getInstance().totalTime;
        this._timeCounter = this._timeTotal;
        this._level = 0;

        cc.director.getScheduler().scheduleUpdate(this);

        this.newLevel();
    },

    newLevel:function()
    {
        ++this._level;

        this.resume();

        //超过最大关卡，读取最后一关数据
        var newLevelConfig = this.ConfigManager.getInstance().getLevelConfigManager().getConfigByLevel(this._level);
        _levelConfig = newLevelConfig ? newLevelConfig : _levelConfig;

        //获取配置数据
        var shapeArr = _levelConfig.shape.toString().split(",");
        var colorArr = _levelConfig.color.toString().split(",");
        var textureArr = _levelConfig.texture.toString().split(",");

        var quantityMin = _levelConfig.quantity_min;
        var quantityMax = _levelConfig.quantity_max;
        var itemCount = quantityMin + (quantityMax - quantityMin + 1) * Math.random();

        //生成本关卡的选择子项的数据
        var itemsData = [];
        for(var itemIndex = 0; itemIndex < itemCount; ++itemIndex)
        {
            var itemData;

            itemData = this.getItemData(itemIndex, shapeArr, colorArr, textureArr, itemsData);

            itemsData.push(itemData);
        }

        //生成答案子项数据
        this._answerData = itemsData[parseInt(itemsData.length * Math.random())];

        this._questionPanel.update(itemsData);

        this._answerItem.data = this._answerData;
        this._answerItem.update(this._answerData.shape, this._answerData.bgColor, this._answerData.textureColor, this._answerData.texture);

        if(this.onUpLevel)
            this.onUpLevel.call(this.onUpLevelThis, this._level);
    },

    itemSelectHandler:function(item)
    {
        var itemData = item.data;

        if(itemData["index"] == this._answerData["index"])
        {
            this.newLevel();
        }
    },

    resume:function()
    {
        cc.director.getScheduler().scheduleUpdate(this);
    },

    pause:function()
    {
        cc.director.getScheduler().unscheduleUpdate(this);
    },

    getItemData:function(index, shapeArr, colorArr, textureArr, itemsData)
    {
        var shape = shapeArr[parseInt(shapeArr.length * Math.random())];

        var bgColorIndex = parseInt(colorArr.length * Math.random());
        var bgColor = this.ConfigManager.getInstance().colors[colorArr[bgColorIndex]];
        var textureColorIndex = this.MathUtil.getRandomNoOne(0, colorArr.length - 1, bgColorIndex);
        var textureColor = this.ConfigManager.getInstance().colors[colorArr[textureColorIndex]];
        var texture = textureArr[parseInt(textureArr.length * Math.random())];

        var itemData = {
            index:index,
            shape:shape,
            bgColor:cc.color(bgColor),
            bgColorOriginal:bgColor,
            textureColor:cc.color(textureColor),
            textureColorOriginal:textureColor,
            texture:texture};

        if(this.checkItemInItemArr(itemData, itemsData))
            return this.getItemData(index, shapeArr, colorArr, textureArr, itemsData);
        else
            return itemData;
    },
    checkItemInItemArr:function(itemData, itemsData)
    {
        if(!itemData)
            return true;

        for(var itemIndex = 0; itemIndex < itemsData.length; ++itemIndex)
        {
            var tempItemData = itemsData[itemIndex];

            if(
                tempItemData.shape == itemData.shape &&
                tempItemData.bgColorOriginal == itemData.bgColorOriginal &&
                tempItemData.textureColorOriginal == itemData.textureColorOriginal &&
                tempItemData.texture == itemData.texture

            )
            {
                return true;
            }
        }
        return false;
    }


}));