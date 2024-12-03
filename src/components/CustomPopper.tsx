'use client'
import React, { useRef } from "react";
import { Popper, Box, Typography, Avatar } from "@mui/material";

const CustomPopper = ({ anchorPosition, open }: { anchorPosition: any, open: boolean }) => {
    const arrowRef = useRef(null);
    return (

        <Popper
            open={open}
            anchorEl={null}
            placement="top-start"
            disablePortal={true}
            modifiers={[
                {
                    name: 'offset',
                    options: {
                      offset: [200, 400], 
                    //   offset: [anchorPosition?.x, anchorPosition?.y], 
                    },
                  },
                {
                    name: 'flip',
                    enabled: false,
                    options: {
                        altBoundary: true,
                        rootBoundary: 'document',
                        padding: 8,
                    },
                },
                {
                    name: 'preventOverflow',
                    enabled: false,
                    options: {
                        altAxis: true,
                        altBoundary: true,
                        tether: true,
                        rootBoundary: 'document',
                        padding: 8,
                    },
                },
                {
                    name: 'arrow',
                    enabled: true,
                    options: {
                        element: arrowRef.current,
                    },
                },

            ]}
            sx={{zIndex:1000}}
        >
            <Box
                sx={{
                    bgcolor: "#0addff",
                    p: 2,
                    borderRadius: "12px",
                    maxWidth: 300,
                    boxShadow: 3,
                    position: "relative",
                    
                }}
            >
                {/* 吹き出しの矢印 */}
                <Box
                    ref={arrowRef}
                    sx={{
                        position: "absolute",
                        width: "17px",
                        height: "12px",
                        bgcolor: "inherit",
                        transform: "rotate(180deg)",
                        boxShadow: 3,
                        bottom: -12,
                        left: 18,
                        zIndex: 0,
                        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                    }}
                />
                <Box display="flex" alignItems="center" gap={1}>
                    <Avatar alt="Ann" sx={{ width: 32, height: 32 }} />
                    <Typography variant="body2" fontWeight="bold">
                        Ann 2024/12/03
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    I really love this place because the scenery here is absolutely beautiful. The views are
                    stunning, and I feel a deep connection to the surroundings.
                </Typography>
            </Box>
        </Popper>
    );
};

export default CustomPopper;
