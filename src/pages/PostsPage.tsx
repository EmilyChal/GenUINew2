import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Box, Button, Container, Grid, Link, MenuItem} from "@mui/material";
import {useEffect, useState } from 'react';
import NewThreadModal from './NewThreadModal';
import agent from "../services/Agent";
import {ForumThread} from "../domain/forumThread";
import LoadingComponent from '../components/LoadingComponent';
import { Post } from '../domain/post';
import NewPostModal from './NewPostModal';
import { useLocation } from 'react-router-dom';
import NewCommentModal from './NewCommentModal';
import { PostComment } from '../domain/postComment';

export default function AlignItemsList() {
    const [openNewPostModal, setOpenNewPostModal] = useState<boolean>(false);
    const [openNewCommentModal, setOpenNewCommentModal] = useState<boolean>(false);
    const [commentsPostId, setCommentsPostId] = useState<number>(0);
    const [isLoading, setLoading] = useState(false);
    const [threadPosts, setThreadPosts] = useState<Post[]>([]);
    const [postComments, setPostComments] = useState<PostComment[]>([]);
    const location = useLocation();


    const openNewPostModalFunction = () => {
        setOpenNewPostModal(true);
    }

    const openNewCommentModalFunction = (post_id:number) => {
        console.log(post_id);
        setCommentsPostId(post_id);
        setOpenNewCommentModal(true);
    }

    useEffect(()=>{
        setLoading(true);
        const fetch = async () => await fetchData();
        fetch();
        setLoading(false);
        },[])


    const fetchData = async () => {
        setThreadPosts([])
        setPostComments([])
        let threadPosts = await getThreadPosts();
        console.log(threadPosts)
        threadPosts.map((threadPost)=>{
            getPostComments(threadPost.post_id);
        })

    }

    const getThreadPosts = async () => {
        let threadPosts : Post[] = await agent.genapi.getThreadPosts(location.state as number);
//        console.log(threadPosts)
        setThreadPosts(threadPosts)
        return threadPosts;
    }

    const getPostComments = async (post_id:number) => {
        let postCommentsFromAPI : PostComment[] = await agent.genapi.getPostComments(post_id);
        console.log(postCommentsFromAPI)
        setPostComments(prevComments => [...prevComments, ...postCommentsFromAPI])
    }

    if (isLoading)
        return (<LoadingComponent message="" animation='MoonLoader'></LoadingComponent>)
    return (
        <>
        <Button variant="outlined" color='secondary' onClick={openNewPostModalFunction}>New Post</Button>

        <Container sx={{ display: 'flex', flexDirection:'row', width:'100%', justifyContent:'center', mt: 2}}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {threadPosts.map((threadPost) => (
                    <Container>
                        <Box sx={{ display: 'flex', flexDirection:'row', width:'100%', justifyContent:'center', mt: 2, border:'1px solid black'}}>
                        <ListItem alignItems="flex-start" key={threadPost.post_id}>
                        <Avatar sx={{marginRight:'10px', marginLeft:'-15px'}}>{threadPost.username[0]}</Avatar>
                        <ListItemText
                            primary={threadPost.username}
                            secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                    >
                                    {threadPost.text}
                                </Typography>
                            </React.Fragment>}
                        />
                    </ListItem>
                        <Button sx={{display: 'flex', left:0, width: '80px', height: '30%', marginTop: '50px'}} variant="contained" color="secondary" onClick={()=>openNewCommentModalFunction(threadPost.post_id)}>Reply</Button>
                    </Box>
                        <Box sx={{marginLeft:'20px', fontStyle:'italic'}}>
                            {postComments.map((postComment : PostComment)=>(
                                postComment.post_id==threadPost.post_id &&
<>
                                <Container sx={{ display: 'flex', flexDirection:'row', width:'100%', justifyContent:'center', mt: 2, border:'1px solid black'}}>
                                    <ListItem alignItems="flex-start" key={postComment.comment_id}>
                                        <Avatar sx={{marginRight:'10px', marginLeft:'-15px'}}>{threadPost.username[0]}</Avatar>
                                        <ListItemText
                                            primary={postComment.username}
                                            secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                                >
                                                {postComment.text}
                                            </Typography>
                                        </React.Fragment>}
                                        />
                                    </ListItem>
                                </Container>
                                </>
                                ))}
                        </Box>
                    </Container>


                ))}
                
            </List>
            {openNewPostModal && <NewPostModal close={() => setOpenNewPostModal(false)} reloadCommentsAndPosts={()=>fetchData()} forum_thread_id={location.state as number}/>}
            {openNewCommentModal && <NewCommentModal close={() => setOpenNewCommentModal(false)} reloadCommentsAndPosts={()=>fetchData()} post_id={commentsPostId}/>}
        </Container>
        </>
        );
}