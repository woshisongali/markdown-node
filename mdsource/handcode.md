### 手写code 

#### throttle
throttle对应的动作是每隔一段时间执行一次
```js
export const throttle = (func, wait, options) => {
  let context, args, result
  let timeout = null
  let previous = 0
  if (!options) options = {}

  const later = function() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }

  return function() {
    let now = Date.now()
    if (!previous && options.leading === false) previous = now
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}
```

#### debounce

如果用手指一直按住一个弹簧，它将不会弹起直到你松手为止。
 也就是说当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间。
 ```js
 export const debounce = (func, wait, immediate) => {
    let timeout, result, context, args

    const later = function() {
      timeout = null
      if (args) result = func.apply(context, args)
      if (!timeout) context = args = null
    }

    const debounced = () => {
      args = arguments
      context = this
      if (timeout) clearTimeout(timeout)
      if (immediate) {
        let callNow = !timeout
        timeout = setTimeout(later, wait)
        if (callNow) result = func.apply(constext, args)
      } else {
        timeout = setTimeout(later, wait)
      }
      return result
    }

    debounced.cancel = function() {
      clearTimeout(timeout)
      timeout = null
    }
    return debounced
}
 ```

 #### 实现object.createpollyfill

Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 
 ```js
 if (typeof Object.create !== "function") {
    Object.create = function (proto, propertiesObject) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object: ' + proto);
        } else if (proto === null) {
            throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
        }

        if (typeof propertiesObject != 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

        function F() {}
        F.prototype = proto;

        return new F();
    };
}
 ```

 #### 实现repeat

 使用javascript编写一个实现字符串重复的repeat函数

方法一
 ```js
 function repeat(src, n) {
    return (new Array(n + 1)).join(src);
}
 ```

 方法二
 ```js
 function repeat(src, n) {
    var s = src, total = "";
    while (n > 0) {
        if (n % 2 == 1) {
            total += s;
        }
        if (n == 1) {
            break;
        }
        s += s;
        n = n/2;
    }
    return total;
}
 ```

 #### js实现随机数组

 例如：实现随机选取10–100之间的10个数字，存入一个数组，并排序
 如下 getRandom方法即为实现某一区间段随机数组
 ```js
 function sortNumber(a,b){
   return a-b;//升序
   //return b-a;//降序
  }
  
  //js实现随机选取10–100之间的10个数字，存入一个数组，并排序
  var iArray =[];
  function getRandom(iStart,iEnd){
   var iChoice = iStart-iEnd+1;
   return Math.abs(Math.floor(Math.random()*iChoice))+iStart;
  }
  for(var i=0;i<10;i++){
   iArray.push(getRandom(10,100))
  }
  iArray.sort(sortNumber);
  console.log(iArray)
 ```

 #### 优惠金额算法的实现

优惠金额规则可采用 `rules = [{price: 10, discount: 2}...]`的规则
思路是找到当前金额的下一个位置 计算当前优惠
 ```js
 function discount (rules, money) {
      let sortRules = rules.sort(function (a, b) {return a.price - b.price})
      let i = 0
      let len = sortRules.length
      while ((i <  len) && (money >= sortRules[i].price)) {
        i++
      }
      if (i > 0) {
        return money - rules[i-1].discount
      } else {
        return money
      }
    }
    let rules = [
      {price: 10, discount: 2},
      {price: 15, discount: 3},
      {price: 20, discount: 5}
    ]
    console.log(discount(rules, 9))
    console.log(discount(rules, 13))
    console.log(discount(rules, 21))
 ```