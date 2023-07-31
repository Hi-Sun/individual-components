export enum AvatarSizeEnum {
  'XL' = 48,
  'L' = 40,
  'M' = 32,
  'S' = 24,
  'XS' = 20,
}

export interface TAvatarProps {
  className?: string;
  src?: string;
  /** 图片描述 */
  alt?: string;
  /** @default img 头像类型  */
  type?: 'text' | 'img';
  /** @default square 头像形状 */
  shape?: 'square' | 'round';
  /** 头像尺寸 */
  size?: AvatarSizeEnum;
  /** @default 暂无 头像文本｜兜底文本  */
  text?: string;
  /** @default lazy 头像图片是否懒加载 */
  loading?: 'lazy' | 'eager';
  /** 兜底文本时的背景色 */
  bgType?: string;
  style?: React.CSSProperties;
  /** 图片加载完成回调 */
  onLoad?: () => void;
  /** 图片加载失败回调 */
  onError?: () => void;
}
