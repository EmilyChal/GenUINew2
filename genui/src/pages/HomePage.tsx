import Container from "@mui/material/Container";
import {useEffect, useState} from "react";
import LoadingComponent from "../components/LoadingComponent";
import agent from "../services/Agent";
import {userInputsInDB} from "../domain/userInputsInDB";

export default function HomePage() {
    const [isLoading, setLoading] = useState(true);
    const [userResults, setUserResults] = useState<userInputsInDB[]>([])
    
    useEffect(()=>{
//        GetHouseAndEnergyResults();
//        setLoading(false);
    },[])
    
//    async function GetHouseAndEnergyResults(){
//        let results:userInputsInDB[] = await agent.genapi.getHouseAndEnergyResults(5);
//        console.log(results);
//        setUserResults(results);
//    }
    
//    if (isLoading)
//        return (<LoadingComponent message="" animation='MoonLoader'></LoadingComponent>)
    return (
        <>
        {/*{userResults.map((result,index) => (*/}
        {/*    <li key={index}>{result.user_id}</li>*/}
        {/*    ))}*/}
        
        </>
      
    )
}
