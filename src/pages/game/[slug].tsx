import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();
  console.log('router', router);
  return <h1>{router.asPath}</h1>;
}
