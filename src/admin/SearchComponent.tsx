import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import React, { useState } from 'react';

interface SearchProps {
  onSearch: (searchValue: string) => void;
}

const SearchComponent: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div
      className='flex items-center justify-center w-full px-4 py-1 mb-1 bg-white rounded-md shadow-md md:w-1/2
    '>
      <SearchIcon className='w-5 h-5 mr-1 text-gray-400 mt-2' />
      <TextField
        sx={{
          width: '100%',
        }}
        label='Search by Room ID'
        variant='standard'
        size='small'
        value={searchValue}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchComponent;
