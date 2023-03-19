# datagrab.js
看论文时候看到别人论文中的图表，很想要到看看对应的数据？

自己某次实验的数据找不到了，但是当时的图还在，希望能从图中恢复数据？

DataGrab 是一个从图像中生成数据的 js 库，它可以帮助您从 学术论文/屏幕截图 等数据统计图中获取原始数据。我们提供两种使用方式：npm 包 或 直接使用的HTML

## 直接使用 HTML
您可以直接使用包中的 HTML 文件来获取你的数据，直接下载 HTML，或克隆这个仓库

### 使用方式
使用 VSCode 打开 HTML 所在文件夹，确保你的 VSCode 下载了 Live Server 这个插件（没有的话，搜索并下载即可，无需其他任何操作）
在 HTML 中右键，点击 Open with Liver server，即可在浏览器中看到页面.

### 使用注意
1.将您的图片裁剪，只保留数据部分（坐标系）图片，不包含标题、横纵坐标等

2.在输入框中，设置您的统计图的横纵坐标的值，我们需要这个值来计算相应的坐标

### 示例
对于这个示例图（从某学术论文中使用屏幕截图保存，侵删）:

<img src="https://github.com/zhangchen21/datagrab.js/blob/master/assets/originalImg.png" height="240px" width="360px" />

我们需要输入横坐标开始0，终止57；纵坐标开始-20，终止50，点击 DETECT 即可获取读取到的数据：

<img src="https://github.com/zhangchen21/datagrab.js/blob/master/assets/html.png" height="240px" width="360px" />

您可以直接复制这些数据，去生成自己的图片，例如使用echarts生成图片：

<img src="https://github.com/zhangchen21/datagrab.js/blob/master/assets/echarts.png" height="240px" width="360px" />


## 在您的项目中使用 Module
### 下载
```
npm install datagrab
```

### React 项目引入
推荐您将 data 使用 memo 缓存以避免重复计算
```javascript
import { generateData } from 'datagrab'
import useMemo from 'react'

export function dataGrab(imgElementID) {
  const img = document.getElementById(imgElementID);
  const options = {
  
  };
  
  const data = useMemo(() => 
    generateData(img, xStart, xEnd, yStart, yEnd)
  , [imgElementID]);
  
  // Use some charts library to generate new chart of yourself
  return (
    <Echarts options={data, ...options}/>
  )
}
```
