import React from 'react';


export default function SelectBoost({
                                        identificator,
                                        anyValue,
                                        selected,
                                        defaultValue,
                                        EmiterValue,
                                        listValues
                                    }) {
    function ListOptions(props) {
        let value = props.value;
        let key = props.value.toString()
            .replace(' ', '_')
            .toLowerCase();
        return <option key={`${key}`} value={`${key || ''}`}>{value}</option>;
    }

    function SelectOption() {
        const listOptions = listValues
            .map((number) =>
                <ListOptions key={`item-${number}`} value={number || ''}/>,
            );

        return listOptions;
    }

    function changeValue(event) {
        EmiterValue(event.target.value);
    }

    return (
        <select
            value={defaultValue}
            id={`${identificator}`}
            multiple={false}
            className={`ib-fselect ${identificator}`}
            onChange={(e) => changeValue(e)}>
            <option value="--">Any</option>
            <SelectOption/>
        </select>
    );
}
