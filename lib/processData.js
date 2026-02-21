function findData(data, sentence) {
    if (typeof sentence === 'string' && sentence.match(/\$\{.*?}/g) !== null)
        return findData(data, sentence.replace(/\$\{(.*?)}/g, (_, key) => {
            return data[key] || '';
        }))
    return sentence;
}

function addPunctuation(sentence) {
    const vowel = 'AEIOUaeiou'
    if (vowel.includes(sentence[0]))
        return 'an ' + sentence;
    return 'a ' + sentence;
}

function processValue(fullDataObject, valueToProcess) {
    if (typeof valueToProcess === 'string') {
        return findData(fullDataObject, valueToProcess);
    }

    if (Array.isArray(valueToProcess)) {
        return valueToProcess.map(item => processValue(fullDataObject, item));
    }

    if (typeof valueToProcess === 'object' && valueToProcess !== null) {
        const newObj = {};
        for (const key in valueToProcess) {
            newObj[key] = processValue(fullDataObject, valueToProcess[key]);
        }
        return newObj;
    }

    return valueToProcess;
}


function processData(data) {
    let processedData = processValue(data, data);

    let punctuation_roles = []
    processedData.roles.forEach(role => {
        punctuation_roles.push(addPunctuation(role))
    })

    processedData['punctuation_roles'] = punctuation_roles;
    return processedData;
}

export default processData;