interface SignIn{
    email:string,
    password:number | string
}

export interface Request{
    sign_in:(data:SignIn)=>unknown
}