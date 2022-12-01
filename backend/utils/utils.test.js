/**
 * Tests for the utils functions
 */
describe('utils', () => {
    describe('sheetToFridge', () => {
        describe('when there is NOT fridgeStaticData', () => {
            it('returns an empty fridge list', () => {
                // TODO: write this test
            });
        });
        describe('when there is NOT fridgeTemperatureData', () => {
            it('fridge temperatures are all set to -1', () => {
                // TODO: write this test
            });
            it('fridge lastOpen values are all set to an empty string', () => {
                // TODO: write this test
            });
            it('a list of Fridges is returned with length equal to the length of fridgeStaticData rows', () => {
                // TODO: write this test
            });
            it('a list of Fridges with the data from fridgeStaticData rows', () => {
                // TODO: write this test
            });
        });
        describe('when there is fridgeStaticData and fridgeTemperatureData', () => {
            describe('when the data matches', () => {
                it('a list of Fridges is returned with the values of both lists combined in the type', () => {
                    // TODO: write this test
                });
                it('a list of Fridges is returned with length equal to the length of fridgeStaticData rows', () => {
                    // TODO: write this test
                });
            });
            describe('when the data does NOT match', () => {
                it('fridge temperatures are all set to -1', () => {
                    // TODO: write this test
                });
                it('fridge lastOpen values are all set to an empty string', () => {
                    // TODO: write this test
                });
                it('a list of Fridges is returned with length equal to the length of fridgeStaticData rows', () => {
                    // TODO: write this test
                });
                it('a list of Fridges with the data from fridgeStaticData rows', () => {
                    // TODO: write this test
                });
            });
        });
    });
    describe('contactToNestedList', () => {
        describe('when the input string length is 0', () => {
            it('returns an empty nested string list', () => {
                // TODO: write this test
            });
        });
        describe('when there is NOT a : present in the input string', () => {
            it('throws and error via expect', () => {
                // TODO: write this test
            });
        });
        describe('when there is a : present in the input string', () => {
            describe('when there is one contact in the list', () => {
                it('returns a one dimentional array', () => {
                    // TODO: write this test
                });
            });
            describe('when there is more than one contact in the list', () => {
                it('retrns a two dimentional array', () => {
                    // TODO: write this test
                });
            });
        });
    });
    describe('getAssociatedTemperatureData', () => {
        describe('when there is NOT matchingRowTempData', () => {
            it('returns a TemperatureData object', () => {
                // TODO: write this test
            });
            it('TemperatureData id is set to the searched for id', () => {
                // TODO: write this test
            });
            it('TemperatureData temperature is set to -1', () => {
                // TODO: write this test
            });
            it('TemperatureData lastOpen is set to an empty string', () => {
                // TODO: write this test
            });
            it('TemperatureData row id is set to -1', () => {
                // TODO: write this test
            });
        });
        describe('when there is matchingRowTempData and the fridgeTemperatureData only has one row', () => {
            it('returns a TemperatureData object', () => {
                // TODO: write this test
            });
            it('TemperatureData id is set to the searched for id', () => {
                // TODO: write this test
            });
            it('TemperatureData temperature is set to the parsed float matching the value in the row at index fridgeTemperatureColumn', () => {
                // TODO: write this test
            });
            it('TemperatureData lastOpen is set to the value in the row at index fridgeLastOpenColumn', () => {
                // TODO: write this test
            });
            it('TemperatureData row id is set to the value in the row at index rowIDColumn', () => {
                // TODO: write this test
            });
        });
        describe('when there is matchingRowTempData and the fridgeTemperatureData has two rows where matchingRowTempData is not the first item', () => {
            it('returns a TemperatureData object', () => {
                // TODO: write this test
            });
            it('TemperatureData id is set to the searched for id', () => {
                // TODO: write this test
            });
            it('TemperatureData temperature is set to the parsed float matching the value in the row at index fridgeTemperatureColumn', () => {
                // TODO: write this test
            });
            it('TemperatureData lastOpen is set to the value in the row at index fridgeLastOpenColumn', () => {
                // TODO: write this test
            });
            it('TemperatureData row id is set to the value in the row at index rowIDColumn', () => {
                // TODO: write this test
            });
        });
    });
});
