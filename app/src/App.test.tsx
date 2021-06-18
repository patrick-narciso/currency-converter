import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders header content properly', () => {
  render(<App />);
  const linkElement = screen.getByText(/Currency Conversion/i);
  expect(linkElement).toBeInTheDocument();
});
