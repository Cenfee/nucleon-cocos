@echo off

rem -----------------------------
rem �ͻ�����Դת��λͼ�����߽ű�
rem @author wprehard@qq.com
rem -----------------------------

:: README:
:: 1������������Դ����������ɼ�ת���������
:: 2������PNGλͼ�������ڱ���tmpPNG��
:: ע��:
:: ��ͬƽ̨���������Ҫ�ֶ���ӻ��޸Ĳ���

:: ��������Ŀ¼


:: set TexturePacker="D:\green_soft\TexturePacker\bin\TexturePacker"
set TexturePacker="D:\Program Files (x86)\CodeAndWeb\TexturePacker\bin\TexturePacker"
set SDir=%~dp0assetsSource
set TDir=%~dp0assetsTarget

:fun_run
    set path=
    set /p path=��������Ҫת����Ŀ¼(�����assetsSource\uiĿ¼,����login\login):

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


rem ����SpriteSheet
:fun_createSpriteSheet
    rem ����Ŀ������Ŀ¼
    md %~dp2
echo %1

call %TexturePacker%  --smart-update --format cocos2d --padding 2 --algorithm MaxRects --scale 1 --enable-swf-import --data %~dpn2.plist --sheet %~dpn2.png --opt RGBA8888 --border-padding 0 %1

    goto :eof

:end



::    if [%3]==[squared_border_RGBA8888] call %TexturePacker% --smart-update --format cocos2d --padding 2 --algorithm MaxRects --scale 1 --enable-swf-import --data %~dpn2.plist --sheet %~dpn2.png --opt RGBA8888 --border-padding 0 --force-squared %1
::    if [%3]==[border_RGBA8888] call %TexturePacker%  --smart-update --format cocos2d --padding 2 --algorithm MaxRects --scale 1 --enable-swf-import --data %~dpn2.plist --sheet %~dpn2.png --opt RGBA8888 --border-padding 0 %1
    
::    if [%3]==[RGBA8888] call %TexturePacker%  --smart-update --format cocos2d --padding 2 --algorithm MaxRects --scale 1 --enable-swf-import --data %~dpn2.plist --sheet %~dpn2.png --opt RGBA8888 %1
::    if [%3]==[border_RGB888] call %TexturePacker%  --smart-update --format cocos2d --padding 2 --algorithm MaxRects --scale 1 --enable-swf-import --data %~dpn2.plist --sheet %~dpn2.png --opt RGB888 --border-padding 0 %1

::�����䡱����ʻ�������΢���Լ��ķ��룬��˼���ǶԱ�ʾ�ļ�·�����ַ�����������Ĵ������幦���������£�
::����=========================================
::����~I - ɾ���κ�����(")������ %I
::����%~fI - �� %I ���䵽һ����ȫ�ϸ��·����
::����%~dI - ���� %I ���䵽һ����������
::����%~pI - ���� %I ���䵽һ��·��
::����%~nI - ���� %I ���䵽һ���ļ���
::����%~xI - ���� %I ���䵽һ���ļ���չ��
::����%~sI - �����·��ֻ���ж���
::����%~aI - �� %I ���䵽�ļ����ļ�����
::����%~tI - �� %I ���䵽�ļ�������/ʱ��
::����%~zI - �� %I ���䵽�ļ��Ĵ�С
:: �� %~$PATH:I - ��������·������������Ŀ¼������ %I ����
::
::    ����������η����õ����ؽ��:
::����%~dpI - ���� %I ���䵽һ���������ź�·��
::����%~nxI - ���� %I ���䵽һ���ļ�������չ��
::����%~fsI - ���� %I ���䵽һ�����ж���������·����
::����%~dp$PATH:i - ��������·������������Ŀ¼������ %I ����
::�������ҵ��ĵ�һ���������ź�·���� 
::����%~ftzaI - �� %I ���䵽���������·�� DIR

::  �ļ�: %1
::  �ļ���: %~nx1
::  �ļ���[������չ]: %~n1
::  ��չ��: %~x1
