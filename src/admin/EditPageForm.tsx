import { Badge, Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { updatePage } from '../services';

interface PageFormProps {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  titleEN: string;
  setTitleEN: (title: string) => void;
  titleFR: string;
  setTitleFR: (title: string) => void;
  descriptionEN: string;
  setDescriptionEN: (description: string) => void;
  descriptionFR: string;
  setDescriptionFR: (description: string) => void;
  image: string;
  setImage: (image: string) => void;
  id: string;
}

interface EditPageFormProps {
  data: PageFormProps;
}

const EditPageForm = ({ data }: EditPageFormProps) => {
  const [titleEN, setTitleEN] = useState('');
  const [titleFR, setTitleFR] = useState('');
  const [descriptionEN, setDescriptionEN] = useState('');
  const [descriptionFR, setDescriptionFR] = useState('');
  const [image, setImage] = useState('');

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const roomUpdatePromise = updatePage(data.id, {
      titleEN,
      titleFR,
      descriptionEN,
      descriptionFR,
      image,
    });

    toast.promise(roomUpdatePromise, {
      loading: 'Updating page...',
      success: 'Page updated successfully',
      error: 'Failed to update page',
    });

    // Reset the form
    setTitleEN('');
    setTitleFR('');
    setDescriptionEN('');
    setDescriptionFR('');
    setImage('');
  };

  //   const handleImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const files = Array.from(event.target.files as FileList);

  //     const uploadedImages: string[] = [];

  //     files.forEach((file) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => {
  //         uploadedImages.push(reader.result as string);
  //         setImagesEN(uploadedImages);
  //       };
  //     });
  //   };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files as FileList);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
    });
  };

  useEffect(() => {
    setTitleEN(data.titleEN);
    setTitleFR(data.titleFR);
    setDescriptionEN(data.descriptionEN);
    setDescriptionFR(data.descriptionFR);
    setImage(data.image);
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

          {/* <Button variant='contained' component='label'>
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
          </Button> */}
          <Button variant='contained' component='label'>
            <Badge badgeContent={image === '' ? 0 : 1} color='warning'>
              Upload Image
            </Badge>
            <input
              accept='image/*'
              type='file'
              style={{ display: 'none' }}
              onChange={handleImageUpload}
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
            label='Title'
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
          Update Page
        </Button>
      </Box>
    </form>
  );
};

export default EditPageForm;
