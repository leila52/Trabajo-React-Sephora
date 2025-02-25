
import http from "./http-axios.js";

class ServicioInformacion {
  getAll() {
    return http.get("/informacion");
  }

  get(id) {
    return http.get(`/informacion/${id}`);
  }

  create(data) {
    return http.post("/informacion", data);
  }

  update(id, data) {
    console.log(id,data)
    return http.put(`/informacion/${id}`, data);
  }

  delete(id) {
    return http.delete(`/informacion/${id}`);
  }
}

export default new ServicioInformacion();
