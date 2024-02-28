const fs = require('fs');
const { writeToFile } = require('./index');

jest.mock('fs');//fakes file system interaction

describe('writeToFile function from index.js', () => {
    test('writes data to file', () => {
        // Arrange
        const filename = 'test.txt';
        const data = 'data';

        // Act
        writeToFile(filename, data);

        // Assert
        expect(fs.writeFile).toHaveBeenCalledWith(filename, data, expect.any(Function));
    });

    test('throws error when fs.writeFile fails', () => {
        // Arrange
        const filename = 'test.txt';
        const data = 'data';
        const error = new Error('file write error');

        // Mock fs.writeFile to throw an error
        fs.writeFile.mockImplementationOnce((filename, data, callback) => {
            callback(error);
        });

        // Act and Assert
        expect(() => {
            writeToFile(filename, data);
        }).toThrow(error);
    });
});
//npx jest, both tests should pass. i will be incorporating tests in all future assignments.
//I AM UNSURE WHAT WAS MEANT BY "TEST INSTRUCTIONS" and used "screenshots" because most assignments so far have asked for this
//if it is asking for instructions on how to run my tests, please let me know or clarify. thank you!