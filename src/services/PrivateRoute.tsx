import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import React, { ComponentType, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./ConfigureStore";
import { removeUser, setUser } from "./AccountSlice";
import agent from "./Agent";
import LoadingComponent from "../components/LoadingComponent";

interface Props extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

export default function PrivateRoute({ component: Component, ...rest }: Props) {
    const { user } = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const [tokenValid, setTokenValid] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        routeProcess();
        }, [])

    const routeProcess = async () => {
        let userToken = localStorage.getItem('accessToken');
        try {
            let result = await agent.account.verifyToken();
            if (result) {
                setTokenValid(true)
            }
            else {
                setTokenValid(false)
            }
            if (userToken) {
                if (userToken && result) {
                    dispatch(setUser(userToken))
                }
            }
            if (!userToken || !result) {
                dispatch(removeUser())
            }
        }
        catch (error: any) {
            setTokenValid(false)
            dispatch(removeUser())
        }
        setTimeout(() => setLoading(false), 2000)
    }



    if (isLoading) return (<LoadingComponent message="" animation='MoonLoader'></LoadingComponent>)
    return (
        <Route {...rest} render={props => {
            if (!user) {
                let userToken = localStorage.getItem('accessToken');
                if (!userToken || !tokenValid) {
                    return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                }
            }
            else {
                console.log("in else");
                return <Component {...props} />
            }
            
        }}
        />
        );
}

