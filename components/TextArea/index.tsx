import React, { ChangeEvent, FC, ReactNode, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import runes from 'runes2';
import { TTextAreaProps } from './type';
import s from './index.mdule.less';

export interface TextAreaRef {
  clear: () => void;
  focus: () => void;
  blur: () => void;
  nativeElement: HTMLTextAreaElement | null;
}

// eslint-disable-next-line react/display-name
const TextArea: FC<TTextAreaProps> = forwardRef<TextAreaRef, TTextAreaProps>((props, ref) => {
  const {
    className,
    textAreaClassName,
    defalutValue,
    maxLength,
    placeholder,
    showCount = false,
    rows = 2,
    autoComplete,
    autoFocus,
    disabled,
    readOnly,
    onFocus,
    onBlur,
    onClick,
    onChange,
  } = props;
  const [textValue, setTextValue] = useState<string>(defalutValue || '');
  const nativeTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const compositingRef = useRef(false);

  useImperativeHandle(ref, () => ({
    clear: () => {
      setTextValue('');
    },
    focus: () => {
      nativeTextAreaRef.current?.focus();
    },
    blur: () => {
      nativeTextAreaRef.current?.blur();
    },
    get nativeElement() {
      return nativeTextAreaRef.current;
    },
  }));

  let count: number | ReactNode;
  const valueLength = runes(textValue).length;
  if (typeof showCount === 'function') {
    count = showCount(valueLength, maxLength);
  } else if (showCount) {
    count = (
      <div className={s.textAreaCount}>
        {maxLength === undefined ? valueLength : `${valueLength}/${maxLength}`}
      </div>
    );
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    let v = e.target.value;
    if (maxLength && !compositingRef.current) {
      v = runes(v).slice(0, maxLength).join('');
    }
    setTextValue(v);
    onChange?.(e);
  };

  const cls = `${s.root} ${className}`;
  const textCls = `${s.textAreaElement} ${textAreaClassName}`;
  return (
    <div className={cls}>
      <textarea
        ref={nativeTextAreaRef}
        className={textCls}
        value={textValue}
        maxLength={maxLength}
        placeholder={placeholder}
        rows={rows}
        onChange={handleChange}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        readOnly={readOnly}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
        /** 当用户使用拼音输入法开始输入汉字时，compositionstart事件就会被触发 */
        onCompositionStart={(e) => {
          compositingRef.current = true;
          props.onCompositionStart?.(e);
        }}
        /** 当文本段落的组成完成或取消时, compositionend 事件将被触发 */
        onCompositionEnd={(e) => {
          compositingRef.current = false;
          if (maxLength) {
            const v = (e.target as HTMLTextAreaElement).value;
            setTextValue(runes(v).slice(0, maxLength).join(''));
          }
          props.onCompositionEnd?.(e);
        }}
      />
      {count}
    </div>
  );
});

export default TextArea;
