import "./App.css";
import { ToastContainer } from "react-toastify";
import Todo from "./Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Register from "./Register";
import Login from '../src/login'

function App() {
  return (
    <div>
      <Router> 
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/todo" element={<Todo/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
