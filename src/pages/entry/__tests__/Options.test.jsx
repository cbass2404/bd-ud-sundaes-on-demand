import { render, screen } from '../../../test-utils/testing-library-utils';

import Options from '../Options';

describe('Options component renders and functions as follows', () => {
  it('displays an image for each scoop option from server', async () => {
    render(<Options optionType='scoops' />);

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((ele) => ele.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });

  it('displays an image for each topping option from server', async () => {
    render(<Options optionType='toppings' />);

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
