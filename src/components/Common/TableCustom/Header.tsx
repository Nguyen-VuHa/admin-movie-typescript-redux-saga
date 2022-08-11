import React from 'react'

interface HeaderTableProps {
    titles?: Array<string>,
}

function Header({ titles = [] }: HeaderTableProps) {
    return (
        <thead>
            <tr>
                {
                    titles && titles.length > 0
                    ? titles.map((title, index) => {
                        return <th key={index} >{ title }</th>
                    }) : <th>Tiêu đề rỗng</th>
                }
            </tr>
        </thead>
    )
}

export default Header