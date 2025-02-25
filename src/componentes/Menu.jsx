import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { buscarProducto, obtenerCantidadTotal, AñadirSiHayMasDeUnProducto, borrarSiHayMasDeUnProducto } from "../herramientas/herramientas";
import "../estilos/Menu.css";
import { useAuth } from '../login/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Login from "../login/login";

const Menu = ({ total, setTotal, productoM, setProductoM, informacion,skinCare }) => {
    //para mostrar el carrito
    const [carritoVisible, setCarritoVisible] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [cantidad, setCantidad] = useState(1); // Cantidad por defecto 1

    


    const toggleCarrito = () => {
        console.log("Contenido del carrito:", productoM); // Ver qué hay en la lista
        setCarritoVisible(!carritoVisible);
    };
    const handleLogout = () => {
        logout();
        //localStorage.removeItem('token'); // Elimina el token
        navigate('/login');
    };


    //calculamos el total
    const calcularTotal = (productos, informacion) => {
        return productos.reduce((total, productito) => {
            // Busca el producto en la información completa
            const productoDetalle = buscarProducto(productito.nombre, productito.tono ? informacion : skinCare);
            if (productoDetalle) {
                // Si encuentra el producto, suma el precio total basado en la cantidad
                return total + productito.cantidad * productoDetalle.precio;
            }
            return total;
        }, 0);

    }


    // Función para decrementar 1 EN LA CANTIDAD
    const decrementarProducto = (nombre, tono) => {
        console.log(`Intentando restar 1 al producto: ${nombre}, Tono: ${tono}`);
        const productosActualizados = borrarSiHayMasDeUnProducto(productoM, nombre, tono);
        setProductoM(productosActualizados); // Actualiza el estado con la nueva lista de productos QUITÁNDOLO
        const nuevoTotal = calcularTotal(productosActualizados, informacion);
        console.log("Nuevo total después de eliminar:", nuevoTotal);
        setTotal(nuevoTotal);
    };

    // Función para INCREMENTAR 1 EN LA CANTIDAD
    const incrementarProducto = (nombre, tono) => {
        const productoEncontrado = productoM.find(prod => prod.nombre === nombre && prod.tono === tono);

        if (!productoEncontrado) return;

        if (productoEncontrado.cantidad >= 15) {
            Swal.fire({
                icon: 'error',
                title: 'Límite alcanzado',
                text: 'No puedes añadir más de 15 unidades de este producto.',
            });
            return;
        }

        const productosActualizados = AñadirSiHayMasDeUnProducto(productoM, nombre, tono);

        setProductoM(productosActualizados);
        setTotal(calcularTotal(productosActualizados, informacion));
    };
    return (
        <div>
            <div className="menu-container">
                <h1>Sephora</h1>
                <nav>
                    <ul className="menu-list">

                        {/* Si el usuario NO está logueado, mostrar solo "Login" */}
                        {user === null ? (
                            <>
                             <li className="menu-item">
                                <Link to="/login">Login</Link>
                               
                            </li>
                            <li className="menu-item">
                                 <Link to="/registrar">Registrar</Link>
                            </li>
                            </>
                           
                        ) : (
                            <>
                            <li className="menu-item">
                                    <Link to="/">Inicio</Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/maquillaje">Maquillaje</Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/skinCare">Skin Care</Link>
                                </li>
                                <li className="menu-item">
                                    <Link to="/detalle-carrito">Carrito</Link>
                                </li>
                                <li className="menu-item saludo">
                                    Bienvenido {user}
                                </li>
                                
                                <li className="menu-item carrito-container">
                                    <span>Productos {productoM.length}  Precio : {total.toFixed(2)}</span>
                                    <button className="toggle-carrito" onClick={toggleCarrito}>🛒</button>
                                </li>
                                <li className="menu-item">
                                    <button className="btn-salir" onClick={handleLogout}>
                                        Salir
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>


            {/* Si el usuario ESTÁ logueado, mostrar el carrito */}
            {user !== null && carritoVisible && (
                <div className="carrito-productos">
                <h4 className="carrito-titulo">Carrito</h4>
                {productoM.length > 0 ? (
                    <ul className="carrito-lista">
                        {productoM.map((productito, index) => (
                            <li key={index} className="carrito-item">
                                <div className="carrito-info">
                                    <span className="carrito-nombre">Producto: {productito.nombre} </span>
                                    <span className="carrito-cantidad">Cantidad: {productito.cantidad}</span>
                                    <span className="carrito-tono">Tono: {productito.tono} </span>
                                </div>
                                <div className="carrito-botones">
                                    <button 
                                        className="carrito-btn carrito-btn-add" 
                                        onClick={() => incrementarProducto(productito.nombre, productito.tono)}
                                    >
                                        Añadir
                                    </button>
                                    <button 
                                        className="carrito-btn carrito-btn-remove" 
                                        onClick={() => decrementarProducto(productito.nombre, productito.tono)}
                                    >
                                        Restar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="carrito-vacio">No hay productos en el carrito.</p>
                )}
            </div>
            
            )}
        </div>
    );

}
export default Menu;