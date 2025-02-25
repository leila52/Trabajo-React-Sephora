
import React, { useEffect, useState } from "react";
import servicioInformacion from "../serviciosAxios/servicioInformacion";
import { buscarProducto, añadir } from "../herramientas/herramientas";
import "../estilos/Cuerpo.css";
import Swal from 'sweetalert2';

const Cuerpo = ({ informacion, setInformacion, productoM, setProductoM, total, setTotal }) => {
    //para saber que tono se ha seleccionado y almacenarlo
    const [tonosSeleccionados, setTonosSeleccionados] = useState({});
    //coger inormacioon del json que es informacion
    

    const manejarCambioTono = (productoId, tono) => {
        setTonosSeleccionados(prevTonos => ({
            ...prevTonos,
            [productoId]: tono.nombre
        }));
    };
    const AnadirACesta = (nombre, precio, productoId) => {
        //cogemos el tono del producto
        const tonoSeleccionado = tonosSeleccionados[productoId];
        //si no seleccionada sale un swall
        if (!tonoSeleccionado) {
            Swal.fire("Selecciona un tono", "Debes elegir un tono antes de añadir el producto", "warning");
            return;
        }
        // actualizamos el total
        setTotal(total + precio);
        // verificamos si el producto con ese tono ya está en la cesta
        let productoExistente = false;
        let nuevaLista = productoM.map(p => {
            if (p.nombre === nombre && p.tono === tonoSeleccionado) {
                productoExistente = true;
                return { ...p, cantidad: p.cantidad + 1 };
            }
            return p;
        });

        if (!productoExistente) {
            nuevaLista.push({ nombre, tono: tonoSeleccionado, cantidad: 1 });
        }

        setProductoM(nuevaLista);

        Swal.fire("Producto añadido a la cesta", `${nombre} (${tonoSeleccionado}) añadido`, "success");
    };

/**  */


    return (
        <>
            <ul className="informacion-list">
                {informacion.length > 0 ? (
                    informacion.map((info) => (
                        <li key={info.id} className="info-item">
                            <img src={info.url} alt={info.nombre} />
                            <div>
                                <strong>{info.nombre}</strong>: €{info.precio.toFixed(2)}
                            </div>
                            <div className="tonos-container">
                            {info.tonos_disponibles.map((tono,key) => (
                                <label key={key} className="tono-label">
                                    <input
                                        type="radio"
                                        name={`tono-${info.id}`}
                                        value={tono.nombre}
                                        checked={tonosSeleccionados[info.id] === tono.nombre}
                                        onChange={() => manejarCambioTono(info.id, tono)}
                                        className="tono-radio"
                                    />
                                    <img src={tono.imagen} alt={tono.nombre} className="tono-imagen" />
                                </label>
                            ))}
                        </div>
                            <div>
                                <button onClick={() => AnadirACesta(info.nombre, info.precio, info.id)}>
                                    Añadir a la cesta
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No se encontraron servicios.</p>
                )}

            </ul>
        </>

    );
}
export default Cuerpo;
