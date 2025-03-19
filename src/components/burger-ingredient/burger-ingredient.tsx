import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '../../store/store';
import { addIngredient } from '../../services/burger-constructor/constructorslice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    // Получаем количество ингредиентов из состояния
    const ingredientCounts = useSelector(
      (state) => state.burgerConstructor.ingredientCounts
    );
    const count = ingredientCounts[ingredient._id]; // Получаем количество, если ингредиент добавлен, иначе 0

    const handleAdd = () => {
      dispatch(addIngredient({ ...ingredient }));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
