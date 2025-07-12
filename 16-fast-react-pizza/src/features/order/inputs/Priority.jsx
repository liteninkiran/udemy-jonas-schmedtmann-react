const Priority = ({ withPriority, setWithPriority }) => {
    return (
        <div className='mb-12 flex items-center gap-5'>
            <input
                type='checkbox'
                name='priority'
                id='priority'
                value={withPriority}
                onChange={(e) => setWithPriority(e.target.checked)}
                className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            />
            <label className='font-medium' htmlFor='priority'>
                Want to give your order priority?
            </label>
        </div>
    );
};

export default Priority;
