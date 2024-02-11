import { Container, Link, Typography } from "@mui/material";
import { useHistory } from "react-router";

export default function NotFound() {
    const history = useHistory();

    const gotoHome = async () => {
        history.push('/login')
    }

    return (
        <Container maxWidth='sm' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 30 }}>
            <Typography variant='h1'>404</Typography>
            <Typography variant='h5'>OOPS! NOTHING WAS FOUND</Typography>
            <Typography variant='subtitle1' align="center">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</Typography>
            <Link onClick={gotoHome} color='text.secondary' sx={{ '&:hover': { cursor: 'pointer' }, fontSize: '15px' }}>Return to homepage</Link>
        </Container>
        )
}
