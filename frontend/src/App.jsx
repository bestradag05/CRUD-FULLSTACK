import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import CuentaConfirmada from './Pages/CuentaConfirmada';
import CambiarPassword from './Pages/CambiarPassword';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/confirmar/:token' element={<CuentaConfirmada />} />
        <Route path='/cambiarpassword' element={<CambiarPassword />} />
      </Routes>
    </BrowserRouter>
  )


}

export default App
