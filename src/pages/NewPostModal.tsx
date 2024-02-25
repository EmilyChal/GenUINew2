import {Autocomplete, Box, Modal, TextField, Typography } from "@mui/material";
import {Controller, FieldValues, useForm } from "react-hook-form";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React from "react";
import { LoadingButton } from "@mui/lab";
import agent from "../services/Agent";
import {PostDto} from "../domain/postDto";
import { useLocation } from "react-router-dom";


const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    maxWidth: '380px',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    boxShadow: 24,
    pl: 2,
    pr: 2,
    pt: 2,
    pb: 2
};

interface Props {
    forum_thread_id : number;
    close: () => void;
    reloadCommentsAndPosts: () => void;
}

const defaultValues = {
    postText:''
}



export default function NewPostModal({ close, reloadCommentsAndPosts, forum_thread_id }: Props) {
    const { reset, trigger, control, getValues, setValue, register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
    defaultValues: defaultValues,
    mode: 'all'
    })
    

    const submitForm = async (data: FieldValues) => {
        const { postText } = data
        console.log(postText)
        let postDto : PostDto = {
            text : postText,
            forum_thread_id : forum_thread_id,
            username : localStorage.getItem('username')!
        };
        await agent.genapi.createNewPost(parseInt(localStorage.getItem('user_id')!), postDto);
        reset();
        reloadCommentsAndPosts();
    }

    const closeModal = () => {
        reset();
        close();
    }
    
    return (
        <>
        <Modal keepMounted open={true}>
            <Box sx={modalStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                    <HighlightOffIcon fontSize='large' onClick={closeModal} sx={{ cursor: 'pointer' }} />
                </Box>
                <Typography fontSize='30px' mb={3} textAlign='center' color='text.secondary'>Please write your post</Typography>
                <form key={1} onSubmit={handleSubmit(submitForm)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 2, padding: 0 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
                            <Typography fontSize='14px' sx={{ color: 'text.secondary' }}>
                                Post
                            </Typography>
                            <TextField
                                size='small'
                                multiline
                                rows={4}
                                color='secondary'
                                margin="none"
                                hiddenLabel
                                type='string'
                                fullWidth
                                disabled={isSubmitting}
                                {...register('postText', {
                                    onChange(event) {
                                        if (event.target.value) {
                                            event.target.value = event.target.value.toLowerCase();
                                        }
                                    }
                                })}
                            />
                        </Box>
                        <LoadingButton
                            sx={{ mt: 2 }}
                            variant='contained'
                            type='submit'
                            loading={isSubmitting}
                            disabled={!isValid}>{'Save'}</LoadingButton>
                    </Box>
                </form>
            </Box>
        </Modal>
        </>
        )
    
}