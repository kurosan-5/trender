import { Button , Card, CardContent, CardHeader, Typography } from "@mui/material";
import data from "../../../storage/data/05112024.json";
import Grid from "@mui/material/Grid2"
import { auth } from "../../../firebase";
interface Post {
    title: string,
    content: string,
}

export default function PostList() {
    const user_id = auth.currentUser?.uid;
    return (
        <Grid container spacing={3}>
            {user_id}
            {data.posts.map((post:Post) => {
                return <Post key={post.title} post={post} />
            })}
        </Grid>
    );
}

const Post = ({ post }: { post: Post }) => {
    return (
        <Grid key={post.title}>
            <Card sx={{padding:3}}>
                <CardHeader title={post.title} />
                <CardContent>
                    <Typography variant="body1" component="p">
                        {post.content}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>

    );
}