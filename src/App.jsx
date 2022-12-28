import { useContext } from "react"
import { Routes, Route} from "react-router-dom"
import Login from "./components/Login"
import Main from "./components/Main"
import Header from "./components/Header"
import Footer from "./components/Footer"
import AuthContext from "./Store/auth-context"


function App() {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div className="app-container">
      <Header/>
      <Routes>
        (<Route path="/" element={ <Login/> } />)
        {isLoggedIn && (<Route path="main" element={ <Main/> } />)}
      </Routes>
      <Footer/>
    </div>
  )
}

export default App