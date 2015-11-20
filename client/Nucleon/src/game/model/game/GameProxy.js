/**
 * @author Mike Britton, Cliff Hall
 *
 * @class TodoProxy
 * @link https://github.com/PureMVC/puremvc-js-demo-todomvc.git
 *
 */
puremvc.define({
        name: 'game.model.game.GameProxy',
        parent: puremvc.Proxy
    },

	// INSTANCE MEMBERS
	{
        _data:null,

        updateFromStorage:function(onComplete)
        {
            var self = this;
            game.manager.data.DataManager.getInstance().readObject("res/data/game.json", function(object)
            {
                if(object)
                    self._data = object;
                else
                    self._data = {curLevel:0, maxLevel:0};

                if(onComplete) onComplete();
            });
        },
        updateToStorage:function(onComplete)
        {
            game.manager.data.DataManager.getInstance().writeObject(this._data, "res/data/game.json", onComplete);
        },

        setCurLevel:function(value)
        {
            this._data["curLevel"] = value;
            if(value > this.getMaxLevel())
            {
                this.setMaxLevel(value);
            }
        },
        getCurLevel:function()
        {
            return this._data["curLevel"];
        },
        setMaxLevel:function(value)
        {
            this._data["maxLevel"] = value;
        },
        getMaxLevel:function()
        {
            return this._data["maxLevel"];
        }
	},

	// CLASS MEMBERS
	{
		NAME: 'GameProxy'
	}
);
