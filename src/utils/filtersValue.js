export const filterRangeValues = () => {
    const FILTER_RANGE_VALUES = [0, 1, 2, 3, 4, 5, 6];
    return FILTER_RANGE_VALUES;
};

export const SelectParkingValues = () => {
    const PARKING_SPACES = [1, 2, 3, 4, 5, 6];
    return PARKING_SPACES;
};

export const AllYearsBuilt = () => {
    return Array.from({ length: (Number(new Date().getFullYear()) - Number(1900)) }, (_, i) => 1900 + i);
};

export const PriceForSaleRent = () => {
    const options = [];
    for (let i = 0; ;) {
        if (i > 10000000) {
            break;
        }
        options.push(i);
        if (i < 900000) {
            i += 50000;
        } else {
            if (i < 1000000) {
                i += 100000;
            } else {
                if (i < 2000000) {
                    i += 250000;
                } else {
                    if (i < 5000000) {
                        i += 500000;
                    } else {
                        if (i < 30000000) {
                            i += 2500000;
                        } else {
                            if (i < 50000000) {
                                i += 5000000;
                            } else {
                                if (i <= 100000000) {
                                    i += 10000000;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return options;
};

export const SizeLivingLand = () => {
    const options = [];
    for (let i = 0; ;) {
        if (i > 80000) {
            break;
        }
        options.push(i);
        if (i < 2000) {
            i += 100;
        } else {
            if (i < 8000) {
                i += 500;
            } else {
                if (i < 15000) {
                    i += 1000;
                } else {
                    if (i < 800000) {
                        i += 100000;
                    }
                }
            }
        }
        return options;
    }
};

export const SelectWaterDescriptionValues = () => {
    const WATER_DESCRIPTION = [
        'BAY',
        'Canal',
        'Fixed Bridge',
        'Intracoastal',
        'Lake Front',
        'Ocean Access',
        'Point Lot',
        'River Front',
    ];
    return WATER_DESCRIPTION;
};

export const SelectAmenitiesValues = () => {
    const AMENNITIES = ['Swimming Pool',
        'Golf Course',
        'Tennis Courts',
        'Gated Community',
        'Lofts',
        'Penthouse',
        'Waterfront',
        'Pets',
        'Furnished',
        'Equestrian',
        'Short Sale',
        'Foreclosure',
        'Boat Dock',
        'Housing Older Persons',
        'Occupied',
        'Vacant'
    ];
    return AMENNITIES;
};
;
