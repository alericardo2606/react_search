
import SearchContainer from "./components/SearchContainer";

export default () => {

    const urlParams = new URLSearchParams(window.location.search);
    const filterId = urlParams.get('filter_id');
    const fifty = urlParams.get('fifty');

    return <SearchContainer fifty={fifty} filterId={filterId}/>
}

