import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDisplay = ({ room }: any) => (
  <section className='flex flex-col items-center justify-center p-4 space-y-4 bg-gray-100 rounded-lg shadow-lg'>
    <h1 className='text-3xl font-bold text-gray-800'>Payment</h1>
    <br />

    <div className='w-full md:w-96'>
      <img
        className='w-full rounded-lg shadow-lg'
        src={room?.thumbnailEN}
        alt='Attachment to the room'
      />
      <div className='p-4'>
        <h3 className='text-2xl font-bold text-gray-800'>{room?.titleEN}</h3>
        <h5 className='text-xl font-semibold text-gray-800 mt-2'>
          {room?.priceEN} €
        </h5>
      </div>
    </div>
    <form
      action={`https://hotel-reservation-server.herokuapp.com/create-checkout-session?id=${room?.priceId}`}
      method='POST'>
      <Button
        size='large'
        variant='contained'
        color='primary'
        type='submit'
        className='w-full md:w-auto'>
        Pay now
      </Button>
    </form>
  </section>
);

const Message = ({ message }: any) => (
  <section className='flex flex-col items-center justify-center w-full h-full p-4 space-y-4 bg-gray-100 rounded-lg shadow-lg'>
    <p>{message}</p>
  </section>
);

export default function Payment() {
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const room = JSON.parse(sessionStorage.getItem(`${id}`) || '{}');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      {message ? <Message message={message} /> : <ProductDisplay room={room} />}
    </div>
  );
}
