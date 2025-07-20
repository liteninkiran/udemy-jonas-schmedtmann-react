import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@services/apiAuth';

const options = {
    queryKey: ['user'],
    queryFn: getCurrentUser,
};

export const useUser = () => {
    const { isLoading, data: user } = useQuery(options);
    return { isLoading, user, isAuthenticated: user?.role === 'authenticated' };
};
