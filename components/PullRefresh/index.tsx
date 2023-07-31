import React, { FC, useEffect, useRef, useState } from 'react';
import { PullRefreshStatus, TPullRefreshProps } from './types';
import s from './index.module.less';

const PullRefresh: FC<TPullRefreshProps> = (props) => {
  const {
    style,
    showIcon = true,
    pullingText = '下拉刷新',
    loosingText = '松手立即刷新',
    loadingText = '刷新中...',
    successText = '刷新完成',
    successDuration = 1000,
    pullDistance = 50, // 拉动的距离
    onRefresh,
    onRefreshEnd,
  } = props;
  const [stateInfo, setStateInfo] = useState({
    status: 'normal' as PullRefreshStatus,
    distance: 0, // 拉动的距离
  });

  const startY = useRef(0);
  const endY = useRef(0);
  const diffY = useRef(0);

  const isTouchable = stateInfo.status !== 'loading' && stateInfo.status !== 'success'; // 刷新中和刷新完成的状态的不能再继续下拉

  const track = useRef<HTMLDivElement>(null);

  // 处理刷新逻辑
  const onHandleRefresh = async () => {
    try {
      await onRefresh?.();
      setStateInfo((pre) => ({ ...pre, status: 'success' }));
      setTimeout(() => {
        updateStatus(0);
      }, +successDuration);
    } catch (error) {
      console.log('error', error);
    }
  };

  // 开始 touch
  const onTouchStart = (event: React.TouchEvent) => {
    if (isTouchable) {
      startY.current = event?.touches?.[0]?.clientY;
    }
  };

  // 拖动 touch
  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      if (isTouchable) {
        endY.current = event.touches[0].clientY;
        diffY.current = startY.current - endY.current;
        // 向下拖动
        if (diffY.current < 0) {
          updateStatus(Math.abs(diffY.current));
        }
      }
    };
    window?.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => window?.removeEventListener('touchmove', handleTouchMove);
  }, []);

  // 结束 touch
  const onTouchEnd = async () => {
    if (isTouchable) {
      if (stateInfo.status === 'loosing') {
        updateStatus(0, true);
        await onHandleRefresh();
        setTimeout(() => onRefreshEnd?.());
      } else {
        updateStatus(0);
      }
    }
  };

  // 渲染不同状态下下拉区域展示
  const renderStatus = () => {
    let text = '';
    switch (stateInfo.status) {
      case 'loading':
        text = loadingText;
        break;
      case 'loosing':
        text = loosingText;
        break;
      case 'pulling':
        text = pullingText;
        break;
      case 'success':
        text = successText;
        break;
      default:
        text = '';
    }
    return text ? (
      <div className={s.refreshArea} style={{ height: Math.abs(diffY.current) }}>
        {showIcon && <div className={s.tycIcon} />}
        <div className={s.statusText}>{text}</div>
      </div>
    ) : null;
  };

  // 设置状态
  const updateStatus = (distance: number, isLoading?: boolean) => {
    const pullDistanceNum = +pullDistance;
    const newState = { ...stateInfo };
    if (isLoading) {
      newState.status = 'loading';
    } else if (distance === 0) {
      newState.status = 'normal';
    } else if (distance < pullDistanceNum) {
      newState.status = 'pulling';
    } else {
      newState.status = 'loosing';
    }
    setStateInfo(newState);
  };

  const cls = `${s.root} ${props.className}`;

  return (
    <div className={cls} style={style}>
      <div
        ref={track}
        className={s.track}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <div className={s.head}>{renderStatus()}</div>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default PullRefresh;
export type { TPullRefreshProps }
