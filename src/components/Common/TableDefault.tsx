import React, { ReactNode } from 'react'
import { IoSadSharp } from "react-icons/io5";
import Images from 'assets/images';

interface TableDefaultProps {
    textNotify?: string,
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

function TableDefault({textNotify = 'Table Empty Data!' }: TableDefaultProps) {
    return (
        <div 
            style={{
                ...layoutTableDefault,
                flexDirection: 'column',
            }}
        >
            <img src={Images.EMPTY} alt="NO IMAGES" width={200} height={200} />
            <span style={textStyle}> { textNotify } </span>
        </div>
    )
}

export default TableDefault