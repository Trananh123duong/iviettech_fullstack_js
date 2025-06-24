import styles from './styles.module.css'

function Header({ isShowSidebar, setIsShowSidebar }) {
  return (
    <div className={styles.header}>
      <button onClick={() => setIsShowSidebar(!isShowSidebar)}>Menu</button>
      <h2>Username</h2>
    </div>
  )
}

export default Header
