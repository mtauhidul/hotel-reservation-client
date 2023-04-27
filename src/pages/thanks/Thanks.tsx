import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Thanks = () => {
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear();
    setTimeout(() => {
      navigate('/');
    }, 5000);
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
