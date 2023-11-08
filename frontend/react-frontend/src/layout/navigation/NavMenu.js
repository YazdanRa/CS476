import {Menu} from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import React from 'react'
import {Link, useLocation} from 'react-router-dom'

const NavMenu = ({Items}) => {
    const {pathname} = useLocation()

    return (
        <Menu theme="dark" defaultSelectedKeys={[pathname]} mode="inline">
            {Items.map(({title, icon, path, hasSubmenu, key, subMenu, link}) => {
                if (hasSubmenu) {
                    return (
                        <SubMenu
                            key={key}
                            title={title}
                            icon={<span style={{marginLeft: 8}} className={icon}></span>}
                        >
                            {subMenu.map(({title, path}) => (
                                <Menu.Item style={{marginBottom: 12}} key={path}>
                                    <Link to={path}>{title}</Link>
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    )
                }
                return (
                    <Menu.Item
                        style={{marginBottom: 12}}
                        key={path}
                        icon={<span className={icon}></span>}
                    >
                        {path ? (
                            <Link to={path}>{title}</Link>
                        ) : (
                            <a href={link} target="_blank" rel="noreferrer noopener">
                                {title}
                            </a>
                        )}
                    </Menu.Item>
                )
            })}
        </Menu>
    )
}

export default NavMenu
