import {fireEvent, render, RenderResult} from "@testing-library/react";
import {Fridge} from "../../types/Types";
import React from "react";
import {MapContainer} from "react-leaflet";
import DataContext from "../../contexts/DataContext";
import {DEFAULT_TESTING_FRIDGE_DATA as testFridgeData} from "../../constants/constants";
import SingleFridgeLocationMarker from "../functions/SingleFridgeLocationMarker";

/**
 * Tests for the {@link SingleFridgeLocationMarker}.
 */
describe('SingleFridgeLocationMarker', () => {
    const expectProperlyRenderedSingleFridgeLocationMarker = async (
        renderData: RenderResult,
        thisFridge: Fridge | undefined,
    ) => {
        // depending on the state, the following may or may not be rendered
        const singleFridgeLocationMarker = await renderData.queryByLabelText('singleFridgeLocationMarker');
        const singleFridgeLocationPopup = await renderData.queryByLabelText('singleFridgeLocationPopup');
        if (thisFridge) {
            expect(singleFridgeLocationMarker).toBeDefined();
            expect(singleFridgeLocationPopup).toBeDefined();
        } else {
            expect(singleFridgeLocationMarker).toBeNull();
            expect(singleFridgeLocationPopup).toBeNull();
        }
    };
    /**
     * Renders the {@link SingleFridgeLocationMarker} giving the testFridgeData as the data
     * for the {@link DataContext} and setting thisFridge to be the passed in {@link Fridge}.
     */
    let renderSingleFridgeLocationMarker: (
        thisFridge: Fridge | undefined,
    ) => Promise<RenderResult>;

    beforeEach(async () => {
        renderSingleFridgeLocationMarker = async (thisFridge: Fridge | undefined) => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <DataContext.Provider value={ testFridgeData }>
                            <SingleFridgeLocationMarker fridge={thisFridge} updateSelected={() => undefined}/>
                        </DataContext.Provider>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('if this fridge is defined the singleFridgeLocationMarker and the singleFridgeLocationPopup are rendered', async () => {
            const renderData = await renderSingleFridgeLocationMarker(testFridgeData[0]);
            await expectProperlyRenderedSingleFridgeLocationMarker(renderData, testFridgeData[0]);
        });
        it('if this fridge is NOT defined, the singleFridgeListButton and singleFridgeLocationPopup are NOT rendered', async () => {
            const renderData = await renderSingleFridgeLocationMarker(undefined);
            await expectProperlyRenderedSingleFridgeLocationMarker(renderData, undefined);
        });
    });
});