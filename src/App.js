import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import { ModeProvider } from "./Context/UserDataContext"; // Correct import

function App() {
  return (
    <ModeProvider> {/* ✅ Use ModeProvider instead of UserDataContext */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Route>
      </Routes>
    </ModeProvider>
  );
}

export default App;

