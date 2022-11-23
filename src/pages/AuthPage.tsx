import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../hooks/redux'
import Cookies from 'js-cookie';
import { FcGoogle } from "react-icons/fc";
import { UserAuth, UserLogout } from '../store/reducers/auth/ActionAuth';

export const AuthPage = () => {
    const token = Cookies.get('token')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

  return (
    <div style={{minHeight: token ? 'calc(100vh - 50px)': '100vh'}} className='auth'>
        <div className='wrapper auth__wrapper'>
            {token ? 
                <div className='btn wrapper__btn_logout' onClick={()=> dispatch(UserLogout({navigate: navigate}))}><span>Выйти</span></div>
            :
                <div className='btn wrapper__btn_google' onClick={()=> dispatch(UserAuth({navigate: navigate}))}>
                    <span>Войти</span>
                    <FcGoogle />
                </div>
            }
        </div>
    </div>
  )
}
