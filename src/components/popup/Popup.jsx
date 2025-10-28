import { Dialog, DialogContent, DialogTitle, Button, Typography, Slide } from "@material-ui/core";
import React from "react";

function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const updatePopup = ( ) => {
    openPopup?setOpenPopup(false): setOpenPopup(true);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  return (
    <Dialog open={openPopup} fullScreen TransitionComponent={Transition}>
      <DialogTitle>
        <div style={{ display: "flex" }}>
            <Typography style={{flexGrow:"1"}}>{title}</Typography>
          
          <Button
            text="X"
            color="primary"
            onClick={updatePopup}
          >
            X
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}

export default Popup;
