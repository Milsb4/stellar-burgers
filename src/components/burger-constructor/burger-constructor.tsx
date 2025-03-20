import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../store/store';
import {
  clearOrderModalData,
  getOrderModalData,
  getOrderRequest
} from '../../services/Order/OrderSlice';
import { fetchNewOrder } from '../../services/Order/actions';
import { useNavigate } from 'react-router-dom';
import { getUserSelector } from '../../services/user/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const navigate = useNavigate();
  const constructorItems = useSelector((state) => state.burgerConstructor) || {
    bun: null,
    ingredients: []
  };

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
      return;
    }

    const ingredientDataId = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (ingredient: TConstructorIngredient) => ingredient._id
      ),
      constructorItems.bun._id
    ];
    dispatch(
      fetchNewOrder([
        constructorItems.bun._id,
        ...ingredientDataId,
        constructorItems.bun._id
      ])
    );
  };
  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
