import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import data from "../../../storage/data/05112024.json";
import Grid from "@mui/material/Grid2"
interface Post {
    title: string,
    content: string,
}

export default function PostList() {
    return (
        <Grid container spacing={3}>
            {data.posts.map((post) => {
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