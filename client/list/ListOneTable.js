import React from 'react'

export default ({ list }) => {
    if(!list) return ''

    return (
        <table className='slim vertical'>
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>{list.name}</td>
                </tr>
                <tr>
                    <th>Members</th>
                    <td>{list.members}</td>
                </tr>
            </tbody>
        </table>
    )
}
