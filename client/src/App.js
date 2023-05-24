import './App.css';
import {useLocation,Route, Routes, Navigate} from 'react-router-dom';
import Landing  from '../src/components/Landing/Landing'
import Home from './components/Home/Home';
import AboutMe from './components/AboutMe/AboutMe';
import Details from './components/Detail/Details';
import Form from './components/Form/Form';
import NavBar from './components/Nav/Nav';
import Error from './components/Error/Error';
function App() {
  const location = useLocation();
  let path = location.pathname;
  return (

    <div>
       { path!=='/' && path !== '/404' ? <NavBar/> : null}
      <Routes>
        <Route path='/' element = {<Landing/>}/>
        <Route path='/home' element = {<Home/>}/>
        <Route path='/aboutMe' element = {<AboutMe/>}/>
        <Route path='/details/:id' element = {<Details/>}/>
        <Route path='/create' element = {<Form/>}/>
        <Route path='/404' element ={<Error/>}/>
        <Route path='*' element={<Navigate to='/404'/>}/>
      </Routes>
    </div>
  );
}

export default App;
