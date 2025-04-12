import mockIngredients from '../fixtures/ingredients.json';
import mockUser from '../fixtures/user.json';
import mockOrder from '../fixtures/order.json';

describe('E2E test', () => {
  //тест 1

  describe('тестирование модальных окон', () => {
    beforeEach(() => {
      cy.intercept('GET', '/api/ingredients', mockIngredients).as(
        'getIngridients'
      );
      cy.visit('http://localhost:4000/');
    });
    it('открытие и закрытие(крестик/оверлей)', () => {
      cy.get(`[data-testid="category-buns"]`)
        .contains('li', 'Краторная булка N-200i')
        .as('element');
      cy.get('[data-cy="modal-content"]').should('not.exist');
      cy.get('@element').click();

      cy.get('[data-cy="modal-content"]').within(() => {
        cy.get('h3:last').should('have.text', 'Краторная булка N-200i');
      });

      cy.get('[data-cy="modal-content"]').should('exist'); //проверка открыто ли модальное окно

      cy.get('[data-cy="modal-content"]').within(() => {
        cy.get('button').click();
      });

      cy.get('[data-cy="modal-content"]').should('not.exist'); //проверка закрыто ли модальное окно

      cy.get('@element').click();
      cy.get('[data-cy="modal-content"]').should('exist');

      cy.get('[data-cy="modal-overlay"]').click({ force: true });

      cy.get('[data-cy="modal-content"]').should('not.exist');
    });
  });

  //тест 2

  describe('тестирование оформление заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');

      cy.intercept('GET', '/api/ingredients', mockIngredients).as(
        'getIngridients'
      );
      cy.intercept('GET', '/api/auth/user', mockUser).as('getUser');
      cy.intercept('Post', '/api/orders', mockOrder).as('postOrders');
      cy.visit('http://localhost:4000/');
    });
    it('тестирование добавление игредиентов', () => {
      cy.get(`[data-testid="category-buns"]`)
        .contains('button', 'Добавить')
        .click();

      cy.get('[data-cy="bun-top"] div span span:first').should(
        'have.text',
        'Краторная булка N-200i (верх)'
      );
      cy.get('[data-cy="bun-bottom"] div span span:first').should(
        'have.text',
        'Краторная булка N-200i (низ)'
      );
      cy.get(`[data-testid="category-mains"]`)
        .contains('button', 'Добавить')
        .click();
      cy.get('section:last li:first div:last span span:first').should(
        'have.text',
        'Биокотлета из марсианской Магнолии'
      );
      cy.get('[data-testid="category-sauces"]')
        .contains('button', 'Добавить')
        .click();
      cy.get('section:last li:last div:last span span:first').should(
        'have.text',
        'Соус Spicy-X'
      );

      cy.get('[data-cy="modal-content"]').should('not.exist');

      cy.contains('button', 'Оформить заказ').click();
      cy.wait('@postOrders');

      cy.get('[data-cy="modal-content"]').within(() => {
        cy.get('h2').should('have.text', mockOrder.order.number);
      });

      cy.get('[data-cy="modal-content"]').should('exist');

      cy.get('[data-cy="modal-content"]').within(() => {
        cy.get('button').click();
      });
      cy.get('[data-cy="modal-content"]').should('not.exist');
      cy.get('[data-constructor] li').should('have.length', 0);
      cy.get('[data-ingredient="bun"]').should('have.length.at.least', 0);
    });
    afterEach(() => {
      // Очистка фейковых токенов
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});
