@echo off

rem -----------------------------
rem 客户端资源转换位图集工具脚本
rem @author wprehard@qq.com
rem -----------------------------

:: README:
:: 1、工具用于资源、纹理的生成及转换工具相关
:: 2、生成PNG位图集会存放在本地tmpPNG下
:: 注意:
:: 不同平台根据情况需要手动添加或修改参数

:: 创建分类目录


:: set TexturePacker="D:\green_soft\TexturePacker\bin\TexturePacker"
set TexturePacker="D:\Program Files (x86)\CodeAndWeb\TexturePacker\bin\TexturePacker"
set SDir=%~dp0assetsSource
set TDir=%~dp0assetsTarget

:fun_run
    set path=
    set /p path=请输入需要转换的目录(相对于assetsSource\ui目录,例如login\login):

    set convertSource=%SDir%\ui\%path% 
    set convertTarget=%TDir%\ui\%path%
    ::set targetName=null
    ::call :get_name %convertTarget% targetName
    ::set convertTarget=%convertTarget%\%targetName%

    if [%path%]==[] (call :fun_run) else (call :fun_createSpriteSheet %convertSource% %convertTarget%)
    goto fun_run

:get_name
    set "%~2=%~nx1" 
    goto :eof


rem 生成SpriteSheet
:fun_createSpriteSheet
    rem 创建目标所在目录
    md %~dp2
echo %1

call %TexturePacker%  --smart-update --format cocos2d --padding 2 --algorithm MaxRects --scale 1 --enable-swf-import --data %~dpn2.plist --sheet %~dpn2.png --opt RGBA8888 --border-padding 0 %1

    goto :eof

:end



::    if [%3]==[squared_border_RGBA8888] call %TexturePacker% --smart-update --format cocos2d --padding 2 --algorithm MaxRects --scale 1 --enable-swf-import --data %~dpn2.plist --sheet %~dpn2.png --opt RGBA8888 --border-padding 0 --force-squared %1
::    if [%3]==[border_RGBA8888] call %TexturePacker%  --smart-update --format cocos2d --padding 2 --algorithm MaxRects --scale 1 --enable-swf-import --data %~dpn2.plist --sheet %~dpn2.png --opt RGBA8888 --border-padding 0 %1
    
::    if [%3]==[RGBA8888] call %TexturePacker%  --smart-update --format cocos2d --padding 2 --algorithm MaxRects --scale 1 --enable-swf-import --data %~dpn2.plist --sheet %~dpn2.png --opt RGBA8888 %1
::    if [%3]==[border_RGB888] call %TexturePacker%  --smart-update --format cocos2d --padding 2 --algorithm MaxRects --scale 1 --enable-swf-import --data %~dpn2.plist --sheet %~dpn2.png --opt RGB888 --border-padding 0 %1

::“扩充”这个词汇来自于微软自己的翻译，意思就是对表示文件路径的字符串进行特殊的处理，具体功能罗列如下：
::　　=========================================
::　　~I - 删除任何引号(")，扩充 %I
::　　%~fI - 将 %I 扩充到一个完全合格的路径名
::　　%~dI - 仅将 %I 扩充到一个驱动器号
::　　%~pI - 仅将 %I 扩充到一个路径
::　　%~nI - 仅将 %I 扩充到一个文件名
::　　%~xI - 仅将 %I 扩充到一个文件扩展名
::　　%~sI - 扩充的路径只含有短名
::　　%~aI - 将 %I 扩充到文件的文件属性
::　　%~tI - 将 %I 扩充到文件的日期/时间
::　　%~zI - 将 %I 扩充到文件的大小
:: 　 %~$PATH:I - 查找列在路径环境变量的目录，并将 %I 扩充
::
::    可以组合修饰符来得到多重结果:
::　　%~dpI - 仅将 %I 扩充到一个驱动器号和路径
::　　%~nxI - 仅将 %I 扩充到一个文件名和扩展名
::　　%~fsI - 仅将 %I 扩充到一个带有短名的完整路径名
::　　%~dp$PATH:i - 查找列在路径环境变量的目录，并将 %I 扩充
::　　到找到的第一个驱动器号和路径。 
::　　%~ftzaI - 将 %I 扩充到类似输出线路的 DIR

::  文件: %1
::  文件名: %~nx1
::  文件名[不带扩展]: %~n1
::  扩展名: %~x1
