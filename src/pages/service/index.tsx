import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import {ServiceModal} from '@modal';
import { service } from "@service";
import {ServiceTable} from '@table';
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
      const response = await service.get(params);
      if ((response.status === 200 && response?.data?.services) || (response.status === 201 && response?.data?.services)) {
        setData(response?.data?.services);
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
      <ServiceModal open={open} setOpen={setOpen} />
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
      <ServiceTable data={data} />
    </>
  );
};

export default Index;
