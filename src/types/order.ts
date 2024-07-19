export interface GetParams{
    page:number,
    limit:number
}

export interface CreateOrder{
    amount:number,
    client_full_name:number,
    client_phone_number:string,
    service_id:string
}

export interface DeleteOrder{
    id:string
}


export interface UpdateOrder{
    client_phone_number: string;
    amount: number;
    client_full_name: number;
    service_id: string;
    id: any;
    status: string;
    client_id: string;
}

export interface Request{
    get: (params: GetParams) => Promise<any>;
    create: (data: CreateOrder) => Promise<any>;
    delete: (id: DeleteOrder) => Promise<any>;
    update: (update: UpdateOrder) => Promise<any>;
}


