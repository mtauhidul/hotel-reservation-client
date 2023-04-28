import {
  Badge,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { addRoom } from '../services';

interface RoomFormProps {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  titleEN: string;
  setTitleEN: (title: string) => void;
  descriptionEN: string;
  setDescriptionEN: (description: string) => void;
  priceEN: string;
  setPriceEN: (price: string) => void;
  breakfastEN: boolean;
  setBreakfastEN: (breakfast: boolean) => void;
  capacityEN: string;
  setCapacityEN: (capacity: string) => void;
  bathtubEN: boolean;
  setBathtubEN: (bathtub: boolean) => void;
  typeEN: string;
  setTypeEN: (type: string) => void;
  petsEN: boolean;
  setPetsEN: (pets: boolean) => void;
  imagesEN: string[];
  setImagesEN: (images: string[]) => void;
  thumbnailEN: string;
  setThumbnailEN: (thumbnail: string) => void;
  titleFR: string;
  setTitleFR: (title: string) => void;
  descriptionFR: string;
  setDescriptionFR: (description: string) => void;
  priceId: string;
  setPriceId: (priceId: string) => void;
}

interface GetData {
  getData: () => void;
}

const RoomForm = ({ getData }: GetData) => {
  const [titleEN, setTitleEN] = useState('');
  const [descriptionEN, setDescriptionEN] = useState('');
  const [priceEN, setPriceEN] = useState('');
  const [breakfastEN, setBreakfastEN] = useState(false);
  const [capacityEN, setCapacityEN] = useState('');
  const [bathtubEN, setBathtubEN] = useState(false);
  const [typeEN, setTypeEN] = useState('');
  const [petsEN, setPetsEN] = useState(false);
  const [imagesEN, setImagesEN] = useState<string[]>([]);
  const [thumbnailEN, setThumbnailEN] = useState('');
  const [titleFR, setTitleFR] = useState('');
  const [descriptionFR, setDescriptionFR] = useState('');
  const [priceId, setPriceId] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const room = {
      titleEN,
      descriptionEN,
      priceEN,
      breakfastEN,
      capacityEN,
      bathtubEN,
      typeEN,
      petsEN,
      imagesEN,
      thumbnailEN,
      titleFR,
      descriptionFR,
      id: '',
      status: 'available',
      bookings: [],
      priceId,
    };

    const roomAddPromise = addRoom(room);

    toast.promise(roomAddPromise, {
      loading: 'Adding room...',
      success: 'Room added successfully!',
      error: 'Error adding room',
    });

    getData();

    // Reset the form
    setTitleEN('');
    setDescriptionEN('');
    setPriceEN('');
    setBreakfastEN(false);
    setCapacityEN('');
    setBathtubEN(false);
    setTypeEN('');
    setPetsEN(false);
    setImagesEN([]);
    setThumbnailEN('');
    setTitleFR('');
    setDescriptionFR('');
    setPriceId('');
  };

  const handleImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as FileList);

    const uploadedImages: string[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        uploadedImages.push(reader.result as string);
        setImagesEN(uploadedImages);
      };
    });
  };

  const handleThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files as FileList);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setThumbnailEN(reader.result as string);
      };
    });
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className='
        flex flex-col gap-10 w-full
            bg-gray-100 p-4 rounded-md
        '>
      <Box
        className='
        flex flex-row gap-4 
      '>
        <Box
          className='
        flex flex-col gap-4 w-1/2
      '>
          <Box
            className='
            bg-gray-200 p-2 rounded-md
        '>
            <h3>English</h3>
          </Box>
          <TextField
            label='Title'
            value={titleEN}
            onChange={(e) => setTitleEN(e.target.value)}
            required
          />
          <TextField
            label='Description'
            value={descriptionEN}
            multiline
            rows={4}
            onChange={(e) => setDescriptionEN(e.target.value)}
            required
          />
          <TextField
            label='Price'
            type='number'
            value={priceEN}
            onChange={(e) => setPriceEN(e.target.value)}
            required
          />
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Type</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={typeEN}
              label='Type'
              onChange={(e) => setTypeEN(e.target.value as string)}>
              <MenuItem value={'Standard'}>Standard</MenuItem>
              <MenuItem value={'Deluxe'}>Deluxe</MenuItem>
              <MenuItem value={'Suite'}>Suite</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label='Capacity'
            type='number'
            value={capacityEN}
            onChange={(e) => setCapacityEN(e.target.value)}
            required
          />

          <Button variant='contained' component='label'>
            <Badge
              badgeContent={imagesEN.length > 0 ? imagesEN.length : 0}
              color='warning'>
              Upload Images
            </Badge>
            <input
              accept='image/*'
              multiple
              type='file'
              style={{ display: 'none' }}
              onChange={handleImagesUpload}
              hidden
            />
          </Button>
          <Button variant='contained' component='label'>
            <Badge badgeContent={thumbnailEN === '' ? 0 : 1} color='warning'>
              Upload Thumbnail
            </Badge>
            <input
              accept='image/*'
              type='file'
              style={{ display: 'none' }}
              onChange={handleThumbnailUpload}
              hidden
            />
          </Button>
        </Box>

        <Box
          className='
        flex flex-col gap-4 w-1/2
        '>
          <Box
            className='
            bg-gray-200 p-2 rounded-md
        '>
            <h3>Français</h3>
          </Box>
          <TextField
            label='Titre'
            value={titleFR}
            onChange={(e) => setTitleFR(e.target.value)}
            required
          />
          <TextField
            label='Description'
            value={descriptionFR}
            multiline
            rows={4}
            onChange={(e) => setDescriptionFR(e.target.value)}
            required
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={breakfastEN}
                onChange={(e) => setBreakfastEN(e.target.checked)}
              />
            }
            label='Breakfast included'
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={bathtubEN}
                onChange={(e) => setBathtubEN(e.target.checked)}
              />
            }
            label='Bathtub'
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={petsEN}
                onChange={(e) => setPetsEN(e.target.checked)}
              />
            }
            label='Pets allowed'
          />
        </Box>
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
          Submit Room
        </Button>
      </Box>
    </form>
  );
};

export default RoomForm;
