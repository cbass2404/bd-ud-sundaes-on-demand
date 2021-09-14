import {
  render,
  screen,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SummaryForm from '../SummaryForm';

let checkbox;
let button;

beforeEach(() => {
  render(<SummaryForm />);

  checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });

  button = screen.getByRole('button', { name: /confirm order/i });
});

describe('SummaryForm has a checkbox that functions as follows', () => {
  it('is unchecked by default', () => {
    expect(checkbox).not.toBeChecked();
  });

  it('is checked after click', () => {
    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});

describe('SummaryForm has a button that functions as follows', () => {
  it('is disabled by default', () => {
    expect(button).toBeDisabled();
  });

  it('is enabled if checkbox is clicked', () => {
    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
  });

  it('is disabled if checkbox is unchecked', () => {
    userEvent.click(checkbox);
    expect(button).toBeEnabled();

    userEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});

describe('SummaryForm has a popover that functions as follows', () => {
  it('starts out hidden', () => {
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );

    expect(nullPopover).not.toBeInTheDocument();
  });

  it('appears on mouseover of checkbox label', () => {
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );

    expect(popover).toBeInTheDocument();
  });

  it('disappears when we mouse out', async () => {
    const termsAndConditions = screen.getByText(/terms and conditions/i);

    userEvent.hover(termsAndConditions);
    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    userEvent.unhover(termsAndConditions);
    await waitForElementToBeRemoved(() => {
      return screen.queryByText(/no ice cream will actually be delivered/i);
    });
  });
});
