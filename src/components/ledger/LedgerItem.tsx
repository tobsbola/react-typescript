import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box, Card, CardContent, Grid, IconButton } from '@mui/material';
import React from 'react';
import { LedgerItem, LedgerType } from './Ledger';

interface LedgerItemPropsType {
    ledgerItem: LedgerItem,
    onLedgerDelete: (itemId: string) => void;
}

const LedgerItemComponent: React.FC<LedgerItemPropsType> = (props: LedgerItemPropsType) => {
    const { ledgerItem } = props;

    const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        console.log('handleDeleteClick');
        props.onLedgerDelete(props.ledgerItem.itemId);
    }

    return (  
        <Box 
            data-testid='ledger-item'
            sx={{
                mb: 3
            }}
            >
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item={true} xs={12} md={4}>
                            <Box id='item-name'>{ledgerItem.itemName}</Box>
                        </Grid>
                        <Grid item={true} xs={12} md={3}>
                            <Box id='item-date'>
                                { new Date(ledgerItem.itemEpoch * 1000).toLocaleString() }
                            </Box>
                        </Grid>
                        <Grid item={true} xs={12} md={2}>
                            <Box id='credit'>
                                { ledgerItem.ledgerType === 'credit' ? ledgerItem.amount : '' }
                            </Box>
                        </Grid>
                        <Grid item={true} xs={12} md={1}>
                            <Box id='debit'>
                                { ledgerItem.ledgerType === 'credit' ? ledgerItem.amount : '' }
                            </Box>
                        </Grid>
                        <Grid item={true} xs={12} md={1}>
                            <Box>
                                <IconButton
                                    size='large'
                                    edge='start'
                                    onClick={handleDeleteClick}
                                >
                                    <DeleteForeverIcon></DeleteForeverIcon>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    )
}

export default LedgerItemComponent;