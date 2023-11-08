import React from 'react'
import {Layout} from 'antd'
import {Content, Header} from 'antd/es/layout/layout'
import Sider from 'antd/es/layout/Sider'
import NavItems from './navigation/NavItems'
import NavMenu from './navigation/NavMenu'

const PageLayout = ({children}) => {
    return (
        <Layout style={{height: '100%'}}>
            <Sider breakpoint="lg" collapsedWidth="0">
                <div
                    style={{
                        height: 32,
                        background: 'rgba(255, 255, 255, 0.2)',
                        margin: '16px 8px',
                    }}
                    className="logo"
                />
                <NavMenu Items={NavItems}/>
            </Sider>
            <Layout style={{height: '100%', overflow: 'scroll'}}>
                <Header
                    style={{
                        padding: 0,
                        background: 'white',
                    }}
                />
                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default PageLayout;
