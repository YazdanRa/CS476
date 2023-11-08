import React from 'react'

import ReactLoading from 'react-loading'
import styles from './styles.module.css'

const SplashScreen = () => {
    return (
        <div className={styles.splash}>
            <ReactLoading
                type={'spinningBubbles'}
                color={'#0000ff'}
                height={'20%'}
                width={'20%'}
            />
        </div>
    )
}

export default SplashScreen;
