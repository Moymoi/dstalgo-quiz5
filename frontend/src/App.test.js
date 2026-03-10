import { render, screen } from '@testing-library/react';
import EmptyState from './components/EmptyState';

test('renders EmptyState welcome screen', () => {
  render(<EmptyState />);
  expect(screen.getByText(/Acronym Decipher Bot/i)).toBeInTheDocument();
  expect(screen.getByText(/NASA/)).toBeInTheDocument();
});
