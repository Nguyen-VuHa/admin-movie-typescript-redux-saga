import { Button } from 'components/Common'
import React from 'react'
import { IoAddSharp } from "react-icons/io5";

function GroupControl() {

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
            <Button>
                Thêm mới
                <IoAddSharp 
                    size={18}
                    style={{ marginLeft: '8px' }}
                />
            </Button>
        </div>
    )
}

export default GroupControl