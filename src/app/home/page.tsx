"use client";
import Split from "react-split"
import Header from "./Header"
import Sidebar from "./Sidebar"
import PostList from "./PostList";

export default function Home() {
    return (
        <>
            <Header />
            <Split
                sizes={[15, 85]}
                minSize={100}
                gutterSize={10}
                style={{ display: 'flex' }}
                className="split-container"
            >
                <div className="mt-6 h-100 ms-4">
                    <Sidebar />
                </div>
                <div className="mt-6 ms-3">
                    <PostList />
                </div>
            </Split>
        </>
    )
}