import React, { useRef, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

import '../../assets/css/SearchMap.css';
import { groupProperties } from '../../utils/util';
import Pin from './Pin';

const polygonStyles = {
    satellite: {
        draggable: false,
        editable: false,
        strokeColor: 'white',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'blue',
        fillOpacity: 0.1,
    },
    hybrid: {
        draggable: false,
        editable: false,
        strokeColor: 'white',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'blue',
        fillOpacity: 0.1,
    },
    roadmap: {
        draggable: false,
        editable: false,
        strokeColor: '#31239a',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#31239a',
        fillOpacity: 0.1,
    },
};

const createMapOptions = (maps) => ({
    //   panControl: false,
    //   mapTypeControl: false,
    streetViewControl: true,
    scrollwheel: false,
    mapTypeControl: true,
    zoomControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT,
    },
    // mapTypeId: maps.MapTypeId.SATELLITE,
    mapTypeControlOptions: {
        style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: maps.ControlPosition.TOP_LEFT,
        mapTypeIds: [
            maps.MapTypeId.ROADMAP,
            maps.MapTypeId.SATELLITE,
            maps.MapTypeId.HYBRID,
        ],
    },
    fullscreenControlOptions: {
        position: maps.ControlPosition.BOTTOM_RIGHT,
    },
});



