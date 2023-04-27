import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { updateBooking } from '../services/index';

const ReservationEditForm = ({ data, getData }: any) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');

  const handleUpdate = async () => {
    const toastId = toast.loading('Updating reservation...');

    try {
      await updateBooking(data.id, {
        checkIn,
        checkOut,
        guests,
      });
      toast.success('Reservation updated!', { id: toastId });
      getData();
    } catch (error) {
      toast.error('Failed to update reservation', { id: toastId });
    }
  };

  useEffect(() => {
    setCheckIn(data.checkIn);
    setCheckOut(data.checkOut);
    setGuests(data.guests);
  }, []);

  return (
    <Box>
      <Typography
        variant='h5'
        component='h5'
        sx={{ fontWeight: 'bold' }}
        gutterBottom>
        Modify reservation
      </Typography>
      <Box className='flex flex-col gap-4'>
        <Box className='flex flex-row gap-4'>
          <Box className='flex flex-col gap-2'>
            <Typography variant='body1' component='p'>
              Check in
            </Typography>
            <input
              type='date'
              className='border border-gray-300 rounded-md p-2'
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

            <Typography variant='body1' component='p'>
              Check out
            </Typography>
            <input
              type='date'
              className='border border-gray-300 rounded-md p-2'
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />

            <Typography variant='body1' component='p'>
              Guests
            </Typography>
            <input
              type='number'
              className='border border-gray-300 rounded-md p-2'
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
            <br />
            <Button
              onClick={() => {
                console.log(data);
              }}
              variant='contained'
              component='label'>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReservationEditForm;
