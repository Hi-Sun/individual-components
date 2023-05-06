# image-lazy 图片懒加载组件

### Functionality
本组件采用img标签提供的loading属性实现图片懒加载功能，在图片进入可视区域内再加载图片数据以实现一定的性能优化，同时可设置图片加载时的loading效果
兼容性：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img

### props
```typescript
export interface TImageLazyProps {
  src: string
  defaultImageSize?: ImageSizeEnum // 图片尺寸, 该值用于当图片加载失败时，区分不同图片尺寸下显示的背景图，默认为S，公司logo小水印
  className?: string
  alt?: string
  style?: any
  width?: string | number
  height?: string | number
  loading?: 'lazy' | 'eager' // 默认为lazy
  loadingOpacity?: string // 设置图片加载中的背景透明度，默认为0.5
  loadingImage?: string // 图片加载阶段使用图片作为占位的图片地址
  loadingBg?: string // 自定义图片加载阶段背景样式，默认为#f2f2f2
  errorBg?: string // 自定义图片加载失败背景样式, 默认为#f2f2f2
  onLoad?: () => void // 图片加载完成回调
  onError?: () => void // 图片加载失败回调
}
```

### Usage
详见src/pages/image-lazy文件

### Temple
```typescript
yarn 安装依赖
yarn dev 运行项目
浏览器打开 http://localhost:3001/image-lazy 
```
