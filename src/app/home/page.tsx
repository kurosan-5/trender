"use client";
import Split from "react-split"
import Sidebar from "./Sidebar"
import PostList from "./PostList";
import { Alert } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';

export default function Home() {
    return (
        <>
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                成功しました
            </Alert>
            <Split
                sizes={[15, 85]}
                minSize={100}
                gutterSize={10}
                style={{ display: 'flex', marginTop:20 }}
                className="split-container"
            >
                <div className="h-100 ms-4">
                    <Sidebar />
                </div>
                <div className="ms-3">
                    <PostList />
                </div>
            </Split>
        </>
    )
}