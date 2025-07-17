import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting as mutationFn } from '@services/apiSettings';

const filters = { queryKey: ['settings'] };

export const useUpdateSetting = () => {
    const queryClient = useQueryClient();
    const onSuccess = () => {
        queryClient.invalidateQueries(filters);
        toast.success('Setting updated successfully');
    };
    const onError = (err) => toast.error(err.message);

    const mutation = { mutationFn, onSuccess, onError };
    const { isPending, mutate } = useMutation(mutation);

    return {
        isUpdating: isPending,
        updateSetting: mutate,
    };
};
