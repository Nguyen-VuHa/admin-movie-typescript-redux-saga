import { Button } from 'components/Common';
import Input from 'components/Common/Input';
import Modal from 'components/Common/Modal';
import React, { useRef, useEffect, useContext, useState, useCallback } from 'react'
import commonStyle from 'utils/common.style.module.scss';
import classNames from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AuthContext } from 'contexts/AuthContext';
import useToastify from 'hooks/useToastify';
import { ModalContext } from 'contexts/ModalContext';
import InputSelect from 'components/Common/InputSelect';
import { setAuthorActorName, setDefaultDataUpdateAuthorActor, setDefaultValueSubmit, setTypeAuthorActor } from 'reducers/authorActorReducer/authorActorSlice';

const cm = classNames.bind(commonStyle);

const arrType = [
    {
        value: 1,
        name: "Đạo diễn",
    },
    {
        value: 2,
        name: "Diễn viên",
    }
]

function ModalEdit() {
    const dispatch = useAppDispatch();
    const dispatchToast = useToastify();

    const authorNameRef = useRef<HTMLInputElement>(null);
    const { id, type, authorActorName, loadingCreate } = useAppSelector(state => state.authorActorState);

    const { modalEditAuthorActor, setModalEditAuthorActor } = useContext(ModalContext);
    const { stateAuth } = useContext(AuthContext);

    const [msgName, setMsgName] = useState<string>('');
    const [msgType, setMsgType] = useState<string>('');

    useEffect(() => {
        if(authorNameRef.current && modalEditAuthorActor)
        {
            authorNameRef.current.focus();
        }
    }, [modalEditAuthorActor]);
    
    const handleSubmitEditing = (e?: React.FormEvent) => {
        e && e.preventDefault();

        if(!authorActorName)
            setMsgName('Trường này không được trống...');

        if(!type)
            setMsgType('Loại bắt buộc phải chọn...');

        if(!stateAuth.fullname) {
            dispatchToast({
                type: 'TYPE_WARN',
                payload: {
                    message: 'Bạn chưa đăng nhập hoặc chưa tồn tại bao giờ!',
                    position: 'top-left',
                }
            })

            return;
        }

        if(authorActorName && type && stateAuth && stateAuth.fullname) {
            if(id) {
                dispatch({
                    type: "UPDATED_AUTHOR_ACTOR",
                    payload: {
                        id: id,
                        name: authorActorName,
                        type: type,
                    }
                })
            }
            else {
                dispatch({
                    type: "CREATED_NEW_AUTHOR_ACTOR",
                    payload: {
                        name: authorActorName,
                        type: type,
                        createdBy: stateAuth.fullname
                    }
                })
            }

            handleCloseModal();
        } else {
            authorNameRef.current && authorNameRef.current.focus();
        }

       
    }

    const handleClearMsgError = useCallback(() => {
        setMsgName('');
        setMsgType('');
    }, []);
    

    const handleCloseModal = () => {
        setModalEditAuthorActor(false);
        handleClearMsgError();

        dispatch(setDefaultValueSubmit());

        if(id)
        {
            setTimeout(() => {
                dispatch(setDefaultDataUpdateAuthorActor());
            }, 500);
        }
    }

    return (
        <Modal 
            visible={modalEditAuthorActor}
            onHideModal={() => {
                handleCloseModal();
            }}
        >
            <Modal.Header 
                title={id ? "Cập nhật" : "Thêm mới"} 
                onHideModal={() => {
                    handleCloseModal();
                }}
            />
            <Modal.Body>
                <form onSubmit={(e: React.FormEvent) => handleSubmitEditing(e)}>
                    <h3 className={cm('fg-title')} style={{marginBottom: '8px'}}>Nhập tên đạo diễn / diễn viên</h3>
                    <Input 
                        ref={authorNameRef}
                        value={authorActorName}
                        placeholder='Nhập thể loại'
                        onChange={(text: string) => {
                            dispatch(setAuthorActorName(text));
                            handleClearMsgError();
                        }}
                        errMessage={msgName}
                    />
                    <h3 className={cm('fg-title')} style={{margin: '8px 0px'}}>Loại</h3>
                    <InputSelect 
                        placeholder='-- Chọn loại (Đạo diễn / Diễn viên) --'
                        data={arrType}
                        value={type}
                        onChange={(value: number) => {
                            dispatch(setTypeAuthorActor(value));
                            handleClearMsgError();
                        }}
                        errMessage={msgType}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={() => {
                        handleSubmitEditing();
                    }}
                    loading={loadingCreate}
                    loadingText={"Đang xử lý..."}
                >
                    { id ? "Cập nhật" : "Thêm mới" }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEdit