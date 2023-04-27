import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bookingConfirmation } from '../../services/index';

const Thanks = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();

  const confirm = async () => {
    const response: any = await bookingConfirmation(id);
    if (response.status === 200) {
      navigate('/rooms');
    } else {
      setTimeout(() => {
        navigate('/rooms');
      }, 2000);
    }
  };

  useEffect(() => {
    sessionStorage.clear();
    confirm();
  }, []);
  return (
    <div
      className='
            flex flex-col items-center justify-center h-screen text-center text-gray-600 
        '>
      <h1
        className='
                text-5xl font-bold text-gray-800 mb-4
            '>
        Thanks for your order !
      </h1>
    </div>
  );
};

export default Thanks;
