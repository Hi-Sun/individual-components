import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import s from './index.module.less';

interface TScrollProps {
  children: ReactNode;
  step: number;
  tips?: string;
  className?: string;
  contentClassName?: string;
}

const Scroll: FC<TScrollProps> = (props) => {
  const { step, tips = '', className = '', contentClassName = '' } = props;
  const [x, setX] = useState<number>(0);
  const [showPrev, setShowPrev] = useState<boolean>(false);
  const [showNext, setShowNext] = useState<boolean>(false);
  const [contentWidth, setContentWidth] = useState<number>(0);
  const [contentInnerWidth, setContentInnerWidth] = useState<number>(0);

  const measuredRef = useCallback(
    (node: any) => {
      if (node !== null) {
        setContentWidth(node.getBoundingClientRect().width);
      }
    },
    [props.children]
  );

  const measuredInnerRef = useCallback(
    (node: any) => {
      if (node !== null) {
        setContentInnerWidth(node.getBoundingClientRect().width);
      }
    },
    [props.children]
  );

  useEffect(() => {
    if (contentWidth >= contentInnerWidth) {
      return;
    }
    if (x && x + contentInnerWidth <= contentWidth) {
      setShowNext(false);
      setShowPrev(true);
    } else if (x && x + contentInnerWidth > contentWidth) {
      setShowNext(true);
      setShowPrev(true);
    } else {
      setShowNext(true);
      setShowPrev(false);
    }
  }, [x, contentInnerWidth, contentWidth]);

  return (
    <div className={s.root}>
      <div className={`${s.scrollWrap} ${className}`}>
        {showPrev && (
          <div className={s.scrollPreview} onClick={() => setX((num) => num + step)}>
            <LeftOutlined className={s.scrollIcon} />
          </div>
        )}
        <div className={`${s.scrollContent} ${contentClassName}`} ref={measuredRef}>
          <div
            className={s.scrollContentInner}
            ref={measuredInnerRef}
            style={{ transform: `translateX(${x}px)` }}
          >
            {props.children}
          </div>
        </div>
        {showNext && (
          <div className={s.scrollNext} onClick={() => setX((num) => num - step)}>
            <RightOutlined className={s.scrollIcon} />
          </div>
        )}
      </div>
      {tips && <div className={s.scrollContentTips}>{tips}</div>}
    </div>
  );
};

export default Scroll;
