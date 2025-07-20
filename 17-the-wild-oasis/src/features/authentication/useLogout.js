import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as mutationFn } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const onSuccess = () => {
        queryClient.removeQueries();
        navigate('/login', { replace: true });
    };
    const mutationOptions = { mutationFn, onSuccess };
    const mutation = useMutation(mutationOptions);

    return {
        logout: mutation.mutate,
        isLoading: mutation.isPending,
    };
};
