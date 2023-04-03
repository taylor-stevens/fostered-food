import { render, RenderResult } from '@testing-library/react';
import { Fridge } from '../../types/Types';
import { DEFAULT_TESTING_FRIDGE_DATA as testFridgeData } from '../../constants/constants';
import React from 'react';
import { MapContainer } from 'react-leaflet';
import {useDataContext, DataProvider} from '../../contexts/DataContext';
import SelectedFridgeContext from '../../contexts/SelectedFridgeContext';
import { SingleFridgeInfoDisplay } from '../functions/SingleFridgeInfoDisplay';

/**
 * Tests for the {@link SingleFridgeInfoDisplay}
 */
describe('SingleFridgeInfoDisplay', () => {
    const expectProperlyRenderedSingleFridgeInfoDisplay = async (
        renderData: RenderResult,
        selectedFridgeData: Fridge | undefined,
    ) => {
        // regardless of the states, the following should be rendered
        const singleFridgeInfoDisplay = await renderData.findByLabelText('singleFridgeInfoDisplay');
        expect(singleFridgeInfoDisplay).toBeDefined();

        // depending on the state, the following may or may not be rendered
        const fridgeLastVisit = await renderData.queryByLabelText('fridgeLastVisit');
        const fridgeCurrentTemperature = await renderData.queryByLabelText('fridgeCurrentTemperature');
        const singleFridgePostForm = await renderData.queryByLabelText('singleFridgePostForm');
        const singleFridgePostsDisplay = await renderData.queryByLabelText('singleFridgePostsDisplay');

        if (selectedFridgeData) {
            expect(fridgeLastVisit).toBeDefined();
            expect(fridgeCurrentTemperature).toBeDefined();
            expect(singleFridgePostForm).toBeDefined();
            expect(singleFridgePostsDisplay).toBeDefined();
        } else {
            expect(fridgeLastVisit).toBeNull();
            expect(fridgeCurrentTemperature).toBeNull();
            expect(singleFridgePostForm).toBeNull();
            expect(singleFridgePostsDisplay).toBeNull();
        }
    };
    /**
     * Renders the {@link SingleFridgeInfoDisplay} giving the testFridgeData as the data
     * for the {@link DataContext} and setting the selectedFridgeData to be the passed in
     * value for the {@link SelectedFridgeContext}.
     */
    let renderSingleFridgeInfoDisplay: (
        selectedFridgeData: Fridge | undefined,
    ) => Promise<RenderResult>;

    beforeEach(async () => {

        const [data, setData] = useDataContext();
        setData(testFridgeData);

        renderSingleFridgeInfoDisplay = async (selectedFridgeData: Fridge | undefined) => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <DataProvider>
                            <SelectedFridgeContext.Provider value={ selectedFridgeData }>
                                <SingleFridgeInfoDisplay/>
                            </SelectedFridgeContext.Provider>
                        </DataProvider>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('renders the singleFridgeInfoDisplay', async () => {
            const renderData = await renderSingleFridgeInfoDisplay(testFridgeData[0]);
            await expectProperlyRenderedSingleFridgeInfoDisplay(renderData, testFridgeData[0]);
        });
        it('if the selectedFridgeContext has data, renders the fridgeLastVisit, fridgeCurrentTemperature, singleFridgePostForm, singleFridgePostsDisplay', async () => {
            const renderData = await renderSingleFridgeInfoDisplay(testFridgeData[0]);
            await expectProperlyRenderedSingleFridgeInfoDisplay(renderData, testFridgeData[0]);
        });
        it('if the selectedFridgeContext does NOT have data, does NOT render the fridgeLastVisit, fridgeCurrentTemperature, singleFridgePostForm, singleFridgePostsDisplay', async () => {
            const renderData = await renderSingleFridgeInfoDisplay(undefined);
            await expectProperlyRenderedSingleFridgeInfoDisplay(renderData, undefined);
        });
    });
});