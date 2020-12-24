import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Slider from '../../shared-components/slider/slider.jsx';

const slideData = [
    {
        index: 0,
        headline: 'New Fashion Apparel',
        button: 'Shop now',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg'
    },
    {
        index: 1,
        headline: 'In The Wilderness',
        button: 'Book travel',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg'
    },
    {
        index: 2,
        headline: 'For Your Current Mood',
        button: 'Listen',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg'
    },
    {
        index: 3,
        headline: 'Focus On The Writing',
        button: 'Get Focused',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg'
    }
];

const Home = (props) => {
    const { filter } = useParams();
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        setShowComponent(true);
    }, [filter]);

    return (
        <>
            <h1>
                Hi, I'm Rob Thompson. Sometimes I do things.
            </h1>

            <div>
                {showComponent ?
                    <Slider heading="Example Slider" slides={slideData} />
                    : 'asdf'
                }
            </div>
        </>
    );
}
export default Home;