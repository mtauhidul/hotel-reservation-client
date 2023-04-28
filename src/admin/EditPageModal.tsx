import CloseIcon from '@mui/icons-material/Close';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditPageForm from './EditPageForm';

const style = {
  position: 'absolute' as 'absolute',
  width: '100%',
  minHeight: '100vh',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface EditModalProps {
  editOpen: boolean;
  handleEditClose: () => void;
  data: any;
}

export default function EditPageModal({
  editOpen,
  handleEditClose,
  data,
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
              gutterBottom>
              Edit Page
            </Typography>

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
          <EditPageForm data={data} />
        </Box>
      </Modal>
    </div>
  );
}
