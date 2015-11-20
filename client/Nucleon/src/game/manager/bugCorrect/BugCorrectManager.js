/**
 * Created by baoli on 2015/3/14.
 */
/**
 * cocos2d 引擎纠正管理器，解决某些bug
 */
puremvc.declare("game.manager.bugCorrect.BugCorrectManager", cc.Class.extend({

    correct:function()
    {
        if(!cc.director.getScheduler().scheduleUpdate)
        {
            cc.director.getScheduler().scheduleUpdate = cc.director.getScheduler().scheduleUpdateForTarget;
        }

        if(!cc.director.getScheduler().unscheduleUpdate)
        {
            cc.director.getScheduler().scheduleUpdate = cc.director.getScheduler().unscheduleUpdateForTarget;
        }

        if(!cc.sys.localStorage.getItem)
        {
            cc.sys.localStorage = window.localStorage;
        }
    }

}));

game.manager.bugCorrect.BugCorrectManager._instance;
game.manager.bugCorrect.BugCorrectManager.getInstance = function()
{
    if(!game.manager.bugCorrect.BugCorrectManager._instance)
    {
        game.manager.bugCorrect.BugCorrectManager._instance = new game.manager.bugCorrect.BugCorrectManager();
    }
    return game.manager.bugCorrect.BugCorrectManager._instance;
}

//mainFileName 在web正常，在android下没有
cc.path.mainFileName = function(fileName)
{
    if(fileName){
        var idx = fileName.lastIndexOf(".");
        if(idx !== -1)
            return fileName.substring(0,idx);
    }
    return fileName;
}