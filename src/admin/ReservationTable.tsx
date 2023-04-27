import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  IconButton,
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
import { deleteBooking } from '../services/index';
import ReservationEditModal from './ReservationEditModal';
import SearchComponent from './SearchComponent';

interface TableData {
  // checkIn
  // :
  // "2023-04-27"
  // checkOut
  // :
  // "2023-04-29"
  // guests
  // :
  // "2"
  // id
  // :
  // "cs_test_a1eEdFJFB8CcrdxM4i6DxgVVVEvaJ2bpRAymtU7jNaQESRzF1ZHj114buB"
  // room
  // :
  // "Room 002"
  // roomId
  // :
  // "1IbrMJ1zbnnm5Z0ytVP3"
  // type
  // :
  // "Suite"

  id: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
  roomId: string;
  type: string;
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
    window.confirm('Are you sure you want to delete this reservation?') &&
      deleteBooking(id);
    getData();
  };

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
      <CustomTableCell>{row.roomId}</CustomTableCell>
      <CustomTableCell>{row.checkIn}</CustomTableCell>
      <CustomTableCell>{row.checkOut}</CustomTableCell>
      <CustomTableCell>{row.guests}</CustomTableCell>
      {/* <CustomTableCell>
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
      </CustomTableCell> */}
      <ReservationEditModal
        editOpen={editOpen}
        handleEditClose={handleEditClose}
        data={row}
        getData={getData}
      />
    </TableRow>
  );
};

export default function ReservationTable({ data, perPage, getData }: any) {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(data.length / perPage);
  const [filteredData, setFilteredData] = useState(data);

  const onSearch = (value: string) => {
    console.log(value);
    if (value) {
      const newData = data.filter((item: any) => {
        const itemData = item.roomId.toUpperCase();
        const textData = value.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }

    setCurrentPage(0);
  };

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
              <CustomTableHeaderCell>Reservation Id</CustomTableHeaderCell>
              <CustomTableHeaderCell>Room Id</CustomTableHeaderCell>
              <CustomTableHeaderCell>Check In</CustomTableHeaderCell>
              <CustomTableHeaderCell>Check Out</CustomTableHeaderCell>
              <CustomTableHeaderCell>Guests</CustomTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData && filteredData.length > 0 ? (
              filteredData
                .slice(currentPage * perPage, currentPage * perPage + perPage)
                .map((row: any) => (
                  <CustomTableRow key={row.id} row={row} getData={getData} />
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align='center'>
                  No reservations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-between',
          alignItems: 'center',
          backgroundColor: 'lightgray',
        }}>
        <SearchComponent onSearch={onSearch} />
        <TablePagination
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
      </Box>
    </>
  );
}
