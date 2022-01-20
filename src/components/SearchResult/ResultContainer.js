import React from 'react';
import Pagination from './Pagination';
import ResultsHeader from './ResultsHeader';
import Results from './Results';

export default ({
                    data, setActive, sortType, setSortType, setPage, page, updating, setShape,
                }) => (
    <div id="results-scroll" className="results">
        <ResultsHeader updating={updating} data={data} sortType={sortType} setSortType={setSortType} />
        <div className="results-body">
            {/* <Pagination data={data} currentPage={page} setPage={setPage}  /> */}
            <Results setShape={setShape} updating={updating} data={data} setActive={setActive} />
            <Pagination data={data} currentPage={page} setPage={setPage} />
        </div>
    </div>
);
