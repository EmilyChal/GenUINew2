import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import LoadingComponent from "../components/LoadingComponent";
import agent from "../services/Agent";
import {userInputsInDB} from "../domain/userInputsInDB";
import { useAppSelector } from "../services/ConfigureStore";
import { CarbonFootprintResult } from "../domain/carbonFootprintResult";
import { Typography } from "@mui/material";
import { DefaultizedPieValueType } from '@mui/x-charts';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { styled } from '@mui/material/styles';
import { useDrawingArea } from '@mui/x-charts/hooks';

export default function HomePage() {
    const [isLoading, setLoading] = useState(true);
    const [userResults, setUserResults] = useState<userInputsInDB[]>([])
    const { user } = useAppSelector(state => state.account);
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
        GetCarbonFootprintResultsForCurrentMonth(userId!);
        GetCarbonFootprintResultsForCurrentYear(userId!);
        setLoading(false);
    },[])
    
    async function GetCarbonFootprintResultsForCurrentMonth(userId : string){
        let results:CarbonFootprintResult = await agent.genapi.getTotalCarbonFootprintForCurrentMonth(parseInt(userId))
        console.log(results);
        setCurrentMonthFootprint(results);
    }

    async function GetCarbonFootprintResultsForCurrentYear(userId : string){
        let results:CarbonFootprintResult = await agent.genapi.getTotalCarbonFootprintForCurrentYear(parseInt(userId))
        console.log(results);
        setCurrentYearFootprint(results);
    }
    
    function PieCenterLabel({ children }: { children: React.ReactNode }) {
        const { width, height, left, top } = useDrawingArea();
        return (
            <StyledText x={left + width / 2} y={top + height / 2}>
                {children}
            </StyledText>
            );
    }

    if (isLoading)
        return (<LoadingComponent message="" animation='MoonLoader'></LoadingComponent>)
    return (
        <>
        {/*{userResults.map((result,index) => (*/}
        {/*    <li key={index}>{result.user_id}</li>*/}
        {/*    ))}*/}
        <Typography variant='h3'>
            FOR MONTH
        </Typography>

        <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
            <PieCenterLabel>{currentMonthFootprint.carbonFootprintTotal}</PieCenterLabel>
        </PieChart>

        
        </>
      
    )
}
