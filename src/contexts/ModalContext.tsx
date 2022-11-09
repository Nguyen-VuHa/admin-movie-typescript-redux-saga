import { createContext, ReactNode, useState } from 'react';

interface PropsContext {
    children: ReactNode;
}

export const ModalContext = createContext<any | null>(null);

export const ModalContextProvider = (props: PropsContext) => { 
    const [modalEditCate, setModalEditCate] = useState<boolean>(false);
    const [modalEditAuthorActor, setModalEditAuthorActor] = useState<boolean>(false);

    return (
        <ModalContext.Provider 
            value={{
                modalEditCate,
                setModalEditCate,

                modalEditAuthorActor,
                setModalEditAuthorActor,

                
            }}
        >
            { props.children }
        </ModalContext.Provider>
    )
}