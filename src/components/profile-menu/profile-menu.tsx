import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../store/store';
import { logoutUser } from '../../services/user/action';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => navigate('/login'))
      .catch((err) => console.log(err));
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
