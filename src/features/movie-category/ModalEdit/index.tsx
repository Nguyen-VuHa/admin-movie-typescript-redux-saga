import { Button } from 'components/Common';
import Input from 'components/Common/Input';
import Modal from 'components/Common/Modal';
import React, { useState, useContext, useEffect } from 'react'
import commonStyle from 'utils/common.style.module.scss';
import classNames from 'classnames/bind';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AuthContext } from 'contexts/AuthContext';
import useToastify from 'hooks/useToastify';
import { ModalContext } from 'contexts/ModalContext';
import { setDefaultDataUpdate } from 'reducers/categoryReducer/categorySlice';

const cm = classNames.bind(commonStyle);

function ModalEdit() {
    const dispatch = useAppDispatch();
    const dispatchToast = useToastify();

    const { stateAuth } = useContext(AuthContext);
    const { modalEditCate, setModalEditCate } = useContext(ModalContext);
    const { loadingCreate, id, categoryNameUpdate } = useAppSelector(state => state.categoryState);

    const [categoryName, setCategoryName] = useState<string>('');
    const [msg, setMsg] = useState<string>('');

    useEffect(() => {
        if(id)
            setCategoryName(categoryNameUpdate);
        else    
            setCategoryName('');
    }, [id])
    

    const handleCreateCategory = () => {
        if(categoryName && stateAuth.fullname) {
            if(id) {
                dispatch({
                    type: 'UPDATE_CATEGORY',
                    payload: {
                        id: id,
                        categoryName: categoryName,
                    }
                })
            }
            else {
                dispatch({
                    type: 'CREATE_CATEGORY',
                    payload: {
                        categoryName: categoryName,
                        createdBy: stateAuth.fullname,
                    }   
                });
            }
        }
        else {
            if(!stateAuth.fullname) {   
                dispatchToast({
                    type: 'TYPE_WARN',
                    payload: {
                        message: 'Bạn chưa đăng nhập hoặc chưa tồn tại bao giờ!',
                        position: 'top-left',
                    }
                })
            }
            else {
                setMsg('Trường này không được trống!');
                document.getElementById("category_name_id")?.focus();
            }
        }
    }

    const handleCloseModal = () => {
        setModalEditCate(false);
        setMsg('');
        setCategoryName('');

        if(id)
        {
            setTimeout(() => {
                dispatch(setDefaultDataUpdate());
            }, 500);
        }
    }

    return (
        <Modal 
            visible={modalEditCate}
            onHideModal={() => {
                handleCloseModal();
            }}
        >
            <Modal.Header 
                title={id ? "Cập nhật thể loại" : "Thêm mới thể loại"} 
                onHideModal={() => {
                    handleCloseModal();
                }}
            />
            <Modal.Body>
                <h3 className={cm('fg-title')} style={{marginBottom: '8px'}}>Nhập thể loại phim</h3>
                <Input 
                    id="category_name_id"
                    value={categoryName}
                    placeholder='Nhập thể loại'
                    onChange={(text: string) => {
                        setCategoryName(text); 
                        setMsg('');
                    }}
                    errMessage={msg}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    loading={loadingCreate}
                    loadingText="Đang xử lý..."
                    onClick={() => {
                        handleCreateCategory();
                    }}
                >
                    { id ? "Cập nhật" : "Thêm mới" }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEdit