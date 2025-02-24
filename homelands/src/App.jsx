import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { MainLayout } from "./layout/mainLayout"
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Sale } from './pages/Sale'
import { NotFound } from "./pages/NotFound"


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="sale" element={<Sale />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
