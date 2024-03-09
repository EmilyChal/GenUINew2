import {Autocomplete, Box, Modal, TextField, Typography } from "@mui/material";
import {Controller, FieldValues, useForm } from "react-hook-form";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import React from "react";
import { LoadingButton } from "@mui/lab";
import agent from "../services/Agent";
import { useHistory } from 'react-router-dom';


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
    close: () => void;
}

const defaultValues = {
    threadTitle:''
}



export default function NewThreadModal({ close }: Props) {
    const { reset, trigger, control, getValues, setValue, register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
    defaultValues: defaultValues,
    mode: 'all'
    })
    const history = useHistory();
    const submitForm = async (data: FieldValues) => {
        const { threadTitle } = data
        console.log(threadTitle)
        await agent.genapi.createNewThread(parseInt(localStorage.getItem('user_id')!), threadTitle);
        reset();
        history.push('/forum')

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
                <Typography fontSize='30px' mb={3} textAlign='center' color='text.primary'>Please name your thread</Typography>
                <form key={1} onSubmit={handleSubmit(submitForm)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: 2, padding: 0 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1 }}>
                            <Typography fontSize='14px' sx={{ color: 'text.primary' }}>
                                Thread Title
                            </Typography>
                            <TextField
                                size='small'
                                color='secondary'
                                margin="none"
                                hiddenLabel
                                type='string'
                                fullWidth
                                disabled={isSubmitting}
                                {...register('threadTitle', {
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