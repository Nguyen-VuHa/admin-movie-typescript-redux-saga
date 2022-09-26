import { Button } from 'components/Common'
import { ModalContext } from 'contexts/ModalContext';
import React, { useContext } from 'react'
import { IoAddSharp } from "react-icons/io5";

function GroupControl() {
    const { setModalEditCate } = useContext(ModalContext);

    return (
        <div 
            style={{ 
                display: 'flex', 
                justifyContent: 'flex-start', 
                alignItems: 'flex-start', 
                flexDirection: 'column', 
                position: 'relative' 
            }}
        >
            <Button
                onClick={() => {
                    setModalEditCate(true);
                }}
            >
                Thêm thể loại
                <IoAddSharp 
                    size={18}
                    style={{ marginLeft: '8px' }}
                />
            </Button>
        </div>
    )
}

export default GroupControl