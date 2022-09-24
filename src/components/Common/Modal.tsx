import React, { ReactNode, useRef } from 'react'
import styles from 'assets/styles/modal.style.module.scss'
import classNames from 'classnames/bind'
import { IoClose } from "react-icons/io5";

const md = classNames.bind(styles);

interface ModalType {
    children?: ReactNode,
    title?: String,
    onHideModal?: Function,
    visible?: boolean,
}

export function Header({ title = 'Modal Title', onHideModal }: ModalType) {

    return (
        <div className={md('md-header')}>
            <h5 className={md('md-header-title')}>{ title }</h5>
            <div 
                className={md('md-header-close')}
                onClick={() => {
                    onHideModal && onHideModal();
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

function Modal({ children, onHideModal, visible = false }: ModalType) {
    const containerRef = useRef<HTMLDivElement>(null);
    
    return (
        <div
            className={md('wrapper-modal', visible && 'open')}
            onClick={(e: any) => {
                if(containerRef.current && !containerRef.current?.contains(e.target)) {
                    onHideModal && onHideModal();
                }
            }}
        >
            <div  className={md('modal-container', visible && 'show')} ref={containerRef}>
                { children }
            </div>
        </div>
    )
}

Modal.Header = Header;
Modal.Body = Content;
Modal.Footer = Footer;

export default Modal