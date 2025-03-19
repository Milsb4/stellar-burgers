import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../store/store';
import { userNameSelector } from '../../services/user/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(userNameSelector); // Получаем пользователя
  return <AppHeaderUI userName={user} />;
};
