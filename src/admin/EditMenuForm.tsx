import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { updateMenu } from '../services';

interface MenuFormProps {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  platPrincipalEN: string;
  setPlatPrincipalEN: (platPrincipal: string) => void;
  platPrincipalFR: string;
  setPlatPrincipalFR: (platPrincipal: string) => void;
  dessertEN: string;
  setDessertEN: (dessert: string) => void;
  dessertFR: string;
  setDessertFR: (dessert: string) => void;
  status: boolean;
  setStatus: (status: boolean) => void;
}

const EditMenuForm = ({ data }: any) => {
  const [platPrincipalEN, setPlatPrincipalEN] = useState('');
  const [platPrincipalFR, setPlatPrincipalFR] = useState('');
  const [dessertEN, setDessertEN] = useState('');
  const [dessertFR, setDessertFR] = useState('');
  const [status, setStatus] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = toast.loading('Adding menu...');

    try {
      await updateMenu(data.id, {
        platPrincipalEN,
        platPrincipalFR,
        dessertEN,
        dessertFR,
        status,
      });
      toast.success('Menu updated!', { id: toastId });
    } catch (error) {
      toast.error('Failed to update menu', { id: toastId });
    }
  };

  useEffect(() => {
    setPlatPrincipalEN(data.platPrincipalEN);
    setPlatPrincipalFR(data.platPrincipalFR);
    setDessertEN(data.dessertEN);
    setDessertFR(data.dessertFR);
    setStatus(data.status);
  }, []);

  return (
    <form
      onSubmit={handleFormSubmit}
      className='
            flex flex-col gap-10 w-full
                bg-gray-100 p-4 rounded-md
            '>
      <Box
        className='
            flex flex-col gap-4 
          '>
        <TextField
          label='Plat Principal EN'
          value={platPrincipalEN}
          onChange={(e) => setPlatPrincipalEN(e.target.value)}
          required
        />
        <TextField
          label='Plat Principal FR'
          value={platPrincipalFR}
          onChange={(e) => setPlatPrincipalFR(e.target.value)}
          required
        />
        <TextField
          label='Dessert EN'
          value={dessertEN}
          onChange={(e) => setDessertEN(e.target.value)}
          required
        />
        <TextField
          label='Dessert FR'
          value={dessertFR}
          onChange={(e) => setDessertFR(e.target.value)}
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          }
          label='Status'
        />
      </Box>

      <Box
        className='
            flex flex-row justify-end bg-gray-200 p-2 rounded-md
          '>
        <Button
          type='submit'
          variant='contained'
          color='success'
          size='large'
          sx={{
            fontWeight: 'bold',
            fontSize: '1.2rem',
            width: 'fit-content',
          }}>
          Submit Menu
        </Button>
      </Box>
    </form>
  );
};

export default EditMenuForm;
