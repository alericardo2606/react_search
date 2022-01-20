import React from 'react';
import Listing from './Listing';

export default ({
                    data, setActive, updating, setShape,
                }) => {
    console.log(data)
    if (data) {
        if (data.items.length > 0) {
            // If there are results, show them
            return (
                <div className="properties">
                    <ul style={{ opacity: updating ? 0.5 : 1 }} className="properties-collection">

                        {data.hackbox
                            ? (
                                <li className="property-item property-item-ads" dangerouslySetInnerHTML={{__html: data.hackbox}}>
                                </li>
                            ) : null}

                        {data.items.map((info, index) => <Listing key={`item${info.mls_num}`} setActive={setActive} info={info} />)}
                    </ul>
                </div>
            );
        }
        // return 0 results message
        return (
            <div className="mo-no-results-wrapper">
        <span className="ib-gnpno">
          No matching results...
        </span>
                <button onClick={() => setShape('')}>Remove boundaries</button>
                &#160;to clear your search.
            </div>
        );
    }
    return null;
};
