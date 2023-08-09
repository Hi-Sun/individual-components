import { ReactNode } from 'react';

export interface TCopyToClipboardProps {
  className?: string;
  children: ReactNode;
  /** 复制的文本 */
  text?: string;
  /** @default 2000 长按多少毫秒后复制 */
  delay?: number;
}
