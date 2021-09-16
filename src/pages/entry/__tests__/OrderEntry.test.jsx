import { render, screen } from '@testing-library/react';

import OrderEntry from '../OrderEntry';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

import { server } from '../../../mocks/servers';
import { getScoops500, getToppings500 } from '../../../mocks/handlers';

// beforeAll(() => {});

beforeEach(() => {
  render(
    <OrderDetailsProvider>
      <OrderEntry />
    </OrderDetailsProvider>
  );
  server.listen();
});

afterEach(() => server.close());

describe('Options handles errors as follows', () => {
  it('handles errors for scoops route', async () => {
    server.use(getScoops500());
    const alert = await screen.findByRole('alert');

    expect(alert).toBeInTheDocument();
  });

  it('handles errors for toppings route', async () => {
    server.use(getToppings500());
    const alert = await screen.findByRole('alert');

    expect(alert).toBeInTheDocument();
  });
});
