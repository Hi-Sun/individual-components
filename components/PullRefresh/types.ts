import { ReactNode } from 'react';

export type PullRefreshStatus = 'normal' | 'loading' | 'loosing' | 'pulling' | 'success';

export interface TPullRefreshProps {
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode;
  /** 是否禁用下拉刷新 */
  // disabled?: boolean;
  /** 是否展示tyc icon */
  showIcon?: boolean;
  /** 下拉过程提示文案 */
  pullingText?: string;
  /** 释放过程提示文案 */
  loosingText?: string;
  /** 加载过程提示文案 */
  loadingText?: string;
  /** 刷新成功提示文案 */
  successText?: string;
  /** 刷新成功提示展示时长(ms) */
  successDuration?: number | string;
  /**
   * 触发下拉刷新的距离
   * @default '与 headHeight 一致'
   */
  pullDistance?: number | string;
  /** 下拉刷新时触发 */
  onRefresh: () => Promise<unknown>;
  /** 刷新完成后触发 */
  onRefreshEnd?: () => void;
}
