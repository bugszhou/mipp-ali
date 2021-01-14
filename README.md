# Mipp-ali

小程序 typescript 基类

## Installation

使用 class 风格时，小程序继承的父类

## Import

Import `PageBase`:

```javascript
import { PageBase } from "mipp";
```

or import all:

```javascript
import Mipp from "mipp-ali";
```

## Api

- PageBase<IData>

## Interface

- IMippWeApp
- IMippWePage
- IMippWeComponent
- IMippWeEvent
- IMippWeCommon

### `PageBase`

逻辑页面的父类，所有页面都需要继承该父类；

#### `<IData>`

是页面渲染的数据类或 interface，即`data`中所包含的数据或者 interface

**特别注意 `constructor`构造方法中不能使用小程序内置的属性和方法；比如：`this.setData(opts?)`和`this.options`;因为此时还没有注入到 Page 函数中，并没有小程序内置的对象**

**(除非必须)尽量不要在 `constructor`里面执行初始化的工作，因为加载小程序后，会执行所有页面前置的 js 代码(Page()之前执行的代码)，导致小程序渲染变慢。可以在`onLoad`生命周期函数中执行初始化的工作，`onLoad`只在打开该页面时执行**

#### `data`初始化

`data`初始化有两种方式：

1. 在`constructor`中初始化，使用`this.data = new Data()`对`data`进行初始化；建议使用这方式
2. 在`onLoad`中初始化，在`onLoad`中初始化需要执行`this.setData()`

##### `data`初始化示例

- 建议使用在`constructor`中初始化：

```javascript
class Data {
  username = "";
}


class Index extends PageBase<Data> implements IMippWePage.ILifetime {
  data: Data;

  constructor () {
    super();
    this.data = new Data();
  }

  onLoad(): void {
    console.log("onLoad", this);
  }
}

Page(new Index());
```

- 在`onLoad`中初始化：

```javascript
class Data {
  username = "";
}


class Index extends PageBase<Data> implements IMippWePage.ILifetime {
  data: Data;

  onLoad(): void {
    this.setData(new Data());
    console.log("onLoad", this);
  }
}

Page(new Index());
```

#### Example1

```javascript
class Data {
  username = "";
}


class Index extends PageBase<Data> implements IMippWePage.ILifetime {
  data: Data;

  constructor () {
    super();
    this.data = new Data();
    //不能在constructor中使用 this.setData({}); 因为还没有注入到Page函数中，并没有小程序内置的对象
  }

  onLoad(): void {
    console.log("onLoad", this);
  }
}

Page(new Index());
```

#### Example2

```javascript
class Data {
  username = "";
}

// 不推荐的方式
class Index extends PageBase<Data> implements IMippWePage.ILifetime {
  data = new Data();

  onLoad(): void {
    console.log("onLoad", this);
  }
}

// 推荐的方式
class Index extends PageBase<Data> implements IMippWePage.ILifetime {
  data: Data;

  constructor() {
    super();
    this.data = new Data();
  }

  onLoad(): void {
    console.log("onLoad", this);
  }
}

Page(new Index());
```

### `IMippWePage.ILifetime`

小程序生命周期函数的 interface

```txt
{
  onLoad
  onShow
  onReady
  onHide
  onUnload
  onPullDownRefresh
  onReachBottom
  onShareAppMessage
  onPageScroll
  onTabItemTap
  onResize
  onAddToFavorites
}
```

#### Example

```javascript
interface IData {
  username: string;
}

class Index extends PageBase<IData> implements IMippWePage.ILifetime {
  data: IData = {
    username: "",
  };

  onLoad(): void {
    console.log("onLoad", this);
  }
}

Page(new Index());
```
