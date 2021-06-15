import React from 'react'

import styles from './photos.module.scss'

const Photos = ({ photosUrl = [] }) => {
  return (
    <div className={styles.content}>
      {
        photosUrl.map(photo => {
          if (photo.default.endsWith('.mp4'))
            return (
              <video width="320" height="240" className={styles.photo} controls> <source src={photo.default} type="video/mp4" />
              Your browser does not support the video tag. MELHOR USAR UM NAVEGADOR DE VDD!
              </video>
            )
          return (
            <div className={styles.img_wrap}>
              <img className={styles.photo} src={photo.default} alt={photo.default} />
              <p className={styles.img_description}>{photo.default.split(']')[1].split('.')[0].trim()}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Photos