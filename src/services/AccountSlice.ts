import { User } from "../domain/user";
import { createSlice } from "@reduxjs/toolkit";
import { TokenReturned } from "../domain/token";
import { history } from "..";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

//management of user authentication state, signing in and out and updating user information
export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state: any) => {
            //sign the user out
            state.user = null;
            //remove token from the local storage
            localStorage.removeItem('accessToken');
            //redirect user to the login page
            history.push('/login');
        },
        setUser: (state: any, action: any) => {
            let claims = action.payload.split('.')[1];

            let readclaims = window.atob(claims);
            var returnedToken: TokenReturned = JSON.parse(readclaims);
          
            state.user = { ...action.payload, username: returnedToken.Name, email: returnedToken.Email };
        },
        removeUser: (state: any) => {
            state.user = null;
            localStorage.removeItem('accessToken');
        }
    }
})


export const { signOut, setUser,removeUser } = accountSlice.actions;
