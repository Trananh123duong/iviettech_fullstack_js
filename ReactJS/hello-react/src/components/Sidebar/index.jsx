import React from 'react'
import styles from './styles.module.css'

const Sidebar = ({isShowSiderBar, toggleIsShowSiderBar}) => {
  return (
    <div className={`${styles.sidebar_container} ${isShowSiderBar ? styles.show_sidebar : ''}`}>
      <button type="button" className="menuButton btn btn-danger"  onClick={toggleIsShowSiderBar}>Close</button>
      
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
