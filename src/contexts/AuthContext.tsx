import { ActionContext } from 'constants/ActionInterface';
import { createContext, useReducer, ReactNode } from 'react';

interface PropsContext {
    children: ReactNode;
}

export const AuthContext = createContext<any | null>(null);

export const AuthContextProvider = (props: PropsContext) => { 
    const refreshToken = localStorage.getItem('refreshToken');
    const userInfo = {
        id: '',
        email: '',
        fullname: '',
        role: '',
        avartar: '',
        numberOfNotify: 0,
        surplus: 0,
        isLogin: refreshToken ? true : false,
    };

    const [stateAuth, dispatchAuth] = useReducer((state: any, action: ActionContext) => {
        switch (action.type) {
            case "SET_AVARTAR_USER":
                return {
                    ...state,
                    avartar: action.payload,
                };
            case "UPDATE_FULLNAME_USER_INFO":
                return {
                    ...state,
                    fullname: action.payload,
                };
            case "SET_USER_INFO":
                return {
                    ...state,
                    ...action.payload,
                    id: action.payload?.idUser,
                    isLogin: true,
                };
            case "SET_NUMBER_OF_NOTIFY":
                return {
                    ...state,
                    numberOfNotify: action.payload,
                };
            case "CLEAR_NUMBER_OF_NOTIFY":
                return {
                    ...state,
                    numberOfNotify: 0,
                };
            case "CLEAR_USER_INFO":
                return {
                    ...userInfo,
                    isLogin: false,
                };
            default:
                return state;
        }
    }, userInfo)

    return (
        <AuthContext.Provider value={{stateAuth, dispatchAuth}}>
            { props.children }
        </AuthContext.Provider>
    )
}

