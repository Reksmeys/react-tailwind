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
import { useEffect } from 'react';
import ProductFormik from './components/ProductFormik';

function App() {
  useEffect(() => {
    if (!localStorage.getItem('color-theme')){
      // set default theme to light
      localStorage.setItem('color-theme', 'light')
    }
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
  }, [])

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
          <Route path='/formik' element={<ProductFormik />} />
          <Route path='*' element={<NotFound />}/>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path='/logout' element={<Login />} />
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

