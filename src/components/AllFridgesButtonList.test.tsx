import React from 'react';
import {render, RenderResult} from '@testing-library/react';
import AllFridgesButtonList from "./AllFridgesButtonList";
import DataContext from '../contexts/DataContext';
import { MapContainer } from 'react-leaflet';
import {Fridge} from "../types/Types";
import { LatLng } from 'leaflet';
// export {} // gets rid of compilation error

/**
 * Tests for the ALlFridgesButtonList
 */
describe('AllFridgesButtonList', () => {
    const expectProperlyRenderedALlFridgesButtonList = async (
        renderData: RenderResult,
        testFridgeData: Fridge[],
        located: LatLng | undefined,
        setShowAlert: boolean,
    ) => {
        // regardless of located or setShowAlert, the following should be rendered
        const allFridgesButtonList = await renderData.findByLabelText('allFridgesButtonList');
        const sortByDistanceButton = await renderData.findByLabelText('sortByDistanceButton');
        const sortByLastVisitedButton = await renderData.findByLabelText('sortByLastVisitedButton');
        const singleFridgeListButtons = renderData.getAllByLabelText('singleFridgeListButton');
        expect(allFridgesButtonList).toBeDefined();
        expect(sortByDistanceButton).toBeDefined();
        expect(sortByLastVisitedButton).toBeDefined();
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

        // TODO: click the sortByDistanceButton for the below tests
        // fireEvent.click(sortByDistanceButton);

        if (located) {
            // TODO: write test to assert sorting
        } else {
            // TODO: write test to assert NOT sorting
        }
    };
    const testFridgeData = [
        {"name":"fridge0","address":"address0","location":[0,0],"contact":[],"lastOpen":"openDate0","posts":[],"temperature":0,"distance":-1},
        {"name":"fridge1","address":"address1","location":[1,1],"contact":[],"lastOpen":"openDate1","posts":[],"temperature":1,"distance":-1},
        {"name":"fridge2","address":"address2","location":[2,2],"contact":[],"lastOpen":"openDate2","posts":[],"temperature":2,"distance":-1},
    ];
    /**
     * Renders the AllFridgesButtonList giving the testData as the data
     * for the DataContext, setting the default user location to undefined,
     * and the set show alert to false.
     */
    let renderAllFridgesButtonList: (
        setShowAlert: boolean,
    ) => Promise<RenderResult>;

    beforeEach(async () => {
        renderAllFridgesButtonList = async (setShowAlert: boolean) => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <DataContext.Provider value={ testFridgeData }>
                            <AllFridgesButtonList located={undefined} setShowAlert={setShowAlert}/>
                        </DataContext.Provider>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('renders the allFridgesButtonList, sortByDistanceButton, sortByLastVisitedButton, and singleFridgeListButton', async () => {
            const renderData = await renderAllFridgesButtonList(true);
            await expectProperlyRenderedALlFridgesButtonList(renderData, testFridgeData, undefined, true);
        });
        it('renders the same number of buttons as there are fridges', async () => {
            const renderData = await renderAllFridgesButtonList(true);
            await expectProperlyRenderedALlFridgesButtonList(renderData, testFridgeData, undefined, true);
        });
        it('renders the userNotificationPopup if setShowAlert is defined', async () => {
            const renderData = await renderAllFridgesButtonList(true);
            await expectProperlyRenderedALlFridgesButtonList(renderData, testFridgeData, undefined, true);
        });
        it('does NOT render the userNotificationPopup if setShowAlert is NOT defined', async () => {
            const renderData = await renderAllFridgesButtonList(false);
            await expectProperlyRenderedALlFridgesButtonList(renderData, testFridgeData, undefined, false);
        });
    });
    // TODO: write test to assert sorting occurs when the sortByDistanceButton is clicked
    // describe('when the sortByDistanceButton is clicked', () => {
    //     it('changes the order of the fridge elements when clicked once', () => {
    //         // TODO: write this test
    //     });
    //     it('does not change the order of the fridge elements when clicked twice', () => {
    //         // TODO: write this test
    //     });
    // });
});