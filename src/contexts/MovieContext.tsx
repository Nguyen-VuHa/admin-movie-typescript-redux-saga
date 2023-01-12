import { PropsContext, ActionContext } from "models";
import { createContext, useReducer } from "react";


export const MovieContext = createContext<any | null>(null);

export const MovieContextProvider = (props: PropsContext) => { 

    const initialData = {
        statusModalQuestion: false,

        movieId: null,

        statusSort: false,
    }

    const [movieState, dispatchMovie] = useReducer((state: any, action: ActionContext) => {
        switch (action.type) {
            case 'SET_STATUS_SORT': 
                return {
                    ...state,
                    statusSort: action.payload,
                }
            case 'SET_MOVIE_ID_UPDATE': 
                return {
                    ...state,
                    movieId: action.payload,
                }
            case 'SET_STATUS_MODAL_QUESTION': 
                return {
                    ...state,
                    statusModalQuestion: action.payload,
                }
            
            case 'RESET_DEFAULT_CONTEXT': 
                return initialData;
            default:
                return state;
        }
    }, initialData)


    return (
        <MovieContext.Provider value={{ movieState, dispatchMovie }}>
            { props.children }
        </MovieContext.Provider>
    )
}