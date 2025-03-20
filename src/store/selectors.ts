import { RootState } from './store';

export const ordersInfoDataSelector =
  (number: string) => (state: RootState) => {
    if (state.feed.orders.length) {
      const data = state.feed.orders.find((item) => item.number === +number);
      if (data) return data;
    }

    if (state.profileOrder.orders.length) {
      const data = state.profileOrder.orders.find(
        (item) => item.number === +number
      );
      if (data) return data;
    }

    if (state.orderData.orderData) {
      return state.orderData.orderData;
    }

    return null;
  };
