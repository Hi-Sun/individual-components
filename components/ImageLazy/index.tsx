import React, { FC, useMemo, useState } from 'react';
import { TImageLazyProps } from './types';
import { getDefaultImage } from './utils';

const ImageLazy: FC<TImageLazyProps> = (props) => {
  const {
    style,
    loadingOpacity = '0.5',
    loadingImage = '',
    loadingBg = '#f2f2f2',
    defaultImageSize = 'S',
    errorBg = '#f2f2f2',
    alt = '',
    loading = 'lazy',
    onLoad,
    onError,
    ...rest
  } = props;
  const [imgLoadState, setImgLoadState] = useState<string>('loading');

  const isLoaded = React.useRef(false);

  const ImageLoadFinished = () => {
    onLoad && onLoad();
    setImgLoadState('fulfilled');
  };

  const ImageLoadError = () => {
    onError && onError();
    setImgLoadState('rejected');
  };

  const transitionStyle = useMemo(() => {
    return {
      opacity: imgLoadState !== 'loading' ? '1' : loadingOpacity,
      transition: 'opacity .2s ease-in',
    };
  }, [imgLoadState, loadingOpacity]);

  const placeholderStyle = useMemo(() => {
    switch (imgLoadState) {
      case 'loading':
        if (loadingBg && loadingImage) {
          return { background: `url(${loadingImage}) 50% 50% / contain no-repeat, ${loadingBg}` };
        } else if (loadingImage) {
          return {
            background: `#f2f2f2 url(${loadingImage}) 50% 50% / contain no-repeat`,
          };
        } else {
          return { background: loadingBg };
        }
      case 'rejected': {
        const errorImage = getDefaultImage(defaultImageSize);
        if (defaultImageSize && errorImage) {
          return {
            background: `#f2f2f2 url(${errorImage.src}) 50% 50% / ${errorImage.width} ${errorImage.height} no-repeat`,
          };
        } else {
          return { background: errorBg };
        }
      }
      default:
        return {};
    }
  }, [imgLoadState]);

  const getImgRef = (img?: HTMLImageElement) => {
    isLoaded.current = false;
    if (img?.complete && (img.naturalWidth || img.naturalHeight)) {
      isLoaded.current = true;
      ImageLoadFinished();
    }
  };

  return (
    <img
      loading={loading}
      alt={alt}
      // @ts-ignore 不可以设置ref={() => getImgRef()}，否则读取加载状态失效
      ref={getImgRef}
      style={{ ...style, ...placeholderStyle, ...transitionStyle }}
      onLoad={ImageLoadFinished}
      onError={ImageLoadError}
      {...rest}
    />
  );
};

export default ImageLazy;
