import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Container,
  CssBaseline,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { orderValidationSchema } from "../../../utils/validation";
import { CreateOrder } from "../../../types/order";
import { order, service } from "@service";
import { toast } from "react-toastify";
import { useMask } from "@react-input/mask";
import { ModalProps } from "../../../types/global";

export default function KeepMountedModal({
  open,
  setOpen,
  editData,
}: ModalProps) {
  const [data, setData] = useState([]);
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const initialValues: CreateOrder = {
    client_full_name: editData?.client_name || "",
    client_phone_number: editData?.client_phone_number || "",
    amount: editData?.amount || "",
    service_id: editData?.service_id || "",
  };

  const [params] = useState({
    limit: 10,
    page: 1,
    name: "",
  });

  const getData = async () => {      
    try {
      const response = await service.get(params);
      if (
        (response.status === 200 && response?.data?.services) ||
        (response.status === 201 && response?.data?.services)
      ) {
        setData(response?.data?.services);
      }
    } catch (error) {
      toast.error("Xatolik bor");
    }
  };

  useEffect(() => {
    getData();
  }, [params]);
  const handleSubmit = async (values: CreateOrder) => {
    const phone_number = values.client_phone_number.replace(/\D/g, "");
    const payload = { ...values, client_phone_number: `+${phone_number}` };

    try {
      let response;
      if (editData) {
        const updatePayload: any = {
          id: editData.id,
          ...payload,
        };
        response = await order.update(updatePayload);
      } else {
        response = await order.create(payload);
      }

      if (response.status === 200 || response.status === 201) {
        toast.success("Order saved successfully.");
        window.location.reload();
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save the order.");
    }
  };

  type Item = {
    id:   string;
    name: string;
  };

  // type Props = {
  //   data: Item[];
  // };
  return (
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
            validationSchema={orderValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="client_full_name"
                  type="text"
                  as={TextField}
                  label="Xaridorning ismi familyasi"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="client_full_name"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />

                <Field
                  name="client_phone_number"
                  as={TextField}
                  label="Telefon raqamingizni kiriting"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  inputRef={inputRef}
                  helperText={
                    <ErrorMessage
                      name="client_phone_number"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />

                <Field
                  name="amount"
                  type="number"
                  as={TextField}
                  label="Buyurtma miqdorini kiriting"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="amount"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                />

                <Field
                  name="service_id"
                  type="text"
                  as={Select}
                  label="Xizmatni tanlang"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="service_id"
                      component="p"
                      className="text-[red] text-[15px]"
                    />
                  }
                >
                  {data?.map((item: Item, index: number) => (
                    <MenuItem key={index} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Field>

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
  );
}
