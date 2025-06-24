import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Sidebar from '../Sidebar'

import styles from './styles.module.css'

function AdminLayout() {
  const [isShowSidebar, setIsShowSidebar] = useState(false)
  return (
    <div className={styles.app}>
      <Header
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
      />
      <div className={styles.main}>
        <Sidebar
          isShowSidebar={isShowSidebar}
          setIsShowSidebar={setIsShowSidebar}
        />
        <div
          className={styles.content}
          style={{ marginLeft: isShowSidebar ? '250px' : '0' }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
