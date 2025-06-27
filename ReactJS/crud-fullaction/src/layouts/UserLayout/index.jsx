import { Outlet } from "react-router-dom"
import Footer from "../../components/user/Footer"
import Header from "../../components/user/Header"
import * as S from "./styles"

const UserLayout = () => {
  return (
    <>
      <Header />
      <S.MainUserLayout>
        <Outlet />
      </S.MainUserLayout>
      <Footer />
    </>
  )
}

export default UserLayout
