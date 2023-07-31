import { FC, useEffect, useState } from "react";
import LoadMore, { TLoadMoreProps } from '@components/LoadMore';

const Exapmle: FC<Partial<TLoadMoreProps>> = (props) => {
  const [hasMoreData, setHasMoreData] = useState(true);
  const [data, setData] = useState<string[]>([]);

  const loadMoreData = () => {
    return new Promise<void>((reslove) => {
      setTimeout(() => {
        console.log('数据加载完成！');
        setData([
          ...data,
          'A1',
          'B1',
          'C1',
          'D1',
          'E1',
          'F1',
          'G1',
          'H1',
          'I1',
          'J1',
          'K1',
          'L1',
          'M1',
          'N1',
          'O1',
          'P1',
          'Q1',
        ]);
        setHasMoreData(data.length > 30);
        reslove();
      }, 3000);
    });
  };

  useEffect(() => {
    setData(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q']); // 17个
  }, []);

  return (
    <div>
      {data.map((item: string) => {
        return (
          <div
            key={item}
            style={{
              height: 30,
              backgroundColor: '#8590A6',
              marginBottom: 10,
              border: '1px solid rgba(0, 0, 0, .05)',
            }}
          >
            {item}
          </div>
        );
      })}
      <LoadMore {...props} hasMore={hasMoreData} loadMore={loadMoreData} />
    </div>
  );
};

export default Exapmle