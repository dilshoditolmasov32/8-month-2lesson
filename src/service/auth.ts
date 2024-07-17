import htpp from './config'
import { Request } from '../types/auth'

const auth={
    sign_in:(data:Request)=>htpp.post('auth/login', data)
}

export {auth}