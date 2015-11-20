/**
 * 游戏的所有视图在这里标明
 */
puremvc.define({ name: "game.manager.util.MathUtil"}, {}, {

    getRandomNoOne:function(min, max, noOne)
    {
        var target = noOne;

        while(target == noOne)
        {
            target = parseInt(min + ( max - min + 1) * Math.random());
        }

        return target;
    }
});