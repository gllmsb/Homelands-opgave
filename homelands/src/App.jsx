import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { mainLayout } from './layout/mainLayout'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Sale } from './pages/Sale'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<mainLayout />}>
            <Route index element={<Home />} />
            <Route path="sale" element={<Sale />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
