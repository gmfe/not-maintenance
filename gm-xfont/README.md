# gmfont

------
新的图标库
demo: https://gmfe.github.io/gm-xfont/demo_fontclass.html

------

## 图标命名规范

为了给图标赋予语义化的命名,命名规则如下:

- 实心和描线图标保持同名. 用 `-o`来区分,比如 `ifont-question-circle-o`(描线) 和 `ifont-question-circle`(实心);
- 命名顺序: `ifont-[图标名]-[形状?]-[描线(o)?]`. (注: `?` 为可选,命名尽量简化);

## 关键轮廓线

根据不同的图标形状类型摆放在不同的轮廓线上,可以使图标之间保持一致的视觉效果.
轮廓线参考: https://ant.design/docs/spec/icon-cn#关键轮廓线


## gm-xfont发布流程
1.   在iconfont找到合适的icon, 添加到`购物车`
2.   将购物车的icon添加到项目(gm-xfont)
3.   在`gm-xfont`项目内调整icon命名,大小及其位置(具体请参考: [icon规范](https://github.com/gmfe/think/wiki/icon))
4.   @liangchaoming review
5.   review完毕,下载icon`zip`包至本地
6.   进入`gm-xfont`工程根目录并确保在`master`分支,执行以下命令发版

``` shell
gmfe icon_publish -d xxx(zip包路径)
```
> 发布npm包前，要登录gmfe账号(wiki/Account)，并切换到npm官方源


* 以上发布完毕,可以愉快的使用gm-xfont了
