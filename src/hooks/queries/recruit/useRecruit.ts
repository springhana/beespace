import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/keys';
import { axiosInstance } from '@/utils/api/axiosInstance';

const useRecruit = (category: string, size: number) => {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    enabled: !!category,
    queryKey: [queryKeys.RECRUIT, category],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axiosInstance.get(
        `/recruit?size=${size}&page=${pageParam}${category === 'all' ? '' : `&category=${category}`}`
      );

      if (response.data.success) {
        return response.data.data;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;

      if (!lastPage) {
        return null;
      }
      return lastPage?.length === 0 || lastPage?.length < size
        ? undefined
        : nextPage;
    },
  });
  return {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useRecruit;