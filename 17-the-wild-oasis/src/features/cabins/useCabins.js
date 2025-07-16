import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
    const options = {
        queryKey: ['cabins'],
        queryFn: getCabins,
    };
    const { isLoading, data: cabins, error } = useQuery(options);

    return { isLoading, error, cabins };
}
