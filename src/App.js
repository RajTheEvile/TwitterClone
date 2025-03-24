import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />
       
        
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
