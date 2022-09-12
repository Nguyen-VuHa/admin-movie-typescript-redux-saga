import React, { ReactNode } from 'react'
import { IoSadSharp } from "react-icons/io5";

interface TableDefaultProps {
    textNotify?: string,
    icon?: ReactNode,
}

const layoutTableDefault = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '300px',
    paddingTop: '50px',
}

const textStyle = {
    fontSize: '23px',
    color: '#f9ab00',
    marginTop: '20px',
}

function TableDefault({textNotify = 'Table Empty Data!', icon }: TableDefaultProps) {
    return (
        <div 
            style={{
                ...layoutTableDefault,
                flexDirection: 'column',
            }}
        >
            
            { 
                icon || <IoSadSharp 
                    size={150}
                    color='#f9ab00'
                />
            }
            <span style={textStyle}> { textNotify } </span>
        </div>
    )
}

export default TableDefault