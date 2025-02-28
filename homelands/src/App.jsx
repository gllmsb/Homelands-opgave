import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Sale } from "./pages/Sale";
import { Detail } from "./pages/Detail";
import { NotFound } from "./pages/NotFound";
import { UserProvider } from "./context/UserContext"; 

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="sale" element={<Sale />} />
            <Route path="login" element={<Login />} />
            <Route path="/property/:id" element={<Detail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
