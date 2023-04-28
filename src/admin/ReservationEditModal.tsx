import CloseIcon from '@mui/icons-material/Close';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ReservationEditForm from './ReservationEditForm';

const style = {
  position: 'absolute' as 'absolute',
  width: '40%',
  minWidth: '300px',
  height: '500px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  m: 'auto',
  top: '0%',
  left: 0,
  right: 0,
  bottom: 0,
};

interface EditModalProps {
  editOpen: boolean;
  handleEditClose: () => void;
  data: any;
  getData: () => void;
}

export default function ReservationEditModal({
  editOpen,
  handleEditClose,
  data,
  getData,
}: EditModalProps) {
  return (
    <div>
      <Modal
        open={editOpen}
        onClose={handleEditClose}
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
              gutterBottom></Typography>

            <Box
              className='
            flex flex-row justify-between items-center gap-4 
            '>
              <Button
                variant='contained'
                color='error'
                onClick={handleEditClose}>
                <CloseIcon />
              </Button>
            </Box>
          </Box>
          <ReservationEditForm data={data} getData={getData} />
        </Box>
      </Modal>
    </div>
  );
}
