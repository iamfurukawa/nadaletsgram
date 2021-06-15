import React, { useEffect, useState } from 'react'
import HorizontalTimeline from 'react-horizontal-timeline'

import ImageService from '../services/images.js'

import styles from './pages.module.scss'
import Photos from './photos/index.js'

const App = () => {

  const [actual, setActual] = useState(0)
  const [images, setImages] = useState(new Map())
  const [history, setHistory] = useState([])

  useEffect(() => {
    var imagesMap = {}

    const addValueToKey = (key, value) => {
      imagesMap[key] = [];
      imagesMap[key].push(value);
    }

    const imagesFetch = ImageService.getAll()
    const timelineDates = imagesFetch.map(name => name.default.replaceAll('/static/media/', '').replaceAll('[', '').split(']')[0])

    timelineDates.forEach(date => {
      const imagesByDate = imagesFetch.filter(imgs => imgs.default.includes(date))
      addValueToKey(date, imagesByDate)
    })

    setImages(imagesMap)
    setHistory([...new Set(timelineDates)].reverse())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //
  return (
    <>
      <div className={styles.content}>
        <h1 className={styles.title}>Nadaletsgram</h1>
        <div style={{ width: '90%', height: '100px', margin: '0 auto' }}>
          <HorizontalTimeline
            getLabel={(date) => date?.toString().split('-').reverse().join('-').replaceAll(/-/g, '/')}
            minEventPadding={50}
            maxEventPadding={50}
            isOpenBeginning={true}
            index={actual}
            indexClick={(index) => setActual(index++)}
            values={history}
            styles={{ background: '#f8f8f8', foreground: 'gray', outline: '#dfdfdf' }}
          />
        </div>
        <div>
          <Photos photosUrl={images[history[actual]] !== undefined ? images[history[actual]][0] : []} />
        </div>
      </div>
      <footer>
        <center>
          Made with ❤️ by iamfurukawa and ibagens sensacionais by nadaletsky
        </center>
      </footer>
    </>
  )
}

export default App
