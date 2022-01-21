export const numberWithCommas = (x) => x.toString()
  .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const groupProperties = (map_items) => {
  let row;
  let inner;
  let geocode;
  const hashed_properties = [];
  const filtered_properties = [];
  const unique_properties = [];

  // reduce markers [first step]
  for (var i = 0, l = map_items.length; i < l; i++) {
    // if (i >= 39) { break; }
    row = map_items[i];
    geocode = `${row.lat}:${row.lng}`;
    if (hashed_properties.indexOf(geocode) === -1) {
      hashed_properties.push(geocode);
      filtered_properties.push(row);
    }
  }
  // reduce markers [second step]
  for (i = 0, l = filtered_properties.length; i < l; i++) {
    row = filtered_properties[i];
    geocode = [row.lat, row.lng];

    // reset array
    const related_properties = [];
    for (let k = 0, m = map_items.length; k < m; k++) {
      inner = map_items[k];
      if ((inner.lat === geocode[0]) && (inner.lng === geocode[1])) {
        related_properties.push(inner);
      }
    }
    unique_properties.push({
      item: row,
      group: related_properties,
    });
  }

  return unique_properties;
};

export const convertCooToUrl = (maps, path) => {
  let encodedPath = maps.geometry.encoding.encodePath(path);
  encodedPath = btoa(encodedPath);
  encodedPath = encodedPath.replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return encodedPath;
};

export const abbreviateNumber = (number) => {
  const SI_SYMBOL = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

  // what tier? (determines SI symbol)
  const tier = Math.log10(number) / 3 | 0;

  // if zero, we don't need a suffix
  if (tier === 0) return number;

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  // scale the number
  const scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(1) + suffix;
};

export const formatShortPrice = (value) => {
  const price = Number(value);
  let short_price;

  if (price < 1000) {
    return price;
  }

  if (price < 10000) {
    short_price = Math.ceil(price / 100) / 10;

    return `${short_price}K`;
  }
  if (price < 1000000) {
    short_price = Math.ceil(price / 1000);

    if (short_price < 100) {
      return `${String(short_price)
        .substr(0, 2)}K`;
    }

    if (short_price >= 1000) {
      return '1M';
    }

    return `${short_price}K`;
  }
  if (price < 10000000) {
    short_price = Math.ceil(price / 10000) / 100;
  } else {
    short_price = Math.ceil(price / 100000) / 10;
  }

  if (String(short_price, '.') !== -1) {
    short_price = String(short_price)
      .substr(0, 4);
  }

  return `${short_price}M`;
};

export const setClickRange = () => {
  const { $ } = window;
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

// CREATE LIST OF LI

function ListItem(props) {
  let { value } = props;
  if (props.type === 'bed' && props.value === 0) {
    value = 'Studio';
  }
  return <li key={`item-${number}`} className="ib-rmitem">{value}</li>;
}

export const NumberList = (props, type) => {
  const listItems = props.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()} value={number} type={type} />);
  return (
    <ul className="ib-rmarkers">
      {listItems}
    </ul>
  );
};

export const createUrlParams = (filters) => {
  let urlParams = '';

  Object.keys(filters).forEach((item) => {
    if (item !== 'search_data' && item !== 'gmap_coords_zoom' && item !== 'created_at' && item !== 'modified_in' && item !== 'polygon_search' && item !== 'name' && item !== 'token_id' && item !== 'default_view' && item !== 'count' && item !== 'sort_type' && item !== 'page' && item !== 'id_hackbox' && item !== 'amenities') {
      if (filters[item] !== null) {
        urlParams += `%26${item}%3D${filters[item]}`;
      } else {
        urlParams += `%26${item}%3D${filters[item] !== null ? filters[item] : ''}`;
      }
    }
  });

  return urlParams
}
