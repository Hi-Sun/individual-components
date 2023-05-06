import { FC } from "react";
import Scroll from '@components/Scroll';
import s from './index.module.less';

const ScrollBox: FC = () => {
  const cardList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <div className={s.scrollPage}>
      <h3 style={{margin: 20}}>Scroll组件使用样例: </h3>
      <Scroll
        step={744}
        contentClassName={s.scrollContent}
        className={s.scrollBox}
      >
        {cardList.map(item => {
          return (
            <div className={s.scrollItem} key={item}>
              Card{item}
            </div>
          )
        })}
      </Scroll>
    </div>
  );
}

export default ScrollBox