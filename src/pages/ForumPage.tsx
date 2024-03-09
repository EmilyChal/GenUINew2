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
import { useHistory } from 'react-router-dom';

export default function AlignItemsList() {
    const [openNewThreadModal, setNewThreadModal] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(false);
    const [forumThreads, setForumThreads] = useState<ForumThread[]>([]);
    const history = useHistory();

    const openNewThreadModalFunction = () => {
        setNewThreadModal(true);
    }

    useEffect(()=>{
        setLoading(true);
        getForumThreads();
        setLoading(false);
        },[])

    const getForumThreads = async () => {
        let forumThreads : ForumThread[] = await agent.genapi.getForumThreads();
        setForumThreads(forumThreads)
    }
    const fetchData = async () => {
        getForumThreads()
    }

    if (isLoading)
        return (<LoadingComponent message="" animation='MoonLoader'></LoadingComponent>)
    return (
        <>
        <Button variant="outlined" color='secondary' onClick={openNewThreadModalFunction}>New Thread</Button>

        <Grid container spacing={0}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {forumThreads.map((forumThread) => (
                    <>
                    <Container sx={{ display: 'flex', flexDirection:'row', width:'100%', justifyContent:'left', mt: 2}}>
                        <ListItem alignItems="flex-start" key={forumThread.forum_thread_id}>
                            <Button variant="text" color='secondary' onClick={()=>history.push({pathname: "/posts",state: forumThread.forum_thread_id})}>{forumThread.title}</Button>
                        </ListItem>
                    </Container>
                    <Divider />
                    </>
                ))}

            </List>
            {openNewThreadModal && <NewThreadModal reloadThreads={()=>fetchData()}
                close={() => setNewThreadModal(false)} />}
        </Grid>
        </>
        );
}