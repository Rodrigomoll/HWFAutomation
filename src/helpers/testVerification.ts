/**
 * Take all the checks you give me, run them at the same time, and make sure they're all true
 */

export const verify = async (...checks: Promise<boolean>[]): Promise<void> => {
    const results = await Promise.all(checks);
    results.forEach(result => expect(result).toBe(true));
};