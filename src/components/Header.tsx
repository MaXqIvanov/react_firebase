import React from 'react'
import Cookies from 'js-cookie';


export const Header = () => {
    const profile = Cookies.get('user')
  return (
    <div className='header'>
        <div className='logo header__logo'>ToDo</div>
        <div style={{backgroundImage: `url(${JSON.parse(profile).photoURL})`}} className='profile header__profile'></div>
    </div>
  )
}
