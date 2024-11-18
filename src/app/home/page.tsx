"use client";
import Split from "react-split"
import Sidebar from "./Sidebar"
import PostList from "./PostList";
import { onAuthStateChanged } from "firebase/auth";
import Cookies from 'js-cookie';
import { auth } from "../../../firebase";
import { useAuthActions } from "@/redux/auth/useActions";

export default function Home() {
    const {setUser, resetUser} = useAuthActions()
    onAuthStateChanged(auth, async (user) => {
        if (user) {
          // ユーザーがログインしている場合、IDトークンを取得
          const idToken = await user.getIdToken();
          // ログインした場合、auth_tokenをクッキーに保存
          Cookies.set('auth_token', idToken, { expires: 7, path: '/' });
          setUser(user)
        } else {
          // ログアウトした場合、auth_tokenをクッキーから削除
          Cookies.remove('auth_token', { path: '/' });
          resetUser();
        }
      });

    return (
        <>
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