import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCurrentUser as mutationFn } from '@services/apiAuth';

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const onSuccess = ({ user }) => {
        toast.success('User account successfully updated');
        queryClient.setQueryData(['user'], user);
    };
    const onError = (err) => toast.error(err.message);
    const mutationOptions = { mutationFn, onSuccess, onError };
    const { mutate, isPending } = useMutation(mutationOptions);

    return {
        updateUser: mutate,
        isUpdating: isPending,
    };
}
