export interface GetParams {
    page: number;
    limit: number;
    name?: string;
  }
  
  export interface CreateService {
    name: string;
    price: number | string;
  }
  
  export interface UpdateService extends CreateService {
    id: string;
  }
  
  export interface Request {
    get: (params: GetParams) => Promise<any>;
    create: (data: CreateService) => Promise<any>;
    delete: (id: string) => Promise<any>;
    update: (update: UpdateService) => Promise<any>;
  }

