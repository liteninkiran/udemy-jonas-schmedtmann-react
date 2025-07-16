import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin } from '@services/apiCabins';

const filters = { queryKey: ['cabins'] };

export const useUpdateCabin = () => {
    const queryClient = useQueryClient();
    const onSuccess = () => {
        queryClient.invalidateQueries(filters);
        toast.success('Cabin updated successfully');
    };
    const onError = (err) => toast.error(err.message);
    const mutationFn = ({ cabin, id }) => createEditCabin(cabin, id);
    const mutation = { mutationFn, onSuccess, onError };
    const { isPending, mutate } = useMutation(mutation);

    return {
        isUpdating: isPending,
        updateCabin: mutate,
    };
};
