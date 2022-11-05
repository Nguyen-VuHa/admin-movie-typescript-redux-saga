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
    const { id } = useAppSelector(state => state.authorActorState);

    return (
        <Modal 
            visible={true}
            onHideModal={() => {
                // handleCloseModal();
            }}
        >
            <Modal.Header 
                title={id ? "Cập nhật" : "Thêm mới"} 
                onHideModal={() => {
                    // handleCloseModal();
                }}
            />
            <Modal.Body>
                <form>
                    <h3 className={cm('fg-title')} style={{marginBottom: '8px'}}>Nhập tên đạo diễn / diễn viên</h3>
                    <Input 
                        // id="category_name_id"
                        value={"Value"}
                        placeholder='Nhập thể loại'
                        onChange={(text: string) => {
                            // setCategoryName(text); 
                            // setMsg('');
                        }}
                        // errMessage={msg}
                    />
                    <h3 className={cm('fg-title')} style={{margin: '8px 0px'}}>Loại</h3>
                    <Input 
                        // id="category_name_id"
                        value={"Value"}
                        placeholder='Nhập thể loại'
                        onChange={(text: string) => {
                            // setCategoryName(text); 
                            // setMsg('');
                        }}
                        // errMessage={msg}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                   
                >
                    Thêm mới
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalEdit