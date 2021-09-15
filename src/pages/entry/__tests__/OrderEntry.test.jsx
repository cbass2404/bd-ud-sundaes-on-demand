import { render, screen } from '@testing-library/react';

import OrderEntry from '../OrderEntry';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

import { server } from '../../../mocks/servers';
import { getScoops500, getToppings500 } from '../../../mocks/handlers';

beforeEach(() => {
  server.listen();
  render(
    <OrderDetailsProvider>
      <OrderEntry />
    </OrderDetailsProvider>
  );
});

afterEach(() => server.close());

it.skip('handles errors for scoops route', async () => {
  server.use(getScoops500());
  const alert = await screen.findByRole('alert', {
    name: 'An unexpected error occured. Please try again later.',
  });

  expect(alert).toBeInTheDocument();
});

it.skip('handles errors for toppings route', async () => {
  // test
});
