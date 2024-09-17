const isRightTriangle = require('./isRightTriangle');

test('3, 4, 5 is triangle', () => {
    expect(isRightTriangle(3, 4, 5)).toBe(true);
});

test('1, 1, 1 is not triangle', () => {
    expect(isRightTriangle(1, 1, 1)).toBe(false);
});

test('1, 1, 2 is not triangle', () => {
    expect(isRightTriangle(1, 1, 2)).toBe(false);
});

test('0, 0, 0 is not triangle', () => {
    expect(isRightTriangle(0, 0, 0)).toBe(false);
});

test('-1, 1, 1 is not triangle', () => {
    expect(isRightTriangle(-1, 1, 1)).toBe(false);
});

test('3.2, 4.2, 5.2 is triangle', () => {
    expect(isRightTriangle(3.2, 4.2, 5.2)).toBe(false);
});

test('a, b, c is not triangle', () => {
    expect(isRightTriangle('a', 'b', 'c')).toBe(false);
});

test('a, b, c is not triangle', () => {
    //arrange
    let a = 'a';
    let b = 'b';
    let c = 'c';

    //act
    let result = isRightTriangle(a, b, c);

    //assert
    expect(result).toBe(expected);
});