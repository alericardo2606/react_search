import React from 'react';

export default ({
                    group, pinStyle, active, setActive,
                }) => {
    const ids = group.map((unit) => unit.mls_num);
    const currentActive = ids.indexOf(active) !== -1;

    return (
        <div style={currentActive ? pinStyle.infoBoxActive : pinStyle.infoBoxInActive}
             className="ib-infobox ib-ibmulti">
            <div className="ib-ibwtitle">
                <div className="ib-ibcount">
                    {group.length}
                    <span>units -</span>
                </div>
                <h3 className="ib-ibtitle">

                    <span className="ib-ibtxt">{group[0].complex}</span>
                </h3>

                <div onClick={(e) => setActive(undefined)} className="ib-ibclose">
                    <span>Close</span>
                </div>
            </div>

            <ul className="ib-ibproperties">
                {group.map((unit) => {
                    const {
                        formattedPrice,
                        formattedSqft,
                        address_short,
                        address_large,
                        mls_num,
                        price,
                        bath,
                        baths_half,
                        sqft,
                        thumbnail,
                    } = unit;

                    return (
                        <li key={`info-box-multi-${mls_num}`} className="ib-ibpitem ms-order-m" data-mls={mls_num}
                            data-status="1">
                            <div className="ib-ibpa">
                                <h4 className="ib-ibptitle">{address_short}</h4>
                                <ul className="ib-ibdetails">
                                    <li className="ib-ibditem ib-ibaddress">{address_large}</li>
                                    <li className="ib-ibditem ib-ibprice">
                                        $
                                        {formattedPrice}
                                    </li>
                                    <li className="ib-ibditem ib-ibbeds">
                                        <span className="ib-ibdbold">6</span>
                                        Bed(s)
                                    </li>
                                    <li className="ib-ibditem ib-ibbaths">
                                        <span className="ib-ibdbold">{Number(bath) + baths_half * 0.5}</span>
                                        Bath(s)
                                    </li>
                                    <li className="ib-ibditem ib-ibsqft">
                                        <span className="ib-ibdbold">{formattedSqft}</span>
                                        Sq.Ft.
                                    </li>
                                    <li className="ib-ibditem ib-ibsqft">
                                        <span className="ib-ibdbold">
                                          ${Math.round(price / sqft)}
                                        </span>
                                        / Sq.Ft.
                                    </li>
                                </ul>
                            </div>

                            <div className="ib-ibpb">
                                <img
                                    className="ib-ibimg"
                                    alt="property"
                                    onError={(e) => {
                                        e.target.src = 'https://www.idxboost.com/i/default_thumbnail.jpg';
                                    }}
                                    src={thumbnail || 'https://www.idxboost.com/i/default_thumbnail.jpg'}
                                />
                            </div>

                            <a href="https://master.idxboost.com/property/1429-n-venetian-way-miami-fl-33139-a10869347"/>
                        </li>
                    );
                })}

            </ul>
        </div>
    );
};
