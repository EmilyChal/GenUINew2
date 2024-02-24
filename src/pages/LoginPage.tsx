import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Alert, Button, Divider, Fade, Link, Paper, Tooltip } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from "../services/ConfigureStore";
import { removeUser, setUser } from "../services/AccountSlice";
import { useHistory, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { TokenReturned } from "../domain/token";
import { UserLogin, UserLoginResult } from "../domain/user";
import agent from "../services/Agent";
import Image from 'mui-image'
import { toast } from 'react-toastify';

const defaultValues = {
    username: '',
    password: ''
}

export default function LoginPage() {
    const { user } = useAppSelector(state => state.account);
    const history = useHistory();
    const location = useLocation<any>();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        defaultValues: defaultValues,
        mode: 'all'
    })

    useEffect(() => {
        let userToken = localStorage.getItem('accessToken');
        if (userToken) {
            (async () => {
                try {
                    let tokenValid = await agent.account.verifyToken()
                    if (tokenValid) {
                        history.push('/')
                    }
                }
                catch (error: any) {
                    toast.error('Your session expired. Please sign in again.', { theme: "colored" })
                }
            })()
        }
    }, [user, history])

    async function submitForm(data: FieldValues) {
        try {
            const { username, password } = data;
            let userLogin: UserLogin = {
                username: username,
                password: password
            }
            let userLoginResult: UserLoginResult = await agent.account.login(userLogin);
            dispatch(setUser(userLoginResult.token));
            
            localStorage.setItem('accessToken', userLoginResult.token);
            localStorage.setItem('user_id', userLoginResult.userId);
            localStorage.setItem('username', userLoginResult.name);
            history.push(location.state?.from?.pathname ? location.state?.from?.pathname : '/');
        } catch (error: any) {
            if (error && error.status && error.status === 401) {
                toast.error('This username and password combination is not recognized. Please try again.', { theme: "colored" })
            } else if (error && error.status && error.status === 404) {
                toast.error('This operation does not exist.', { theme: "colored" })
            } else if (error && error.status && error.status === 500) {
                toast.error('Something went wrong. Please try again.', { theme: "colored" })
            }
        }
    }

    const gotoRegister = () => {
        history.push('/register')
    }

    return (
        <Container component={Paper} maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, marginTop: '8vh', width: '100%' }}>
            <Container sx={{ marginTop: '10px', pl: '0!important', pr: '0!important' }}>
                <Typography align='center' letterSpacing={2} variant="h4">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={(handleSubmit(submitForm))} sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                        <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>Username</Typography>
                        <TextField
                            color='secondary'
                            fullWidth
                            autoFocus
                            disabled={isSubmitting}
                            size='small'
                            {...register('username', {
                                required: true
                            })}
                            error={!!errors.username}
                            helperText={errors?.username?.message}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                        <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>Password</Typography>
                        <TextField
                            color='secondary'
                            fullWidth
                            size='small'
                            disabled={isSubmitting}
                            type="password"
                            {...register('password', { required: 'Password is required' })}
                            error={!!errors.password}
                            helperText={errors?.password?.message}
                        />
                    </Box>
                    <LoadingButton
                        disabled={!isValid}
                        loading={isSubmitting}
                        type="submit"
                        fullWidth
                        variant="contained" color='secondary'
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign in
                    </LoadingButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', mt: 3, mb: 4 }}>
                        <Divider sx={{ width: '40%' }} />
                        <Typography letterSpacing={1} >OR</Typography>
                        <Divider sx={{ width: '40%' }} />
                    </Box>
                    <Button onClick={gotoRegister} fullWidth variant='outlined' color='secondary'>Create Account</Button>
                </Box>
            </Container>
        </Container>
        );
}
