import React from 'react';

export default ({
                    info, pinStyle, active, setActive,
                }) => {
    const {
        formattedSqft, address_short, formattedPrice, address_large, complex, mls_num, price, bath, baths_half, sqft, thumbnail,
    } = info;
    const currentActive = active === mls_num;

    return (
        <div style={currentActive ? pinStyle.infoBoxActive : pinStyle.infoBoxInActive} className="ib-infobox">
            <div className="ib-ibwtitle">
                <h3 className="ib-ibtitle">
                    <span className="ib-ibtxt">{complex}</span>
                </h3>

                <div onClick={(e) => setActive(undefined)} className="ib-ibclose">
                    <span>Close</span>
                </div>
            </div>

            <ul className="ib-ibproperties">
                <li className="ib-ibpitem ms-order-m" data-mls={mls_num} data-status="1">
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
                                  $
                                    {Math.round(price / sqft)}
                                </span>
                                / Sq.Ft.
                            </li>
                        </ul>
                    </div>

                    <div className="ib-ibpb">
                        <img
                            alt="property"
                            className="ib-ibimg"
                            onError={(e) => { e.target.src = 'https://www.idxboost.com/i/default_thumbnail.jpg'; }}
                            src={thumbnail || 'https://www.idxboost.com/i/default_thumbnail.jpg'}
                        />
                    </div>

                    <a href="https://master.idxboost.com/property/1429-n-venetian-way-miami-fl-33139-a10869347" />
                </li>
            </ul>
        </div>
    );
};
