import emailjs from 'emailjs-com';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import TextArea from '../inputs/TextArea';
import TextInput from '../inputs/TextInput';

const Contact = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data: any) => {
    const toastId = toast.loading('Sending message...');
    emailjs
      .send(
        import.meta.env.VITE_PUBLIC_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          from_phone: data.phone,
          message: data.message,
        },
        import.meta.env.VITE_PUBLIC_EMAILJS_USER_ID
      )
      .then((result) => {
        toast.dismiss(toastId);
        toast.success('Message sent successfully!');
        setSuccess(true);
        reset();
      })
      .catch((error) => {
        toast.dismiss(toastId);
        toast.error('Message not sent!');
      });
  };

  return (
    <section>
      <div className='relative bg-tint h-96'>
        <img
          src='/Capture2.png'
          alt='bg'
          className='object-cover w-full h-full'
        />

        <div className='absolute w-full top-12 md:top-20 lg:top-28 left-[50%] -translate-x-[50%]'>
          <h3 className='font-semibold text-center text-white text-h4 md:text-h3'>
            {t('contact_header')}
          </h3>
        </div>
      </div>

      <div className='px-4'>
        <section className='max-w-6xl -translate-y-44  md:-translate-y-28 bg-white px-6 md:px-20  mx-auto border-2 shadow-md rounded-[40px] pt-0 pb-11 border-slate-200'>
          <div className='flex justify-center'>
            <div className='grid w-3/4 px-4 py-5 bg-white border-2 rounded-full shadow-xl -translate-y-14 md:-translate-y-20 md:py-10 place-items-center border-slate-200'>
              <img
                src='/Le Clos Saint-Germain.png'
                alt='logo'
                className='object-contain w-full h-14'
              />
            </div>
          </div>

          <div className='text-center '>
            <h3 className='font-semibold text-h4 md:text-h3'>
              {t('contact_question')}
            </h3>

            <p className='max-w-3xl mx-auto mt-1 text-sm font-medium md:text-base text-primary'>
              {t('contact_help')}
            </p>
          </div>

          <h1 className='mt-6 mb-10 font-bold text-h3 md:text-h2 '>
            {t('contact_form_title')}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2'>
              <div className='col-span-2 md:col-span-1'>
                <TextInput
                  name='name'
                  label={t('nameLabel')}
                  placeholder={t('namePlaceholder')}
                  required
                  register={register}
                  errors={errors}
                />
              </div>

              <div className='col-span-2 md:col-span-1'>
                <TextInput
                  name='phone'
                  type='number'
                  label={t('phoneLabel')}
                  placeholder={t('phonePlaceholder')}
                  required
                  register={register}
                  errors={errors}
                />
              </div>

              <div className='col-span-2'>
                <TextInput
                  name='email'
                  label={t('emailLabel')}
                  placeholder={t('emailPlaceholder')}
                  required
                  type='email'
                  register={register}
                  errors={errors}
                />
              </div>

              <div className='col-span-2'>
                <TextArea
                  name='message'
                  label={t('messageLabel')}
                  placeholder={t('messagePlaceholder')}
                  required
                  register={register}
                  errors={errors}
                />
              </div>

              <button
                type='submit'
                className='px-4 py-5 mt-6 text-lg font-semibold tracking-wider text-white shadow-md w-52 bg-primary hover:bg-primary hover:shadow-none focus:outline-none'>
                {t('send')}
              </button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default Contact;
