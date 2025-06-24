import styles from './styles.module.css'

function Sidebar({ isShowSidebar, setIsShowSidebar }) {
  return (
    <div
      className={styles.sidebar}
      style={{ left: isShowSidebar ? '0' : '-250px' }}
    >
      <button onClick={() => setIsShowSidebar(!isShowSidebar)}>Close</button>
      <ul>
        <li>Dashboard</li>
        <li>Settings</li>
        <li>Profile</li>
        <li>Logout</li>
      </ul>
    </div>
  )
}

export default Sidebar
