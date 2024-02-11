import axios, { AxiosError } from "axios";
import {RegistrationDetails, UserLogin } from "../domain/user";
//import {UserInputsFromUI} from "../domain/userInputsFromUI";
//import { UserInputsFromUI1 } from "../domain/userInputsFromUI1";
import {AUTH_API_LOCAL, GEN_API_LOCAL, AUTH_API_PROD, GEN_API_PROD } from "../environmentals";
import {UserInputsFromUIEnergy} from "../domain/userInputsFromUIEnergy";
import {UserInputsFromUITransport} from "../domain/userInputsFromUITransport";
import {UserInputsFromUIFood} from "../domain/userInputsFromUIFood";
import {UserInputsFromUIGoods} from "../domain/userInputsFromUIGoods";

const genApi = GEN_API_PROD;
const authApi = AUTH_API_PROD;

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params: params }),
    post: (url: string, body: {}) => axios.post(url, body),
    put:(url: string, body: {}) => axios.put(url, body),
}

const account = {
    login: async (userLogin: UserLogin) => {
        console.log(userLogin.username)
        console.log(userLogin.password)
        let resultFromAuth = await requests.post(`${authApi}/api/auth/login`, userLogin);
        return resultFromAuth.data;
        },
    registerUser: async (userDetails: RegistrationDetails) => {
        let registerResult = await requests.post(`${authApi}/api/auth/register`, userDetails);
        return registerResult.data;
    },
    verifyToken: async () => {
        let result = await requests.get(`${authApi}/api/auth/tokenValid`);
        return result.data
    }
}

const genapi = {

    sendUserInputsFromUIEnergy: async (inputsFromUIEnergy:UserInputsFromUIEnergy) => {
        let userInputsFromUIEnergyResult = await requests.post(`${genApi}/api/gen/userInfoEnergy`, inputsFromUIEnergy);
        return userInputsFromUIEnergyResult.data;
      
        
    },
    sendUserInputsFromUITransport: async (inputsFromUITransport:UserInputsFromUITransport) => {
        let userInputsFromUITransportResult = await requests.post(`${genApi}/api/gen/userInfoTransport`, inputsFromUITransport);
        return userInputsFromUITransportResult.data;
    },
    sendUserInputsFromUIFood: async (inputsFromUIFood:UserInputsFromUIFood) => {
        let userInputsFromUIFoodResult = await requests.post(`${genApi}/api/gen/userInfoFood`, inputsFromUIFood);
        return userInputsFromUIFoodResult.data;
    },
    sendUserInputsFromUIGoods: async (inputsFromUIGoods:UserInputsFromUIGoods) => {
        let userInputsFromUIGoodsResult = await requests.post(`${genApi}/api/gen/userInfoGoods`, inputsFromUIGoods);
        return userInputsFromUIGoodsResult.data;
    }
}



axios.interceptors.request.use(config => {
    let token = localStorage.getItem('accessToken')
    if (token) { // @ts-ignore
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

axios.interceptors.response.use(async response => {
    return response
}, (error: AxiosError) => {
    const { status } = error.response!;
    switch (status) {
        case 400:
            throw error.response;
            case 401:
                throw error.response;
                case 403:
                    throw error.response;
                    case 404:
                        throw error.response;
                        case 417:
                            throw error.response;
                            case 500:
                                throw error.response;
                                case 503:
                                    throw error.response;
        default:
            break;
    }
})

const services = {
    requests,
    account,
    genapi
}

export default services;
