import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@src/styles/Home.module.css'
import ImageLazy from '../../components/image-lazy'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>components</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.imageLazyBox}>
        <div className={styles.imageLazyTitle}>ImageLazy组件使用example</div>
        <ImageLazy
          src="https://img5.tianyancha.com/logo/lll/9c253737458dabb5406ffd8e6fc2dd50.png@!f_200x200"
          width={48}
          height={48}
          alt="中国电信"
          loadingBg="#ff8300"
          className={styles.imageLazyTemple1}
          loadingOpacity="0.2"
          loadingImage="https://cdn.tianyancha.com/web-require-js/public/images/no-data-common.png"
        />
        <ImageLazy
          src="https://img5.tianyancha.com/logo/lll/9c253737458dabb5406ffd8e6fc2dd50.png@!f_200x200"
          width={48}
          height={48}
          alt="中国电信"
          className={styles.imageLazyTemple2}
          onLoad={() => {
            console.log('加载完成')
          }}
          onError={() => {
            console.log('加载失败')
          }}
        />
      </div>
    </>
  )
}
