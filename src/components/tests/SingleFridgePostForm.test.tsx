import {render, RenderResult} from "@testing-library/react";
import React from "react";
import {SingleFridgePostForm} from "../functions/SingleFridgePostForm";

/**
 * Tests for the SingleFridgePostForm
 */
describe('SingleFridgePostForm', () => {
    const expectProperlyRenderedSingleFridgePostForm = async (
        renderData: RenderResult,
    ) => {
        // regardless of the states, the following should be rendered
        const singleFridgePostForm = await renderData.findByLabelText('singleFridgePostForm');
        const submitButton = await renderData.findByLabelText('submitButton');
        expect(singleFridgePostForm).toBeDefined();
        expect(submitButton).toBeDefined();
    };
    /**
     * Renders the {@link SingleFridgePostForm}
     */
    let renderSingleFridgePostForm: () => Promise<RenderResult>;

    beforeEach(async () => {
        renderSingleFridgePostForm = async () => {
            return render(
                <React.StrictMode>
                    <SingleFridgePostForm handleChange={undefined} handleSubmit={undefined} input={undefined}/>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('always renders the singleFridgePostForm and the submitButton', async () => {
            const renderData = await renderSingleFridgePostForm();
            await expectProperlyRenderedSingleFridgePostForm(renderData);
        });
    });
});