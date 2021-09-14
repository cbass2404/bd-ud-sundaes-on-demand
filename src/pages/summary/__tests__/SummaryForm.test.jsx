import { render, screen, fireEvent } from '@testing-library/react';
import SummaryForm from '../SummaryForm';

let checkbox;
let button;
beforeEach(() => {
  render(<SummaryForm />);

  checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });

  button = screen.getByRole('button', { name: /confirm order/i });
});

describe('SummaryForm has a checkbox and button that functions as follows', () => {
  it('is unchecked by default', () => {
    expect(checkbox).not.toBeChecked();
  });

  it('has a button that is disabled by default', () => {
    expect(button).toBeDisabled();
  });

  it('enables button when checked', () => {
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();
  });

  it('disables button if unchecked', () => {
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(button).toBeEnabled();

    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });
});
