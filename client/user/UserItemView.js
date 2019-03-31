import React from 'react'

export default ({ user, makeLink }) => {
    return (
        <div className='user'>
            <div className='image'><img src={user.profile_image_url_https} /></div>
            <div className='info'>
                <div className='name'>
                    <span className='full-name'>{makeLink(user.name)}</span>
                    (<span className='screen-name'>{makeLink('@' + user.screen_name)}</span>)
                </div>
                <div className='description'>{user.description}</div>
            </div>
        </div>
    )
}
