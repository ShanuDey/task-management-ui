import { Route, Routes } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import Register from "./page/Register";
import Welcome from "./page/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
