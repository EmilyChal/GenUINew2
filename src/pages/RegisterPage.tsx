import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Box, Button, Checkbox, Container, Divider, Fade, FormControlLabel, TextField, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../services/ConfigureStore';
import Image from 'mui-image'
import { RegistrationDetails } from '../domain/user';
import agent from "../services/Agent";
import { toast } from 'react-toastify';

const DefaultValues = {
    username: '',
    contact_email: '',
    password: ''
}

export default function RegisterPage() {
    const { user } = useAppSelector(state => state.account);
    const history = useHistory();
    const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);

    const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
        defaultValues: DefaultValues,
        mode: 'onChange'
    })

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, [])

    const gotoLogin = () => {
        history.push('/login');
    }

    async function submitForm(data: FieldValues) {
        const { contact_email, password, username } = data;
        let registrationDetails: RegistrationDetails = {
            contact_email: contact_email,
            username: username,
            password: password
        };
        try {
            console.log(registrationDetails)
            let result = await agent.account.registerUser(registrationDetails)
            setRegisterSuccess(true);
            setTimeout(() => {
                history.push('/login');
                }, 2000);

        }
        catch (err) {
            console.log('Error')
            console.log(err);
            toast.error('Something went wrong. Please try again', { theme: "colored" });
        }
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, width: '100%' }}>
            <Container>
                <Typography align='center' letterSpacing={2} fontWeight='bold' variant="h4">
                    Create Account
                </Typography>
                {!registerSuccess &&
                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2, pl: 4, pr: 4 }} component="form" onSubmit={(handleSubmit(submitForm))}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                            <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>Username</Typography>
                            <TextField
                                color='secondary'
                                fullWidth
                                hiddenLabel
                                size="small"
                                autoFocus
                                {...register('username', { required: 'username is required' })}
                                error={!!errors.username}
                                helperText={errors?.username?.message}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                            <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>Contact Email</Typography>
                            <TextField
                                color='secondary'
                                fullWidth
                                hiddenLabel
                                size="small"
                                {...register('contact_email', {
                                    required: 'Email is required', pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: 'Please enter a valid email',
                                    },
                                    onChange(event) {
                                        if (event.target.value) {
                                            event.target.value = event.target.value.toLowerCase();
                                        }
                                    }
                                })}
                                error={!!errors.contact_email}
                                helperText={errors?.contact_email?.message}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                            <Typography color='#808080' ml={1} letterSpacing={1} fontWeight='bold' variant='body2'>Password</Typography>
                            <TextField
                                color='secondary'
                                fullWidth
                                hiddenLabel
                                size="small"
                                type="password"
                                {...register('password', {
                                    required: 'Password is required', validate: {
                                        passwordPattern: (value: string) => {
                                            if (value.length < 8
                                                || value === value.toLowerCase()
                                                || value === value.toUpperCase()
                                                || !/\d/.test(value)
                                                || !/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value)
                                                ) return 'Password must be at least 8 characters with at least 1 Upper Case, 1 lower case, 1 numeric character and 1 special character';
                                            return true;

                                        }
                                    }
                                })}
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
                            Create Account
                        </LoadingButton>
                    </Box>
                }
                {!registerSuccess &&
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', pl: 4, pr: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', mt: 2, mb: 4 }}>
                            <Divider sx={{ width: '40%' }} />
                            <Typography letterSpacing={1} >OR</Typography>
                            <Divider sx={{ width: '40%' }} />
                        </Box>
                        <Button onClick={gotoLogin} fullWidth variant='outlined' color='secondary'>Sign in</Button>
                    </Box>
                }
                {registerSuccess &&
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', pl: 4, pr: 4, mt: 2 }}>
                        <Alert severity="success">
                            <AlertTitle><Typography fontWeight='bold' letterSpacing={1} variant="subtitle1">Registration complete</Typography></AlertTitle>
                        </Alert>
                    </Box>
                }
            </Container>
        </Container>
        );
}
