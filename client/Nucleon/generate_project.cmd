@echo off

setlocal enabledelayedexpansion

:: set folderPath=%1
set folderPath=src

if [%folderPath%]==[] set /p folderPath=������Ŀ���ļ���:

if [%folderPath%]==[] set folderPath=src

set result=
for /r %folderPath% %%i in (*.*) do (
	set file=%%i
	set file=!file:%~dp0=!


            if [!result!]==[] (

                set "result="!file!""

            ) else (

                if "!file:src\lib=!" == "!file!" (
                    set "result=!result!, "!file!""
                ) else (
                    set "result="!file!", !result!"
                )

            )

) 
set result=%result:\=/%

set /p=���project.json�ļ�...<nul
        >project.json (
echo {
echo     "project_type": "javascript",
echo     "debugMode" : 1,
echo     "showFPS" : true,
echo     "frameRate" : 60,
echo     "id" : "gameCanvas",
echo     "renderMode" : 0,
echo     "engineDir":"frameworks/cocos2d-html5",
echo     "modules" : ["cocos2d", "extensions", "external"],
echo     "jsList" : [
echo      %result%
echo     ]
echo }
            
            )
        echo "���project.json���"

:: pause
