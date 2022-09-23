import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Form', () => {
    let component: RenderResult;
    const mockLoginHandler = jest.fn()

    beforeEach(() => {
        component = render(<Login onLogin={mockLoginHandler} />, { wrapper: MemoryRouter });
    });

    test('render login page with components', () => {
        expect(component).toBeTruthy();

        const element = screen.getByTestId(/email/);
        expect(element).toBeInTheDocument();

        expect(screen.getByTestId(/password/)).toBeInTheDocument();

        expect(screen.getByTestId(/submit-btn/)).toBeInTheDocument();
    });

    test('should display success when user enters "guest" password', () => {
        let element = screen.getByTestId(/email/);
        fireEvent.change(element, { target: { value: 'test@aol.com' } })

        element = screen.getByTestId(/password/);
        fireEvent.change(element, { target: { value: 'guest' } });

        fireEvent.click(
            screen.getByTestId(/submit-btn/)
        );

        const alert = screen.getByTestId(/alert/);
        expect(alert.textContent).toContain('You have been authenticated');
        expect(mockLoginHandler).toHaveBeenCalledWith('test@aol.com');
    });

    test('should display error when user does NOT enter "guest" password', () => {

        fireEvent.change(
            screen.getByTestId(/email/),
            {
                target: {
                    value: 'test@aol.com'
                }
            }
        );

        fireEvent.change(
            screen.getByTestId(/password/),
            {
                target: {
                    value: 'password123'
                }
            }
        );

        fireEvent.click(
            screen.getByTestId(/submit-btn/)
        );
        
        expect(
            screen.getByTestId(/alert/).textContent
        ).toContain(
            'Sorry we were not able to authenticate you'
        );

    });
});