import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import LoadingComponent from "../components/LoadingComponent";
import agent from "../services/Agent";
import {userInputsInDB} from "../domain/userInputsInDB";
import { useAppSelector } from "../services/ConfigureStore";
import { CarbonFootprintResult } from "../domain/carbonFootprintResult";
import {Grid, Typography} from "@mui/material";
import {BarChart, DefaultizedPieValueType } from '@mui/x-charts';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { styled } from '@mui/material/styles';
import { useDrawingArea } from '@mui/x-charts/hooks';
import {UserFootprintPerMonth} from "../domain/userFootprintPerMonth";

export default function HomePage() {
    const [isLoading, setLoading] = useState(true);
    const [userResults, setUserResults] = useState<userInputsInDB[]>([])
    const { user } = useAppSelector(state => state.account);
    const [userFootprintPerMonth, setUserFootprintPerMonth]=useState<UserFootprintPerMonth>({
        user_info_footprint_per_month_id:0,
        user_id:0,
        jan : 0,
        feb : 0,
        mar : 0,
        apr : 0,
        may : 0,
        jun : 0,
        jul : 0,
        aug : 0,
        sep : 0,
        oct : 0,
        nov : 0,
        dec : 0
    })
    const [currentMonthFootprint, setCurrentMonthFootprint] =
    useState<CarbonFootprintResult>({
        carbonFootprintFood : 0,
        carbonFootprintEnergy : 0,
        carbonFootprintGoods : 0,
        carbonFootprintTransit : 0,
        carbonFootprintTransitBus : 0,
        carbonFootprintTransitCar : 0,
        carbonFootprintTransitMotorbike : 0,
        carbonFootprintTransitTrain : 0,
        carbonFootprintTransitTaxis : 0,
        carbonFootprintTransitFerry : 0,
        carbonFootprintTransitFlight : 0,
        carbonFootprintTotal : 0,
    })
    const [currentYearFootprint, setCurrentYearFootprint] =
    useState<CarbonFootprintResult>({
        carbonFootprintFood : 0,
        carbonFootprintEnergy : 0,
        carbonFootprintGoods : 0,
        carbonFootprintTransit : 0,
        carbonFootprintTransitBus : 0,
        carbonFootprintTransitCar : 0,
        carbonFootprintTransitMotorbike : 0,
        carbonFootprintTransitTrain : 0,
        carbonFootprintTransitTaxis : 0,
        carbonFootprintTransitFerry : 0,
        carbonFootprintTransitFlight : 0,
        carbonFootprintTotal : 0,
    })

    const data = [
        { value: currentMonthFootprint.carbonFootprintFood, label: 'Food' },
        { value: currentMonthFootprint.carbonFootprintEnergy, label: 'Energy' },
        { value: currentMonthFootprint.carbonFootprintGoods, label: 'Goods' },
        { value: currentMonthFootprint.carbonFootprintTransit, label: 'Transit' },
    ];

    const size = {
      width: 400,
      height: 200,
    };

    const StyledText = styled('text')(({ theme }) => ({
      fill: theme.palette.text.primary,
      textAnchor: 'middle',
      dominantBaseline: 'central',
      fontSize: 20,
    }));
    
    useEffect(()=>{
        setLoading(true);
        let userId = localStorage.getItem('user_id');
        GetCarbonFootprintResultsForCurrentMonthAndYear(userId!).then(()=>setLoading(false))
    },[])
    
    async function GetCarbonFootprintResultsForCurrentMonthAndYear(userId : string){
        let resultsMonth:CarbonFootprintResult = await agent.genapi.getTotalCarbonFootprintForCurrentMonth(parseInt(userId))
        setCurrentMonthFootprint(resultsMonth);
        let resultsYear:CarbonFootprintResult = await agent.genapi.getTotalCarbonFootprintForCurrentYear(parseInt(userId))
        setCurrentYearFootprint(resultsYear);
        try{
            let userFootprintPerMonth : UserFootprintPerMonth = await agent.genapi.getTotalCarbonFootprintPerMonth(parseInt(userId))
            setUserFootprintPerMonth(userFootprintPerMonth);
        }
        catch(error:any)
        {
            console.log(error)
        }

    }
    
    function PieCenterLabel({ children }: { children: React.ReactNode }) {
        const { width, height, left, top } = useDrawingArea();
        return (
            <StyledText x={left + width / 2} y={top + height / 2}>
                {children}
            </StyledText>
            );
    }

    const chartSetting = {
        xAxis: [
            {
                label: 'rainfall (mm)',
            },
            ],
        width: 500,
        height: 400,
    };
    const dataset = [
        {
            footprint: userFootprintPerMonth.jan,
            month: 'Jan',
        },
        {
            footprint: userFootprintPerMonth.feb,
            month: 'Fev',
        },
        {
            footprint: userFootprintPerMonth.mar,
            month: 'Mar',
        },
        {
            footprint: userFootprintPerMonth.apr,
            month: 'Apr',
        },
        {
            footprint: userFootprintPerMonth.may,
            month: 'May',
        },
        {
            footprint: userFootprintPerMonth.jun,
            month: 'June',
        },
        {
            footprint: userFootprintPerMonth.jul,
            month: 'July',
        },
        {
            footprint: userFootprintPerMonth.aug,
            month: 'Aug',
        },
        {
            footprint: userFootprintPerMonth.sep,
            month: 'Sept',
        },
        {
            footprint: userFootprintPerMonth.oct,
            month: 'Oct',
        },
        {
            footprint: userFootprintPerMonth.nov,
            month: 'Nov',
        },
        {

            footprint: userFootprintPerMonth.dec,
            month: 'Dec',
        },
        ];
    const valueFormatter = (value: number) => `${value}kg`;

    if (isLoading)
        return (<LoadingComponent message="" animation='MoonLoader'></LoadingComponent>)
    return (
        <>
        <Container sx={{ display: 'flex', flexDirection: 'row', mt: 10 , justifyContent:'center'}}>
            <Typography variant='h3' fontWeight={500} color='secondary' marginBottom={6} >
               What is your carbon contribution?
            </Typography>
        </Container>
        <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent:'center'}}>
            <Typography variant='h5' color='secondary' >
            Our daily lifestyles significantly impact the planet through CO2 emissions
                generated by activities like driving, heating, cooking, working, and flying.
            You can easily calculate your personal carbon footprint
            to understand your impact from your daily habbits and change your lifestyle to a more sunstainable mode!!
            </Typography>
        </Container>
        <Container sx={{ display: 'flex', flexDirection: 'row', mt: '80px', justifyContent:'center'}}>
        <Typography variant='h4' color='secondary'>
            Your carbon contribution for current month
        </Typography>
        </Container>
        <Container sx={{ display: 'flex', flexDirection: 'row', mt: '80px' }}>
        <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
            <PieCenterLabel>{currentMonthFootprint.carbonFootprintTotal}</PieCenterLabel>
        </PieChart>
        </Container>
        <Container sx={{ display: 'flex', flexDirection: 'row', mt: '80px' }}>
            <BarChart
                dataset={dataset}
                yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                series={[{ dataKey: 'footprint', label: 'User carbon footprint', valueFormatter }]}
                layout="horizontal"
                {...chartSetting}
            />
        </Container>

    </>

    );
}
