import { useMutation } from '@tanstack/react-query';
import { signup as mutationFn } from '@services/apiAuth';
import { toast } from 'react-hot-toast';

const getSuccessMessage = (user) =>
    `Account successfully created for ${user.user.user_metadata.fullName}! Please verify the new account from the user's email address.`;

export const useSignup = () => {
    const onSuccess = (user) => toast.success(getSuccessMessage(user));
    const mutationOptions = { mutationFn, onSuccess };
    const mutation = useMutation(mutationOptions);
    return {
        signup: mutation.mutate,
        isLoading: mutation.isPending,
    };
};
