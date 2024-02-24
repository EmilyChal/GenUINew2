import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {Button, Container, Grid, Link, MenuItem} from "@mui/material";
import {useEffect, useState } from 'react';
import NewThreadModal from './NewThreadModal';
import agent from "../services/Agent";
import {ForumThread} from "../domain/forumThread";
import LoadingComponent from '../components/LoadingComponent';
import { Post } from '../domain/post';
import NewPostModal from './NewPostModal';
import { useLocation } from 'react-router-dom';

export default function AlignItemsList() {
    const [openNewPostModal, setOpenNewPostModal] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(true);
    const [threadPosts, setThreadPosts] = useState<Post[]>([]);
    const location = useLocation();

    const openNewPostModalFunction = () => {
        setOpenNewPostModal(true);
    }

    useEffect(()=>{
        setLoading(true);
        getThreadPosts();
        setLoading(false);
        },[])

    const getThreadPosts = async () => {
        let threadPosts : Post[] = await agent.genapi.getThreadPosts(location.state as number);
        console.log(threadPosts)
        setThreadPosts(threadPosts)
    }

    if (isLoading)
        return (<LoadingComponent message="" animation='MoonLoader'></LoadingComponent>)
    return (
        <>
        <Button variant="outlined" onClick={openNewPostModalFunction}>New Post</Button>

        <Container sx={{ display: 'flex', flexDirection:'row', width:'100%', justifyContent:'center', mt: 2}}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {threadPosts.map((threadPost) => (
                    <Container sx={{ display: 'flex', flexDirection:'row', width:'100%', justifyContent:'center', mt: 2, border:'1px solid black'}}>
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
                    </Container>
                ))}
                
            </List>
            {openNewPostModal && <NewPostModal close={() => setOpenNewPostModal(false)} forum_thread_id={location.state as number}/>}
        </Container>
        </>
        );
}