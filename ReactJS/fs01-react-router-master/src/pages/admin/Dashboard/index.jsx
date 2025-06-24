import { Navigate, Link } from 'react-router-dom'

function Dashboard() {
  const isAdmin = true

  if (!isAdmin) return <Navigate to="/" replace />
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg">Welcome to the admin dashboard!</p>
      <Link to="/admin/chart">Go to Chart Page</Link>
      <br />
      <Link to="/">Go to Home Page</Link>
    </div>
  )
}
export default Dashboard
