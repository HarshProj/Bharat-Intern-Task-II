import './App.css';
import { Blog } from './Components/Blog';
import { Home } from './Components/Home';
import { Login } from './Components/Login';
import { useDropzone } from "react-dropzone"
import { Register } from './Components/Register';
import{
  BrowserRouter as Router,
  Route,
  Routes
} from'react-router-dom'
function App() {
  return (
    <Router>
    <Routes>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    <Routes>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    <Routes>
      <Route path='/' element={<Login/>}/>
    </Routes>
    <Routes>
      <Route path='/createblog' element={<Blog/>}/>
    </Routes>
    </Router>
  );
}

export default App;
