/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
    let result = n;

    if (n == 0) return 1;

    for (let i = n; i > 1; i--) {
        result = result * (i - 1);
    }

    return result;
}
