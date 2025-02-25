

const ProductoConsultar = ({producto}) => {
  
 

    return (
     <>
     <div>
      <h2>Detalle del Producto</h2>
      <p><strong>Nombre:</strong>{producto.nombre}</p>
      <p><strong>Precio:</strong>{producto.precio}</p>
      <p><strong>Descripcion:</strong>{producto.descripcion || "Sin descripcion"}</p>
     </div>
     </>
    );
  };
  
  export default ProductoConsultar;
  