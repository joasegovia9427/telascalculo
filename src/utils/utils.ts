export function generateId() {
    return crypto.randomUUID();
}

export function getTextOccurrencesCounter(object: unknown, searchText: string) {
    const objectJsonString = JSON.stringify(object);
    const searchLower = searchText.toLowerCase().trim();
    if (!searchLower) return 0;
    const escapedSearch = searchLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSearch, 'gi');
    const matches = objectJsonString.match(regex);
    return matches?.length ?? 0;
}
