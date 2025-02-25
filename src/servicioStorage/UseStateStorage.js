import { useEffect, useState } from "react";
import LocalStorageServicio from "./LocalStorageServicio";

function UseStateStorage(clave , valorInicial){
    //inicializar la variable
    const [state,setSate]=useState(()=>{
        const valorGuardado=LocalStorageServicio.get(clave);
        return valorGuardado !== null ? valorGuardado : valorInicial;
    
    });
    //guardar cada vez que se modifica
    useEffect(()=>{
        LocalStorageServicio.set(clave,state);

    },[state]);
      return[state,setSate];  
}
export default UseStateStorage;