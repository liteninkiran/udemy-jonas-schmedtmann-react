import { updateBooking } from '@services/apiBookings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const getData = (data) => ({
    status: 'checked-in',
    isPaid: true,
    ...data.breakfast,
});

export const useCheckin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutationFn = (data) => updateBooking(data.bookingId, getData(data));
    const onSuccess = (data) => {
        toast.success(`Booking #${data.id} successfully checked in`);
        queryClient.invalidateQueries({ active: true });
        navigate('/');
    };
    const onError = () => toast.error('There was an error while checking in');
    const mutationOptions = { mutationFn, onSuccess, onError };
    const mutation = useMutation(mutationOptions);

    return {
        checkin: mutation.mutate,
        isCheckingIn: mutation.isPending,
    };
};
