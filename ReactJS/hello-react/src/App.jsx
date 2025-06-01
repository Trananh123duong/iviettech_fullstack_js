import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import userImg from '/user.png'
import { useState } from 'react'

function App() {
  const [isShowSiderBar, setIsShowSiderBar] = useState(false)

  function toggleIsShowSoderBar() {
    setIsShowSiderBar(!isShowSiderBar)
  }

  return (
    <>
      <Header userImg={userImg} userName='Tran Anh Duong' toggleIsShowSoderBar={toggleIsShowSoderBar} />
      <div className='bodyPage'>
        <Sidebar isShowSiderBar={isShowSiderBar} toggleIsShowSoderBar={toggleIsShowSoderBar}/>
        <Main isShowSiderBar={isShowSiderBar}/>
      </div>
      <Footer/>
    </>
  )
}

export default App
