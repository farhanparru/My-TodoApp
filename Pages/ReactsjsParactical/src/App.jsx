import "./App.css";
import Todo from "./Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Register from "./Register";
import Login from '../src/login'
import RecoverPassword from '../src/RecoverPassword'
import ChangePassword from '../src/UpdatePassword'
import ServerErro from "./ServerErro";

function App() {
  return (
    <div>
      <Router> 
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/todo" element={<Todo/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<ServerErro/>}/>
          <Route path="/recoverPassword" element={<RecoverPassword/>}/>
          <Route path="/forgotpassword/:id/:token" element={<ChangePassword/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
