import React, { ReactNode, useContext, useEffect, useRef } from 'react'
import styles from 'assets/styles/modal.style.module.scss'
import classNames from 'classnames/bind'
import { IoClose } from "react-icons/io5";
import { ModalContext } from 'contexts/ModalContext';

const md = classNames.bind(styles);

interface ModalType {
    children?: ReactNode,
    title?: String,
    onHideModal?: Function,
}

export function Header({ title = 'Modal Title' }: ModalType) {
    const { onChangeModal } = useContext(ModalContext);

    return (
        <div className={md('md-header')}>
            <h5 className={md('md-header-title')}>{ title }</h5>
            <div 
                className={md('md-header-close')}
                onClick={() => {
                    onChangeModal(false);
                }}
            >
                <IoClose
                    size={20} 
                    color={'#f9ab00'}
                />
            </div>
        </div>
    )
}

export function Content({ children }: ModalType) {
    return (
        <div style={{padding: '10px'}}>
            { children }
        </div>
    )
}

export function Footer({ children }: ModalType) {
    return (
        <div className={md('md-footer')}>{ children }</div>
    )
}

function Modal({ children, onHideModal }: ModalType) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { modal, onChangeModal } = useContext(ModalContext);

    useEffect(() => {
        if(!modal)
        {
            let timeOut = setTimeout(() => {
                onHideModal && onHideModal();
            }, 400);

            return () => clearTimeout(timeOut)
        }
    }, [modal])
    
    return (
        <div
            className={md('wrapper-modal', modal && 'open')}
            onClick={(e: any) => {
                if(containerRef.current && !containerRef.current?.contains(e.target)) {
                    onChangeModal(false);
                }
            }}
        >
            <div  className={md('modal-container', modal && 'show')} ref={containerRef}>
                { children }
            </div>
        </div>
    )
}

Modal.Header = Header;
Modal.Body = Content;
Modal.Footer = Footer;

export default Modal