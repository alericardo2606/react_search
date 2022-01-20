import SearchFilter from "./SearchFilter/SearchFilter";
import SearchMap from "./Map/SearchMap";
import ResultContainer from "./SearchResult/ResultContainer";
import {useCallback, useEffect, useState} from "react";
import {getFilterParams as getFilterParamsAction, getSearchData} from "../config/app/app.reducers";
import {connect} from "react-redux";
import '../App.css';

const SearchContainer = (props) => {

    const {
        templateData,
        filterId,
        fifty,
        getFilterParams
    } = props;

    console.log(props)
    // STATES MAPS
    const [updating, setUpdating] = useState(false);
    const [active, setActive] = useState(undefined);
    const [page, setPage] = useState(1);
    const [shape, setShape] = useState('');
    const [sortType, setSortType] = useState(templateData.sort_type);
    const [initial, setInitial] = useState(templateData.search_data);


    console.log(initial)

    useEffect(() => {
        setUpdating(false);
        window.document.getElementById('results-scroll')
            .scrollTo({
                top: 0,
                behavior: 'smooth',
            });
    }, [initial]);

    useEffect(() => {
        getFilterParams(filterId)
    }, [getFilterParams]);

    const handleChangeItem = useCallback((newValue, type) => {
        console.log(newValue);
        console.log(type);
    });

    return (
        <main id="flex-filters-theme">
            {fifty > 0
            && (
                <SearchFilter filter_id={filterId} search_fifty={fifty} changeItem={handleChangeItem}/>
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
                    data={initial}
                    page={page}
                    setPage={setPage}
                />
            </div>
        </main>
    );
}

const mapStateToProps = (state) => {
    console.log(state.boostData)
    return {
        templateData: state.boostData.search_data
    }
};

const mapDispatchToProps = {
    getFilterParams: getFilterParamsAction
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
