import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import userImg from '/user.png'
import { useState } from 'react'

function App() {
  const [isShowSiderBar, setIsShowSiderBar] = useState(false)

  return (
    <>
      <Header userImg={userImg} userName='Tran Anh Duong'/>
      <button type="button" className="menuButton btn btn-info"  onClick={() => setIsShowSiderBar(prev => !prev)}>Menu</button>
      <div className='bodyPage'>
        <Sidebar isShowSiderBar={isShowSiderBar}/>
        <Main isShowSiderBar={isShowSiderBar}/>
      </div>
      <Footer/>
    </>
  )
}

export default App
