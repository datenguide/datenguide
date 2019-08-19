import Link from 'next/link';
import { withRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import RegionLayout from '../../layouts/Region'

const Region = ({ slug, id, name }) => {
    return (
        <RegionLayout>
            <Link href="/region/ahrweiler">      
                <a>ahrweiler</a>
            </Link>
            <h1>{name} / {id} / {slug}</h1>
        </RegionLayout>)
};
  
Region.getInitialProps = async function(context) {
    const { slug } = context.query;
    const res = await fetch(`http://localhost:3000/api/region/${slug}`);
    const data = await res.json();

    return data;
};

export default withRouter(Region);
