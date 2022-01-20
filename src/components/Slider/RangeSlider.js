import React from 'react';
import 'jquery-ui/ui/widgets/slider';

export default function RangeSlider({
                                        minValue,
                                        maxValue,
                                        slider_type,
                                        markers = true,
                                        steps = 1,
                                        identificator,
                                        slider_values,
                                        RangeSetMinMax,
                                    }) {
    // CREATE LIST OF LI
    function ListItem(props) {
        let value = props.value;
        if (props.value === 0 && props.type === 'bed') {
            value = 'Studio';
        }
        if (props.value === 6) {
            value = '5+';
        }
        return <li className="ib-rmitem" key={`ib-rmitem-${value}`}>{value}</li>;
    }

    function NumberList(props) {
        const listItems = props.numbers.map((number) =>
            <ListItem
                key={`item-${props.type}-${number}`}
                value={number}
                type={props.type}
            />);

        return (
            markers ? (<ul className="ib-rmarkers">{listItems}</ul>) : (<></>)
        );
    }

    const {$} = window;

    const IB_RG_SLIDER_SELECTOR = $(`.${identificator}`);

    if (IB_RG_SLIDER_SELECTOR.length) {
        IB_RG_SLIDER_SELECTOR.slider({
            range: true,
            step: steps,
            min: slider_values[0],
            max: slider_values[slider_values.length - 1],
            values: [minValue, maxValue],
            slide(event, ui) {
                RangeSetMinMax(ui.values[0] + '-' + ui.values[1]);
            },
            change(event, ui) {

            },
            stop(event, ui) {

            },
        });
    }

    return (
        <div>
            <div className={`ib-range ${identificator}`}/>

            <NumberList
                numbers={slider_values}
                type={slider_type}
            />

        </div>
    );
}
