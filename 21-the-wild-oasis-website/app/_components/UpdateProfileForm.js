'use client';

const UpdateProfileForm = ({ children }) => {
    const countryFlag = 'pt.jpg';

    return (
        <form className='bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col'>
            <div className='space-y-2'>
                <label>Full Name</label>
                <input
                    disabled
                    className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
                />
            </div>

            <div className='space-y-2'>
                <label>Email Address</label>
                <input
                    disabled
                    className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
                />
            </div>

            <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                    <label htmlFor='nationality'>Country</label>
                    <img
                        src={countryFlag}
                        alt='Country Flag'
                        className='h-5 rounded-sm'
                    />
                </div>
                {children}
            </div>

            <div className='space-y-2'>
                <label htmlFor='nationalID'>National ID Number</label>
                <input
                    name='nationalID'
                    className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                />
            </div>

            <div className='flex justify-end items-center gap-6'>
                <button className='bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'>
                    Update Profile
                </button>
            </div>
        </form>
    );
};

export default UpdateProfileForm;
