import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteBooking as mutationFn } from '../../services/apiBookings';

const filters = {
    queryKey: ['bookings'],
};

export const useDeleteBooking = () => {
    const queryClient = useQueryClient();
    const onSuccess = () => {
        toast.success('Booking successfully deleted');
        queryClient.invalidateQueries(filters);
    };
    const onError = (err) => toast.error(err.message);
    const mutationOptions = { mutationFn, onSuccess, onError };
    const mutation = useMutation(mutationOptions);

    return {
        isDeleting: mutation.isPending,
        deleteBooking: mutation.mutate,
    };
};
