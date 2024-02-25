import {Autocomplete, Box, Modal, TextField, Typography } from "@mui/material";
import {Controller, FieldValues, useForm } from "react-hook-form";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React from "react";
import { LoadingButton } from "@mui/lab";
import agent from "../services/Agent";
import {PostDto} from "../domain/postDto";
import { useLocation } from "react-router-dom";
import { CommentDto } from "../domain/commentDto";


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
    post_id : number;
    reloadCommentsAndPosts: () => void;
    close: () => void;
}

const defaultValues = {
    commentText:''
}



export default function NewCommentModal({ close, reloadCommentsAndPosts, post_id }: Props) {
    const { reset, trigger, control, getValues, setValue, register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
    defaultValues: defaultValues,
    mode: 'all'
    })
    

    const submitForm = async (data: FieldValues) => {
        const { commentText } = data
        console.log(commentText)
        let commentDto : CommentDto = {
            text : commentText,
            post_id : post_id,
            username : localStorage.getItem('username')!
        };
        await agent.genapi.createNewComment(parseInt(localStorage.getItem('user_id')!), commentDto);
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
                <Typography fontSize='30px' mb={3} textAlign='center' color='text.secondary'>Please write your comment</Typography>
                <form key={1} onSubmit={handleSubmit(submitForm)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 2, padding: 0 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
                            <Typography fontSize='14px' sx={{ color: 'text.secondary' }}>
                                Comment
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
                                {...register('commentText', {
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