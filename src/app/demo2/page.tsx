'use client'
import CustomPopper from "@/components/CustomPopper";
import { useState } from "react";

const demo = () => {
    const [anchorPosition, setAnchorPosition] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event:any) => {
    setAnchorPosition(event.containerPoint);
    setOpen((prev) => !prev);
  };
    return(

        <>
        
        

        <button onClick={handleClick}>aaa</button>
        <CustomPopper anchorPosition={anchorPosition} open={open}/>
        </>

    )
}

export default demo;