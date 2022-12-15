import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { MapContainer } from 'react-leaflet';
import { Fridge } from '../../types/Types';
import { DEFAULT_TESTING_FRIDGE_DATA as testFridgeData } from '../../constants/constants';
import { LatLng } from 'leaflet';
import SelectedFridgeContext from '../../contexts/SelectedFridgeContext';
import InfoPopupContainer from '../functions/InfoPopupContainer';
import DataContext from '../../contexts/DataContext';

/**
 * Tests for the {@link InfoPopupContainer}.
 */
describe('InfoPopupContainer', () => {
    const expectProperlyRenderedInfoPopupContainer = async (
        renderData: RenderResult,
        selectedFridgeData: Fridge | undefined,
        located: LatLng | undefined,
        setShowAlert: boolean,
    ) => {
        // regardless of the states, the following should be rendered
        const infoPopupContainer = await renderData.findByLabelText('infoPopupContainer');
        const informationPopupImg = await renderData.findByLabelText('informationPopupImg');
        expect(infoPopupContainer).toBeDefined();
        expect(informationPopupImg).toBeDefined();

        // depending on the state, the following may or may not be rendered
        const singleFridgeOverallDisplay = await renderData.queryByLabelText('singleFridgeOverallDisplay');
        const allFridgesButtonList = await renderData.queryByLabelText('allFridgesButtonList');
        const userNotificationPopup = await renderData.queryByLabelText('userNotificationPopup');

        if (setShowAlert) {
            expect(userNotificationPopup).toBeDefined();
        } else {
            expect(userNotificationPopup).toBeNull();
        }

        if (selectedFridgeData) {
            expect(singleFridgeOverallDisplay).toBeDefined();
            expect(allFridgesButtonList).toBeNull();
        } else {
            expect(allFridgesButtonList).toBeDefined();
            expect(singleFridgeOverallDisplay).toBeNull();
        }
    };
    /**
     * Renders the {@link InfoPopupContainer} giving the testFridgeData as the data
     * for the {@link DataContext}, the selectedFridgeData for the {@link SelectedFridgeContext},
     * and the setShowAlert as the given boolean.
     */
    let renderInfoPopupContainer: (
        selectedFridgeData: Fridge | undefined,
        setShowAlert: boolean,
    ) => Promise<RenderResult>;

    beforeEach(async () => {
        renderInfoPopupContainer = async (selectedFridgeData: Fridge | undefined, setShowAlert: boolean) => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <DataContext.Provider value={ testFridgeData }>
                            <SelectedFridgeContext.Provider value={ selectedFridgeData }>
                                <InfoPopupContainer
                                    updateSelected={ () => {} }
                                    located={undefined}
                                    setShowAlert={ () => setShowAlert }/>
                            </SelectedFridgeContext.Provider>
                        </DataContext.Provider>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('renders the infoPopupContainer, informationPopupImg', async () => {
            const renderData = await renderInfoPopupContainer(testFridgeData[0], false);
            await expectProperlyRenderedInfoPopupContainer(renderData, testFridgeData[0], undefined, false);
        });
        it('renders the allFridgesButtonList when there is NOT a selected fridge', async () => {
            const renderData = await renderInfoPopupContainer(undefined, false);
            await expectProperlyRenderedInfoPopupContainer(renderData, undefined, undefined, false);
        });
        it('renders the singleFridgeOverallDisplay when there is a selected fridge', async () => {
            const renderData = await renderInfoPopupContainer(testFridgeData[0], false);
            await expectProperlyRenderedInfoPopupContainer(renderData, testFridgeData[0], undefined, false);
        });
        it('renders the userNotificationPopup if setShowAlert is defined', async () => {
            const renderData = await renderInfoPopupContainer(testFridgeData[0], true);
            await expectProperlyRenderedInfoPopupContainer(renderData, testFridgeData[0], undefined, true);
        });
        it('does NOT render the userNotificationPopup if setShowAlert is NOT defined', async () => {
            const renderData = await renderInfoPopupContainer(testFridgeData[0], false);
            await expectProperlyRenderedInfoPopupContainer(renderData, testFridgeData[0], undefined, false);
        });
    });
});