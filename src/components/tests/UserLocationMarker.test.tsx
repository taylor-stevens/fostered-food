import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import { MapContainer } from 'react-leaflet';
import { LatLng } from 'leaflet';
import UserLocationMarker from '../functions/UserLocationMarker';

/**
 * Tests for the UserLocationMarker
 */
describe('UserLocationMarker', () => {
    const expectProperlyRenderedUserLocationMarker = async (
        renderData: RenderResult,
        // @ts-ignore
        position: LatLng | undefined,
    ) => {
        // depending on the state, the following may or may not be rendered
        const userLocationMarker = await renderData.queryByLabelText('userLocationMarker');
        if (position) {
            expect(userLocationMarker).toBeDefined();
        } else {
            expect(userLocationMarker).toBeNull();
        }
    };
    /**
     * Renders the {@link UserLocationMarker} setting position to be the passed in LatLng position.
     */
    let renderUserLocationMarker: (
        // @ts-ignore
        position: LatLng | undefined
    ) => Promise<RenderResult>;

    beforeEach(async () => {
        // @ts-ignore
        renderUserLocationMarker = async (position: LatLng | undefined) => {
            return render(
                <React.StrictMode>
                    <MapContainer>
                        <UserLocationMarker position={position}/>
                    </MapContainer>
                </React.StrictMode>
            );
        };
    });
    describe('properly renders the elements according to the specifications', () => {
        it('if the user location is found renders the userLocationMarker', async () => {
            const pos = new LatLng(0,0,0);
            const renderData = await renderUserLocationMarker(pos);
            await expectProperlyRenderedUserLocationMarker(renderData, pos);
        });
        it('if the user location is NOT found, does NOT render the userLocationMarker', async () => {
            const renderData = await renderUserLocationMarker(undefined);
            await expectProperlyRenderedUserLocationMarker(renderData, undefined);
        });
    });
});