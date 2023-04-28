import { Delete, Edit, Visibility } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { deleteRoom } from '../services/index';
import EditModal from './EditModal';
import HotelRoomDetailsModal from './HotelRoomDetailsModal';

interface TableData {
  id: string;
  titleEN: string;
  descriptionEN: string;
  priceEN: string;
  breakfastEN: boolean;
  capacityEN: string;
  bathtubEN: boolean;
  typeEN: string;
  petsEN: boolean;
  imagesEN: string[];
  thumbnailEN: string;
  titleFR: string;
  descriptionFR: string;
  status: string;
  priceId: string;
}

interface TableProps {
  row: TableData;
  key: string;
  getData: () => void;
}

const CustomTableCell = ({ children }: { children: React.ReactNode }) => (
  <TableCell
    className='px-6 py-3
     text-gray-800 uppercase tracking-wider font-bold text-sm
  '>
    {children}
  </TableCell>
);

const CustomTableHeaderCell = ({ children }: { children: React.ReactNode }) => (
  <TableCell className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
    {children}
  </TableCell>
);

const TablePagination = ({ pageCount, onPageChange }: any) => (
  <ReactPaginate
    previousLabel={'<'}
    nextLabel={'>'}
    breakLabel={'...'}
    pageCount={pageCount}
    onPageChange={onPageChange}
    containerClassName={
      'flex justify-between my-4 bg-gray-100 p-4 w-1/4 ml-auto rounded'
    }
    previousLinkClassName={
      'border rounded py-2 px-3 mr-2 border-gray-300 bg-white hover:bg-gray-200'
    }
    nextLinkClassName={
      'border rounded py-2 px-3 ml-2 border-gray-300 bg-white hover:bg-gray-200'
    }
    activeLinkClassName={
      'border rounded py-2 px-3 mr-2 border-gray-300 bg-gray-200'
    }
    breakClassName={'mx-2'}
    breakLinkClassName={
      'border rounded py-2 px-3 mr-2 border-gray-300 bg-white'
    }
    disabledClassName={'opacity-50'}
  />
);

const CustomTableRow = ({ key, row, getData }: TableProps) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const deleteHandler = (id: string) => {
    window.confirm('Are you sure you want to delete this room?') &&
      deleteRoom(id);
    getData();
  };

  console.log(row);

  return (
    <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
      <CustomTableCell>
        <Box display='flex' justifyContent='flex-start'>
          <Tooltip title='Edit'>
            <IconButton onClick={handleEditOpen} aria-label='edit'>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete'>
            <IconButton
              onClick={() => deleteHandler(row.id)}
              aria-label='delete'>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      </CustomTableCell>
      <CustomTableCell>#{row.id}</CustomTableCell>
      <CustomTableCell>{row.titleEN}</CustomTableCell>
      <CustomTableCell>{row.typeEN}</CustomTableCell>
      <CustomTableCell>{row.status}</CustomTableCell>
      <CustomTableCell>
        <Box display='flex' justifyContent='flex-start'>
          <Tooltip title='View details'>
            <IconButton aria-label='view details' onClick={handleOpen}>
              <Visibility />
            </IconButton>
          </Tooltip>
          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className='
            flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50 
            '
            open={open}
            onClose={handleClose}
            closeAfterTransition>
            <HotelRoomDetailsModal
              data={row}
              open={open}
              handleClose={handleClose}
            />
          </Modal>
        </Box>
      </CustomTableCell>
      <EditModal
        editOpen={editOpen}
        handleEditClose={handleEditClose}
        data={row}
        getData={getData}
      />
    </TableRow>
  );
};

export default function AdminTable({ data, perPage, getData }: any) {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(data.length / perPage);

  const handlePageChange = ({ selected }: { selected: number }) =>
    setCurrentPage(selected);

  return (
    <>
      <TableContainer
        component={Paper}
        className='
      overflow-x-auto 
      '>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead
            sx={{
              '& .MuiTableCell-root': {
                backgroundColor: '#1876D1',
                color: 'white',
                fontSize: '1rem',
                fontWeight: 'bold',
                position: 'sticky',
                top: 0,
                zIndex: 1,
              },
            }}>
            <TableRow>
              <CustomTableHeaderCell>Actions</CustomTableHeaderCell>
              <CustomTableHeaderCell>ID</CustomTableHeaderCell>
              <CustomTableHeaderCell>Title</CustomTableHeaderCell>
              <CustomTableHeaderCell>Type</CustomTableHeaderCell>
              <CustomTableHeaderCell>Status</CustomTableHeaderCell>
              <CustomTableHeaderCell>Details</CustomTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(currentPage * perPage, (currentPage + 1) * perPage)
              .map((row: TableData) => (
                <CustomTableRow key={row.id} row={row} getData={getData} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination pageCount={pageCount} onPageChange={handlePageChange} />
    </>
  );
}
