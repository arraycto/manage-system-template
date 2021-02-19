#! /bin/sh

curPath=$(cd "$(dirname "$0")"; pwd)
cd "${curPath}"

# 当前分支
curBranch=$(git symbolic-ref --short -q HEAD)

# Pull master
echo "start PULL master..."
git pull origin $curBranch
if [ $? -eq 0 ]; then
    echo "PULL master OK!"
else
    echo "[ERROR]PULL master FAILED!"
    exit 0
fi

# 打包
echo "start BUILD release..."
rm -rf dist
npm run build
if [ $? -eq 0 ]; then
    echo "WEBPACK BUILD release OK!"
else
    echo "[ERROR]WEBPACK BUILD release FAILED!"
    exit 0
fi

# 更新 server 代码
echo "start to update SERVER code..."
# serverPath=~/work/project/data_manager_admin
serverPath=~/rong/git/suzhou/data_manager_admin
# serverPath=~/Documents/work/project_all/webDataPlatformBack
# serverPath=~/rong/git/data_manager_admin
# serverPath=/Users/liuxiaoying/Desktop/tianji_projects/data_manager_admin

git pull
if [ $? -eq 0 ]; then
    echo "update SERVER CODE OK!"
else
    echo "[ERROR]update SERVER CODE FAILED!"
fi

# 拷贝文件至 server 目录
echo "start to move package fe..."
cp -r dist/assets/ $serverPath/data-manager-admin/src/main/resources/static/assets/
cp -r dist/favicon.ico $serverPath/data-manager-admin/src/main/resources/static
cp -r dist/login.png $serverPath/data-manager-admin/src/main/resources/static
cp -r dist/tips.png $serverPath/data-manager-admin/src/main/resources/static
cp -r dist/uploadAnalysis.png $serverPath/data-manager-admin/src/main/resources/static
cp -r dist/index.html $serverPath/data-manager-admin/src/main/resources/static/entry/

if [ $? -eq 0 ]; then
    echo "done"
else
    echo "ERROR"
fi
