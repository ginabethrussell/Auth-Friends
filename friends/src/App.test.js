import { render, screen } from '@testing-library/react';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event'

test('renders App without errors', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const h1Title = screen.getByText(/my friends list/i);
  expect(h1Title).toBeInTheDocument();
});

// check for login link, active on the page, takes user to login component
test('login link is on the page, clicking takes to login page', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const loginLink = screen.getByText(/login/i);
  userEvent.click(loginLink);
  const loginPageButton = screen.getByRole('button');
  expect(loginPageButton).toBeInTheDocument();
});

// check that Friends link is a protected route, reroutes to login
test('check that Friends link is a protected route, reroutes to login', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
 
  const link = screen.getByTestId('friendslink');
  userEvent.click(link);
  
  const loginPageButton = screen.getByRole('button');
  expect(loginPageButton).toBeInTheDocument();
  
});