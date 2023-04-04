import { ImageSizeEnum, DefaultImageEnum } from './types';

/**
 * 根据imageSize来获取默认加载失败背景样式
 * @param imageSize
 * @returns
 */
export const getDefaultImage = (imageSize: ImageSizeEnum | string) => {
  switch (imageSize) {
    case ImageSizeEnum.S:
      return {
        src: DefaultImageEnum.S,
        width: '48px',
        height: '15px',
      };
    case ImageSizeEnum.M:
      return {
        src: DefaultImageEnum.M,
        width: '80px',
        height: '24px',
      };
    case ImageSizeEnum.L:
      return {
        src: DefaultImageEnum.L,
        width: '124px',
        height: '36px',
      };
    default:
      return '';
  }
};
