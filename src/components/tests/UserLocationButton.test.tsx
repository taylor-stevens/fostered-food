import { fireEvent, render, RenderResult } from '@testing-library/react';
import { Fridge } from '../../types/Types';
import React from 'react';
import { MapContainer } from 'react-leaflet';
import DataContext from '../../contexts/DataContext';
import { DEFAULT_MAP_CENTER_LEAFLET, DEFAULT_TESTING_FRIDGE_DATA as testFridgeData } from '../../constants/constants';
import AllFridgesButtonList from '../functions/AllFridgesButtonList';
import UserLocationButton from '../functions/UserLocationButton';
import { LatLng } from 'leaflet';

/**
 * Tests for the UserLocationButton.
 */
describe('UserLocationButton', () => {
    const expectProperlyRenderedUserLocationButton = async (
        renderData: RenderResult,
        located: boolean,
        setShowAlert: boolean,
    ) => {
        // regardless of the states, the following should be rendered
        const userLocationButton = await renderData.findByLabelText('userLocationButton');
        const locationButtonSymbol = await renderData.findByLabelText('locationButtonSymbol');
        expect(userLocationButton).toBeDefined();
        expect(locationButtonSymbol).toBeDefined();

        // depending on the state, the following may or may not be rendered
        let userNotificationPopup = await renderData.queryByLabelText('userNotificationPopup');
        expect(userNotificationPopup).toBeNull();

        // click the locate user button
        fireEvent.click(userLocationButton);
        const locationLoadingSymbol = await renderData.queryByLabelText('locationLoadingSymbol');
        userNotificationPopup = await renderData.queryByLabelText('userNotificationPopup');
        const userLocationMarker = await renderData.queryByLabelText('userLocationMarker');
        expect(locationLoadingSymbol).toBeDefined();

        if (located && !setShowAlert) {
            expect(userNotificationPopup).toBeNull();
            expect(userLocationMarker).toBeDefined();

        } else {
            expect(userNotificationPopup).toBeDefined();
            expect(userLocationMarker).toBeNull();
        }
    };
    /**
     * Renders the {@link UserLocationButton} setting located and setShowAlert as the given booleans.
     */
    let renderUserLocationButton: (
        located: LatLng | undefined,
        setShowAlert: boolean,
    ) => Promise<RenderResult>;

    beforeEach(async () => {
        renderUserLocationButton = async (located: LatLng | undefined, setShowAlert: boolean) => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <UserLocationButton
                            located={located}
                            locating={false}
                            updateLocating={() => {}}
                            setShowAlert={() => setShowAlert}
                            text={'test text'}/>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('always renders the userLocationButton, locationButtonSymbol, and NOT the locationLoadingSymbol or userLocationMarker', async () => {
            const renderData = await renderUserLocationButton(undefined, true);
            await expectProperlyRenderedUserLocationButton(renderData, false, true);
        });
        it('renders the locationLoadingSymbol instead of the locationButtonSymbol and userLocationMarker when user is found and notice is false', async () => {
            const renderData = await renderUserLocationButton(DEFAULT_MAP_CENTER_LEAFLET, false);
            await expectProperlyRenderedUserLocationButton(renderData, true, false);
        });
        it('does NOT render the userLocationMarker or the locationLoadingSymbol when the setShowAlert is true and located is false', async () => {
            const renderData = await renderUserLocationButton(undefined, false);
            await expectProperlyRenderedUserLocationButton(renderData, false, false);
        });
    });
});