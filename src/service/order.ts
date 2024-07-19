import htpp from "./config";
import { Request } from "../types/order";

const order: Request ={
    get:(params)=>htpp.get("/order/search",{params}),
    create:(data)=>htpp.post("/order", data),
    delete:(id)=>htpp.delete("/order", {params:{id}}),
    update: (data) => htpp.put(`/order`, data), 
}


export {order}