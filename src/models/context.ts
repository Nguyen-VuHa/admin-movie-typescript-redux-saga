import { ReactNode } from 'react';


export type PropsContext = {
    children: ReactNode;
}

export type ActionContext = {
    type: string;
    payload: any;
}