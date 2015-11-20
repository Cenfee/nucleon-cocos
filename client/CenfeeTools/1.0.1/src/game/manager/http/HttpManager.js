/**
 * Created by baoli on 2015/3/6.
 */
puremvc.declare("game.manager.http.HttpManager", cc.Class.extend({


    request:function(data, url, onComplete, properties)
    {
        var type = properties["type"] ? properties["type"] : "POST";

        var self = this;
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open(type, url);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207))
            {
                cc.log("todo:HttpManager");
                cc.log("readyState",xhr.readyState, 1111111111);
                cc.log("status",xhr.status, 1111111111);
                cc.log("statusText",xhr.statusText, 1111111111);
                cc.log("responseText",xhr.responseText, 1111111111);
                //todo
                if(onComplete)
                    onComplete.call(self, responseText);
            }

        }
        var args = "";
        for(var dataKey in data)
        {
            if(args) args += "&";
            args = key + "=" + data[dataKey];
        }
        xhr.send(args);
    }


}));

game.manager.http.HttpManager.POST = "POST";
game.manager.http.HttpManager.GET = "GET";

game.manager.http.HttpManager._instance;
game.manager.http.HttpManager.getInstance = function()
{
    if(!game.manager.http.HttpManager._instance)
    {
        game.manager.http.HttpManager._instance = new game.manager.http.HttpManager();
    }
    return game.manager.http.HttpManager._instance;
}