export default function SearchMap({
                                      data,
                                      active,
                                      setActive,
                                      setShape,
                                      shape,
                                      setPage,
                                      initial,
                                      initialPolygon,
                                  }) {
    // console.log(data);
    const [isDrawing, setIsDrawing] = useState(false);
    const [pins, setPins] = useState([]);
    const [drawnShape, setDrawnShape] = useState('');
    const polygonRef = useRef();
    const drawingManagerRef = useRef();
    const drawButtonRef = useRef();
    const mapsRef = useRef();
    const [mapType, setMapType] = useState('roadmap');

    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627,
        },
        zoom: 11,
    };

    useEffect(() => {
        if (polygonRef.current) {
            polygonRef.current.setOptions(polygonStyles[mapType]);
        }
    }, [mapType]);

    useEffect(() => {
        if (data) {
            const grouped_properties = groupProperties(data.map_items);

            const newPins = [];
            for (let i = 0; i < (grouped_properties.length); i++) {
                const {
                    lat,
                    lng,
                } = grouped_properties[i].item;

                const comp = (
                    <Pin
                        key={`map-item-${i}`}
                        active={active}
                        setActive={setActive}
                        lat={lat}
                        lng={lng}
                        group={grouped_properties[i].group}
                        units={1}
                        info={data.map_items[i]}
                    />
                );
                newPins.push(comp);
            }
            setPins(newPins);
        }
        // eslint-disable-next-line
    }, [data, active]);

    const createPolygon = (coordinates, map, maps) => {
        const polygon = new maps.Polygon({
            ...polygonStyles[map.getMapTypeId()],
            paths: coordinates,
        });

        maps.event.addListener(polygon, 'dragstart', (e) => console.log(e.latLng.lat()));
        maps.event.addListener(polygon, 'dragend', (e) => console.log(e.latLng.lat()));
        polygon.setMap(map);
        polygonRef.current = polygon;
    };

    const handleDraw = (map, maps) => {
        mapsRef.current = maps;
        setIsDrawing(true);
        drawButtonRef.current.style.visibility = 'hidden';
        if (polygonRef.current) {
            polygonRef.current.setMap(null);
        }
        const drawingManager = new maps.drawing.DrawingManager({
            drawingMode: maps.drawing.OverlayType.POLYGON,
            drawingControl: false,
            drawingControlOptions: {
                position: maps.ControlPosition.TOP_RIGHT,
                drawingModes: ['polygon'],
            },
            polygonOptions: polygonStyles[map.getMapTypeId()],
        });

        drawingManagerRef.current = drawingManager;

        drawingManager.setMap(map);

        maps.event.addListenerOnce(drawingManager, 'overlaycomplete', (e) => handleOverlayComplete(e, {
            drawingManager,
            map,
            maps,
        }));
    };

    function handleOverlayComplete(event, {
        drawingManager,
        map,
        maps,
    }) {
        if (drawingManager.getDrawingMode()) {
            drawingManager.setDrawingMode(null);
        }

        if (event.type === 'polygon') {
            const shape = event.overlay;
            const path = shape.getPath();

            const paths = path.i.map((path) => ({
                lat: path.lat(),
                lng: path.lng(),
            }));

            shape.setMap(null);
            createPolygon(paths, map, maps);

            const points = path;
            const coords = [];
            const currentPathArray = [];

            points.forEach((point) => {
                coords.push(`${point.lat()} ${point.lng()}`);
                currentPathArray.push({
                    lat: point.lat(),
                    lng: point.lng(),
                });
            });

            const lastPoint = points.getAt(0);

            coords.push(`${lastPoint.lat()} ${lastPoint.lng()}`);

            currentPathArray.push({
                lat: lastPoint.lat(),
                lng: lastPoint.lng(),
            });

            const newPoints = new maps.MVCArray();

            for (let i = 0, l = currentPathArray.length; i < l; i++) {
                newPoints.push(new maps.LatLng(currentPathArray[i].lat, currentPathArray[i].lng));
            }

            let encodedPath = maps.geometry.encoding.encodePath(newPoints);

            // encode base64
            encodedPath = btoa(encodedPath);

            // make URL friendly
            encodedPath = encodedPath.replace(/\+/g, '-')
                .replace(/\//g, '_')
                .replace(/=+$/, '');

            setDrawnShape(encodedPath);
        }
    }

    const handleRemove = () => {
        polygonRef.current.setMap(null);
        setIsDrawing(false);
        setShape('');
        if (drawingManagerRef.current.getDrawingMode()) {
            drawingManagerRef.current.setDrawingMode(null);
        }
        drawButtonRef.current.style.visibility = 'visible';
    };

    const handleCancel = () => {
        const cancel = () => {
            if (polygonRef.current) {
                polygonRef.current.setMap(null);
            }
            if (drawingManagerRef.current.getDrawingMode()) {
                drawingManagerRef.current.setDrawingMode(null);
            }
            setIsDrawing(false);
        };
        cancel();
        setTimeout(() => {
            cancel();
        }, 0);
        drawButtonRef.current.style.visibility = 'visible';
    };

    const handleApply = () => {
        setPage(1);
        setPins([]);
        setIsDrawing(false);
        setShape(drawnShape);
        drawButtonRef.current.style.visibility = 'visible';
    };

    // Iterate myPlaces to size, center, and zoom map to contain all markers
    const fitBounds = (map, maps) => {
        const bounds = new window.google.maps.LatLngBounds();
        if (data.map_items.length > 0) {
            data.map_items.map((place) => {
            bounds.extend(new window.google.maps.LatLng(
              place.lat,
              place.lng,
            ));
            return place;
          });
          map.fitBounds(bounds);
        }
    };

    // Re-center map when resizing the window
    const bindResizeListener = (map, maps, bounds) => {
        maps.event.addDomListenerOnce(map, 'idle', () => {
            maps.event.addDomListener(window, 'resize', () => {
                map.fitBounds(bounds);
            });
        });
    };

    const onGoogleApiLoaded = ({
                                   map,
                                   maps,
                               }) => {
        maps.event.addListener(map, 'maptypeid_changed', () => setMapType(map.getMapTypeId()));

        const bounds = fitBounds(map, maps);

        map.fitBounds(bounds);

        bindResizeListener(map, maps, bounds);

        // let encodedPath = initialPolygon;
        //
        // if (encodedPath.length % 4 != 0) {
        //   encodedPath += ('===').slice(0, 4 - (encodedPath.length % 4));
        // }
        //
        // encodedPath = encodedPath.replace(/-/g, '+')
        //   .replace(/_/g, '/');
        //
        // // decode path
        //
        // createPolygon(maps.geometry.encoding.decodePath(atob(encodedPath)), map, maps);
        // console.log(initialPolygon);

        // setup draw button
        const mapDrawButton = document.createElement('div');
        mapDrawButton.id = 'flex-map-draw';
        document.getElementsByClassName('gm-style')[0].appendChild(mapDrawButton);
        drawButtonRef.current = mapDrawButton;
        maps.event.addDomListener(mapDrawButton, 'click', (e) => handleDraw(map, maps));
    };

    return (
        <div
            className={`mo-interactive-map-wrapper map-type-${mapType}`}
            style={{
                height: '100vh',
                width: '50%',
                flexGrow: '1',
                position: 'relative',
            }}
        >

            {isDrawing ? (
                <div
                    id="wrap-map-draw-actions"
                    style={{
                        display: 'flex',
                        position: 'absolute',
                    }}
                >
                    <div>
                        Draw a shape around the region(s) you would like to live in
                    </div>
                    <div className="flex-content-btn-draw">
                        <button onClick={handleCancel} type="button" className="map-draw-cancel-tg">
                            Cancel
                        </button>
                        <button onClick={handleApply} type="button" className="map-draw-apply-tg">
                            Apply
                        </button>
                    </div>
                </div>
            ) : null}
            {shape !== '' ? (
                <div className="content-rsp-btn">
                    <div className="idx-btn-content">
                        <div className="idx-bg-group">
                            <button
                                onClick={handleRemove}
                                className="idx-btn-act ib-removeb-tg"
                                aria-label="remove"
                            >
                                Remove Boundaries
                            </button>
                            <span>Remove Boundaries</span>
                        </div>
                    </div>
                </div>
            ) : null}
            <div style={{
                width: '100%',
                height: '100%',
            }}
            >
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: 'AIzaSyBdlczEuxYRH-xlD_EZH4jv0naeVT1JaA4',
                        language: 'en',
                        region: 'us',
                        libraries: ['drawing', 'geometry'].join(','),
                    }}
                    defaultZoom={defaultProps.zoom}
                    defaultCenter={defaultProps.center}
                    yesIWantToUseGoogleMapApiInternals
                    options={createMapOptions}
                    // onGoogleApiLoaded={onGoogleApiLoaded}
                >
                    {pins}
                </GoogleMapReact>
            </div>
        </div>
    );
}
