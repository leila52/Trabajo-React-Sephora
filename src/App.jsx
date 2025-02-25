import './App.css'
import { useEffect, useState } from 'react'
import Menu from './componentes/Menu';
import Cuerpo from './componentes/Cuerpo';
import Pagina404 from './componentes/Pagina404';
import UseStateStorage from './servicioStorage/UseStateStorage';
import ServicioUsuario from './servicioLogIn/ServicioUsuario';
//npm install react-router-dom
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './login/AuthProvider';
import Login from './login/login';
import RutasProtegida from './login/RutasProtegidas';
import DetalleCarrito from './componentes/DetalleCarrito';
import SkinCare from './componentes/SkinCare';
import Inicio from './componentes/Inicio';
//import Productos from './componentes/Productos';
import Registrar from './componentes/Reguistrar';

function App() {
  const [informacion, setInformacion] = useState([]);
  const [skinCare, setSkinCare] = useState([]);
  useEffect(() => {
    ServicioUsuario.getAllInformacion()
      .then((response) => {
        //almacenamos toda la info
        setInformacion(response.data);
      })
      .catch((error) => {
        Swal.fire({
          title: "¿Tienes Internet?",
          text: "No consigo descargar las aficiones :(",
          icon: "question",
        });
      });
  },//importante poner esto 
    []);
  useEffect(() => {
    ServicioUsuario.getAllSkinCare()
      .then((response) => {
        //almacenamos toda la info
        setSkinCare(response.data);
      })
      .catch((error) => {
        Swal.fire({
          title: "¿Tienes Internet?",
          text: "No consigo descargar las aficiones :(",
          icon: "question",
        });
      });
  },//importante poner esto 
    []);
  const [productoM, setProductoM] = UseStateStorage("productoM", []);
  const [total, setTotal] = UseStateStorage("total", 0);
  return (
    <AuthProvider>
      <Menu
        total={total}
        setTotal={setTotal}
        productoM={productoM}
        setProductoM={setProductoM}
        informacion={informacion}
        skinCare={skinCare}
      />
      <Routes>

        <Route
          path="/"
          element={
            <RutasProtegida>
              <Inicio
              />
            </RutasProtegida>
          }
        />
        {/* Ruta anidada de Productos
        <Route path="/productos" element={<RutasProtegida><Productos /></RutasProtegida>}>

          <Route path="maquillaje" element={<Cuerpo informacion={informacion} setInformacion={setInformacion} productoM={productoM} setProductoM={setProductoM} total={total} setTotal={setTotal} />} />
          <Route path="skinCare" element={<SkinCare skinCare={skinCare} setSkinCare={setSkinCare} productoM={productoM} setProductoM={setProductoM} total={total} setTotal={setTotal} />} />
        </Route>
        */}
        


        <Route path="/maquillaje" element={
          <RutasProtegida>
            <Cuerpo
              informacion={informacion}
              setInformacion={setInformacion}
              productoM={productoM}
              setProductoM={setProductoM}
              total={total}
              setTotal={setTotal}
            />
          </RutasProtegida>
        } />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/registrar"
          element={<Registrar />}
        />
        <Route path="/detalle-carrito" element={
          <RutasProtegida>
            <DetalleCarrito productoM={productoM} informacion={informacion} skinCare={skinCare} />
          </RutasProtegida>
        } />
        <Route
          path="/skinCare"
          element={
            <RutasProtegida>
              <SkinCare
                skinCare={skinCare}
                setSkinCare={setSkinCare}
                productoM={productoM}
                setProductoM={setProductoM}
                total={total}
                setTotal={setTotal}
              />
            </RutasProtegida>
          }
        />


        <Route path="*" element={<Pagina404 />} />

      </Routes>

    </AuthProvider>
  )
}

export default App
