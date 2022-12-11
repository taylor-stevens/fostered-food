import {render, RenderResult} from "@testing-library/react";
import {LatLng} from "leaflet";
import React from "react";
import {MapContainer} from "react-leaflet";
import UserNotification from "../functions/UserNotification";

/**
 * Tests for the UserNotification component
 */
describe('UserNotification', () => {
    const expectProperlyRenderedUserNotification = async (
        renderData: RenderResult,
        showCloseButton: boolean,
    ) => {
        // regardless of the state, the following will always be rendered
        const userNotificationPopup = await renderData.findByLabelText('userNotificationPopup');
        const userNotificationPopupText = await renderData.findByLabelText('userNotificationPopupText');
        expect(userNotificationPopup).toBeDefined();
        expect(userNotificationPopupText).toBeDefined();

        // depending on the state, the following may or may not be rendered
        const userNotificationCloseButton = await renderData.queryByLabelText('userNotificationCloseButton');
        if (showCloseButton) {
            expect(userNotificationCloseButton).toBeDefined();
        } else {
            expect(userNotificationCloseButton).toBeNull();
        }
    };
    /**
     * Renders the {@link UserNotification} setting position to be the passed in LatLng position.
     */
    let renderUserNotification: (
        showCloseButton: boolean
    ) => Promise<RenderResult>;

    beforeEach(async () => {
        renderUserNotification = async (showCloseButton: boolean) => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <UserNotification
                            text={'test'}
                            showCloseButton={showCloseButton}
                            closeButtonFuntion={() => {}}
                            closeFunctionValue={false}/>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('always renders the userNotificationPopup with the userNotificationPopupText', async () => {
            const renderData = await renderUserNotification(true);
            await expectProperlyRenderedUserNotification(renderData, true);
        });
        it('when the showCloseButton is true, renders the userNotificationCloseButton', async () => {
            const renderData = await renderUserNotification(true);
            await expectProperlyRenderedUserNotification(renderData, true);
        });
        it('when the showCloseButton is false, does NOT render the userNotificationCloseButton', async () => {
            const renderData = await renderUserNotification(false);
            await expectProperlyRenderedUserNotification(renderData, false);
        });
    });
});