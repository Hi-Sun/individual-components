import React, { FC, useEffect, useMemo, useState } from 'react';
import { AvatarSizeEnum, TAvatarProps } from './types';
import classNames from 'classnames';
import s from './index.module.less';

const VALID_URL_REGEXP = /^(?:https?:\/\/|\/).+/i;

const SizeClsMap = {
  20: s.root20,
  24: s.root24,
  32: s.root32,
  40: s.root40,
  48: s.root48,
};

const bgRuleTuple = [
  ['0', '9', s.bg09],
  ['a', 'e', s.bgAE],
  ['f', 'j', s.bgFJ],
  ['k', 'o', s.bgKO],
  ['p', 't', s.bgPT],
  ['u', 'z', s.bgUZ],
];

function getBgColor(type: string) {
  let rule: string[] | string | undefined;
  const t = type?.[0].toLowerCase();
  if (t) {
    rule = bgRuleTuple.find(([start, end]) => t >= start && t <= end);
  }
  if (!rule && type) {
    const text = type?.charCodeAt(0);
    rule = bgRuleTuple[text?.toString()?.[0]] || s.bgDefault;
  }
  return Array.isArray(rule) ? rule[2] : s.bgDefault;
}

const Avatar: FC<TAvatarProps> = (props) => {
  const {
    className,
    src,
    alt,
    type = 'img',
    shape = 'square',
    size = AvatarSizeEnum.M,
    text = '暂无',
    loading,
    bgType,
    style,
    onLoad,
    onError,
  } = props;

  const [isShowText, setIsShowText] = useState<boolean>(false);

  const fallbackText = useMemo(() => {
    return text.length > 4 ? text.slice(0, 4) : text;
  }, [text]);

  const randomColorCls = useMemo(() => {
    return getBgColor(bgType || text[0]);
  }, [bgType, text]);

  const rootCls = classNames(
    s.root,
    isShowText ? randomColorCls : s.rootBorder,
    className,
    size && SizeClsMap[size],
    shape === 'square' ? s.squareBorder : s.roundBorder,
    text.length > 1 ? s.letter2 : s.letter1
  );

  const handleLoadError = () => {
    setIsShowText(true);
    onError?.();
  };

  useEffect(() => {
    const LegalImage = type === 'img' && src && VALID_URL_REGEXP.test(src);
    setIsShowText(!LegalImage);
  }, [type, src]);

  return (
    <div className={rootCls} style={style}>
      {isShowText ? (
        <div className={s.text}>{fallbackText}</div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={s.img}
          src={src}
          alt={alt}
          loading={loading}
          onError={handleLoadError}
          onLoad={onLoad}
        />
      )}
    </div>
  );
};

export default Avatar;
