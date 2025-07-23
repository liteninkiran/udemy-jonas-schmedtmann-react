import Link from 'next/link';

const NotFound = () => {
    return (
        <main className='text-center space-y-6 mt-4'>
            <h1 className='text-3xl font-semibold'>
                This Cabin Could Not Be Found
            </h1>
            <Link
                href='/cabins'
                className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
            >
                Back To All Cabins
            </Link>
        </main>
    );
};

export default NotFound;
