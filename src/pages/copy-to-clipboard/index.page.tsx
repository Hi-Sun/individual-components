import { FC } from "react";
import CopyToClipboard, { TCopyToClipboardProps } from '@components/CopyToClipboard';

export const Primary: FC<TCopyToClipboardProps> = () => {
  return (
    <div>
      <CopyToClipboard>
        <div style={{ margin: 50, fontSize: 16, fontWeight: 500 }}>这里是需要复制的文本区域1</div>
      </CopyToClipboard>
      <CopyToClipboard text="我是你复制的内容" delay={3000}>
        <div style={{ margin: 50, fontSize: 16, fontWeight: 500 }}>这里是需要复制的文本区域2</div>
      </CopyToClipboard>
    </div>
  );
};