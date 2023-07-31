import { FC } from "react";
import PullRefresh, { TPullRefreshProps } from '@components/PullRefresh';

const Exapmle: FC<Partial<TPullRefreshProps>> = () => {
  const props = {
    children: <div style={{ height: '100vh', backgroundColor: '#8590A6' }}>这是一个大列表</div>,
    showIcon: true,
    pullingText: '下拉刷新',
    loosingText: '松手立即刷新',
    loadingText: '刷新中...',
    successText: '刷新完成',
    successDuration: 1000,
    pullDistance: 50, // 拉动的距离
    onRefreshEnd: () => { },
    onRefresh: () => {
      return new Promise<void>((reslove) => {
        setTimeout(() => {
          console.log('数据加载完成！');
          reslove();
        }, 1000);
      });
    },
  }

  return (
    <div>
      <PullRefresh {...props} />
    </div>
  );
};

export default Exapmle