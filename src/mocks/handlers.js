import { rest } from 'msw';

export const getScoops200 = () =>
  rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
    res(
      ctx.json([
        { name: 'Chocolate', imagePath: '/images/chocolate.png' },
        { name: 'Vanilla', imagePath: 'images/vanilla.png' },
      ])
    )
  );

export const getScoops500 = () =>
  rest.get('http://localhost:3030/scoops', (req, res, ctx) =>
    res(ctx.status(500))
  );

export const getToppings200 = () =>
  rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
    res(
      ctx.json([
        { name: 'Cherries', imagePath: '/images/cherries.png' },
        { name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
        { name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
      ])
    )
  );

export const getToppings500 = () =>
  rest.get('http://localhost:3030/toppings', (req, res, ctx) =>
    res(ctx.status(500))
  );
