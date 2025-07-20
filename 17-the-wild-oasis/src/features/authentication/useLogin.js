import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const mutationFn = ({ email, password }) => loginApi({ email, password });
    const onSuccess = (user) => {
        queryClient.setQueryData(['user'], user.user);
        navigate('/dashboard', { replace: true });
    };
    const onError = (err) => {
        toast.error('Incorrect email/password');
    };
    const mutationOptions = { mutationFn, onSuccess, onError };
    const mutation = useMutation(mutationOptions);

    return {
        login: mutation.mutate,
        isLoading: mutation.isPending,
    };
};
