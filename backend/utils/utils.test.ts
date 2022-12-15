import { Fridge, TemperatureData, TestData } from "../types/Types";
import { contactToNestedList, getAssociatedTemperatureData, sheetToFridge } from "./utils";
export {} // gets rid of compilation error

/**
* Tests for the utils functions
*/
describe('utils', () => {
    const fridgeID: string = 'TEST_FOUND_ID';
    let fridgeTempDataEmpty: any[][] = [];
    let fridgeTempDataWithIDAlone: any[][] = [
        ['TEST_FOUND_ID', 9, 'April', 4],
    ];
    let fridgeTempDataWithID: any[][] = [
        ['AAA', 24, 'January', 1],
        ['BBB', 15, 'February', 2],
        ['CCC', 19, 'March', 3],
        ['TEST_FOUND_ID', 9, 'April', 4],
        ['DDD', 33, 'May', 5],
    ];
    let fridgeTempDataWithoutID: any[][] = [
        ['AAA', 24, 'January', 1],
        ['BBB', 15, 'February', 2],
        ['CCC', 19, 'March', 3],
        ['DDD', 33, 'May', 5],
        ['EEE', 4, 'June', 6],
    ];
    let contactsEmpty: string = '';
    let contactsSingleNoSeparator: string = 'instagram @woofridge';
    let contactsMultipleNoSeparator: string = 'website:https://woofridge.org/, instagram @woofridge';
    let contactsSingle: string = 'instagram:@woofridge';
    let contactsMultiple: string = 'instagram:@woofridge, website:https://woofridge.org/';
    let fridgeDataEmpty: any[][] = [];
    let fridgeDataSingleNoMatch: any[][] = [
        ['FFF', 'No Match Fridge', 'No Where', 1, '0, 0', ''],
    ];
    let fridgeDataMultipleNoMatch: any[][] = [
        ['FFF', 'No Match Fridge', 'No Where', 1, '0, 0', ''],
        ['GGG', 'No Match Again Fridge', 'No Where Still', 2, '1000, 1000', 'No Contacts Available'],
    ];
    let fridgeDataSingleWithMatch: any[][] = [
        [fridgeID, 'Found Fridge', 'Maine', 1, '1, 2', contactsMultipleNoSeparator],
    ];
    let fridgeDataMultipleWithMatch: any[][] = [
        ['AAA', 'Another Fridge', 'Idaho', 1, '5, 4', 'instagram:@idahofridge, website:fridge.idaho.com'],
        [fridgeID, 'Found Fridge', 'Maine', 2, '1, 2', contactsMultipleNoSeparator],
    ];

    describe('sheetToFridge', () => {
        const expectedReturnFromFridgeDataEmpty: Fridge[] = [];
        const expectedReturnFromSingleNoMatch: Fridge[] = [
            {
                name: 'No Match Fridge',
                address: 'No Where',
                lastOpen: '',
                temperature: -1,
                location: [0, 0],
                contact: [['contact', 'unavailable']],
                posts: [],
                distance: -1,
            }
        ];
        const expectedReturnFromMultipleNoMatch: Fridge[] = [
            {
                name: 'No Match Fridge',
                address: 'No Where',
                lastOpen: '',
                temperature: -1,
                location: [0, 0],
                contact: [['contact', 'unavailable']],
                posts: [],
                distance: -1,
            },
            {
                name: 'No Match Again Fridge',
                address: 'No Where Still',
                lastOpen: '',
                temperature: -1,
                location: [1000, 1000],
                contact: [['contact', 'unavailable']],
                posts: [],
                distance: -1,
            }
        ];
        const expectedReturnFromSingleWithMatch: Fridge[] = [
            {
                name: 'Found Fridge',
                address: 'Maine',
                lastOpen: 'April',
                temperature: 9,
                location: [1, 2],
                contact: [['website', 'https://woofridge.org/'], ['contact', 'unavailable']],
                posts: [],
                distance: -1,
            }
        ];
        const expectedReturnFromMultipleWithMatch: Fridge[] = [
            {
                name: 'Another Fridge',
                address: 'Idaho',
                lastOpen: 'January',
                temperature: 24,
                location: [5, 4],
                contact: [['instagram','@idahofridge'], ['website','fridge.idaho.com']],
                posts: [],
                distance: -1,
            },
            {
                name: 'Found Fridge',
                address: 'Maine',
                lastOpen: 'April',
                temperature: 9,
                location: [1, 2],
                contact: [['website', 'https://woofridge.org/'], ['contact', 'unavailable']],
                posts: [],
                distance: -1,
            }
        ];
        const testData: TestData[] = [
            {
                testName: 'when the fridge data is empty',
                providedInput: [fridgeDataEmpty, []],
                expectedOutput: expectedReturnFromFridgeDataEmpty
            },
            {
                testName: 'when the fridge data is not empty but has no matches with the temperature data',
                providedInput: [fridgeDataSingleNoMatch, fridgeTempDataWithID],
                expectedOutput: expectedReturnFromSingleNoMatch
            },
            {
                testName: 'when the fridge data has multiple rows but has no matches with the temperature data',
                providedInput: [fridgeDataMultipleNoMatch, fridgeTempDataWithID],
                expectedOutput: expectedReturnFromMultipleNoMatch
            },
            {
                testName: 'when the fridge data is not empty and has a match with the temperature data',
                providedInput: [fridgeDataSingleWithMatch, fridgeTempDataWithID],
                expectedOutput: expectedReturnFromSingleWithMatch
            },
            {
                testName: 'when the fridge data has multiple rows and has a match with the temperature data',
                providedInput: [fridgeDataMultipleWithMatch, fridgeTempDataWithID],
                expectedOutput: expectedReturnFromMultipleWithMatch
            }
        ];
        describe('when there is NOT fridgeTemperatureData', () => {
            testData.forEach((test) => {
                describe(test.testName, () => {
                    let expectedReturnedFridgeList: Fridge[];
                    beforeEach(() => {
                        expectedReturnedFridgeList = sheetToFridge(test.providedInput[0], test.providedInput[1]);
                    });
                    it('fridge list returned is as expected', () => {
                        expect(expectedReturnedFridgeList).toEqual(test.expectedOutput);
                    });
                    it('a list of Fridges is returned with length equal to the length of fridgeStaticData rows', () => {
                        expect(test.providedInput[0].length).toEqual(expectedReturnedFridgeList.length)
                    });
                });
            });
        });
    });
    describe('contactToNestedList', () => {
        const expectedReturnFromContactsEmpty: string[][] = [['contact', 'unavailable']];
        const expectedReturnFromSingleNoSeparator: string[][] = [['contact', 'unavailable']];
        const expectedReturnFromMultipleNoSeparator: string[][] = [
            ['website', 'https://woofridge.org/'],
            ['contact', 'unavailable'],
        ];
        const expectedReturnFromContactsSingle: string[][] = [['instagram', '@woofridge']];
        const expectedReturnFromContactsMultiple: string[][] = [
            ['instagram', '@woofridge'],
            ['website', 'https://woofridge.org/']
        ];
        const testData: TestData[] = [
            {
                testName: 'when the input string length is 0',
                providedInput: contactsEmpty,
                expectedOutput: expectedReturnFromContactsEmpty
            },
            {
                testName: 'when there is NOT a : present in the input string with a single contact point',
                providedInput: contactsSingleNoSeparator,
                expectedOutput: expectedReturnFromSingleNoSeparator
            },
            {
                testName: 'when there is NOT a : present in the input string with multiple contact points',
                providedInput: contactsMultipleNoSeparator,
                expectedOutput: expectedReturnFromMultipleNoSeparator
            },
            {
                testName: 'when there is a : present in the input string and there is one contact in the list',
                providedInput: contactsSingle,
                expectedOutput: expectedReturnFromContactsSingle
            },
            {
                testName: 'when there is a : present in the input string and there is more than one contact in the list',
                providedInput: contactsMultiple,
                expectedOutput: expectedReturnFromContactsMultiple
            }
        ];
        testData.map(test => {
            describe(test.testName, () => {
                let returnedContactList: string[][];
                beforeEach(() => {
                    returnedContactList = contactToNestedList(test.providedInput);
                });
                it('returns the expected output', () => {
                    expect(returnedContactList).toEqual(test.expectedOutput);
                });
                it('there are no contacts with a comma present in them', () => {
                    returnedContactList.forEach((wholeContact) => {
                        wholeContact.forEach((contactPart) => {
                            expect(contactPart.includes(',')).toBe(false);
                        });
                    });
                });
            });
        });
    });
    describe('getAssociatedTemperatureData', () => {
        const expectedReturnFromEmpty: TemperatureData = { id: fridgeID, temperature: -1, lastOpen: '', rowId: -1};
        const expectedReturnFromWithIDAlone: TemperatureData = { id: fridgeID, temperature: 9, lastOpen: 'April', rowId: 4};
        const expectedReturnFromWithID: TemperatureData = { id: fridgeID, temperature: 9, lastOpen: 'April', rowId: 4};
        const expectedReturnFromWithoutID: TemperatureData = { id: fridgeID, temperature: -1, lastOpen: '', rowId: -1};
        const testData: TestData[] = [
            {
                testName: 'when the fridgeTemperatureData is an empty list',
                providedInput: fridgeTempDataEmpty,
                expectedOutput: expectedReturnFromEmpty
            },
            {
                testName: 'when there is matchingRowTempData and the fridgeTemperatureData only has one row',
                providedInput: fridgeTempDataWithIDAlone,
                expectedOutput: expectedReturnFromWithIDAlone
            },
            {
                testName: 'when there is matchingRowTempData and the fridgeTemperatureData has two rows where matchingRowTempData is not the first item',
                providedInput: fridgeTempDataWithID,
                expectedOutput: expectedReturnFromWithID
            },
            {
                testName: 'when there is NOT matchingRowTempData',
                providedInput: fridgeTempDataWithoutID,
                expectedOutput: expectedReturnFromWithoutID
            }
        ];
        testData.map(test => {
            describe(test.testName, () => {
                let returnedTemperatureData: TemperatureData;
                beforeEach(() => {
                    returnedTemperatureData = getAssociatedTemperatureData(fridgeID, test.providedInput);
                });
                it('returns a TemperatureData object', () => {
                    expect(returnedTemperatureData.id).toBeDefined();
                    expect(returnedTemperatureData.temperature).toBeDefined();
                    expect(returnedTemperatureData.lastOpen).toBeDefined();
                    expect(returnedTemperatureData.rowId).toBeDefined();
                });
                it('TemperatureData id is as expected', () => {
                    expect(returnedTemperatureData.id).toEqual(test.expectedOutput.id);
                });
                it('TemperatureData temperature is as expected', () => {
                    expect(returnedTemperatureData.temperature).toEqual(test.expectedOutput.temperature);
                });
                it('TemperatureData lastOpen is as expected', () => {
                    expect(returnedTemperatureData.lastOpen).toEqual(test.expectedOutput.lastOpen);
                });
                it('TemperatureData row id is as expected', () => {
                    expect(returnedTemperatureData.rowId).toEqual(test.expectedOutput.rowId);
                });
            });
        });
    });
});