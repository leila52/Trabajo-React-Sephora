import React, { useEffect, useState } from "react";
import "../estilos/registrar.css";
import bcrypt from "bcryptjs";
import Swal from "sweetalert2";
import ServicioUsuario from "../servicioLogIn/ServicioUsuario";

const Registrar = ({ }) => {
    const [errores, setErrores] = useState({});
  
  // Amacenar los valores del formulario(En todo momento!!!) 
  const [form, setForm] = useState({
    nombre: '',
    pass:'',
    cuentaBancaria:'',
    direccion:'',
  });
  const gestionarCambio = (e) => {
    const { name, value} = e.target;

    setForm({
      ...form,
      [name]:  value,
    });
  };
  const validar = () => {
    const nuevosErrores = {};

    // Validación para "nombre"
    if (!form.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }
    if(!form.pass.trim()){
        nuevosErrores.pass = 'La contraseña es obligatorio';
    }
     // Retorna true si no hay errores, de lo contrario retorna false
     return Object.keys(nuevosErrores).length === 0;
    };
    const enviarFormulario = (e) => {
        e.preventDefault();
        if (validar()) {
            //hasehar la contraseña para asi guardarla en el json
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(form.pass, salt);
            const usuarioNuevo = {
                nombre: form.nombre,
                pass: hashedPassword,
            };
            ServicioUsuario.registrarUsuario(usuarioNuevo)
                .then((response) => {
                    Swal.fire({
                        title: "¡Registro exitoso!",
                        text: "Tu usuario ha sido registrado correctamente.",
                        icon: "success",
                        confirmButtonText: "OK"
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        title: "Error",
                        text: "Hubo un problema al registrar el usuario.",
                        icon: "error",
                        confirmButtonText: "Intentar de nuevo"
                    });
                });
          }
        };
      

  return (
    <div className="login-container">
    <div className="login-box">
      <h2>Registro</h2>
      <form onSubmit={enviarFormulario}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={gestionarCambio}
          placeholder="Escribe tu nombre"
        />
        {errores.nombre && <p className="error-message">{errores.nombre}</p>}

        <label htmlFor="pass">Contraseña</label>
        <input
          id="pass"
          type="password"
          name="pass"
          value={form.pass}
          onChange={gestionarCambio}
        />
        {errores.pass && <p className="error-message">{errores.pass}</p>}

        <label htmlFor="cuentaBancaria">Cuenta Bancaria</label>
        <input
          id="cuentaBancaria"
          type="text"
          name="cuentaBancaria"
          value={form.cuentaBancaria}
          onChange={gestionarCambio}
          placeholder="Escribe tu cuenta bancaria"
        />

        <label htmlFor="direccion">Dirección</label>
        <input
          id="direccion"
          type="text"
          name="direccion"
          value={form.direccion}
          onChange={gestionarCambio}
          placeholder="Escribe tu dirección"
        />

        <button className="submit-button" type="submit">Enviar</button>
      </form>
    </div>
  </div>
  );
}
export default Registrar;