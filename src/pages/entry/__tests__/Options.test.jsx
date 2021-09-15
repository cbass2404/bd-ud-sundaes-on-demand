import { render, screen } from '@testing-library/react';

import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

import { server } from '../../../mocks/servers';
import {
  getScoops200,
  getScoops500,
  getToppings200,
  getToppings500,
} from '../../../mocks/handlers';

const renderScoops = () =>
  render(
    <OrderDetailsProvider>
      <Options optionType='scoops' />
    </OrderDetailsProvider>
  );

const renderToppings = () =>
  render(
    <OrderDetailsProvider>
      <Options optionType='toppings' />
    </OrderDetailsProvider>
  );

beforeEach(() => server.listen());

afterEach(() => server.close());

describe('Options component renders and functions as follows', () => {
  it('displays an image for each scoop option from server', async () => {
    server.use(getScoops200());
    renderScoops();

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((ele) => ele.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });

  it('dispalys an image for each topping option from server', async () => {
    server.use(getToppings200());
    renderToppings();

    const toppingImages = await screen.findAllByRole('img', {
      name: /topping$/i,
    });
    expect(toppingImages).toHaveLength(3);

    const altText = toppingImages.map((ele) => ele.alt);
    expect(altText).toEqual([
      'Cherries topping',
      'M&Ms topping',
      'Hot fudge topping',
    ]);
  });
});

describe('Options handles errors as follows', () => {
  it('handles errors for scoops route', async () => {
    renderScoops();
    server.use(getScoops500());
    const alert = await screen.findByRole('alert', {
      name: 'An unexpected error occured. Please try again later.',
    });

    expect(alert).toBeInTheDocument();
  });

  it('handles errors for toppings route', async () => {
    // test
  });
});
