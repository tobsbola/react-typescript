import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Ledger from './Ledger';

const mockLedger = {
    user: 'test@test.com',
    items: [
        {
            itemId: 1,
            itemName: 'item name 1',
            itemEpoch: 1,
            ledgerType: 'credit',
            amount: 100
        },
        {
            itemId: 2,
            itemName: 'item name 2',
            itemEpoch: 2,
            ledgerType: 'credit',
            amount: 200
        },
        {
            itemId: 3,
            itemName: 'item name 3',
            itemEpoch: 3,
            ledgerType: 'credit',
            amount: 300
        }
    ]
}


describe('Ledger', () => {
    let mockFetch: any;

    beforeEach(() => {
        mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockLedger)
        } as any);
    });

    it('should render Ledger', async () => {
        await act(async () => {
            render(<Ledger 
                email={'test@test.com'}
            />);
        });

        expect(screen.getByTestId(/add-fab/)).toBeInTheDocument();
        expect(mockFetch).toHaveBeenCalledTimes(1);

        const items = screen.queryAllByTestId(/ledger-item/);
        expect(items.length).toEqual(3);
        
        let element = items[0].querySelector('#item-name');
        expect(element?.textContent).toContain('item name 1');
    })
});