import { Route, Routes } from 'react-router-dom'
import Management from './pages/Management'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Management />} />
      {/* <Route path='/:id' element={<List />} /> */}
    </Routes>
  )
}

export default App
