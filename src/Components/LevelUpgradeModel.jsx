import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAuth } from "../Context/AuthContext";
import { useEffect, useState } from "react";
import PayButton from "../PayFeature/PayButton";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "black",
  border: "1px solid #333",
  borderRadius: "10px",
  boxShadow: "0 0 10px 0 rgba(0, 128, 255, 0.5)", // Custom blue shadow
  p: 2,
};

export default function BasicModal() {
  const { getAmountAndAddress } = useAuth();
  const [synchro, setSynchro] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const fetchSynchro = async () => {
    try {
      const details = await getAmountAndAddress();
      setSynchro(details);
    } catch (error) {
      console.error("Error fetching payment details:", error);
    }
  };


 
  const handleOpen = () =>{
     setOpen(true);
    fetchSynchro();
  };

  return (
    <div>
      <button onClick={handleOpen}>Level upgrade</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <div className="w-full">
            <h2 className="text-sm font-semibold mb-1 ">Address</h2>

            <h3 className="bg-dimblack border-borderBlack border-[1px] w-full  text-[#999] p-2 text-[9px]">
              {synchro.PayId}
              0x8D90c628A00c79329AE33d29adFF543365AC7e6f
            </h3>
            <div className="flex items-center justify-between">
              <h2 className="text-md font-semibold my-2 ">Amount To Pay:</h2>
              <h2 className="text-md font-semibold my-2 ">${synchro?.amount}</h2>
            </div>
            <button className="bg-primary text-white border-[1px] border-primary font-semibold active:bg-[#5746d5] rounded-xl h-full w-full active:scale-90 duration-75 p-2">
              Pay Now
            </button>
          </div> */}
          {synchro &&<PayButton address={synchro.PayId}  amount={synchro.amount}/>}
        </Box>
      </Modal>
    </div>
  );
}
