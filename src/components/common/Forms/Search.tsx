import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DatePickerInput from '../inputs/DatePickerInput';
import SelectInput from '../inputs/SelectInput';

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const checkInDate = searchParams.get('checkIn');
  const checkOutDate = searchParams.get('checkOut');
  const guests = searchParams.get('guests');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      checkIn: new Date(checkInDate || new Date()),
      checkOut: new Date(checkOutDate || new Date()),
      guests: searchParams.get('guests') || '',
    },
  });

  const onSubmit = (data: any) => {
    // set search params
    navigate(
      `/rooms?checkIn=${data.checkIn}&checkOut=${data.checkOut}&guests=${data.guests}`
    );
  };

  return (
    <section className='px-4 pb-10'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative grid max-w-5xl grid-cols-4 py-6 pl-10 pr-10 mx-auto bg-white rounded-sm shadow-xl md:py-0 md:pr-0 md:rounded-full'>
        <div className='grid grid-cols-4 col-span-4 md:col-span-2'>
          <div className='col-span-4 md:col-span-2'>
            <DatePickerInput
              name='checkIn'
              label={t('in')}
              isRequired={true}
              register={register}
              errors={errors}
              control={control}
              disablePast={true}
            />
          </div>
          <div className='col-span-4 md:col-span-2'>
            <DatePickerInput
              name='checkOut'
              label={t('out')}
              isRequired={true}
              register={register}
              errors={errors}
              control={control}
              disablePast={true}
            />
          </div>
        </div>

        <div className='flex flex-col items-center w-full col-span-4 md:flex-row md:col-span-2'>
          <div className='w-full md:w-3/4'>
            <SelectInput
              name='guests'
              label={t('guests')}
              isRequired={true}
              register={register}
              errors={errors}
              control={control}>
              <MenuItem value='' disabled>
                {t('guests')}
              </MenuItem>
              <MenuItem value='1'>1</MenuItem>
              <MenuItem value='2'>2</MenuItem>
              <MenuItem value='3'>3</MenuItem>
              <MenuItem value='4'>4</MenuItem>
              <MenuItem value='5'>5</MenuItem>
              <MenuItem value='6'>6</MenuItem>
            </SelectInput>
          </div>

          <button className='w-full py-4 my-4 text-white rounded-r-lg md:my-0 md:mt-7 md:py-4 md:w-1/4 bg-primary'>
            GO
          </button>
        </div>
      </form>
    </section>
  );
};

export default Search;
