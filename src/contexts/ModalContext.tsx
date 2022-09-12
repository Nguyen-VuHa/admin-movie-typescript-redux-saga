import { ActionContext } from 'constants/ActionInterface';
import { createContext, useReducer, ReactNode, useState } from 'react';

interface PropsContext {
    children: ReactNode;
}

export const ModalContext = createContext<any | null>(null);

export const ModalContextProvider = (props: PropsContext) => { 
    const [modal, setModal] = useState<boolean>(false);

    return (
        <ModalContext.Provider 
            value={{
                modal,
                onChangeModal: setModal,
            }}
        >
            { props.children }
        </ModalContext.Provider>
    )
}