import { render, RenderResult } from '@testing-library/react';
import { Fridge } from '../../types/Types';
import { DEFAULT_TESTING_FRIDGE_DATA as testFridgeData } from '../../constants/constants';
import React from 'react';
import { MapContainer } from 'react-leaflet';
import {useDataContext, DataProvider} from '../../contexts/DataContext';
import SelectedFridgeContext from '../../contexts/SelectedFridgeContext';
import SingleFridgeContactInfo from '../functions/SingleFridgeContactInfo';

/**
 * Tests for the {@link SingleFridgeContactInfo}.
 */
describe('SingleFridgeContactInfo', () => {
    const expectProperlyRenderedSingleFridgeContactInfo = async (
        renderData: RenderResult,
        selectedFridgeData: Fridge | undefined,
    ) => {
        // regardless of the states, the following should be rendered
        const singleFridgeContactInfo = await renderData.findByLabelText('singleFridgeContactInfo');
        expect(singleFridgeContactInfo).toBeDefined();

        // depending on the state, the following may or may not be rendered
        const singleContactPoints = await renderData.queryAllByLabelText('singleContactPoint');

        if (selectedFridgeData) {
            expect(singleContactPoints).toBeDefined();
            // expect that number of contact points to be the number of contacts that the selected Fridge has
            expect(singleContactPoints.length).toEqual(selectedFridgeData.contact.length);
        } else {
            expect(singleContactPoints.length).toEqual(0);
        }
    };
    /**
     * Renders the {@link SingleFridgeContactInfo} giving the testFridgeData as the data
     * for the {@link DataContext} and setting the selectedFridgeData to be the passed in
     * value for the {@link SelectedFridgeContext}.
     */
    let renderSingleFridgeContactInfo: (
        selectedFridgeData: Fridge | undefined,
    ) => Promise<RenderResult>;

    beforeEach(async () => {

        const [data, setData] = useDataContext();
        setData(testFridgeData);

        renderSingleFridgeContactInfo = async (selectedFridgeData: Fridge | undefined) => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <DataProvider>
                            <SelectedFridgeContext.Provider value={ selectedFridgeData }>
                                <SingleFridgeContactInfo/>
                            </SelectedFridgeContext.Provider>
                        </DataProvider>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('renders the singleFridgeContactInfo', async () => {
            const renderData = await renderSingleFridgeContactInfo(testFridgeData[0]);
            await expectProperlyRenderedSingleFridgeContactInfo(renderData, testFridgeData[0]);
        });
        it('does NOT render the singleContactPoints when there is NOT a selected fridge', async () => {
            const renderData = await renderSingleFridgeContactInfo(undefined);
            await expectProperlyRenderedSingleFridgeContactInfo(renderData, undefined);
        });
        describe('when there is a selected fridge', () => {
            it('renders the singleContactPoints', async () => {
                const renderData = await renderSingleFridgeContactInfo(testFridgeData[0]);
                await expectProperlyRenderedSingleFridgeContactInfo(renderData, testFridgeData[0]);
            });
            it('renders the same number of singleContactPoints as there are contact points', async () => {
                const renderData = await renderSingleFridgeContactInfo(testFridgeData[0]);
                await expectProperlyRenderedSingleFridgeContactInfo(renderData, testFridgeData[0]);
            });
        });
    });
});