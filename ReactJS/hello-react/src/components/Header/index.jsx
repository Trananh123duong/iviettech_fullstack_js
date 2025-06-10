import React from 'react'
import styles from './styles.module.css'

const Header = ({userImg, userName, toggleIsShowSiderBar}) => {
  return (
    <header>
      <div>
        <button type="button" className="menuButton btn btn-info"  onClick={toggleIsShowSiderBar}>Menu</button>
        <div className={styles.user}>
          <img src={userImg} width="40px" height="40px" alt="" />
          <p>{userName}</p>
        </div>
      </div>
    </header>
  )
}

export default Header
