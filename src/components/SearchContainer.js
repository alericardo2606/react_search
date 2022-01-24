import SearchFilter from "./SearchFilter/SearchFilter";
import SearchMap from "./Map/SearchMap";
import { useCallback, useEffect, useState } from "react";
import { getFilterParams as getFilterParamsAction} from "../config/app/filter.reducers";
import { connect } from "react-redux";
import '../App.css';
import ResultContainer from "./SearchResult/ResultContainer";
import {getSearchData as getSearchDataAction} from "../config/app/search.reducers";

const SearchContainer = (props) => {
    const {
        initial,
        filters,
        filterId,
        fifty,
        getFilterParams,
        getSearchData
    } = props;

    // STATES MAPS
    const [updating, setUpdating] = useState(filters.waiting);
    const [active, setActive] = useState(undefined);
    const [page, setPage] = useState(1);
    const [shape, setShape] = useState('');
    const [sortType, setSortType] = useState(filters.sort_type);
    const [initialData, setInitial] = useState(initial);

    useEffect(() => {
        setUpdating(false);
        window.document.getElementById('results-scroll')
            .scrollTo({
                top: 0,
                behavior: 'smooth',
            });
    }, []);

    useEffect(() => {
        getFilterParams(filterId)
    }, []);

    const handleChangeItem = useCallback((newValue, type) => {
        console.log(newValue);
        console.log(type);
        getSearchData(newValue);
    });

    return (
        <main id="flex-filters-theme">
            {fifty > 0
            && (
                <SearchFilter filter_id={filterId} search_fifty={fifty} changeItem={handleChangeItem} filters={filters}/>
            )
            }
            <div className="App">
                <SearchMap
                    updating={updating}
                    setUpdating={setUpdating}
                    setShape={setShape}
                    shape={shape}
                    setPage={setPage}
                    setActive={setActive}
                    active={active}
                    // data={data}
                />
                <ResultContainer
                    updating={updating}
                    setUpdating={setUpdating}
                    sortType={sortType}
                    setSortType={setSortType}
                    setActive={setActive}
                    setShape={setShape}
                    data={initialData}
                    page={page}
                    setPage={setPage}
                />
            </div>
        </main>
    );
}

const mapStateToProps = (state) => ({
    initial: state.data,
    filters: state.filters,
});

const mapDispatchToProps = {
    getFilterParams: getFilterParamsAction,
    getSearchData: getSearchDataAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
