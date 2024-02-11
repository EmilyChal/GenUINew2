import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BeatLoader, BounceLoader, GridLoader, MoonLoader, PropagateLoader, PulseLoader, ScaleLoader } from 'react-spinners';

interface Props {
    message?: string;
    animation: AnimationVariant;
}

export type AnimationVariant =
    | 'MoonLoader'
    | 'BeatLoader'
    | 'BounceLoader'
    | 'GridLoader'
    | 'PropagateLoader'
    | 'ScaleLoader'


export default function LoadingComponent({ message = 'Loading', animation }: Props) {

    const LoadingAnimation = () => {
        switch (animation) {
            case 'MoonLoader':
                return <MoonLoader color="#F5F8FA" />
            case 'BeatLoader':
                return <BeatLoader color="#F5F8FA" />
            case 'BounceLoader':
                return <BounceLoader color="#F5F8FA" />
            case 'GridLoader':
                return <GridLoader size={35} color="#F5F8FA" />
            case 'PropagateLoader':
                return <PropagateLoader color="#F5F8FA" />
            case 'ScaleLoader':
                return <ScaleLoader color="#F5F8FA" />
            default:
                return <MoonLoader color="#F5F8FA" />
        }
    }


    return (
        <Backdrop open={true}>
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='100vh'>
                <LoadingAnimation />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'end', mt: 2 }} >
                    <Typography color='secondary.light' variant='h4'>
                        {message}
                    </Typography>
                </Box>
            </Box>
        </Backdrop>
        )
}