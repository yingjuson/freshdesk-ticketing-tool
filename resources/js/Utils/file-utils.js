export const formatByteUnits = (bytes) => {
    if (bytes >= 1048576) {
        const convertedValue = (bytes / 1048576).toFixed(2);
        return `${convertedValue} MB`;
    }

    if (bytes >= 1024) {
        const convertedValue = (bytes / 1024).toFixed(2);
        return `${convertedValue} KB`;
    }

    if (bytes > 1) {
        return `${bytes} bytes`;
    }

    if (bytes === 1) {
        return `${bytes} byte`;
    }
};
