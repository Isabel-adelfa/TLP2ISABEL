import {createConnection} from "mysql"


export const db = createConnection({
    port:"3306",
    user:"root",
    password:"",
    host:"localhost",
    database:"adelstory"
}, console.log("Conectado com sucesso!"))