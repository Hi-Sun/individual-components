# scroll 水平滚动容器组件

### Functionality
本组件实现一个水平滚动容器， 容器滚动到起始和终止位置不显示切换前进后退按钮，step设置前进/后退的距离

### props
```typescript
export interface TScrollProps {
  step: number; // 必传，标识前进/后退的滑动距离
  tips?: string; // 可选，文字说明
  className?: string; // 可选,滚动容器的类名
  contentClassName?: string; // 可选，卡片内容区类名，即滚动容器不包括前进后退按钮部分的中间内容
}
```

### Usage
详见src/pages/scroll-box文件

### Temple
```typescript
yarn 安装依赖
yarn dev 运行项目
浏览器打开 http://localhost:3001/scroll-box
```
