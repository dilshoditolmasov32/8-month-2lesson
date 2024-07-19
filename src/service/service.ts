import http from "./config";
import { Request } from "../types/service";

const service: Request = {
  get: (params) => http.get("/service/all", { params }),
  create: (data) => http.post("/service", data),
  delete: (id) => http.delete(`/service?id=${id}`),
  update: (data) => http.put(`/service`, data),
};

export { service };