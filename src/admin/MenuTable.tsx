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
import { deleteMenu } from '../services/index';
import MenuEditModal from './MenuEditModal';
import MenuDetailsModal from './menuDetailsModal';

interface TableData {
  id: string;
  platPrincipalEN: string;
  platPrincipalFR: string;
  dessertEN: string;
  dessertFR: string;
  status: boolean;
}

interface TableProps {
  row: TableData;
  key: string;
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

const CustomTableRow = ({ key, row }: TableProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuEditOpen, setMenuEditOpen] = useState(false);

  const handleOpen = () => setMenuOpen(true);
  const handleClose = () => setMenuOpen(false);

  const handleEditOpen = () => setMenuEditOpen(true);
  const handleEditClose = () => setMenuEditOpen(false);

  const deleteHandler = (id: string) => {
    window.confirm('Are you sure you want to delete this menu?') &&
      deleteMenu(id);
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
      <CustomTableCell>{row.platPrincipalEN}</CustomTableCell>
      <CustomTableCell>{row.dessertEN}</CustomTableCell>
      <CustomTableCell>{row.status ? 'Active' : 'Inactive'}</CustomTableCell>
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
            open={menuOpen}
            onClose={handleClose}
            closeAfterTransition>
            <MenuDetailsModal
              data={row}
              open={open}
              handleClose={handleClose}
            />
          </Modal>
        </Box>
      </CustomTableCell>
      <MenuEditModal
        editOpen={menuEditOpen}
        handleEditClose={handleEditClose}
        data={row}
      />
    </TableRow>
  );
};

export default function MenuTable({ data, perPage }: any) {
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
              <CustomTableHeaderCell>Plat Principal</CustomTableHeaderCell>
              <CustomTableHeaderCell>Dessert</CustomTableHeaderCell>
              <CustomTableHeaderCell>Status</CustomTableHeaderCell>
              <CustomTableHeaderCell>Details</CustomTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(currentPage * perPage, (currentPage + 1) * perPage)
              .map((row: TableData) => (
                <CustomTableRow key={row.id} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination pageCount={pageCount} onPageChange={handlePageChange} />
    </>
  );
}
