import { ChangeEventHandler, ReactNode } from 'react';

export interface TTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    React.DOMAttributes<HTMLTextAreaElement> {
  // className?: string;
  textAreaClassName?: string;
  /** 默认值 */
  defalutValue?: string;
  /** 最大字符数 */
  // maxLength?: number;
  /** 提示文本 */
  // placeholder?: string;
  /** @default false 显示字数，支持自定义渲染 */
  showCount?: Boolean | ((length: number, maxLength?: number) => ReactNode);
  /** @default 2 展示行数 */
  // rows?: number;
  onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
}
