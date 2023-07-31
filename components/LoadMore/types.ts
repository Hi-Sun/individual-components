// import { ReactNode } from 'react';

export interface TLoadMoreProps {
  className?: string;
  // children?: ReactNode;
  /** @defalut true 是否还有更多内容 */
  hasMore: boolean;
  /** @default 150 触发加载事件的滚动触底距离阈值，单位为像素 */
  threshold?: number;
  /** @default 数据加载中 加载过程提示文案 */
  loadingText?: string;
  /** @default 已全部加载完毕 没有更多数据的提示文案 */
  noMoreText?: string;
  /** 加载更多的回调函数 */
  loadMore: () => Promise<void>;
}
