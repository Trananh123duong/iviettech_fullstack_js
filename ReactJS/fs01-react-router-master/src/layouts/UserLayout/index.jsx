import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

function UserLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <div>
        <h1>User Header</h1>
        <Outlet />
        <h1>User Footer</h1>
      </div>
    </>
  )
}

export default UserLayout
