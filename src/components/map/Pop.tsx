import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Post } from './Map';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, deleteDoc, getDocs, query, Timestamp, where, doc } from 'firebase/firestore';
import { User } from '../../globalTypes';
import { Menu, MenuItem } from '@mui/material';
import { reducerUser } from '../../redux/auth/authType';
import { useSelector } from 'react-redux';

export default function Pop({ post }: { post: Post }) {
    const [userData, setUserData] = useState<User | { name: "" }>({ name: "" });
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const user = useSelector((state: reducerUser) => state.auth.user)
    const open = Boolean(anchorEl);

    const fetchUserDate = async () => {
        const docRef = await query(collection(db, 'users'), where('id', '==', post.user_id));
        const docSnap = await getDocs(docRef);

        docSnap.forEach((doc) => {
            const data = doc.data();
            if (data) {
                setUserData(data as User);
            } else {
                userData.name = "存在しないユーザーです"
            }
        })
    }


    useEffect(() => {
        fetchUserDate()
    }, [])

    const handleMore = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDelete = () => {
        deleteDoc(doc(db, 'posts', post.id))
    }


    const formattedDate = getTimeDifference(post.timestamp);

    if(user===null){
        return;
    }

    return (
        <>
            <Avatar sx={{ bgcolor: red[500], width: 30, height: 30, marginRight: '6px', marginTop:'4px' }} aria-label="recipe">
                R
            </Avatar>
            <div style={{ padding: 0, display: 'flex', alignItems: 'center' }}>
                <div>
                    <Typography variant="body1" sx={{ fontFamily: "system-ui", margin: 0, fontWeight: "bold" }} component='span'>
                        <span style={{ fontSize: 10 }}>{formattedDate + " "}</span>{post.content}
                    </Typography>
                </div>
                {user!.id != post.user_id ? null : (
                    <IconButton aria-label="settings" onClick={handleMore} sx={{ width: 24, height: 24, marginTop: '4px' }}>
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                )}
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}

                >
                    <MenuItem
                        onClick={() => {
                            setAnchorEl(null);
                            handleDelete();
                        }}
                    >
                        <Typography variant="subtitle2">
                            このポストを削除する
                        </Typography>
                    </MenuItem>
                </Menu>
            </div>
        </>

    );
}


export function getTimeDifference(date: Timestamp): string {
    const time = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
    const now: Date = new Date();
    const registeredDate: Date = time;
    const diffMs = now.getTime() - registeredDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 7) {
        // 一週間を超える場合はフォーマットされた日付を返す
        return `${registeredDate.getMonth() + 1}/${registeredDate.getDate()}/${registeredDate.getFullYear()}`;
    } else if (diffHours > 0) {
        // 時間が1時間以上の場合
        return `${diffHours}時間前`;
    } else {
        // それ以外の場合は分を返す
        return `${diffMinutes}分前`;
    }
}