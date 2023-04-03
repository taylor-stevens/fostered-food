import React, { Dispatch, SetStateAction } from 'react';
import { render, RenderResult } from '@testing-library/react';
import AllFridgesButtonList from '../functions/AllFridgesButtonList';
import {useDataContext, DataProvider} from '../../contexts/DataContext';
import { MapContainer } from 'react-leaflet';
import { Fridge } from '../../types/Types';
import { DEFAULT_TESTING_FRIDGE_DATA as testFridgeData } from '../../constants/constants';
import { LatLng } from 'leaflet';

/**
 * Tests for the {@link AllFridgesButtonList}
 */
describe('AllFridgesButtonList', () => {
    const expectProperlyRenderedALlFridgesButtonList = async (
        renderData: RenderResult,
        testFridgeData: Fridge[],
        setShowAlert: boolean,
    ) => {
        // regardless of the states, the following should be rendered
        const allFridgesButtonList = await renderData.findByLabelText('allFridgesButtonList');
        const singleFridgeListButtons = renderData.getAllByLabelText('singleFridgeListButton');
        expect(allFridgesButtonList).toBeDefined();
        expect(singleFridgeListButtons).toBeDefined();
        // expect the same number of buttons as there are fridges
        expect(singleFridgeListButtons.length).toBe(testFridgeData.length);

        // depending on the state, the following may or may not be rendered
        const userNotificationPopup = await renderData.queryByLabelText('userNotificationPopup');
        if (setShowAlert) {
            expect(userNotificationPopup).toBeDefined();
        } else {
            expect(userNotificationPopup).toBeNull();
        }
    };
    /**
     * Renders the {@link AllFridgesButtonList} giving the testFridgeData as the data
     * for the {@link DataContext} and the setShowAlert as the given boolean.
     */
    let renderAllFridgesButtonList: (
        setShowAlert: boolean,
    ) => Promise<RenderResult>;

    beforeEach(async () => {

        const [data, setData] = useDataContext();
        setData(testFridgeData);

        renderAllFridgesButtonList = async (setShowAlert: boolean) => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <DataProvider>
                            <AllFridgesButtonList
                                setShowToast={() => {}}
                                zoomMap={(arg0: 0, arg1: 0) => {return 0}}
                                setShowAlert={() => setShowAlert}/>
                        </DataProvider>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('renders the allFridgesButtonList, sortByDistanceButton, sortByLastVisitedButton, and singleFridgeListButton', async () => {
            const renderData = await renderAllFridgesButtonList(true);
            await expectProperlyRenderedALlFridgesButtonList(renderData, testFridgeData, true);
        });
        it('renders the same number of buttons as there are fridges', async () => {
            const renderData = await renderAllFridgesButtonList(true);
            await expectProperlyRenderedALlFridgesButtonList(renderData, testFridgeData, true);
        });
        it('renders the userNotificationPopup if setShowAlert is defined', async () => {
            const renderData = await renderAllFridgesButtonList(true);
            await expectProperlyRenderedALlFridgesButtonList(renderData, testFridgeData, true);
        });
        it('does NOT render the userNotificationPopup if setShowAlert is NOT defined', async () => {
            const renderData = await renderAllFridgesButtonList(false);
            await expectProperlyRenderedALlFridgesButtonList(renderData, testFridgeData, false);
        });
    });
    // TODO: write test to assert sorting occurs when the sortByDistanceButton is clicked
    describe('when the sortByDistanceButton is clicked', () => {
        it('changes the order of the fridge elements when clicked once', () => {
            // TODO: write this test
        });
        it('does not change the order of the fridge elements when clicked twice', () => {
            // TODO: write this test
        });
    });
});