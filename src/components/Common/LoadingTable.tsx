import React from 'react'
import { Dna } from 'react-loader-spinner'

interface LoadingTableProps {
    textLoading?: string,
}

const layoutLoading = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '300px',
    paddingTop: '50px',
}

const textStyle = {
    fontSize: '23px',
    color: '#f9ab00',
}

function LoadingTable({textLoading = 'Loading...'}: LoadingTableProps) {
    return (
        <div 
            style={{
                ...layoutLoading,
                flexDirection: 'column',
            }}
        >
            <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
            <span style={textStyle}> { textLoading } </span>
        </div>
    )
}

export default LoadingTable