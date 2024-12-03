import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Post } from '../Indexs/ShowPostIndex';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { collection, deleteDoc, doc, getDocs, query, Timestamp, where } from 'firebase/firestore';
import { User } from '@/globalType';
import { Button,  Divider, Menu, MenuItem, TextField, Grid2 } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { reducerUser } from '@/redux/auth/authType';
import { useSelector } from 'react-redux';
import Comment from '../Comment/Comment';
import { green } from "@mui/material/colors";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ReplyIcon from '@mui/icons-material/Reply';
import CommentButton from '../Buttons/CommentButton';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));



export default function PostViewCard({ post, toggle, isOK, setIsOK, setModalMessage }: { post: Post, toggle: (value: boolean) => void, isOK: boolean, setIsOK: (value: boolean) => void, setModalMessage: (value: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [userData, setUserData] = useState<User | { name: "" }>({ name: "" });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const user = useSelector((state: reducerUser) => state.auth.user)
  const open = Boolean(anchorEl);
  const [isComment, setIsComment] = useState(false)
  const [commentText, onchangeCommentText] = useState("")

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

  const handleDelete = async () => {
    toggle(true);
    setModalMessage('ポスト')
    setIsOK(false)
  }

  useEffect(() => {
    fetchUserDate()
  }, [])

  useEffect(() => {
    if (isOK) {
      deleteDoc(doc(db, 'posts', post.id));
    }
  }, [isOK])



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMore = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const formattedDate = getTimeDifference(post.timestamp);

  return (
    <Card sx={{ width: { xs: 350, md: "60%" }, marginTop: 1 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }

        action={
          user!.id != post.user_id ? null : (
            <IconButton aria-label="settings" onClick={handleMore}>
              <MoreVertIcon />
            </IconButton>
          )

        }
        title={userData.name}
        subheader={formattedDate}
        sx={{ paddingBottom: 1 }}
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
          このポストを削除する
        </MenuItem>
      </Menu>
      {post?.image === undefined ? null : <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />}
      <Divider />
      <CardContent sx={{ paddingTop: 1, paddingBottom: 1 }}>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ChatBubbleOutlineIcon />
        </ExpandMore>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ paddingTop: 1 }}>
          <Comment post={post} toggle={toggle} isOK={isOK} setIsOK={setIsOK} setModalMessage={setModalMessage}/>
          {isComment ? (
            <Grid2>
              <Grid2
                direction="row"
                container
                spacing={2}
              >
                <Grid2>
                  <Avatar sx={{ bgcolor: green[500], fontsize: 20, width: 37, height: 37, marginTop: 1 }} aria-label="recipe">
                    S
                  </Avatar>
                </Grid2>
                <Grid2>
                  <Typography sx={{ color: "text.secondary" }}>user name</Typography>
                  <Typography sx={{ color: "text.secondary" }}>date</Typography>
                </Grid2>
                <Grid2 sx={{ marginLeft: "auto" }}>
                  <IconButton onClick={() => setIsComment(false)} sx={{ marginTop: 1 }}>
                    <HighlightOffIcon sx={{ fontSize: 30 }} />
                  </IconButton>
                </Grid2>
              </Grid2>
              <TextField
                multiline
                rows={4}
                label="コメントをしよう"
                value={commentText}
                fullWidth
                onChange={(e) => onchangeCommentText(e.target.value)}
                sx={{
                  marginTop: 2
                }}
              />
              <div style={{ textAlign: "right" }}>
                <CommentButton post={post} content={commentText} close={setIsComment} clear={onchangeCommentText}/>
              </div>
            </Grid2>
          ) : (
            <div style={{ textAlign: "right", padding: 0 }}>
              <Button onClick={() => setIsComment(true)} variant="outlined">コメントする</Button>
            </div>
          )}
        </CardContent>
      </Collapse>
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