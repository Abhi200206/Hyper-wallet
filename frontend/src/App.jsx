import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Signin from './components/Signin'
function App() {

  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/:user/dashboard' element={<Dashboard/>}/>
          {/* <Route path='/send' element={<Send/>}/> */}
          
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
