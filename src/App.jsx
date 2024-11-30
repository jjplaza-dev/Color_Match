import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainContent from "./Main/MainContent";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {
  return (
    <>
      <nav>
        <ui>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/main">Main</a>
          </li>
        </ui>
      </nav>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/main" element={<MainContent />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
