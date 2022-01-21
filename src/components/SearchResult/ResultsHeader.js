import React from 'react';

export default ({
                    data,
                    setSortType,
                    sortType,
                    updating,
                }) => (
    <div className="results-header">
        {data.items.length > 0 && data.params !== null
            ? (
                <span className="results-quantity">
          Showing
                    {' '}
                    {data.pagination.start}
                    {' '}
                    to
                    {' '}
                    {data.pagination.end}
                    {' '}
                    of
                    {' '}
                    {data.pagination.count}
                    {' '}
                    Properties.
        </span>
            )
            : <span className="results-quantity">Loading Properties...</span>}

        <div className="filters">
            <div className="filter-item filter-sort">
                <label className="sr-only" htmlFor="filter-sort">Sort by</label>
                <select onChange={(e) => setSortType(e.target.value)} defaultValue={sortType}
                        id="filter-sort">
                    <option value="date-desc">Newest Listings</option>
                    <option value="price-desc">Highest Price</option>
                    <option value="price-asc">Lowest Price</option>
                    <option value="sqft-desc">Highest Sq.Ft</option>
                    <option value="sqft-asc">Lowest Sq.Ft</option>
                </select>
            </div>
        </div>
    </div>
);
