import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Post } from '../Indexs/ShowPostIndex';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, deleteDoc, getDocs, query, Timestamp, where, doc } from 'firebase/firestore';
import { User } from '@/globalType';
import { Menu, MenuItem } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { reducerUser } from '@/redux/auth/authType';
import { useSelector } from 'react-redux';

export default function PostViewCard({ post }: { post: Post }) {
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

  return (
    <Card sx={{ width: "100%", marginTop: 1, boxShadow: "none" }} elevation={0}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], width: 30, height: 30 }} aria-label="recipe">
            R
          </Avatar>
        }

        action={
          user!.id != post.user_id ? null : (
            <IconButton aria-label="settings" onClick={handleMore} sx={{ width: 24, height: 24, marginTop:1 }}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
          )

        }
        title={<Typography variant="caption">
          {userData.name + " " + formattedDate}
          </Typography>}
        sx={{ padding: 0, fontSize: 12}}
      />
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
      {post?.image === undefined ? null : <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />}
      <CardContent sx={{ padding: 0, marginTop: 1, marginBottom: 1 }}>
        <Typography variant="subtitle1" sx={{ fontFamily: "system-ui", marginTop: 2, marginBottom: 2 }}>
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: "flex", justifyContent: 'flex-end', gap: '3px', padding: 0 }}>
        <IconButton aria-label="add to favorites" sx={{ width: 20, height: 20 }}>
          <ChatBubbleOutlineIcon fontSize="small" />
        </IconButton>
        <IconButton aria-label="add to favorites" sx={{ width: 20, height: 20 }}>
          <FavoriteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
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