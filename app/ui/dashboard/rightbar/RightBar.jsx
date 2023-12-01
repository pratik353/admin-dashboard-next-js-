import React from 'react'
import styles from './rightbar.module.css'
import Image from 'next/image';
import { MdPlayCircleFilled } from 'react-icons/md';

const RightBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image className={styles.bg} src="/astronaut.png" alt="" fill/>
        </div>
        <div className={styles.texts}>
          <span className={styles.notification}>🔥 Available Now</span>
          <h1>How to use the new version of the admin dashboard?</h1>
          <span>Takes 4 minutes to learn</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae incidunt culpa quisquam praesentium doloremque architecto illo, quod sunt sequi a est debitis, veniam, iure sed?
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled/>
            Watch
          </button>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image className={styles.bg} src="/astronaut.png" alt="" fill/>
        </div>
        <div className={styles.texts}>
          <span className={styles.notification}>🔥 Available Now</span>
          <h1>How to use the new version of the admin dashboard?</h1>
          <span>Takes 4 minutes to learn</span>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae incidunt culpa quisquam praesentium doloremque architecto illo, quod sunt sequi a est debitis, veniam, iure sed?
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled/>
            Watch
          </button>
        </div>
      </div>
    </div>
  )
}

export default RightBar