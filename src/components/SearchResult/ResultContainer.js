import React, {Fragment} from 'react';
import Pagination from './Pagination';
import ResultsHeader from './ResultsHeader';
import Results from './Results';
import {getFilterParams} from "../../config/app/filter.reducers";
import {connect} from "react-redux";
import SearchFilter from "../SearchFilter/SearchFilter";

const ResultContainer = (props) => {
    const {
        data, setActive, sortType, setSortType, setPage, page, updating, setShape
    } = props
    return (
        <div id="results-scroll" className="results">
            {data
            && (
                <Fragment>
                    <ResultsHeader updating={updating} data={data} sortType={sortType} setSortType={setSortType}/>
                    <div className="results-body">
                        {/* <Pagination data={data} currentPage={page} setPage={setPage}  /> */}
                        <Results setShape={setShape} updating={updating} data={data} setActive={setActive}/>
                        <Pagination data={data} currentPage={page} setPage={setPage}/>
                    </div>
                </Fragment>
            )
            }
        </div>
    );
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer)

