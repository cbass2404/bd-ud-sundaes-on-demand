import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';

it('updates scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />);

  // make sure total starts at $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false });
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(scoopsSubtotal).toHaveTextContent('2.00');

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {
    name: 'Chocolate',
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubtotal).toHaveTextContent('6.00');
});

it('updates topping subtotal when toppings changes', async () => {
  render(<Options optionType='toppings' />);

  const toppingsSubtotal = screen.getByText('Toppings total: $', {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent('0.00');

  // check m&ms and check subtotal
  const mmsInput = await screen.findByRole('checkbox', { name: 'M&Ms' });

  // checkbox is unchecked by default
  expect(mmsInput).not.toBeChecked();

  // checking the box increases subtotal by $1.50
  userEvent.click(mmsInput);
  expect(mmsInput).toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');

  // checking hot fudge increases the value to $3.00
  const hotFudgeInput = await screen.findByRole('checkbox', {
    name: 'Hot fudge',
  });
  expect(hotFudgeInput).not.toBeChecked();
  userEvent.click(hotFudgeInput);
  expect(toppingsSubtotal).toHaveTextContent('3.00');

  // unchecking the box lowers the subtotal back to $1.50
  userEvent.click(mmsInput);
  expect(mmsInput).not.toBeChecked();
  expect(toppingsSubtotal).toHaveTextContent('1.50');
});
