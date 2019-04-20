## markdown实现页面预览
### 启动命令
npm run start

### 目录查看

二级目录类似http://127.0.0.1:3000/pages/sss

三级目录类似 http://127.0.0.1:3000/pages/assff/gdds


### 实现
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