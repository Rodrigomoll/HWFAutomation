/**
 * Runs multiple boolean checks and expects all to be true.
 *
 * @param {...Promise<boolean>} checks - One or more promises that resolve to boolean values.
 * @throws Will throw if any of the checks is false.
 * @returns {Promise<void>} Resolves if all checks pass, otherwise fails the test.
 */
export const assertAllTrue = async (...checks: Promise<boolean>[]): Promise<void> => {
    const results = await Promise.all(checks);
    results.forEach(result => expect(result).toBe(true));
};