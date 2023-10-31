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
import Login from './pages/Login';
import ProductForm from './components/ProductForm';
import ProductDataTable from './components/ProductDataTable';

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/read/:id' element={<Read />} />
          <Route path='/about' element={<About />} />
          <Route path='/service' element={<Service />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/create' element={<ProductForm edit={false} />} />
          <Route path='/edit' element={<ProductForm edit={true} />} />
          <Route path='*' element={<NotFound />}/>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<ProductDataTable />} />
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

