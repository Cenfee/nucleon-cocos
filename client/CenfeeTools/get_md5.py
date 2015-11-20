#-*- coding: GBK -*-   

import os
import hashlib
import shutil
import json
import sys

def walk(data, path, pathFilter):
    folder = os.listdir(path) # get what we have in the dir.
    for file in folder:
        if os.path.isdir(os.path.join(path, file)): # if is a dir.
            walk(data, os.path.join(path,file), pathFilter)
        else: # if is a file
            fileOperate = open(os.path.join(path, file)) #open file. There is a big problem here. That is when you get a large file.
            fileContent = fileOperate.read() # get file content.
            md5 = hashlib.md5() # create a md5 object
            md5.update(fileContent) #encrypt the file

            filePath = os.path.join(path, file)
            filePath = filePath.replace(pathFilter, "")
            filePath = filePath.replace("\\", "/");
            data[filePath] = {"md5":str(md5.hexdigest())}
            
            fileOperate.close() #close file

def generateMd5File(projectPath, versionPath, fileName):
    shutil.copytree(projectPath+"/"+fileName, versionPath+"/"+fileName)
    data = {}
    walk(data, projectPath+"/"+fileName, projectPath+"/")

    f = open(versionPath+"/" + fileName + "_ver.dat","w")
    f.write(json.dumps(data))
    f.close()

def start(projectPath, versionNumber, targetPath):
    if not projectPath.strip():
        projectPath = raw_input("请指定项目路径：")
    if not projectPath.strip():
        projectPath = "E:/work/cocos/com.cenfee.2dx.jsgame/MyGame"

    if not versionNumber.strip():
        versionNumber = raw_input("请指定版本号(例如1.0.0)：")
    if not versionNumber.strip():
        versionNumber = "1.0.0"

    if not targetPath.strip():
        targetPath = raw_input("请指定目标目录：")
    if not targetPath.strip():
        targetPath = os.getcwd();

    if os.path.exists(versionNumber):
        shutil.rmtree(versionNumber)
    #os.mkdir(versionNumber)

    versionPath = targetPath+"/"+versionNumber

    generateMd5File(projectPath, versionPath, "src");
    generateMd5File(projectPath, versionPath, "res");

if __name__ == "__main__":
    start(sys.argv[1] if len(sys.argv)>1 else "",
          sys.argv[2] if len(sys.argv)>2 else "",
          sys.argv[3] if len(sys.argv)>3 else "")
    

