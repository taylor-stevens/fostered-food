import { render, RenderResult } from '@testing-library/react';
import { Fridge } from '../../types/Types';
import React from 'react';
import { MapContainer } from 'react-leaflet';
import {useDataContext, DataProvider} from '../../contexts/DataContext';
import SelectedFridgeContext from '../../contexts/SelectedFridgeContext';
import { DEFAULT_TESTING_FRIDGE_DATA as testFridgeData } from '../../constants/constants';
import SingleFridgePostsDisplay from '../functions/SingleFridgePostsDisplay';

/**
 * Tests for the SingleFridgePostsDisplay
 */
describe('SingleFridgePostsDisplay', () => {
    const expectProperlyRenderedSingleFridgePostsDisplay = async (
        renderData: RenderResult,
        selectedFridgeData: Fridge | undefined,
    ) => {
        // regardless of the states, the following should be rendered
        const singleFridgePostsDisplay = await renderData.findByLabelText('singleFridgePostsDisplay');
        expect(singleFridgePostsDisplay).toBeDefined();

        // depending on the state, the following may or may not be rendered
        const singleFridgePostItem = await renderData.queryAllByLabelText('singleFridgePostItem');

        if (selectedFridgeData !== undefined && selectedFridgeData.posts) {
            expect(singleFridgePostItem).toBeDefined();
            // the number of post items should correspond to the number of posts the selected fridge has
            expect(singleFridgePostItem.length).toEqual(selectedFridgeData.posts.length);
        } else {
            expect(singleFridgePostItem.length).toEqual(0);
        }
    };
    /**
     * Renders the {@link SingleFridgePostsDisplay} giving the testFridgeData as the data
     * for the {@link DataContext} and setting the selectedFridgeData to be the passed in
     * value for the {@link SelectedFridgeContext}.
     */
    let renderSingleFridgePostsDisplay: (
        selectedFridgeData: Fridge | undefined,
    ) => Promise<RenderResult>;

    beforeEach(async () => {

        const [data, setData] = useDataContext()
        setData({fridges: testFridgeData})

        renderSingleFridgePostsDisplay = async (selectedFridgeData: Fridge | undefined) => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <DataProvider>
                            <SelectedFridgeContext.Provider value={ selectedFridgeData }>
                                <SingleFridgePostsDisplay/>
                            </SelectedFridgeContext.Provider>
                        </DataProvider>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('always renders the singleFridgePostsDisplay', async () => {
            const renderData = await renderSingleFridgePostsDisplay(testFridgeData[0]);
            await expectProperlyRenderedSingleFridgePostsDisplay(renderData, testFridgeData[0]);
        });
        it('renders the same amount of singleFridgePostItems as there are posts in the selected fridge when there is a fridge selected', async () => {
            const renderData = await renderSingleFridgePostsDisplay(testFridgeData[0]);
            await expectProperlyRenderedSingleFridgePostsDisplay(renderData, testFridgeData[0]);
        });
        it('does not render the singleFridgePostItem when there is not a selected fridge', async () => {
            const renderData = await renderSingleFridgePostsDisplay(undefined);
            await expectProperlyRenderedSingleFridgePostsDisplay(renderData, undefined);
        });
    });
});