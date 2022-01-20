import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {Provider} from 'react-redux'
import initStore from "./config/store";
import {HTML5Backend} from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'

const store = initStore()

ReactDOM.render(
    <>
        <Provider store={store}>
            {/*<DndProvider backend={HTML5Backend}>*/}
                <React.StrictMode>
                    <App/>
                </React.StrictMode>
            {/*</DndProvider>*/}
        </Provider>
    </>,
    document.getElementById('mo-idx-search-filter-preview')
)


