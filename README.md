# vitepress-siderbar-generator

## introduction

Tool for generate vitepress sidebar config

![image-20220717133933116](http://imgbed-xia-2.oss-cn-hangzhou.aliyuncs.com/img/2022/07/17/20220717-133934.png)

## how to use

```
npm i -g vitepress-siderbar-generator

vsg -d exampleDirectory # give any directory within mds
```

## result

```
The sidebar config will be generatored. like below:


PS X:\script\vitepress-siderbar-generator> vsg -d demo
options { dir: 'demo' }
files :>>  [ 'about', 'index', 'index.md' ]
base[items] :>>  { text: 'about', collapsible: true, items: [] }
base[items] :>>  { text: 'index', collapsible: true, items: [] }
It has copy to clipboard :>>  {"sidebar":{"/demo/":[{"text":"about","collapsible":true,"items":[{"text":"about1","link":"/demo/about/about1"},{"text":"about2","link":"/demo/about/about2"}]},{"text":"index","collapsible":true,"items":[{"text":"index1","link":"/demo/index/index1"},{"text":"index2","link":"/demo/index/index2"}]}]}}
```