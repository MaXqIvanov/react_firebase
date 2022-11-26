import React, { useState } from 'react';
import Cookies from 'js-cookie';
import useClickOutSide from '../hooks/useClickOutSide';
import { useAppDispatch } from '../hooks/redux';
import { UserLogout } from '../store/reducers/auth/ActionAuth';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const profile = Cookies.get('user');
  const [is_visible_menu, setIsVisibleMenu] = useState<boolean>(false);
  const menu = useClickOutSide(() => {
    setIsVisibleMenu(false);
  });
  return (
    <div className="header">
      <div className="logo header__logo">ToDo</div>
      <div
        onClick={() => setIsVisibleMenu(!is_visible_menu)}
        style={{ backgroundImage: `url(${JSON.parse(profile).photoURL})` }}
        className="profile header__profile"
      >
        {is_visible_menu && (
          <div ref={menu} className="menu profile__menu">
            <div
              onClick={() => dispatch(UserLogout({ navigate: navigate }))}
              className="logout menu__logout"
            >
              Выйти
            </div>
          </div>
        )}
      </div>
      <div className="separate_line"></div>
    </div>
  );
};
