import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ModalProps } from "../../../types/global";
import {
  Container,
  CssBaseline,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { serviceValidationSchema } from "../../../utils/validation";
import { CreateService } from "../../../types/service";
import { service } from "@service";
import { toast } from "react-toastify";


export default function KeepMountedModal({ open, setOpen, editData }: ModalProps) {
  
  const initialValues:CreateService = {
    name: editData?.name || "",
    price: editData?.price || "",
  };

  const handleSubmit = async(values: CreateService) => {

    if (editData) {
      const payload = {
        id: editData.id, ...values,
      };
      try {
        const response = await service.update(payload);
        if (response.status === 200 || response.status === 201) {
          toast.success(" Xizmat uzgartirildi")
          setOpen(false)
          setTimeout(()=>{
           window.location.reload()
          }, 1000)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await service.create(values);
        if (response.status === 200 || response.status === 201) {
          toast.success("Yangi xizmat yaratildi")
          setOpen(false)
          setTimeout(()=>{
           window.location.reload()
          }, 1000)
        }
      } catch (error) {
        console.log(error);
      }
    }
  
  };
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: "background.paper",
              padding: 4,
              borderRadius: 1,
              boxShadow: 24,
            }}
          >
            <Typography component="h1" variant="h5">
              Buyurtma ma‘lumotlari
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={serviceValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="name"
                    type="text"
                    as={TextField}
                    label="Xizmat nomi"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />

                  <Field
                    name="price"
                    type="number"
                    as={TextField}
                    label="Xizmat narxi"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="price"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {isSubmitting ? "Yuklanmoqda..." : "Saqlash"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Modal>
    </>
  );
}
