import { render, RenderResult } from '@testing-library/react';
import { Fridge } from '../../types/Types';
import { DEFAULT_TESTING_FRIDGE_DATA as testFridgeData } from '../../constants/constants';
import React from 'react';
import { MapContainer } from 'react-leaflet';
import DataContext from '../../contexts/DataContext';
import Map from '../functions/Map';
/**
 * Tests for the {@link Map} function component
 */
describe('Map', () => {
    const expectProperlyRenderedMap = async (
        renderData: RenderResult,
        testFridgeData: Fridge[] | undefined,
    ) => {
        // regardless of the states the following should be rendered
        const mapContainer = await renderData.findByLabelText('mapContainer');
        const tileLayer = await renderData.findByLabelText('tileLayer');
        const userLocationButton = await renderData.findByLabelText('userLocationButton');
        expect(mapContainer).toBeDefined();
        expect(tileLayer).toBeDefined();
        expect(userLocationButton).toBeDefined();

        // depending on the state, the following may or may not be rendered
        const singleFridgeLocationMarker = await renderData.queryAllByLabelText('singleFridgeLocationMarker');
        const infoPopupContainer = await renderData.queryByLabelText('infoPopupContainer');
        const userNotificationPopup = await renderData.queryByLabelText('userNotificationPopup');
        if (testFridgeData) {
            expect(singleFridgeLocationMarker).toBeDefined();
            // expect the same number of location markers as there are fridges
            expect(singleFridgeLocationMarker.length).toEqual(testFridgeData.length);
            expect(infoPopupContainer).toBeDefined();
            expect(userNotificationPopup).toBeNull();
        } else {
            expect(userNotificationPopup).toBeDefined();
            const userNotificationPopupText = await renderData.queryByLabelText('userNotificationPopupText');
            expect(userNotificationPopupText).toBeDefined();
        }

    };
    /**
     * Renders the {@link Map} giving the testFridgeData as the data
     * for the {@link DataContext}, setting the default user location to undefined,
     * and the set show alert to false.
     */
    let renderMap: () => Promise<RenderResult>;

    beforeEach(async () => {
        renderMap = async () => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <DataContext.Provider value={ testFridgeData }>
                                <Map/>
                        </DataContext.Provider>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('renders the mapContainer, tileLayer, userLocationButton', async () => {
            const renderData = await renderMap();
            await expectProperlyRenderedMap(renderData, testFridgeData);
        });
        it('the userNotificationPopup is rendered, letting the user know the data is unavailable when the data is NOT available from the context', async () => {
            const renderData = await renderMap();
            await expectProperlyRenderedMap(renderData, undefined);
        });
        describe('When the data is available from the context', () => {
            it('the singleFridgeLocationMarkers are rendered', async () => {
                const renderData = await renderMap();
                await expectProperlyRenderedMap(renderData, testFridgeData);
            });
            it('the infoPopupContainer is rendered', async () => {
                const renderData = await renderMap();
                await expectProperlyRenderedMap(renderData, testFridgeData);
            });
        });
    });
});