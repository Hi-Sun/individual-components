import React, { FC, useEffect, useRef, useState } from 'react';
import copy from 'copy-to-clipboard';
import { TCopyToClipboardProps } from './type';

/**@abstract 长按复制内容至粘贴板 */
const CopyToClipboard: FC<TCopyToClipboardProps> = (props) => {
  const { className, children, text, delay = 2000 } = props;

  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const eleRef: React.LegacyRef<HTMLDivElement> = useRef(null);

  const handleTouchStart = () => {
    if (pressTimer.current === null) {
      // 创建定时器 （2s之后执行长按功能函数）
      pressTimer.current = setTimeout(() => {
        const copyText = text || eleRef?.current?.innerText || '';
        copy(copyText);
        alert('复制成功');
      }, delay);
    }
  };

  const handleTouchEnd = () => {
    if (pressTimer.current != null) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  return (
    <div
      className={className}
      ref={eleRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {children}
    </div>
  );
};

export default CopyToClipboard;
export type { TCopyToClipboardProps };
