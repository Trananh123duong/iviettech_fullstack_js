import React from 'react'
import SiderBarCss from './Sidebar.module.css'

const Sidebar = ({isShowSiderBar}) => {
  return (
    <div className={`${SiderBarCss.sidebar_container} ${isShowSiderBar ? SiderBarCss.show_sidebar : ''}`}>
      <menu id="menu">
        <ul>
          <li>Danh sach</li>
          <li>The loai</li>
          <li>Theo doi</li>
        </ul>
      </menu>
    </div>
  )
}

export default Sidebar
