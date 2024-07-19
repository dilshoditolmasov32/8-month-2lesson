import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import {OrderModal} from '@modal';
import { order } from "@service";
import {OrderTable  } from '@table';
import { toast } from "react-toastify";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    limit: 10,
    page: 1,
    name: ""
  });

  const getData = async () => {
    try {
      const response = await order.get(params);
      if ((response.status === 200 && response?.data?.orders_list) || (response.status === 201 && response?.data?.orders_list)) {
        setData(response?.data?.orders_list);
      }
    } catch (error) {
      toast.error("Xatolik bor");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prevParams) => ({
      ...prevParams,
      name: event.target.value,
      page: 1
    }));
  };

  useEffect(() => {
    getData();
  }, [params]);

  return (
    <>
      <OrderModal open={open} setOpen={setOpen} />
      <div className="flex justify-between mb-3">
        <TextField label="Search..." id="fullWidth" onChange={handleSearchChange} />
        <Button
          variant="contained"
          disableElevation
          onClick={() => setOpen(true)}
        >
          Buyurtma qo'shish
        </Button>
      </div>
      <OrderTable data={data} />
    </>
  );
};

export default Index;
