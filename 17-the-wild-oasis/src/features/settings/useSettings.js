import { useQuery } from '@tanstack/react-query';
import { getSettings } from '@services/apiSettings';

export const useSettings = () => {
    const options = {
        queryKey: ['settings'],
        queryFn: getSettings,
    };
    const { isLoading, error, data: settings } = useQuery(options);

    return { isLoading, error, settings };
};
