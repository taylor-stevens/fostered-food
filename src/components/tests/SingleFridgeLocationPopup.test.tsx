import {render, RenderResult} from "@testing-library/react";
import {Fridge} from "../../types/Types";
import React from "react";
import {MapContainer} from "react-leaflet";
import DataContext from "../../contexts/DataContext";
import {DEFAULT_TESTING_FRIDGE_DATA as testFridgeData} from "../../constants/constants";
import SingleFridgeLocationPopup from "../functions/SingleFridgeLocationPopup";

/**
 * Tests for the {@link SingleFridgeLocationPopup}
 */
describe('SingleFridgeLocationPopup', () => {
    const expectProperlyRenderedSingleFridgeLocationPopup = async (
        renderData: RenderResult,
        thisFridge: Fridge | undefined,
    ) => {
        // depending on the state, the following may or may not be rendered
        const singleFridgeLocationPopup = await renderData.queryByLabelText('singleFridgeLocationPopup');
        if (thisFridge) {
            expect(singleFridgeLocationPopup).toBeDefined();
        } else {
            expect(singleFridgeLocationPopup).toBeNull();
        }
    };
    /**
     * Renders the {@link SingleFridgeLocationPopup} giving the testFridgeData as the data
     * for the {@link DataContext} and setting thisFridge to be the passed in {@link Fridge}.
     */
    let renderSingleFridgeLocationPopup: (
        thisFridge: Fridge | undefined,
    ) => Promise<RenderResult>;

    beforeEach(async () => {
        renderSingleFridgeLocationPopup = async (thisFridge: Fridge | undefined) => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <DataContext.Provider value={ testFridgeData }>
                            <SingleFridgeLocationPopup fridge={thisFridge}/>
                        </DataContext.Provider>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('if this fridge is defined the singleFridgeLocationPopup is rendered', async () => {
            const renderData = await renderSingleFridgeLocationPopup(testFridgeData[0]);
            await expectProperlyRenderedSingleFridgeLocationPopup(renderData, testFridgeData[0]);
        });
        it('if this fridge is NOT defined, the singleFridgeLocationPopup is NOT rendered', async () => {
            const renderData = await renderSingleFridgeLocationPopup(undefined);
            await expectProperlyRenderedSingleFridgeLocationPopup(renderData, testFridgeData[0]);
        });
    });
});