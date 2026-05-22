import { useViewTransitionNavigate } from '@/hooks/useViewTransitionNavigate';

const NotFoundPage = () => {
  const navigate = useViewTransitionNavigate();
  return (
    <div className='not-found flex flex-col'>
      <h1 className='text-center font-bold'>Oops! Page Not Found</h1>
      <span>
        Sorry, the page you are looking for could not be found. Please verify the address or use the
        navigation menu to find what you need.
      </span>
      <button
        className='mt-8 rounded-xl bg-gray-800/50 px-4 pt-2 pb-4'
        onClick={() => navigate('/')}
      >
        Back To Home
      </button>
    </div>
  );
};

export default NotFoundPage;
