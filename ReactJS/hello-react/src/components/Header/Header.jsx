import React from 'react'
import HeaderCss from './Header.module.css'

const Header = ({userImg, userName}) => {
  return (
    <header>
      <div>
        
        <div className={HeaderCss.user}>
          <img src={userImg} width="40px" height="40px" alt="" />
          <p>{userName}</p>
        </div>
      </div>
    </header>
  )
}

export default Header
