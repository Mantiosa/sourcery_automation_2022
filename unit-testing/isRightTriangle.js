const isTriangle = require('./isTriangle');

function isRightTriangle(a, b, c ) {
    return isTriangle(a, b, c) && ((c*c == a*a + b*b) || (b*b == c*c* +a*a) || (a*a == c*c + b*b));
}

module.exports = isRightTriangle;