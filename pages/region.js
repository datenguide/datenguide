import { useRouter } from 'next/router';

const Content = () => {
  const router = useRouter();
  return (
    <>
      <h1>{router.query.title}</h1>
      <p>This is the blog post content.</p>
    </>
  );
};

const Page = () => (
  <div>
    <Content />
  </div>
);

export default Page;
