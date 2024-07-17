import * as Yup from "yup"


//==============   AUTH   =================

export const signInValidationSchema=Yup.object().shape({
    email:Yup.string().email("Invalid required").required("Email is required"),
    password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password mus be at least 6 characters").required("Password is requerid")
})