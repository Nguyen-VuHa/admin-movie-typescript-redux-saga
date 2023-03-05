import { Button } from 'components/Common'
import routePath from 'constants/routePath';
import React from 'react'
import { IoAddSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

function GroupControl() {
    const navigate = useNavigate();
    
    return (
        <div 
            style={{ 
                display: 'flex', 
                justifyContent: 'flex-start', 
                alignItems: 'flex-start', 
                flexDirection: 'column', 
                position: 'relative',
            }}
        >
            <Button
                onClick={() => {
                    // navigate('edit');
                }}
            >
                Thêm cụm rạp
                <IoAddSharp 
                    size={18}
                    style={{ marginLeft: '8px' }}
                />
            </Button>
        </div>
    )
}

export default GroupControl