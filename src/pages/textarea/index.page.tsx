import { ChangeEvent, useState } from "react";
import TextArea from '@components/TextArea';

export const TextAreaExample = () => {
  const [value, setValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log('输入的文字为：', e?.target.value);
    setValue(e?.target.value);
  };

  return (
    <div style={{ margin: '10px' }}>
      <TextArea
        value={value}
        onChange={handleChange}
        showCount
        maxLength={200}
        rows={3}
        placeholder="请输入"
      />
    </div>
  );
};