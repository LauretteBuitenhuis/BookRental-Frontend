import { Routes, Route } from "react-router-dom"
import './styles/index.css';
import Login from "./components/Login"
import Main from "./components/Main"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { createAccount } from "./components/createAccount"

function App() {
  return (
    <div className="app-container">
      <Header/>
      <Routes>
        <Route path="/" element={ <Login/> }/>
        <Route path="main" element={ <Main/> }/>
        <Route path="/register" element={ <createAccount/> }/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App