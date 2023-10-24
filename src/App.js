import logo from './logo.svg';
import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Read from './pages/Read';
import About from './pages/About';
import MyNav from './components/MyNav';
import MyFooter from './components/MyFooter';
import NotFound from './pages/404';
import Service from './pages/Service';
import Contact from './pages/Contact';

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/read' element={<Read />} />
          <Route path='/about' element={<About />} />
          <Route path='/service' element={<Service />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<NotFound />}/>
        </Route>
        <Route path="/login" element={<h1>Login</h1>} />
      </Routes>
  );
}

export default App;

// create main layout
function MainLayout(){
  return(
    <>
      <MyNav />
      <Outlet />
      <MyFooter />
    </>
  )
}

