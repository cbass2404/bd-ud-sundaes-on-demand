import { render, screen, waitFor } from '@testing-library/react';

import OrderEntry from '../OrderEntry';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

import { rest } from 'msw';

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
  it('handles errors for scoops and toppings routes', async () => {
    server.resetHandlers(
      rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');
      expect(alerts).toHaveLength(2);
    });
  });
});
