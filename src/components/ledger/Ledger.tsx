import { Box, Container, Fab } from '@mui/material';
import PropTypes, { InferProps } from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import LedgerItemComponent from './LedgerItem';

const LedgerPropType = {
  email: PropTypes.string,
}

type LedgerPropTypeTS = InferProps<typeof LedgerPropType>;

export type LedgerType = 'credit' | 'debit';

export interface LedgerItem {
  itemId: string;
  itemName: string;
  itemEpoch: number;
  ledgerType: LedgerType;
  amount: number;
}

interface LedgerStateType {
  user?: string;
  items?: LedgerItem[];
}

const Ledger = (props: LedgerPropTypeTS) => {
  const { email } = props;

  const [ledger, setLedger] = useState<LedgerStateType>({});
  const [fetchCount, setFetchCount] = useState<number>(0);

  useEffect(() => {
    async function fetchLedger() {
      try {

        const response = await fetch(`/api/ledger/${props.email}`)
        
        const data = await response.json()
        
        setLedger({
          ...data
        });
      } catch(e) {
        console.log('error on fetch', e);
      }
    }

    fetchLedger();
  }, [fetchCount]);

  const handleLedgerItemDelete = (itemId: string): void => {
    console.log('handleLedgerItemDelete');
    setLedger({
      ...ledger,
      items: (ledger.items?.filter(item => item.itemId !== itemId))
    });
  }

  return (
    <Container>

      <Box>
        <Fab
          color='primary'
          data-testid='add-fab'
        >
          <AddIcon />
        </Fab>
      </Box>

      <Box>
        {
          ledger?.items?.map((item: any) => (
            <LedgerItemComponent
              key={item.itemId}
              ledgerItem={item}
              onLedgerDelete={handleLedgerItemDelete}
            />
          ))
        }
      </Box>

    </Container>
  )
}

Ledger.propTypes = LedgerPropType;

export default Ledger;