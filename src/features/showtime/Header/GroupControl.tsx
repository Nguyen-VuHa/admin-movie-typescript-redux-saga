import { Button } from 'components/Common'
import React from 'react'
import { IoAddSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { MdManageSearch } from 'react-icons/md';

function GroupControl() {
    const navigate = useNavigate();
    
    return (
        <div 
            style={{ 
                display: 'flex', 
                justifyContent: 'flex-start', 
                alignItems: 'flex-start', 
                position: 'relative',
                marginRight: '10px',
            }}
        >
            <Button
                onClick={() => {
                    // navigate('edit');
                }}
            >
                Thêm suất chiếu
                <IoAddSharp 
                    size={18}
                    style={{ marginLeft: '8px' }}
                />
            </Button>
            <Button
                onClick={() => {
                    // navigate('edit');
                }}
            >
                <MdManageSearch 
                    size={22}
                />
            </Button>
        </div>
    )
}

export default GroupControl