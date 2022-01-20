import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const Carousel = ({ images, address }) => {
    const [isArray, setIsArray] = useState(images.length > 0);
    const settings = {
        dots: false,
        lazyLoad: 'ondemand',
        infinite: true,
        swipe: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleError = (e) => {
        e.target.src = 'https://www.idxboost.com/i/default_thumbnail.jpg';
        setIsArray(false);
    };

    return (
        <Slider {...settings}>
            {isArray ? images.map((image, index) => (
                <img
                    key={`${address}-${index}`}
                    className="property-image"
                    alt={address}
                    onError={handleError}
                    src={image}
                />
            )) : (
                <img
                    key={`${address}-${0}`}
                    className="property-image"
                    alt={address}
                    src="https://www.idxboost.com/i/default_thumbnail.jpg"
                />
            )}
        </Slider>
    );
};

export default ({ info, setActive }) => {
    const {
        formattedSqft, formattedPrice, bed, bath, baths_half, full_address, gallery, mls_num, status, recently_listed,
    } = info;
    const [hovered, setHovered] = useState(false);

    const handleFocus = () => {
        setActive(mls_num);
        setHovered(true);
    };

    const handleBlur = () => {
        setActive(undefined);
        setHovered(false);
    };

    return (
        <li onMouseEnter={() => handleFocus()} onMouseLeave={() => handleBlur()} className="property-item">
            <a
                onFocus={() => handleFocus()}
                role="button"
                className="property-link"
                href="#"
                aria-label={`View detail of ${full_address}`}
                title={`View detail of ${full_address}`}
            />

            <ul className="property-info">
                <li className="property-info-item property-price">
                    $
                    {formattedPrice}
                </li>
                <li className="property-info-item property-beds">
                    {bed}
                    {' '}
                    Bed(s)
                </li>
                <li className="property-info-item property-baths">
                    {Number(bath) + baths_half * 0.5}
                    {' '}
                    Bath(s)
                </li>
                <li className="property-info-item property-sqft">
                    {formattedSqft}
                    {' '}
                    Sq.Ft.
                </li>
                <li className="property-info-item property-address">{full_address}</li>
                {status === '6' ? <li className="property-info-item property-status">Pending</li> : null}
                {recently_listed === 'yes' ? <li className="property-info-item property-status">New Listing!</li> : null}
            </ul>

            <div className={`property-slider gs-container-slider ${hovered ? 'hovered' : ''}`}>
                <Carousel address={full_address} images={gallery} />
            </div>

            <button
                className="btn-favorite btn-favorite-heart"
                type="button"
                aria-label="Add to favorites"
            />
        </li>
    );
};
