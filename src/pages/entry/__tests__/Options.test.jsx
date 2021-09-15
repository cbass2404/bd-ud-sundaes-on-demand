import { render, screen } from '@testing-library/react';

import Options from '../Options';

beforeEach(() => render(<Options optionType='scoops' />));

describe('Options component renders and functions as follows', () => {
  it('displays an image for each scoop option from server', async () => {
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((ele) => ele.alt);
    expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
  });
});
