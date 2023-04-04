# image-lazy 图片懒加载组件

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

### usage
```typescript
import ImageLazy from '@tyc-pc/image-lazy'
```

### temple
```typescript
// temple1 
<ImageLazy
  src="https://img5.tianyancha.com/logo/lll/9c253737458dabb5406ffd8e6fc2dd50.png@!f_200x200"
  width={48}
  height={48}
  alt="中国电信"
  onLoad={() => {
    console.log('加载完成')
  }}
  onError={() => {
    console.log('加载失败')
  }}
/>

// temple2
<ImageLazy
  src="https://img5.tianyancha.com/logo/lll/9c253737458dabb5406ffd8e6fc2dd50.png@!f_200x200"
  width={48}
  height={48}
  alt="中国电信"
  loadingBg="#ff8300"
  loadingOpacity="0.2"
  loadingImage="https://cdn.tianyancha.com/web-require-js/public/images/no-data-common.png"
/>
```
