import React, { useState } from "react";

function AutoSlotDialog() {
  //hook to set the open and closing fucntionality of the dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
        Hello
    </div>
  );
}

export default AutoSlotDialog;
