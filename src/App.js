import {Route,Routes} from 'react-router-dom'
import './App.css';
import Navbar from './components/navbar'
import About from './components/pages/About';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
function App() {
  return (
    <>
    <Navbar/>
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/About" element={<About/>}/>
        <Route exact path="/Home" element={<Home/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
