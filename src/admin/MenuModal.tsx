import CloseIcon from '@mui/icons-material/Close';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuForm from './MenuForm';

const style = {
  position: 'absolute' as 'absolute',
  width: '100%',
  minHeight: '100vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface MenuModalProps {
  open: boolean;
  handleClose: () => void;
  getData: () => void;
}

export default function MenuModal({
  open,
  handleClose,
  getData,
}: MenuModalProps) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <Box
            className='
            flex flex-row justify-between items-center mb-4
          '>
            <Typography
              variant='h5'
              component='h5'
              sx={{
                fontWeight: 'bold',
              }}
              gutterBottom>
              Add a new menu
            </Typography>

            <Box
              className='
            flex flex-row justify-between items-center gap-4 
            '>
              <Button variant='contained' color='error' onClick={handleClose}>
                <CloseIcon />
              </Button>
            </Box>
          </Box>
          <MenuForm />
        </Box>
      </Modal>
    </div>
  );
}
