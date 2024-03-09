import {Container, Typography} from "@mui/material";
import {useEffect, useState } from "react";
import {UserInfoAndFootprint} from "../domain/userInfoAndFootprint";
import agent from "../services/Agent";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LoadingComponent from "../components/LoadingComponent";




export default function UsersRanking(){
    const [isLoading, setLoading] = useState(true);
    const [userInfoAndFootprintMonth, setUserInfoAndFootprintMonth]= useState<UserInfoAndFootprint[]>([])
    const [userInfoAndFootprintYear, setUserInfoAndFootprintYear]= useState<UserInfoAndFootprint[]>([])


    useEffect(()=>{
        setLoading(true);
        setMonthAndYearLeaderBoard().then(()=>setLoading(false))
        },[])

    async function setMonthAndYearLeaderBoard(){
        let monthLeaderboard = await agent.genapi.getCurrentMonthLeaders();
        setUserInfoAndFootprintMonth(monthLeaderboard);
        let yearLeaderboard = await agent.genapi.getCurrentYearLeaders();
        setUserInfoAndFootprintYear(yearLeaderboard);
    }



    if (isLoading)
        return (<LoadingComponent message="" animation='MoonLoader'></LoadingComponent>)
    return(
        <>
        <TableContainer component={Paper}>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
                >
                Current month Leaders
            </Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight:700}}>Username</TableCell>
                        <TableCell sx={{fontWeight:700}} align="right">Current Month Carbon Footprint</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userInfoAndFootprintMonth.map((userInfo) => (
                        <TableRow
                            key={userInfo.username}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {userInfo.username}
                            </TableCell>
                            <TableCell align="right">{userInfo.carbon_footprint}</TableCell>
                        </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Container sx={{margin:'50px'}}></Container>

        <TableContainer component={Paper}>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
                >
                Current year Leaders
            </Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{fontWeight:700}}>Username</TableCell>
                        <TableCell sx={{fontWeight:700}} align="right">Current Year Carbon Footprint</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userInfoAndFootprintYear.map((userInfo) => (
                        <TableRow
                            key={userInfo.username}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {userInfo.username}
                            </TableCell>
                            <TableCell align="right">{userInfo.carbon_footprint}</TableCell>
                        </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
    
}



