import Header from '../components/Header';
import Link from 'next/link';

const RegionLink = props => (
  <li>
    <Link href="/region/[id]" as={`/region/${props.id}`}>      
        <a>{props.id}</a>
    </Link>
  </li>
);
export default function Blog() {
  return (
    <div>
      <h1>My Blog</h1>
      <ul>
        <RegionLink id="hello-nextjs" />
        <RegionLink id="learn-nextjs" />
        <RegionLink id="deploy-nextjs" />
      </ul>
    </div>
  );
}
