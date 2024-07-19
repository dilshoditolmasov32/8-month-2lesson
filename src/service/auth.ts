import htpp from './config'
import { Request } from '../types/auth'

const auth:Request={
    sign_in:(data)=>htpp.post('auth/login', data)
}

export {auth}