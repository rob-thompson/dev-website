import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Home = (props) => {
    const { filter } = useParams();

    useEffect(() => {
    }, [filter]);

    return (<h1>Url: {filter}</h1>);
}
export default Home;