import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

test('renders magnifier checkbox', () => {
  render(<App />);
  const magnifierLabel = screen.getByText(/magnifier/i);
  expect(magnifierLabel).toBeInTheDocument();
  userEvent.click(magnifierLabel);
  expect(screen.getByTestId('zoomed-image')).toBeInTheDocument();
  userEvent.click(magnifierLabel);
  expect(screen.queryByTestId('zoomed-image')).not.toBeInTheDocument();
});

test('renders zoom checkbox', () => {
  render(<App />);
  const zoomCheckbox = screen.getByText(/zoom/i);
  expect(zoomCheckbox).toBeInTheDocument();
});
