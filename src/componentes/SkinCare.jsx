import ProductoConsultar from './ProductoConsultar';
import Modal from './Modal';
import React, { useState } from "react";
import ServicioUsuario from "../servicioLogIn/ServicioUsuario";
import { buscarProducto, añadir } from "../herramientas/herramientas";
import "../estilos/SkinCare.css";
import Swal from 'sweetalert2';

const SkinCare = ({ skinCare, setSkinCare, productoM, setProductoM, total, setTotal }) => {
    // Almacenar los errores del Formulario
    const [errores, setErrores] = useState({});
    const [form, setForm] = useState({ nombre: '', precioMenor: "", precioMayor: "" });
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
    const [modal, setModal] = useState({
        consultar: false
    });



    const gestionarModal = (tipo, estado, producto = null) => {
        setModal({ ...modal, [tipo]: estado });
        if (tipo === "consultar")
            setProductoSeleccionado(producto)
    }
    const gestionarCambio = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });


    };
    const validar = () => {
        const nuevosErrores = {};

        // Validar que el nombre no esté vacío si se ingresa
        if (form.nombre.trim() && !/^[a-zA-Z\s]+$/.test(form.nombre)) {
            nuevosErrores.nombre = 'El nombre solo puede contener letras y espacios.';
        }
        // Validar que los precios sean números válidos
        if (form.precioMayor.trim() && isNaN(form.precioMayor)) {
            nuevosErrores.precioMayor = "El precio mayor tiene que ser un valor numerico"
        }
        if (form.precioMenor.trim() && isNaN(form.precioMenor)) {
            nuevosErrores.precioMenor = "El precio menor tiene que ser un valor numerico"
        }
        // Validar que el precio mínimo no sea negativo
        if (form.precioMenor.trim() && Number(form.precioMenor) < 0) {
            nuevosErrores.precioMenor = "El precio menor tiene que ser positivo"
        }
        // Validar que el precio mínimo no sea mayor que el precio máximo
        console.log(form)
        if (form.precioMenor.trim() && !isNaN(form.precioMenor) && form.precioMayor.trim() && !isNaN(form.precioMayor)) {
            if (Number(form.precioMenor) > Number(form.precioMayor)) {
                nuevosErrores.precioMenor = "El precio minimo no puede ser mayor al precio maximo"
            }
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };


    // Función para manejar el envío del formulario
    const enviarFormulario = (e) => {
        e.preventDefault(); // Evita que el formulario se envíe automáticamente

        // Validar el formulario antes de enviar
        if (validar()) {
            // Si el campo "nombre" está lleno, buscar por nombre
            if (form.nombre.trim() !== "") {
                ServicioUsuario.getPorNombre(form.nombre)
                    .then((response) => {
                        const productosFiltrados = response.data.filter(producto =>
                            producto.nombre.toLowerCase().startsWith(form.nombre.toLowerCase())
                        );
                        setSkinCare(productosFiltrados);
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "No se ha podido descargar la información..."
                        });

                        console.error(error); // Muestra el error en la consola
                    });
            }
            // Si los campos de precio están llenos, buscar por precio
            else if (form.precioMenor.trim() !== "" || form.precioMayor.trim() !== "") {
                ServicioUsuario.getPorPrecio(form.precioMenor, form.precioMayor)
                    .then((response) => {
                        setSkinCare(response.data); // Actualiza el estado con los resultados
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "No se ha podido descargar la información..."
                        });

                        console.error(error); // Muestra el error en la consola
                    });
            }
            // Si no se llenó ningún campo, mostrar un mensaje
            else {
                Swal.fire({
                    text: "Por favor, complete al menos un campo para buscar.",
                    icon: "question"
                });

            }
        } else {
            Swal.fire({
                text: "Por favor, corrija los errores en el formulario antes de enviar.",
                icon: "error"
            });

        }
    };

    const consultar = (item) => {
        setProductoSeleccionado(item)
        setModal(prevState => ({
            ...prevState,
            consultar: true
        }));
    }
    const limpiarFormulario = () => {
        setForm({
            nombre: '',
            precioMenor: "",
            precioMayor: "",
        })
        setErrores({})
    }

    const AnadirACesta = (nombre, precio) => {
        setTotal(total + precio);

        if (buscarProducto(nombre, productoM) === null) {
            setProductoM((elegidoProducto) => [...elegidoProducto, { nombre, cantidad: 1 }]);
            console.log(productoM);
        } else {
            setProductoM((elegidoProducto) => añadir(elegidoProducto, nombre))
            console.log(productoM);
        }
        Swal.fire("Producto añadido a la cesta", `${nombre} añadido`, "success");
    }


    return (
        <>
            <div className="filters">
                <form onSubmit={enviarFormulario}>
                    {/* Campo de texto para nombre */}
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={gestionarCambio}
                        placeholder="Escribe tu nombre"
                    />
                    {errores.nombre && <p className="error">{errores.nombre}</p>}

                    {/* Campo de texto para apellidos */}
                    <label htmlFor="apellidos">Precio Mínomo</label>
                    <input
                        id="precioMenor"
                        type="text"
                        name="precioMenor"
                        value={form.precioMenor}
                        onChange={gestionarCambio}
                        placeholder="importe Mínimo"
                    />
                    {errores.precioMenor && <p className="error">{errores.precioMenor}</p>}

                    <label htmlFor="apellidos">Precio Máximo</label>
                    <input
                        id="precioMayor"
                        type="text"
                        name="precioMayor"
                        value={form.precioMayor}
                        onChange={gestionarCambio}
                        placeholder="importe Máximo"
                    />
                    {errores.precioMayor && <p className="error">{errores.precioMayor}</p>}

                    <button type="submit">Buscar</button>
                    <button type="button" onClick={() => limpiarFormulario()}>Limpiar</button>
                </form>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Nombre</th>
                        <th>Precio (€)</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="productTable">

                    {skinCare.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <img src={item.url} alt="" />
                            </td>
                            <td>{item.nombre}</td>
                            <td>{item.precio}</td>
                            <td className="actions">
                                <button onClick={() => AnadirACesta(item.nombre, item.precio)}>
                                    Añadir a la cesta
                                </button>
                                <button className="view" onClick={() => consultar(item)}>Consultar</button>
                            </td>
                        </tr>


                    ))}


                </tbody>
            </table>
            <Modal isOpen={modal.consultar} onClose={() => gestionarModal("consultar", false)}>
                {productoSeleccionado && (<ProductoConsultar producto={productoSeleccionado}></ProductoConsultar>)}
            </Modal>

        </>

    );
};

export default SkinCare;
