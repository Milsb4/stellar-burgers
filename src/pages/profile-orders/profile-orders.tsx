import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../store/store';
import { selectProfileOrders } from '../../services/profile-orders/profileOrderSlice';
import { getProfileOrder } from '../../services/profile-orders/action';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectProfileOrders);

  useEffect(() => {
    dispatch(getProfileOrder());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
