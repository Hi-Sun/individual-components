import React, { FC, useEffect, useState } from 'react';
import { throttle } from 'lodash';
import { TLoadMoreProps } from './types';
import s from './index.module.less';

/**@abstract 上拉加载组件 */
const LoadMore: FC<TLoadMoreProps> = (props) => {
  const {
    className,
    hasMore,
    threshold = 150,
    loadingText = '数据加载中...',
    noMoreText = '已全部加载完毕',
    loadMore,
  } = props;
  const [status, setStatus] = useState<'normal' | 'loading'>('normal');

  useEffect(() => {
    const onScroll = async () => {
      if (!hasMore || status === 'loading') return;
      // 文档显示区域高度
      const showHeight = window.innerHeight;
      // 网页卷曲高度
      const scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop;
      // 所有内容高度
      const allHeight = document.body.scrollHeight;
      // (所有内容高度 = 文档显示区域高度 + 网页卷曲高度) 时即为触底
      if (allHeight <= showHeight + scrollTopHeight + threshold) {
        setStatus('loading');
        await loadMore();
        setStatus('normal');
      }
    };

    const handleThrottle = throttle(onScroll, 1000, {
      leading: true,
      trailing: true,
    });
    window?.addEventListener('scroll', handleThrottle);
    return () => {
      window?.removeEventListener('scroll', handleThrottle);
    };
  }, [hasMore, loadMore, status, threshold]);

  const renderLoadingArea = () => {
    if (!hasMore) {
      return <div className={s.loadingArea}>{noMoreText}</div>;
    } else if (status === 'loading') {
      return (
        <div className={s.loadingArea}>
          <div className={s.tycIcon} />
          <div className={s.statusText}>{loadingText}</div>
        </div>
      );
    }
  };

  const rootCls = `${s.root} ${className}`;

  return (
    <div className={rootCls}>
      <div className={s.loadingArea}>{renderLoadingArea()}</div>
    </div>
  );
};

export default LoadMore;
export type {TLoadMoreProps}
