import React, {useEffect, useState} from 'react'
import {useSelector, shallowEqual} from 'react-redux'
import {useLocation} from 'react-router-dom'
import HeaderStyles from './style'
import {Col, Drawer, Row} from 'antd'

import NavMenu from '../navigation/NavMenu'
import NavItems from '../navigation/NavItems'

const HeaderContent = () => {
    const [channels, setChannels] = useState([])
    const [visible, setVisible] = useState(false)
    const {refreshToken} = useSelector(
        ({auth}) => ({
            refreshToken: auth.refresh,
        }),
        shallowEqual,
    )
    const location = useLocation()

    useEffect(() => {
        setVisible(false)
    }, [location.pathname])

    return (
        <HeaderStyles>
            <Row>
                <Col xs={{span: 24, order: 2}} lg={{span: 12, order: 1}}></Col>
                <Col xs={{span: 24, order: 1}} lg={{span: 12, order: 2}}></Col>
            </Row>
            <Drawer
                placement="right"
                closable={true}
                onClose={() => setVisible(false)}
                visible={visible}
            >
                <NavMenu Items={NavItems}/>
            </Drawer>
        </HeaderStyles>
    )
}

export default HeaderContent;
