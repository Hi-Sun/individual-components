import ImageLazy from '@components/ImageLazy';
import s from './index.module.less';

const ImageLazyPage = () => {
  return (
    <div className={s.imageLazyBox}>
      <div className={s.imageLazyTitle}>ImageLazy组件使用example</div>
      <ImageLazy
        src="https://img5.tianyancha.com/logo/lll/9c253737458dabb5406ffd8e6fc2dd50.png@!f_200x200"
        width={48}
        height={48}
        alt="中国电信"
        loadingBg="#ff8300"
        className={s.imageLazyTemple1}
        loadingOpacity="0.2"
        loadingImage="https://cdn.tianyancha.com/web-require-js/public/images/no-data-common.png"
      />
      <ImageLazy
        src="https://img5.tianyancha.com/logo/lll/9c253737458dabb5406ffd8e6fc2dd50.png@!f_200x200"
        width={48}
        height={48}
        alt="中国电信"
        className={s.imageLazyTemple2}
        onLoad={() => {
          console.log('加载完成')
        }}
        onError={() => {
          console.log('加载失败')
        }}
      />
    </div>
  );
}
export default ImageLazyPage