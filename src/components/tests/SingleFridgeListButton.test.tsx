import { render, RenderResult } from '@testing-library/react';
import { Fridge } from '../../types/Types';
import React from 'react';
import { MapContainer } from 'react-leaflet';
import DataContext from '../../contexts/DataContext';
import { DEFAULT_TESTING_FRIDGE_DATA as testFridgeData } from '../../constants/constants';
import SingleFridgeListButton from '../functions/SingleFridgeListButton';

/**
 * Tests for the {@link SingleFridgeListButton}.
 */
describe('SingleFridgeListButton', () => {
    const expectProperlyRenderedSingleFridgeListButton = async (
        renderData: RenderResult,
        thisFridge: Fridge | undefined,
    ) => {
        // depending on the state, the following may or may not be rendered
        const singleFridgeListButton = await renderData.queryByLabelText('singleFridgeListButton');
        if (thisFridge) {
            expect(singleFridgeListButton).toBeDefined();
        } else {
            expect(singleFridgeListButton).toBeNull();
        }
    };
    /**
     * Renders the {@link SingleFridgeListButton} giving the testFridgeData as the data
     * for the {@link DataContext} and setting thisFridge to be the passed in {@link Fridge}.
     */
    let renderSingleFridgeListButton: (
        thisFridge: Fridge | undefined,
    ) => Promise<RenderResult>;

    beforeEach(async () => {
        renderSingleFridgeListButton = async (thisFridge: Fridge | undefined) => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <DataContext.Provider value={ testFridgeData }>
                            <SingleFridgeListButton fridge={thisFridge} updateSelected={() => undefined}/>
                        </DataContext.Provider>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('if this fridge is defined, the singleFridgeListButton is rendered', async () => {
            const renderData = await renderSingleFridgeListButton(testFridgeData[0]);
            await expectProperlyRenderedSingleFridgeListButton(renderData, testFridgeData[0]);
        });
        it('if this fridge is NOT defined, the singleFridgeListButton is NOT rendered', async () => {
            const renderData = await renderSingleFridgeListButton(undefined);
            await expectProperlyRenderedSingleFridgeListButton(renderData, undefined);
        });
    });
});