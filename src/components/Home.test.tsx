import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

test('renders home page with go to lender button', () => {

    render(<Home />, { wrapper: MemoryRouter });
    const button = screen.getByTestId(/goto-ledger/);
    expect(button).toBeInTheDocument();

    const alsoButton = screen.getByText(/Go To Ledger/);
    expect(alsoButton).toBeInTheDocument();
});