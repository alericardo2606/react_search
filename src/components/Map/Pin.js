import React from 'react';
import MarkerInfoBox from './MarkerInfoBox';
import MarkerInfoBoxMulti from './MarkerInfoBoxMulti';

const pinStyle = {
    containerActive: {
        zIndex: 10,
    },
    containerInActive: {
        position: 'relative',
        zIndex: 'unset',
    },
    infoBoxActive: {
        visibility: 'visible',
        opacity: 1,
        pointerEvents: 'all',
    },
    infoBoxInActive: {
        visibility: 'hidden',
        opacity: 0,
        pointerEvents: 'none',
    },
};

const Pin = ({ setActive, active, group }) => {
    const currentActive = group.findIndex((item) => item.mls_num === active) !== -1;

    return (
        <div style={currentActive ? pinStyle.containerActive : pinStyle.containerInActive} className="mo-marker-container">
            {group.length > 1 ? (
                    <div onClick={(e) => setActive(group[0].mls_num)} className={`dgt-richmarker-group ${currentActive ? 'ib-search-marker-active' : ''}`}>
                        <strong>{group.length}</strong>
                        <span>Units</span>
                    </div>
                )
                : (
                    <div onClick={(e) => setActive(group[0].mls_num)} className={`dgt-richmarker-single ${currentActive ? 'ib-search-marker-active' : ''}`}>
                        <strong>{group[0].abbreviatedPrice}</strong>
                    </div>
                )}

            {group.length > 1 ? <MarkerInfoBoxMulti key={`info-box-multi-${group[0].mls_num}`} pinStyle={pinStyle} setActive={setActive} active={active} group={group} />
                : <MarkerInfoBox key={`info-box-${group[0].mls_num}`} pinStyle={pinStyle} setActive={setActive} active={active} info={group[0]} />}

        </div>

    );
};

export default Pin;
