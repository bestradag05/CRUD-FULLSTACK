import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import CuentaConfirmada from './Pages/CuentaConfirmada';
import CambiarPassword from './Pages/CambiarPassword';
import ActualizarPassword from './Pages/ActualizarPassword';
import { AuthProvider } from './context/AuthProvider';
import RutaProtegida from './layout/RutaProtegida';
import Dashboard from './Pages/Dashboard';


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/confirmar/:token' element={<CuentaConfirmada />} />
          <Route path='/cambiarpassword' element={<CambiarPassword />} />
          <Route path='/recuperar-password/:token' element={<ActualizarPassword />} />

          <Route path='/admin' element={<RutaProtegida />} >
              <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )


}

export default App
