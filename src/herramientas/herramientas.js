export function buscarProducto(nombre , informacion){
    console.log(informacion,nombre) 
      return informacion.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase()) || null
    }
  export function añadir(informacion,nombre){
      console.log("estoy buscando"+nombre)
      return informacion.map(producto => {
        if (producto.nombre === nombre) {   
            return {  "nombre": producto.nombre, cantidad: producto.cantidad + 1 }; // Copia segura
        }   
        return producto;
      })  
  }
  //funciones que almacena todos los productos añadidos
  export function obtenerCantidadTotal(informacion){
    let total=0
    informacion.forEach(producto=> {total += producto.cantidad});
    return total
  }
  
  export function AñadirSiHayMasDeUnProducto(informacion, nombre, tono){
    console.log("Añadiendo uno más de", nombre, "con tono", tono);
    return informacion.map(producto => {
      if (producto.nombre === nombre && (tono ? producto.tono === tono : producto.tono === undefined || producto.tono === null)) {
            return { ...producto, cantidad: producto.cantidad + 1 };
        }
        return producto;
    }).filter(producto => producto.cantidad > 0);
}
  
export function borrarSiHayMasDeUnProducto(informacion, nombre, tono) {
  console.log("Restando uno a", nombre, "con tono", tono);
  return informacion
      .map(producto => {
        if (producto.nombre === nombre && (tono ? producto.tono === tono : producto.tono === undefined || producto.tono === null)) {
              // Si el producto tiene solo 1 unidad, lo quitamos
              if (producto.cantidad === 1) {
                  return null; // Eliminamos el producto de la lista
              }
              return { ...producto, cantidad: producto.cantidad - 1 };
          }
          return producto;
      })
      .filter(producto => producto !== null); // Filtramos productos eliminados
}


  
  //borrar todo
  export function borrarTodo(informacion, nombre) {
    console.log("Productos antes de eliminar:", informacion);
    console.log("Eliminando completamente: " + nombre);
    const productosFiltrados = informacion.filter(
      (producto) => producto.nombre.toLowerCase() !== nombre.toLowerCase()
    );
    console.log("Productos después de eliminar:", productosFiltrados);
    return productosFiltrados;
  }