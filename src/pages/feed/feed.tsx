import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../store/store';
import { getOrdersFeeds } from '../../services/feed/feedSlice';
import { getFeeds } from '../../services/feed/action';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersFeeds);

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeeds());
      }}
    />
  );
};
