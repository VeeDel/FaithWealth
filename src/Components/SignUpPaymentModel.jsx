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

export default function BasicModal({ address, amount }) {
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

  const handleOpen = () => {
    setOpen(true);
    console.log(amount, address);
    // fetchSynchro();
  };

  return (
    <div>
      <button onClick={handleOpen}>SignUp</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <PayButton address={address} amount={amount} />
        </Box>
      </Modal>
    </div>
  );
}
