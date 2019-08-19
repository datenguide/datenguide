import Header from '../components/Header';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const RegionLink = ({ name, id }) => (
  <li>
    <Link href="/region/[id]" as={`/region/${id}`}>      
        <a>{name}</a>
    </Link>
  </li>
);

const Home = ({ regions }) => {
    return (
        <div>
            <h1>Regions</h1>
            {Object.keys(regions).map(key => (
                <ul key={key}>
                    <RegionLink name={regions[key]} id={key} />
                </ul>
            ))}
        </div>
    );
}
  
Home.getInitialProps = async function(context) {
    const { id } = context.query;
    const res = await fetch(`http://localhost:3000/api/regions`);
    const regions = await res.json();

    return { regions };
};

export default Home
