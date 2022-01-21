import {connect} from 'react-redux'
import React, {useState} from 'react'
import {getFilterParams, getSearchData} from "../../config/app/filter.reducers";
import AutoComplete from "../Autocomplete/Autocomplete";
import '../../assets/css/filterBar.scss'
import RangeSlider from "../Slider/RangeSlider";
import {
    AllYearsBuilt,
    filterRangeValues,
    PriceForSaleRent, SelectAmenitiesValues,
    SelectParkingValues,
    SelectWaterDescriptionValues
} from "../../utils/filtersValue";
import {formatShortPrice} from "../../utils/util";
import 'antd/dist/antd.css';
import {Checkbox} from 'antd';
import SelectBoost from "../Select/Select";
const rangePrice = PriceForSaleRent();
const rangeSliderValues = filterRangeValues();

const optionsCheck = [
    {
        label: 'Single Family Homes',
        value: '2',
    },
    {
        label: 'Condominiums',
        value: '1',
    },
    {
        label: 'Townhouses',
        value: 'tw',
    },
    {
        label: 'Multi-Family',
        value: 'mf',
    },
    {
        label: 'Vacant Land',
        value: 'valand',
    },
];

class SearchFilter extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            priceText: 'Any Price',
            maxPrice: rangePrice[rangePrice.length - 1],
            minPrice: 0,
            bedsText: 'Any Bed(s)',
            minBeds: 0,
            maxBeds: 6,
            bathsText: 'Any Baths(s)',
            minBaths: 0,
            maxBaths: 6,
            propertyText: 'Any Type',
            propertyCheck: ['2', '1', 'tw', 'mf', 'valand'],
            saleType: '0',
            minYear: 1900,
            maxYear: new Date().getFullYear(),
            parkingOptions: '',
            waterOptions: '',
            amenities: []
        }
    }

    componentDidMount() {
    }

    setClickRange = () => {
        const {$} = window;
        const $btnOpeners = $('.ib-fhpb-openers');
        const $filterMobile = $('.ib-fmobile');

        if ($btnOpeners.length) {
            $btnOpeners.find('.ib-oiwrapper')
                .on('click', function () {
                    const $parent = $(this)
                        .parent();
                    if ($parent.hasClass('ib-oitem-active')) {
                        $parent.removeClass('ib-oitem-active');
                    } else {
                        $parent.addClass('ib-oitem-active')
                            .siblings()
                            .removeClass('ib-oitem-active');
                        if (!$parent.hasClass('ib-oadbanced')) $filterMobile.removeClass('ib-fmobile-active');
                    }
                });
        }
    };

    // CHANGE PRICE
    childToParentPrice = (value) => {
        const minPrice = value.split('-')[0];
        const maxPrice = value.split('-')[1];
        this.setState({
            ...this.state,
            minPrice,
            maxPrice
        })
        console.log(this.state)
        this.props.changeItem(this.state, 'price')
    }

    // CHANGE BEDS
    childToParentBeds = (value) => {
        const minBeds = value.split('-')[0];
        const maxBeds = value.split('-')[1];
        let bedsText = '';
        if (Number(minBeds) === 0 && Number(maxBeds) >= 5) {
            bedsText = 'Any Bed(s)';
        }
        if (Number(minBeds) === 0 && Number(maxBeds) >= 1 && Number(maxBeds) <= 5) {
            bedsText = `${minBeds} - ${maxBeds} Bed(s)`;
        }
        if (Number(minBeds) >= 1 && Number(maxBeds) >= 5) {
            bedsText = `${minBeds} - Any Bed(s)`;
        }
        if (Number(minBeds) >= 1 && Number(maxBeds) <= 5) {
            bedsText = `${minBeds} - ${maxBeds} Bed(s)`;
        }
        this.setState({
            ...this.state,
            bedsText,
            minBeds,
            maxBeds
        })
        this.props.changeItem(this.state, 'beds')
        // setterMinBed(minVal);
        // setterMaxBed(maxVal);
        // changeItem([minVal, maxVal], 'beds');
    };

    // CHANGE BATHS
    childToParentBaths = (value) => {
        const minBaths = value.split('-')[0];
        const maxBaths = value.split('-')[1];
        let bathsText = '';
        if (Number(minBaths) === 0 && Number(maxBaths) >= 5) {
            bathsText = 'Any Bath(s)';
        }
        if (Number(minBaths) === 0 && Number(maxBaths) >= 1 && Number(maxBaths) <= 5) {
            bathsText = `${minBaths} - ${maxBaths} Bath(s)`;
        }
        if (Number(minBaths) >= 1 && Number(maxBaths) >= 5) {
            bathsText = `${minBaths} - Any Bath(s)`;
        }
        if (Number(minBaths) >= 1 && Number(maxBaths) <= 5) {
            bathsText = `${minBaths} - ${maxBaths} Bath(s)`;
        }
        this.setState({
            ...this.state,
            bathsText,
            minBaths,
            maxBaths
        })
        this.props.changeItem(this.state, 'baths')
        // setterMinBaths(minVal);
        // setterMaxBaths(maxVal);
        // changeItem([minVal, maxVal], 'baths');
    };

    // CHANGE PROPERTY_TYPE
    onChange = (checkedValues) => {

        let propertyCheck = [];
        let text = [];
        let propertyText = '';

        if (checkedValues.length - 1 === 0) {
            debugger
            propertyCheck.push('2');
            propertyCheck.push('1');
            propertyCheck.push('tw');
            text.push('Single Family Homes');
            text.push('Condominiums');
            text.push('Townhouses');
        } else {
            checkedValues.forEach((f) => {
                text.push(optionsCheck.find((m) => m.value === f).label);
            });
        }


        if (checkedValues.length === 5) {
            propertyText = 'Any Type';
        } else {
            propertyText = text.join(',');
        }
        if (checkedValues.length - 1 !== 0) {
            propertyCheck = checkedValues;
        }

        this.setState({
            ...this.state,
            propertyCheck,
            propertyText,
        })
        this.props.changeItem(this.state, 'propertyType')
        // changeItem(checkedValues, 'propertyType');
    }

    // CHANGE AMENTIES
    onChangeAmenities = (checkedValues) => {
        const amenities = checkedValues;
        this.setState({
            ...this.state,
            amenities
        })
        this.props.changeItem(this.state, 'ameneties')
    }

    // CHANGE SALE_TYPE
    changeSaleType = (value) => {
        let saleType = '0';
        if (value === '0') {
            const sale = [saleType, this.state.minPrice, this.state.maxPrice];
            this.setState({
                ...this.state,
                saleType
            })
            // changeItem(sale, 'saleType');
        } else {
            saleType = '1';
            const rent = [saleType, this.state.minPrice, this.state.maxPrice];
            this.setState({
                ...this.state,
                saleType
            })
            this.props.changeItem(this.state, 'saleType')
            // changeItem(rent, 'saleType');
        }
    }

    // CHANGE CONSTRUCTION_YEARS
    childToParentYears = (value) => {
        const minYear = value.split('-')[0];
        const maxYear = value.split('-')[1];

        this.setState({
            ...this.state,
            minYear,
            maxYear
        })
        this.props.changeItem(this.state, 'years')
        // changeItem([minVal, maxVal], 'years');
        // setterMinYear(minVal);
        // setterMaxYear(maxVal);
    };

    // CHANGE PARKING OPTIONS
    changeParkingOptions = (value) => {
        debugger
        const parkingOptions = value;
        this.setState({
            ...this.state,
            parkingOptions
        })
        this.props.changeItem(this.state, 'parkingOptions')
        console.log(this.state);
    }

    // CHANGE Water OPTIONS
    changeWaterOptions = (value) => {
        const waterOptions = value;
        debugger
        this.setState({
            ...this.state,
            waterOptions
        })
        this.props.changeItem(this.state, 'waterOptions')
        console.log(this.state);
    }

    render() {
        return (
            <div className="ib-filter-container fixed-box">
                <div className="ib-fheader">
                    <div className="ib-fhpa">
                        <AutoComplete
                        />
                    </div>

                    <div className="ib-fhpb">
                        <ul className="ib-fhpb-openers">
                            <li onClick={() => this.setClickRange()} className="ib-oitem ib-oprice">
                                <div className="ib-oiwrapper">
                                          <span className="ib-iotxt ib-lbl-price-ntf">
                                            {this.state.priceText}
                                          </span>
                                </div>
                                <div className="ib-fimini">
                                    <div className="ib-fititle">
                                        Price Range
                                    </div>
                                    <div className="ib-ficontent ib-price-range-outer">
                                        <div className="ib-price-range-wrap ib-price-range-wrap-sale">
                                            <div className="ib-wimputs">
                                                <label
                                                    htmlFor="ib-ffrom-sale-mrs"
                                                    className="ms-hidden"
                                                >
                                                    Enter a min price range sale
                                                </label>
                                                <input
                                                    id="ib-ffrom-sale-mrs"
                                                    readOnly
                                                    value={`$` + formatShortPrice(this.state.minPrice)}
                                                    className="ib-iffrom ib-ffrom-sale ib-rprice-sale-lbl-lt"
                                                    type="text"
                                                />
                                                <span
                                                    className="ib-iftxt"
                                                >
                                                          to
                                                        </span>
                                                <label
                                                    htmlFor="ib-ffrom-sale-mxrs"
                                                    className="ms-hidden"
                                                >
                                                    Enter a max price range sale
                                                </label>
                                                <input
                                                    id="ib-ffrom-sale-mxrs"
                                                    readOnly
                                                    value={formatShortPrice(this.state.maxPrice) === '100M' ? 'Any Price' : `$${formatShortPrice(this.state.maxPrice)}`}
                                                    className="ib-ifto ib-ifto-sale ib-rprice-sale-lbl-rt"
                                                    type="text"
                                                />
                                            </div>
                                            <div className="ib-wrange">

                                                <RangeSlider
                                                    identificator="ib-rprice-sale"
                                                    slider_values={PriceForSaleRent()}
                                                    RangeSetMinMax={this.childToParentPrice}
                                                    markers={false}
                                                    steps={500}
                                                    slider_type="price"
                                                    minValue={this.state.minPrice}
                                                    maxValue={this.state.maxPrice}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </li>
                            <li onClick={() => this.setClickRange()} className="ib-oitem ib-obed">
                                <div className="ib-oiwrapper">
                                          <span className="ib-iotxt ib-lbl-price-ntf">
                                            {this.state.bedsText}
                                          </span>
                                </div>
                                <div className="ib-fimini">
                                    <div className="ib-fititle">
                                        Bedrooms
                                    </div>
                                    <div className="ib-ficontent">
                                        <div className="ib-wrange">
                                            <RangeSlider
                                                identificator="ib-rbedrooms"
                                                slider_values={rangeSliderValues}
                                                RangeSetMinMax={this.childToParentBeds}
                                                slider_type="bed"
                                                minValue={this.state.minBeds}
                                                maxValue={this.state.maxBeds}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li onClick={() => this.setClickRange()} className="ib-oitem ib-obath">
                                <div className="ib-oiwrapper">
                                          <span className="ib-iotxt ib-lbl-bath-ntf">
                                            {this.state.bathsText}
                                          </span>
                                </div>
                                <div className="ib-fimini">
                                    <div className="ib-fititle">
                                        Bathrooms
                                    </div>
                                    <div className="ib-ficontent">
                                        <div className="ib-wrange">
                                            <RangeSlider
                                                identificator="ib-bathsrooms"
                                                slider_values={rangeSliderValues}
                                                minValue={this.state.minBaths}
                                                maxValue={this.state.maxBaths}
                                                slider_type="baths"
                                                RangeSetMinMax={this.childToParentBaths}
                                            />
                                        </div>
                                    </div>
                                </div>

                            </li>
                            <li onClick={() => this.setClickRange()} className="ib-oitem ib-otype">
                                <div className="ib-oiwrapper">
                                          <span className="ib-iotxt ib-lbl-types-ntf">
                                            {this.state.propertyText}
                                          </span>
                                </div>
                                <div className="ib-fimini">
                                    <div className="ib-fititle">
                                        Any Type
                                    </div>
                                    <div className="ib-ficontent">
                                        <Checkbox.Group
                                            options={optionsCheck}
                                            value={this.state.propertyCheck}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                </div>
                            </li>
                            <li onClick={() => this.setClickRange()} className="ib-oitem ib-oadbanced">
                                <div className="ib-oiwrapper">
                                    <span className="ib-iotxt">
                                      More Filters
                                    </span>
                                </div>
                                <div className="ib-fdesktop ib-hack-all-filters">
                                    <div className="ib-fdcwrapper">
                                        <div className="ib-fdcol">
                                            <div className="ib-fitem">
                                                <div className="ib-fititle">Property Search</div>
                                                <div className="ib-ficontent ib-ficontent-mod1">
                                                    <div className="ib-fforsr">
                                                        <div
                                                            onClick={() => this.changeSaleType('0')}
                                                            className={`ib-ffsale ${
                                                                this.state.saleType === '0' ? 'ib-fifor-active' : ''} ib-fifor`}
                                                            data-type="rent"
                                                        >
                                                            For Sale
                                                        </div>
                                                        <div
                                                            onClick={() => this.changeSaleType('1')}
                                                            className={`ib-ffrent ${
                                                                this.state.saleType === '1' ? 'ib-fifor-active' : ''} ib-fifor`}
                                                            data-type="sale"
                                                        >
                                                            For Rent
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ib-fitem">
                                                <div className="ib-fititle">
                                                    PRICE RANGE
                                                </div>
                                                <div className="ib-ficontent ib-price-range-outer">
                                                    <div
                                                        className="ib-price-range-wrap ib-price-range-wrap-sale">
                                                        <div className="ib-wimputs">
                                                            <label
                                                                htmlFor="ib-ffrom-sale-mrs"
                                                                className="ms-hidden"
                                                            >
                                                                Enter a min price range sale
                                                            </label>
                                                            <input
                                                                id="ib-ffrom-sale-mrs"
                                                                readOnly
                                                                value={`$` + formatShortPrice(this.state.minPrice)}
                                                                className="ib-iffrom ib-ffrom-sale ib-rprice-sale-lbl-lt"
                                                                type="text"
                                                            />
                                                            <span
                                                                className="ib-iftxt"
                                                            >
                                                                        to
                                                                      </span>
                                                            <label
                                                                htmlFor="ib-ffrom-sale-mxrs"
                                                                className="ms-hidden"
                                                            >
                                                                Enter a max price range sale
                                                            </label>
                                                            <input
                                                                id="ib-ffrom-sale-mxrs"
                                                                readOnly
                                                                value={formatShortPrice(this.state.maxPrice) === '100M' ? 'Any Price' : `$${formatShortPrice(this.state.maxPrice)}`}
                                                                className="ib-ifto ib-ifto-sale ib-rprice-sale-lbl-rt"
                                                                type="text"
                                                            />
                                                        </div>
                                                        <div className="ib-wrange">

                                                            <RangeSlider
                                                                identificator="ib-rprice-sale"
                                                                slider_values={PriceForSaleRent()}
                                                                RangeSetMinMax={this.childToParentPrice}
                                                                markers={false}
                                                                steps={500}
                                                                slider_type="price"
                                                                minValue={this.state.minPrice}
                                                                maxValue={this.state.maxPrice}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="ib-fitem">
                                                <div className="ib-fititle">
                                                    Bedrooms
                                                </div>
                                                <div className="ib-ficontent">
                                                    <div className="ib-wrange">
                                                        <RangeSlider
                                                            identificator="ib-rbedrooms"
                                                            slider_values={rangeSliderValues}
                                                            RangeSetMinMax={this.childToParentBeds}
                                                            slider_type="bed"
                                                            minValue={this.state.minBeds}
                                                            maxValue={this.state.maxBeds}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ib-fdcol">
                                            <div className="ib-fitem">
                                                <div className="ib-fititle">
                                                    Parking Spaces
                                                </div>
                                                <div className="ib-ficontent">
                                                    <div className="ib-wselect ib-icon-darrow">
                                                        <label htmlFor="ib-parking-options"
                                                               className="ms-hidden">
                                                            Parking Spaces
                                                        </label>
                                                        <SelectBoost
                                                            identificator="ib-parking-options"
                                                            anyValue
                                                            defaultValue={this.state.parkingOptions}
                                                            listValues={SelectParkingValues()}
                                                            // setParkingOptions(v)
                                                            EmiterValue={(v) => this.changeParkingOptions(v)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ib-fitem">
                                                <div className="ib-fititle">
                                                    YEAR BUILT
                                                </div>
                                                <div className="ib-ficontent">
                                                    <div className="ib-wimputs">
                                                        <label
                                                            htmlFor="ib-max-yb"
                                                            className="ms-hidden"
                                                        >
                                                            Enter a max year built
                                                        </label>
                                                        <input
                                                            id="ib-max-yb"
                                                            className="ib-iffrom ib-ryear-lbl-lt"
                                                            type="text"
                                                            readOnly
                                                            value={this.state.minYear}
                                                        />
                                                        <span
                                                            className="ib-iftxt"
                                                        >
                                                                    to
                                                                  </span>
                                                        <label
                                                            htmlFor="ib-min-yb"
                                                            className="ms-hidden"
                                                        >
                                                            Enter a min year built
                                                        </label>
                                                        <input
                                                            id="ib-min-yb"
                                                            className="ib-ifto ib-ryear-lbl-rt"
                                                            type="text"
                                                            readOnly
                                                            value={this.state.maxYear}
                                                        />
                                                    </div>
                                                    <div className="ib-wrange">
                                                        <RangeSlider
                                                            identificator="ib-ryear"
                                                            slider_values={AllYearsBuilt()}
                                                            minValue={this.state.minYear}
                                                            maxValue={this.state.maxYear}
                                                            markers={false}
                                                            slider_type="year"
                                                            RangeSetMinMax={this.childToParentYears}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ib-fitem">
                                                <div className="ib-fititle">
                                                    Bathrooms
                                                </div>
                                                <div className="ib-ficontent">
                                                    <div className="ib-wrange">
                                                        <RangeSlider
                                                            identificator="ib-bathsrooms"
                                                            slider_values={rangeSliderValues}
                                                            minValue={this.state.minBaths}
                                                            maxValue={this.state.maxBaths}
                                                            slider_type="baths"
                                                            RangeSetMinMax={this.childToParentBaths}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="ib-fdcol">
                                            <div className="ib-fitem">
                                                <div className="ib-fititle">
                                                    Waterfront Description
                                                </div>
                                                <div className="ib-ficontent">
                                                    <div className="ib-wselect ib-icon-darrow">
                                                        <label htmlFor="ib-wd-lz" className="ms-hidden">
                                                            Waterfront Description
                                                        </label>
                                                        <SelectBoost
                                                            identificator="ib-waterfront-options"
                                                            anyValue
                                                            listValues={SelectWaterDescriptionValues()}
                                                            defaultValue={this.state.waterOptions}
                                                            // setWaterOptions(v)
                                                            EmiterValue={(v) => this.changeWaterOptions(v)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ib-fitem">
                                                <div className="ib-fititle">
                                                    Type
                                                </div>
                                                <div className="ib-ficontent">
                                                    <Checkbox.Group
                                                        options={optionsCheck}
                                                        value={this.state.propertyCheck}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="ib-fitem">
                                                <div
                                                    className="ib-fititle"
                                                >
                                                    Features
                                                </div>
                                                <div className="ib-ficontent" id="content-feature">
                                                    <Checkbox.Group
                                                        options={SelectAmenitiesValues()}
                                                        defaultValue={this.state.amenities}
                                                        onChange={this.onChangeAmenities}
                                                    />
                                                </div>
                                                <div
                                                    className="ib-fdmatching"
                                                >
                                                    valor del buscador
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="ib-fhpa-directbtns">
                            <div className="ib-dbitem ib-dbclear ib-icon-carrow">
                                          <span className="ib-btext">
                                            Clear
                                          </span>
                            </div>
                            <div className="ib-dbitem ib-dbsave ib-icon-save js-alert-update-preferences">
                                          <span className="ib-btext">
                                            Save
                                          </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state.filters
}

const mapDispatchToProps = {getFilterParams}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFilter)
