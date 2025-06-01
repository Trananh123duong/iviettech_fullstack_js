import React from 'react'
import SiderBarCss from './Sidebar.module.css'

const Sidebar = ({isShowSiderBar, toggleIsShowSoderBar}) => {
  return (
    <div className={`${SiderBarCss.sidebar_container} ${isShowSiderBar ? SiderBarCss.show_sidebar : ''}`}>
      <button type="button" className="menuButton btn btn-danger"  onClick={toggleIsShowSoderBar}>Close</button>
      
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
