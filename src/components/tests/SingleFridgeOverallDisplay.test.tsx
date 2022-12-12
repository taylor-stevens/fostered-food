import {fireEvent, render, RenderResult} from "@testing-library/react";
import {Fridge} from "../../types/Types";
import React from "react";
import {MapContainer} from "react-leaflet";
import DataContext from "../../contexts/DataContext";
import {DEFAULT_TESTING_FRIDGE_DATA as testFridgeData} from "../../constants/constants";
import SelectedFridgeContext from "../../contexts/SelectedFridgeContext";
import SingleFridgeOverallDisplay from "../functions/SingleFridgeOverallDisplay";

/**
 * Tests for the {@link SingleFridgeOverallDisplay}
 */
describe('SingleFridgeOverallDisplay', () => {
    const expectProperlyRenderedSingleFridgeOverallDisplay = async (
        renderData: RenderResult,
        selectedFridgeData: Fridge | undefined,
    ) => {
        // depending on the state, the following may or may not be rendered
        const singleFridgeOverallDisplay = await renderData.queryByLabelText('singleFridgeOverallDisplay');
        const singleFridgeOverallDisplayExitButton = await renderData.queryByLabelText('singleFridgeOverallDisplayExitButton');
        const pageSelectionGroup = await renderData.queryByLabelText('pageSelectionGroup');
        const fridgeInformationToggleButton = await renderData.queryByLabelText('fridgeInformationToggleButton');
        const contactInformationToggleButton = await renderData.queryByLabelText('contactInformationToggleButton');
        const singleFridgeInfoDisplay = await renderData.queryByLabelText('singleFridgeInfoDisplay');
        const singleFridgeContactInfo = await renderData.queryByLabelText('singleFridgeContactInfo');

        if (selectedFridgeData) {
            expect(singleFridgeOverallDisplay).toBeDefined();
            expect(singleFridgeOverallDisplayExitButton).toBeDefined();
            expect(pageSelectionGroup).toBeDefined();
            expect(fridgeInformationToggleButton).toBeDefined();
            expect(contactInformationToggleButton).toBeDefined();
            expect(singleFridgeInfoDisplay).toBeDefined();
            expect(singleFridgeContactInfo).toBeNull();
            // should always be true -> click the contactInfoButton to display to contact information
            if (contactInformationToggleButton) fireEvent.click(contactInformationToggleButton);
            expect(singleFridgeContactInfo).toBeDefined();
        } else {
            expect(singleFridgeOverallDisplay).toBeNull();
            expect(singleFridgeOverallDisplayExitButton).toBeNull();
            expect(pageSelectionGroup).toBeNull();
            expect(fridgeInformationToggleButton).toBeNull();
            expect(contactInformationToggleButton).toBeNull();
            expect(singleFridgeInfoDisplay).toBeNull();
            expect(singleFridgeContactInfo).toBeNull();
        }
    };
    /**
     * Renders the {@link SingleFridgeOverallDisplay} giving the testFridgeData as the data
     * for the {@link DataContext} and setting the selectedFridgeData to be the passed in
     * value for the {@link SelectedFridgeContext}.
     */
    let renderSingleFridgeOverallDisplay: (
        selectedFridgeData: Fridge | undefined,
    ) => Promise<RenderResult>;

    beforeEach(async () => {
        renderSingleFridgeOverallDisplay = async (selectedFridgeData: Fridge | undefined) => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <DataContext.Provider value={ testFridgeData }>
                            <SelectedFridgeContext.Provider value={ selectedFridgeData }>
                                <SingleFridgeOverallDisplay updateSelected={() => undefined}/>
                            </SelectedFridgeContext.Provider>
                        </DataContext.Provider>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        describe('if the selectedFridgeContext has data renders the following', () => {
            it('the singleFridgeOverallDisplay', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(testFridgeData[0]);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, testFridgeData[0]);
            });
            it('the singleFridgeOverallDisplayExitButton', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(testFridgeData[0]);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, testFridgeData[0]);
            });
            it('the pageSelectionGroup', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(testFridgeData[0]);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, testFridgeData[0]);
            });
            it('the fridgeInformationToggleButton', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(testFridgeData[0]);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, testFridgeData[0]);
            });
            it('the contactInformationToggleButton', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(testFridgeData[0]);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, testFridgeData[0]);
            });
            it('does NOT render the singleFridgeContactInfo on default', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(testFridgeData[0]);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, testFridgeData[0]);
            });
            it('renders the singleFridgeInfoDisplay on default', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(testFridgeData[0]);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, testFridgeData[0]);
            });
            it('renders the singleFridgeContactInfo when clicked', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(testFridgeData[0]);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, testFridgeData[0]);
            });
        });
        describe('if the selectedFridgeContext does NOT have data, does NOT render the following',  () => {
            it('the singleFridgeOverallDisplay', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(undefined);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, undefined);
            });
            it('the singleFridgeOverallDisplayExitButton', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(undefined);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, undefined);
            });
            it('the pageSelectionGroup', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(undefined);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, undefined);
            });
            it('the fridgeInformationToggleButton', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(undefined);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, undefined);
            });
            it('the contactInformationToggleButton', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(undefined);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, undefined);
            });
            it('the singleFridgeContactInfo', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(undefined);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, undefined);
            });
            it('the singleFridgeInfoDisplay', async () => {
                const renderData = await renderSingleFridgeOverallDisplay(undefined);
                await expectProperlyRenderedSingleFridgeOverallDisplay(renderData, undefined);
            });
        });
    });
});