import { render, screen, waitFor } from '@testing-library/react';

import OrderEntry from '../OrderEntry';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

import { server } from '../../../mocks/server';
import { rest } from 'msw';

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

    render(
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    );

    await waitFor(async () => {
      const alerts = await screen.findAllByRole('alert');
      expect(alerts).toHaveLength(2);
    });
  });
});
