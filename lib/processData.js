// This function remains the same, it correctly replaces placeholders in a string.
function findData(data, sentence) {
    if (typeof sentence === 'string' && sentence.match(/\$\{.*?}/g) !== null)
        return findData(data, sentence.replace(/\$\{(.*?)}/g, (_, key) => {
            return data[key] || '';
        }))
    return sentence;
}

// This function also remains the same.
function addPunctuation(sentence) {
    const vowel = 'AEIOUaeiou'
    if (vowel.includes(sentence[0]))
        return 'an ' + sentence;
    return 'a ' + sentence;
}

/**
 * A new recursive function to process any value (string, object, or array).
 */
function processValue(fullDataObject, valueToProcess) {
    // 1. If it's a string, run the replacement function
    if (typeof valueToProcess === 'string') {
        return findData(fullDataObject, valueToProcess);
    }

    // 2. If it's an array, process each item in the array recursively
    if (Array.isArray(valueToProcess)) {
        return valueToProcess.map(item => processValue(fullDataObject, item));
    }

    // 3. If it's an object, process each value in the object recursively
    if (typeof valueToProcess === 'object' && valueToProcess !== null) {
        const newObj = {};
        for (const key in valueToProcess) {
            newObj[key] = processValue(fullDataObject, valueToProcess[key]);
        }
        return newObj;
    }

    // 4. Otherwise, return the value as is (e.g., numbers, booleans)
    return valueToProcess;
}


// Your main function now uses the new recursive processor.
function processData(data) {
    // The new recursive function handles all the replacements.
    let processedData = processValue(data, data);

    // Your punctuation logic can now run on the fully processed data.
    let punctuation_roles = []
    processedData.roles.forEach(role => {
        punctuation_roles.push(addPunctuation(role))
    })

    processedData['punctuation_roles'] = punctuation_roles;
    return processedData;
}

export default processData;