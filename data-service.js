function DataService(results) {

    let isInit = false;

    function initData(results) {
        let parsedata = results.data;
        console.log(parsedata);
        // const spelling = trainSpelling(parsedata);
        isInit = true;
        return parsedata;
    }

    let data = initData(results);
    let selection = extractKeyValues(data);
    let wordleData;
    showSelections(selection);

    function extractKeyValues(data) {
        // data = doneParse();
        // Get all possible keys; delete empty keys and ignore column 1
        let keys = Object.keys(data[0]).filter((val) => {
            console.log(`val: ${val}`);
            return val !== "";
        });
        if (keys.length > 1) {
            keys = keys.slice(1, keys.length);
        } else {
            return keys;
        }
        // Create global object to hold the selection
        let selection = {};

        // Get all possible values for each key, then put the unique array into selection object
        // Result: selection = {key1: [value1, value2, value3], key2: [value1, value2, value3]}
        keys.map((val) => {
            let tempdata = data.map((sub) => sub[val]);
            let tempset = new Set(tempdata);
            selection[val] = [...tempset];
        });
        return selection;
    }

    return {
        getData() {
            if (!isInit) throw new Error(`You did not init the DataService yet dummy!!`);
            return data;
        },
        setWordleData(parseData) {
            wordleData = checkFilters()
        },
        getSelection() {
            return selection;
        },
        updateSelectionGroup(data) {
            selection = extractKeyValues(data);
        }
    }
}