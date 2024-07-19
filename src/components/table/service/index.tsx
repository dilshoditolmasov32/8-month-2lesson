import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { service } from "@service";
import { ServiceModal } from "@modal";
import { useState } from "react";


interface Service {
  id: string;
  name: string;
  price: number | string;
}

interface ServiceTableProps {
  data: Service[];
}

export default function CustomizedTables({ data }: ServiceTableProps) {
  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);

 
 
  const deleteItem = async (id: string) => {
    try {
      const response = await service.delete(id)

      if (response.status === 200 || response.status === 201) {
        toast.success("Deleted succesfully")
       setTimeout(()=>{
        window.location.reload()
       }, 1000)
      }
    } catch (error) {
      toast.error("Xatolik bor");
    }
  };

  const openModal = (item:any) => {
    setEditData(item);
    setOpen(true);
  };

  return (
    <>
      <ServiceModal
        editData={editData}
        open={open}
        setOpen={() => setOpen(false)}
      />
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead sx={{ background: "rgba(35,137,218,1)", color:"white" }}>
          <TableRow>
            <TableCell sx={{color:"white"}}>T/r</TableCell>
            <TableCell sx={{color:"white"}} align="right">Xizmat nomi</TableCell>
            <TableCell sx={{color:"white"}} align="right">Xizmat narxi</TableCell>
            <TableCell sx={{color:"white", paddingRight: "60px" }} align="right" >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="right"> {item.name}</TableCell>
              <TableCell align="right"> {item.price}</TableCell>
              <TableCell align="right" className="flex ">
                <Button  onClick={() => openModal(item)}>
                    <FaEdit />
                  </Button>
                <Button onClick={() => deleteItem(item.id)}>
                  <RiDeleteBin6Line />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>

  );
}
