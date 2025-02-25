import http from "../serviciosAxios/http-axios";

class ServicioUsuario {
   getAllInformacion() {
     return http.get("/informacion");
   }
   getAllSkinCare() {
    return http.get("/skincare");
  }
  getPorNombre(nombre) {
    return http.get(`/skincare?nombre_like=^${nombre}`);
 }
 

 getPorPrecio(precioMenor,precioSuperior){
   let url= "/skincare?"
   if (precioMenor){
     url+=`precio_gt=${precioMenor}`
   }
   if (precioSuperior){
     url+=`&precio_lt=${precioSuperior}`
   }
   return http.get(url);
 }


   //encriptar contraseña
  login(usuario) {
   return http.get(`/usuarios?nombre=${usuario}`)
      //return http.get(`/usuarios?nombre=${usuario}&pass=${pass}`);
      //http://localhost:3000/usuarios?nombre=agustin&pass=123
   }
   registrarUsuario(usuario) {
    return http.post("/usuarios", usuario);
 }
}

export default new ServicioUsuario();
