import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { errorMessages, successMessages } from '@/constants/messages';
import useAxiosInstance from '@/hooks/useAxiosInstance';
import useCookie from '@/hooks/useCookie';
import useLoginModal from '@/store/modal/useLoginModal';
import { ICommunityBody, IProjectBody, IRecruitBody } from '@/types/global';
import queryClient from '@/utils/queryClien';
import { queryOnError } from '@/utils/queryOnError';

const useMutateUpdatePost = (
  id: number,
  postType: string,
  data: IProjectBody | IRecruitBody | ICommunityBody
) => {
  const axiosInstance = useAxiosInstance();
  const { getCookies, setCookies } = useCookie(['jwt', 'MID']);
  const { onOpen } = useLoginModal();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      return await axiosInstance.put(
        `${process.env.BASE_URL}/${postType}/${id}`,
        data
      );
    },
    onSuccess: (response) => {
      if (!response) return;

      if (response.status === 200 && response.data.success) {
        queryClient.resetQueries({
          queryKey: [postType.toLowerCase()],
        });

        queryClient.setQueryData(
          [postType.toLowerCase() + '_detail', String(id)],
          response
        );

        toast.success(successMessages.POST_UPDATE);
        router.replace(
          `/${response.data.data.postType.toLowerCase() === 'recruit' ? 'recruitment' : response.data.data.postType.toLowerCase()}/${response.data.data.id}`
        );
      } else if (response.status === 202 && !response.data.success) {
        toast.error(errorMessages.TRY_AUTH_TOKEN_EXPIRED);
        setCookies({
          jwt: response.data.jwt,
          MID: response.data.memberId,
        });
      }
    },
    onError: (error) => {
      queryOnError(getCookies('jwt'), error);
    },
    onSettled: () => {
      if (!getCookies('jwt')) return onOpen();
    },
  });
};

export default useMutateUpdatePost;
