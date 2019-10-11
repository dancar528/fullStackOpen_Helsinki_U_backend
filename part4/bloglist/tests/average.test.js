const average = require('../utils/for_testing').average

describe('average', () => {
    test('of one value is the value itself', () => {
        expect(average([8])).toBe(8)
    })

    test('of many is calculated right', () => {
        const result = average([1, 5, 8, -10])

        expect(result).toBe(1)
    })

    test('of empty array is zero', () => {
        expect(average([])).toBe(0)
    })
})