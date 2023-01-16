import { PropsContext, ActionContext } from "models";
import { createContext, useReducer } from "react";


export const CategoryContext = createContext<any | null>(null);

export const CategoryContextProvider = (props: PropsContext) => { 

    const initialData = {
        statusQuestionModal: false,
        dataUpdateStatus: null,

        askDeletedModal: false,
        dataDeleted: null,
    }

    const [stateCate, dispatchCate] = useReducer((state: any, action: ActionContext) => {
        switch (action.type) {
            case 'SET_ASK_DELETED_MODAL': 
                return {
                    ...state,
                    askDeletedModal: action.payload,
                }
            case 'SET_DATA_DELETED_MODAL': 
                return {
                    ...state,
                    dataDeleted: action.payload,
                }

            case 'SET_STATUS_MODAL_QUESTION': 
                return {
                    ...state,
                    statusQuestionModal: action.payload,
                }
            case 'SET_DATA_UPDATE_STATUS_MODAL_QUESTION': 
                return {
                    ...state,
                    dataUpdateStatus: action.payload,
                }
            default:
                return state;
        }
    }, initialData)


    return (
        <CategoryContext.Provider value={{ stateCate, dispatchCate }}>
            { props.children }
        </CategoryContext.Provider>
    )
}