import { render, screen } from '@testing-library/react';

import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

import { server } from '../../../mocks/servers';
import { getScoops, getToppings } from '../../../mocks/handlers';

beforeEach(() => server.listen());

afterEach(() => server.close());

describe('Options component renders and functions as follows', () => {
  it('displays an image for each scoop option from server', async () => {
    server.use(getScoops());
    render(
      <OrderDetailsProvider>
        <Options optionType='scoops' />
      </OrderDetailsProvider>
    );

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((ele) => ele.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });

  it('dispalys an image for each topping option from server', async () => {
    server.use(getToppings());
    render(
      <OrderDetailsProvider>
        <Options optionType='toppings' />
      </OrderDetailsProvider>
    );

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
