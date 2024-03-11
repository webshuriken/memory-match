// INTERNAL TO UTIL FUNCTIONS

/**
 * create a random number, not already inside the list of random indices
 * @param {number} max - the upper limit of randomness, inclusive
 * @param {Array<number>} existingIndices - number list of existing indices
 * @returns {number}
 */
function randomNumber(max: number, existingIndices: number[]): number {
let randSearch = true;
let index: number = 0;

// get random number that does not match existing one from list
while(randSearch) {
    index = Math.floor(Math.random() * (max + 1));
    if (!existingIndices.includes(index)) {
    randSearch = false;
    }
}

return index;
}

// EXTERNALLY AVAILABLE

/**
 * Create a list of random IDs
 * @param {number} nOfIDs - the number of cards that need id
 * @returns {number[]}
 */
export function createRandomIDs(nOfIDs: number): number[] {
// will store all the uniqueIDs for the cards
let uniqueIDs: number[] = [];

// deals with the creation of uniqueIDs
let i = 0;
while(i <= nOfIDs) {
    uniqueIDs.push(randomNumber(nOfIDs, uniqueIDs));
    i++;
}

return uniqueIDs;
}