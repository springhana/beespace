import { useRouter } from 'next/router';

import Banner from '@/components/banner/Banner';
import Category from '@/components/Category';
import ProjectCardContainer from '@/components/container/ProjectCardContainer';

const CATEGORIES = [
  {
    name: '개인',
    link: 'INDIVIDUAL',
  },
  {
    name: '팀',
    link: 'TEAM',
  },
];

const PAGE_SIZE = 24;

export default function Project() {
  const router = useRouter();
  const { type } = router.query;

  return (
    <main className="min-h-min_h">
      <h1 className="sr-only">프로젝트 페이지</h1>
      <section>
        <Banner postType="project" />
      </section>
      <Category category={CATEGORIES} btnValue="프로젝트 올리기" />
      <section className="flex justify-center pt-14 pb-24 tablet:px-8 mobile:px-6">
        <ProjectCardContainer category={type as string} size={PAGE_SIZE} />
      </section>
    </main>
  );
}
