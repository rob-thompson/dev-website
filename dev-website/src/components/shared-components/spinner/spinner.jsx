import React, { useState, useEffect } from "react";
import './spinner.scss';

const Spinner = () => {
    const [size, setSize] = useState(0);
    const [props, setProps] = useState({});

    useEffect(() => {
        calcSize();
        window.addEventListener('resize', calcSize);
        return () => {
            window.removeEventListener('resize', calcSize);
        }
    }, []);

    useEffect(() => {
        if (!size || size > 300) {
            setProps({ width: '90%', height: '85%' });
        }
        else if (size > 250) {
            setProps({ width: '85%', height: '80%' });
        }
        else if (size > 200) {
            setProps({ width: '80%', height: '75%' });
        }
        else if (size > 150) {
            setProps({ width: '75%', height: '70%' });
        }
    }, [size]);

    const calcSize = () => {
        let w = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        let h = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        let smallestDimension = w < h ? w : h;
        let s = 300 < smallestDimension / Math.sqrt(2) ? 300 : Math.floor(smallestDimension / Math.sqrt(2));
        setSize(s);
    };

    return (
        <div id='spinnerContainer' className="container" style={{ overflow: 'hidden', height: size, width: size }}>
            <div className="spinner" {...props}>
                <div className="spinner"{...props}>
                    {size > 100 &&
                        <div className="spinner"{...props}>
                            {size > 150 &&
                                <div className="spinner"{...props}>
                                    {size > 200 &&
                                        <div className="spinner"{...props}>
                                            {size > 250 &&
                                                <div className="spinner"{...props}>
                                                    {size > 300 &&
                                                        <div className="spinner"{...props}>
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}
export default Spinner;