import React, {useRef, useEffect, useState} from 'react';
import 'jquery-ui/ui/widgets/autocomplete';
import '../../assets/css/autocomplete.css';

export default function AutoComplete({
                                         data,
                                         autocompleteData,
                                         setTerm
                                     }) {

    const [textAutocomplete, setTextAutocomplete] = useState('');

    function handleAnswerChange() {
        if (event.key === 'y') {
            alert('The sky is your starting point!');
        } else if (event.key === 'n') {
            alert('The sky is your limit👀');
        }
        setTerm(document.getElementById('ib-fmsearch-a').value);
    }

    function onChange(checkedValues) {
        console.log(checkedValues);
    }

    setTimeout(() => {
        const {$} = window;
        const ib_autocomplete = $('.ib-fmsearch:eq(0)');
        if (ib_autocomplete.length) {
            ib_autocomplete.autocomplete({
                open: function (event, ui) {
                    $('.ui-autocomplete')
                        .off('menufocus hover mouseover mouseenter');
                },
                create: function (event, ui) {
                    $(this)
                        .attr('autocomplete', 'disabled');
                },
                minLength: 0,
                source: autocompleteData,
                appendTo: '#ib-autocomplete-add',
            });

            ib_autocomplete.autocomplete('instance')._renderItem = function (ul, item) {
                if ('complex' === item.type) {
                    return $('<li>')
                        .append('<div>' + item.label + '<span class="autocomplete-item-type">Complex / Subdivision</span></div>')
                        .appendTo(ul);
                } else {
                    return $('<li>')
                        .append('<div>' + item.label + '<span class="autocomplete-item-type">' + item.type + '</span></div>')
                        .appendTo(ul)
                        ;
                }
            };
        }
    }, 200);

    return (
        <div className="ib-fhpa-minisearch">
            <label htmlFor={`ib-fmsearch-a`} className="ms-hidden">
                Enter Address, City, Zip Code,Subdivision
            </label>
            <input
                id="ib-fmsearch-a"
                defaultValue={textAutocomplete}
                className="ib-fmsearch ib-fmsearchsuggestions ib-fcitiesnon-hide ui-autocomplete-input"
                placeholder="Enter Address, City, Zip Code, Subdivision"
                onKeyPress={() => handleAnswerChange()}
            />

            <div className="ib-fmsubmit ib-icon-search ib-kw-tg-search">
        <span className="ib-btext">
          Search
        </span>
            </div>
        </div>
    );
}
