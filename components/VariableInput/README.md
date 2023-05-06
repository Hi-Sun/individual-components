# variable-input 插入变量输入框组件

### Functionality

本组件结合antd中的Form和Input组件实现一个变量输入框:
1. 该输入框可插入多个变量，其中变量格式为[X1]、[X2]、[X3]、[X4]、[X5]
2. 删除变量右侧的‘]’符号可整个删除该变量；
3. 删除变量后，再次插入变量时会计算变量模版中的最小变量值，插入最小变量值，如目前输入框内有变量[X1]、[X2]、[X3]，删除变量[X2]后再次插入变量会插入[X2]，而不是[X4]；
4. 插入变量和输入框输入操作会进行格式校验，不允许在变量内插入其他值，会报错提示：不能对变量标志中进行插入变量！；
5. 插入变量时进行数量校验，不可超过最大变量数，超出会提示：最多插入5个变量！；
该组件主要提供实现思路，大家可根据自己的需求调整组件中变量格式和个数，需注意必须明确变量格式和数量；


### props

```typescript
export interface TImageLazyProps {
  value?: string // 输入框初始默认值
  label: string // FormItem 标题
  name: string // FormItem 参数名称
  variableChange?: (value: string) => void // 输入框变化的回调函数
}
```

### Usage

详见components/VariableModule组件

### Temple

```typescript
yarn 安装依赖
yarn dev 运行项目
浏览器打开 http://localhost:3001/variable-module
```
