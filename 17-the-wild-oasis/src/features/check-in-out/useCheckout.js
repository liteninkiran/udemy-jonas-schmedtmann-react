import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import { toast } from 'react-hot-toast';

const data = {
    status: 'checked-out',
};

export const useCheckout = () => {
    const queryClient = useQueryClient();
    const mutationFn = (bookingId) => updateBooking(bookingId, data);
    const onSuccess = (data) => {
        toast.success(`Booking #${data.id} successfully checked out`);
        queryClient.invalidateQueries({ active: true });
    };
    const onError = () => toast.error('There was an error while checking out');
    const mutationOptions = { mutationFn, onSuccess, onError };
    const mutation = useMutation(mutationOptions);

    return {
        checkout: mutation.mutate,
        isCheckingOut: mutation.isPending,
    };
};
