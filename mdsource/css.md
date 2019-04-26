### css样式的一些问题

#### 垂直居中
1. 组合使用display：table-cell和vertical-align、text-align，使父元素内的所有行内元素水平垂直居中
，内部div设置display：inline-block即可
```css
.father{
  width:400px; 
  height:200px; 
  border:1px solid #000;
  display:table-cell; 
  text-align:center;
  vertical-align:middle;
}
  .son{
    width:200px; 
    height:100px; 
    background:red;
    display:inline-block;
  }
```
```html
<div class="father">
    <div class="son">
       display:table-cell;</br>text-align:center;</br> vertical-align:middle
    </div>
</div>
```
2. 第二种方法：display：flex-box <br>
align-items:center;justify-content:center;

```css
.father{width:400px; height:200px; border:1px solid #000;
display:flex; align-items:center;justify-content:center;}
        .son{width:200px; height:100px; background:red;}
```
```html
<div class="father">
        <div class="son">
            display:flex;</br>align-items:center;</br> justify-content:center;
        </div>
    </div>
```

3. 第三种方法：display:inline-block +伪元素生成content内容
原理：利用inline-block的vertical-align: middle去对齐before伪元素，before伪元素的高度与父对象一样，就实现了高度方向的对齐
```css
.father{width:400px; height:200px; border:1px solid #000;text-align:center;}
.father:before{content:".";display:inline-block; vertical-align:middle; height:100%;}
.son{width:200px; height:100px; background:red;display:inline-block; vertical-align:middle;}
```
```html
<div class="father">
        <div class="son">
            display:inline-block;</br>伪元素生成content内容</br>
        </div>
    </div>
```

4. 第四种方法：绝对定位+transform反向偏移。position:absolute; transform:translate(-50%,-50%);

```css
.father{width:400px; height:200px; border:1px solid #000;position:relative;}

.son{width:200px; height:100px; background:red;position:absolute; 
        left:50%; top:50%;transform:translate(-50%,-50%);}
```

5.第五种方法：绝对定位
*已知宽度和高度的水平垂直居中*
绝对定位+margin：auto（position:absolute; left:0; top:0; right:0; bottom:0; margin:auto）都要写哦，缺一不可滴

```css
.father{width:400px; height:200px; position:relative; border:1px solid #000;}
.son{width:200px; height:100px; background:red; position:absolute; left:0; 
top:0;bottom:0; right:0; margin:auto;}
```
```html
<div class="father">
    <div class="son">
        position:absolute;</br> left:0; top:0;</br> right:0; bottom:0; </br>margin:auto
    </div>
</div>
```
6. 第六种方法：绝对定位+margin反向偏移
```css
.father{width:400px; height:200px; position:relative; border:1px solid #000;}
.son{width:200px; height:100px; background:red; position:absolute; 
        left:50%; top:50%;  margin-left:-100px; margin-top:-50px;}
```
```html
<div class="father">
    <div class="son">
        position:absolute;</br>  left:50%; top:50%;</br>margin-left/top
    </div>
</div>
```

#### 关于BFC
1. 什么是BFC<br>
BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-level Box如何布局，并且与这个区域外部毫不相干。

2. BFC布局规则：
   * 内部的Box会在垂直方向，一个接一个地放置。
   * Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
   * BFC的区域不会与float box重叠。
   * BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
   * 计算BFC的高度时，浮动元素也参与计算

3. 哪些元素会生成BFC?
   * 根元素float属性不为none
   * position为absolute或fixed
   * display为inline-block, table-cell, table-caption, flex, inline-flex
   * overflow不为visible

4. BFC作用
   * 自适应两栏布局
   * 清除内部浮动
   * 防止垂直 margin 重叠

### css3多行布局
```css
.tow-ellipsis {
  font-size: 12px;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height:50px;
}
``` 

#### 三列布局方案
老大你来填充吧

#### 动画问题

#### rem和em的区别 