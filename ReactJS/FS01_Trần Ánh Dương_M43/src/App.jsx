import { Route, Routes } from 'react-router-dom'
import Management from './pages/Management'
import Edit from './pages/Edit'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Management />} />
      <Route path='/edit/:id' element={<Edit />} />
    </Routes>
  )
}

export default App
