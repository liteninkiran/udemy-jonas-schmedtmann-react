import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEditCabin as mutationFn } from '@services/apiCabins';

const filters = { queryKey: ['cabins'] };

export const useCreateCabin = () => {
    const queryClient = useQueryClient();
    const onSuccess = () => {
        queryClient.invalidateQueries(filters);
        toast.success('Cabin created successfully');
    };
    const onError = (err) => toast.error(err.message);

    const mutation = { mutationFn, onSuccess, onError };
    const { isPending, mutate } = useMutation(mutation);

    return {
        isCreating: isPending,
        createCabin: mutate,
    };
};
