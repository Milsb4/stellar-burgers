import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../store/store';
import { getOrdersFeeds } from '../../services/feed/feedSlice';
import { getFeeds } from '../../services/feed/action';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getOrdersFeeds);

  const handleGetFeeds = () => {
    setLoading(true);
    dispatch(getFeeds()).finally(() => {
      setLoading(false);
    });
  };

  // Если заказов нет или они еще не загружены
  if (loading || !orders || !orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
