import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import UserNavPill from './login/UserNavPill';

describe('User Nav Pill', () => {

    test('render user nav pill with no user', () => {
        render(<UserNavPill email={undefined}/>, { wrapper: MemoryRouter });

        expect(screen.getByTestId(/login-button/).textContent).toContain('Login');
        expect(screen.queryByTestId(/user-avatar/)).toBeNull();
    });

    test('render user nav pill with a valid user', () => {
        render(<UserNavPill email={'bol@yahoo.com'} />)

        expect(screen.queryByTestId(/login-button/)).toBeNull();
        expect(screen.getByTestId(/user-avatar/).textContent).toContain('B');
    });

    test('navigate to login when no user', () => {
        const history = createMemoryHistory({ initialEntries: ['/home', '/login'] });
        render(
            // @ts-ignore
            <MemoryRouter history={history}>
                <UserNavPill email={undefined} />
            </MemoryRouter>
        );
        userEvent.click(screen.getByTestId(/login-button/));
        expect(history.location.pathname).toContain('login');
    });
})