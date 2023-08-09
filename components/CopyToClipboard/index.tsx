import React, { FC, useEffect, useRef, useState } from 'react';
import copy from 'copy-to-clipboard';
import { TCopyToClipboardProps } from './type';

/**@abstract 长按复制内容至粘贴板 */
const CopyToClipboard: FC<TCopyToClipboardProps> = (props) => {
  const { className, children, text, delay = 2000 } = props;
  const [copyText, setCopyText] = useState<string>('');

  let pressTimer: null | ReturnType<typeof setTimeout> = null;

  const eleRef: React.LegacyRef<HTMLDivElement> = useRef(null);

  const handleTouchStart = () => {
    if (pressTimer == null) {
      // 创建定时器 （2s之后执行长按功能函数）
      pressTimer = setTimeout(() => {
        copy(copyText);
        alert('复制成功');
      }, delay);
    }
  };

  const handleTouchEnd = () => {
    if (pressTimer != null) {
      clearTimeout(pressTimer);
      pressTimer = null;
    }
  };

  useEffect(() => {
    const elementText = text || eleRef?.current?.innerText || '';
    setCopyText(elementText);
  }, [text]);

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
