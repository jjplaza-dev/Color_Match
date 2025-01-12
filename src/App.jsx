import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainContent from "./Main/MainContent";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import AdminPage from "./Pages/AdminPage";

function App() {
  return (
    <>
      <nav>
        <ui>
          <a href="/login">Home</a>

          <a href="/main">Main</a>
        </ui>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/main" element={<MainContent />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
