/**
 * @param {string} [src]
 * @param {string} [className]
 * @param {string} [alt]
 * @param {'lazy' | 'eager'} [loading] - 默认lazy
 * @param {ImageSizeEnum} [defaultImageSize] - 图片尺寸, 该值用于当图片加载失败时，区分不同图片尺寸下显示的背景图，默认为S，无水印
 * @param {string} [loadingOpacity] - 设置图片加载中的透明度，默认为0.5
 * @param {string} [loadingImage] - 图片加载阶段使用图片作为占位的图片地址
 * @param {string} [loadingBg] - 自定义图片加载阶段背景样式，默认为#f2f2f2
 * @param {string} [errorBg] - 自定义图片加载失败背景样式，默认为#f2f2f2
 * @param {()=>void} [onLoad] - 图片加载完成回调
 * @param {()=>void} [onError] - 图片加载失败回调
 */
 export interface TImageLazyProps {
  src: string;
  defaultImageSize?: ImageSizeEnum;
  className?: string;
  alt?: string;
  style?: any;
  width?: string | number;
  height?: string | number;
  loading?: 'lazy' | 'eager';
  loadingOpacity?: string;
  loadingImage?: string;
  loadingBg?: string;
  errorBg?: string;
  onLoad?: () => void;
  onError?: () => void;
  [key: string]: any;
}

/** @description 图片尺寸映射的水印图 */
export enum DefaultImageEnum {
  /** @name XS: 宽度/高度 < 56px，不展示水印，背景颜色为#F2F2F2 */
  'XS' = '',
  /** @name S: 56px <= 宽度/高度 < 100px，公司logo小水印 */
  'S' = 'https://cdn.tianyancha.com/web-require-js/public/images/tyc_logo_watermark_small.png',
  /** @name M: 100px <= 宽度/高度 < 200px，公司logo中水印 */
  'M' = 'https://cdn.tianyancha.com/web-require-js/public/images/tyc_logo_watermark_middle.png',
  /** @name L: 200px <= 宽度/高度，公司logo大水印 */
  'L' = 'https://cdn.tianyancha.com/web-require-js/public/images/tyc_logo_watermark_large.png',
}

/** @description 图片尺寸 */
export enum ImageSizeEnum {
  'XS' = 'XS',
  'S' = 'S',
  'M' = 'M',
  'L' = 'L',
}



