## 使用者

### node版本号
node采用8.16.0 可使用nvm进行版本号控制[nvm安装路径](https://github.com/nvm-sh/nvm)
#### supervisor安装
npm install supervisor -g
### 启动命令
npm run start

### 入口页面
http://127.0.0.1:3000/pages/index.md

### 添加文件
在mdsource文件夹下进行md文件的添加 ， 然后在 _aside.md中添加链接



## 开发者
### markdown实现页面预览
#### 启动命令
npm run start

#### 目录查看

二级目录类似http://127.0.0.1:3000/pages/sss

三级目录类似 http://127.0.0.1:3000/pages/assff/gdds


#### 实现
采用markdown-it实现md的转换工作
koa-views实现模板语法  基于ejs

```ejs
<% %>       //普通流程标签
<%= %>     //输出转义后的HTML标签。例如<div>Hello</div>输出后会变成<div>Hello</div>
<%- %>      //输出不转义的HTML标签
<%# %>     //注释标签，不会被执行，也不会被输出
-%>           //去掉后面的换行符
```

安装supervisor实现node文件改变时的监听
koa-static用来解析静态文件


### 注意
导航部分的ID区域采用手工处理， 目前只有展示，如果每一次遍历其对应的自md文件然后执行插入动作从性能上来说并不可取。  此部分可通过保存子文件重新生成新的aside文件来进行优化

关于导航锚点手动添加问题，可以写一个js方法收集页面中的h元素标签，转化为规范格式添加到导航锚点处。

#### markdown-itm api地址
[api](https://markdown-it.github.io/markdown-it/)