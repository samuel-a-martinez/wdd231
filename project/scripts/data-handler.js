// data-handler.js

/**
 * Fetches and parses JSON data from a given URL.
 * @param {string} url The URL of the JSON data.
 * @returns {Promise<any>} The parsed JSON data.
 */
export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Could not fetch data from ${url}:`, error);
        throw error; // Re-throw to allow the calling function to handle it
    }
}