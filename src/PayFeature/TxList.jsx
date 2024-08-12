import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

export default function TxList({ txs }) {
  const [copiedHash, setCopiedHash] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [transition, setTransition] = useState(undefined);

  if (txs.length === 0) return null;

  const copyToClipboard = (hash) => {
    navigator.clipboard.writeText(hash).then(() => {
      setCopiedHash(hash);
      setTransition(() => SlideTransition);
      setSnackbarOpen(true);
      setTimeout(() => setCopiedHash(null), 2000); // Reset after 2 seconds
    });
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

  return (
    <>
      {txs.map((item) => (
        <div key={item.hash} className="alert alert-info mt-5 p-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
            <div className="text-xs break-all mr-2 mb-2 sm:mb-0 flex-grow">
              {item.hash}
            </div>
            <div
              onClick={() => copyToClipboard(item.hash)}
              className="flex items-center  text-white font-bold py-1 px-2 rounded text-xs whitespace-nowrap"
            >
              <ContentCopyIcon fontSize="small" />
              {copiedHash === item.hash ? "Copied!" : "Copy"}
            </div>
          </div>
        </div>
      ))}

      {/* Snackbar for copy confirmation */}
      <Snackbar
        open={snackbarOpen}
        onClose={handleClose}
        TransitionComponent={transition}
        message="Transaction hash copied to clipboard!"
        key={transition ? transition.name : ""}
        autoHideDuration={3000}
      />
    </>
  );
}
