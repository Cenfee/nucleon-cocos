#-*- coding: GBK -*-   

import json
import sys
import os
import shutil

def check(oldPath, newPath, targetPath, fileName):
        
    resVerFile = open(newPath + "/" + fileName + "_ver.dat")
    resVerStr = resVerFile.read()
    resVerFile.close()
    resVerObject = json.loads(resVerStr)

    oldResVerFile = open(oldPath + "/" + fileName + "_ver.dat")
    oldResVerStr = oldResVerFile.read()
    oldResVerFile.close()
    oldResVerObject = json.loads(oldResVerStr)
    
    for resKey in resVerObject:
        resMd5Key = resVerObject[resKey]["md5"]
        if not resKey in oldResVerObject or oldResVerObject[resKey]["md5"] != resMd5Key:
            sourceFilePath = os.path.join(newPath, resKey)
            targetFilePath = os.path.join(targetPath + "/new", resKey)

            targetFileDirPath = targetFilePath[0:targetFilePath.rindex("/")]
            if not os.path.exists(targetFileDirPath):
                os.makedirs(targetFileDirPath)
            shutil.copyfile(sourceFilePath, targetFilePath)
        
        
    

def start(oldPath, newPath, targetPath):
    if not oldPath.strip():
        oldPath = raw_input("请指定旧项目路径：")
    if not oldPath.strip():
        oldPath = "E:/work/cocos/com.cenfee.2dx.jsgame/cenfee_tools/1.0.0"

    if not newPath.strip():
        newPath = raw_input("请指定新项目路径：")
    if not newPath.strip():
        newPath = "E:/work/cocos/com.cenfee.2dx.jsgame/cenfee_tools/1.0.1"

    if not targetPath.strip():
        targetPath = raw_input("请指定新资源放置目录：")
    if not targetPath.strip():
        targetPath = "E:/work/cocos/com.cenfee.2dx.jsgame/cenfee_tools/1.0.1"


    if os.path.exists(targetPath + "/new"):
        shutil.rmtree(targetPath + "/new")

    os.mkdir(targetPath + "/new")
        
    check(oldPath, newPath, targetPath, "res")
    check(oldPath, newPath, targetPath, "src")

if __name__ == "__main__":
    start(sys.argv[1] if len(sys.argv)>1 else "",
          sys.argv[2] if len(sys.argv)>2 else "",
          sys.argv[3] if len(sys.argv)>3 else "")
    

