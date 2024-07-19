import * as Yup from "yup"


//==============   AUTH   =================

export const signInValidationSchema=Yup.object().shape({
    email:Yup.string().email("Invalid required").required("Email is required"),
    password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password mus be at least 6 characters").required("Password is requerid")
})


export const signUpValidationSchema=Yup.object().shape({
    email:Yup.string().email("Invalid required").required("Email is required"),
    full_name:Yup.string().required("Email is required"),
    password:Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password mus be at least 6 characters").required("Password is requerid"),
    phone_number:Yup.string().min(19,"Invalid phone number").required("Phone is required")
})


//==============   SERVICE   ================

export const serviceValidationSchema = Yup.object({
    name: Yup.string().required('Xizmat nomi talab qilinadi'),
    price: Yup.number()
      .required('Xizmat narxi talab qilinadi') 
      .positive('Narx musbat bo\'lishi kerak') 
      .integer('Narx butun son bo\'lishi kerak') 
  });

  //==============   ORDER   ================

export const orderValidationSchema = Yup.object({
    client_full_name: Yup.string().required('Iltimos kerakli maydonni to\'ldiring'),
    client_phone_number:Yup.string().min(19,"Maydonni to\'g\'ri to\'ldiring").required("Telefon raqamingizni kiriting"),
      amount: Yup.number()
      .required('Kerakli maydonni to\'ldiring')  
      .positive('Miqdori musbat bo\'lishi kerak') ,
      service_id: Yup.string().required('Iltimos kerakli maydonni to\'ldiring'), 
     
  });