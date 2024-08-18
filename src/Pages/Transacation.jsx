import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Card, CardContent, Grid } from '@mui/material';
import DataService from '../services/requestApi'; // Import your DataService

function Transaction() {
  const [value, setValue] = useState(0);
  const [transactionData, setTransactionData] = useState([]); // Initialize as an empty array

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        let response;
        if (value === 0) {
          response = await DataService.mysenttransaction(); // Fetch data for sent transactions
        } else if (value === 1) {
          response = await DataService.myreceivedtransaction(); // Fetch data for received transactions
        }
        setTransactionData(response.data.data); // Set the fetched data
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchTransactionData();
  }, [value]); // Re-run the effect when `value` (the active tab) changes

  return (
    <Box className="flex flex-col items-center justify-center mt-8">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="transaction tabs"
        centered
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
        sx={{
          mb: 4,
          '& .MuiTab-root': {
            color: '#9B5DE5',
            mx: 1,
            borderRadius: '8px',
          },
          '& .Mui-selected': {
            color: '#9B5DE5',
            border: '1px solid #9B5DE5',
          },
          '& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected': {
            color: '#9B5DE5',
          },
        }}
      >
        <Tab label="Send Payment" />
        <Tab label="Receive Payment" />
      </Tabs>
      <Box sx={{ padding: 2, width: '100%', maxWidth: 600 }}>
        {transactionData && transactionData.length > 0 ? (
          transactionData.map((transaction) => (
            <Card
              key={transaction?._id}
              className="shadow-lg rounded-lg mb-4"
              sx={{
                backgroundColor: '#000',
                border: '1px solid #9B5DE5',
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: '#9B5DE5' }} className="mb-4">
                 <b> Transaction Details  </b>  
                 
                 <b style={{    fontSize: "0.875rem"}} className='text-white px-2'>
  {value === 0 ? `` :`From  ${ transaction?.Give_by?.name}`}
</b>

                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1" className="text-gray-300">
                      Payment ID:
                    </Typography>
                    <Typography 
  variant="body2" 
  sx={{ 
    color: '#9B5DE5',
  }} 
  className="font-semibold"
>
  {`${transaction?.PaymentRefernce_id.slice(0, Math.ceil(transaction?.PaymentRefernce_id.length * 0.2))}...`}
</Typography>

                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" className="text-gray-300">
                      Time & Date:
                    </Typography>
                    <Typography  style={{    fontSize:" 0.775rem"}} variant="body2" sx={{ color: '#9B5DE5' }} className="font-semibold">
                      {new Date(transaction?.date).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" className="text-gray-300">
                      Status:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: transaction.status === 'success' ? '#4CAF50' : '#E53935',
                      }}
                      className="font-semibold"
                    >
                      {transaction?.status}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" className="text-gray-300">
                      Amount:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#9B5DE5' }} className="font-semibold">
                      {transaction?.amount}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography sx={{ color: '#9B5DE5' }}>No transactions found.</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Transaction;
