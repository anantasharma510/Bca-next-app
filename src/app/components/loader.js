// components/Spinner.js
export default function Spinner() {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin border-b-transparent'></div>
      </div>
    );
  }
  