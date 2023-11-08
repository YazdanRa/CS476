import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.module.css'

const BouncingDots = ({width, height}) => {
    // const colorPalette = useSelector(({ theme }) => theme.palette)

    return (
        <div className={styles.bouncing_loader}>
            {/* <div
        style={{ background: colorPalette.primary.op_1, width, height }}
      ></div>
      <div
        style={{ background: colorPalette.primary.op_1, width, height }}
      ></div>
      <div
        style={{ background: colorPalette.primary.op_1, width, height }}
      ></div> */}
        </div>
    )
}

BouncingDots.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
}

BouncingDots.defaultProps = {
    width: 16,
    height: 16,
}

export default BouncingDots
