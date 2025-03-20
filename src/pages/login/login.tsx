import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../store/store';
import { loginUser } from '../../services/user/action';
import { getUserErrorSelector } from '../../services/user/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(getUserErrorSelector);
  const localStorageEmail = localStorage.getItem('email') ?? '';
  const [email, setEmail] = useState(localStorageEmail);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    const userData = { email, password };
    dispatch(loginUser(userData));
  };

  return (
    <LoginUI
      errorText={error?.toString()}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
