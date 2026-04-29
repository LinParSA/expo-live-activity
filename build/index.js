import { Platform } from 'react-native';
import ExpoLiveActivityModule from './ExpoLiveActivityModule';
function assertIOS(name) {
    const isIOS = Platform.OS === 'ios';
    if (!isIOS)
        console.error(`${name} is only available on iOS`);
    return isIOS;
}
function normalizeConfig(config) {
    if (config === undefined)
        return config;
    const { padding, imageSize, smallImageSize, progressSegmentActiveColor, progressSegmentInactiveColor, ...base } = config;
    const normalized = {
        ...base,
        progressSegmentActiveColor,
        progressSegmentInactiveColor,
    };
    // Normalize padding: keep number in padding, object in paddingDetails
    if (typeof padding === 'number') {
        normalized.padding = padding;
    }
    else if (typeof padding === 'object') {
        normalized.paddingDetails = padding;
    }
    // Helper to parse a dimension value (number or percent string like '50%')
    const parseDimension = (value, fieldName) => {
        if (value === undefined)
            return {};
        if (typeof value === 'number')
            return { absolute: value };
        const regExp = /^(100(?:\.0+)?|\d{1,2}(?:\.\d+)?)%$/; // Matches 0.0% to 100.0%
        const match = value.trim().match(regExp);
        if (match)
            return { percent: Number(match[1]) };
        throw new Error(`${fieldName} percent string must be in format "0%" to "100%"`);
    };
    // Normalize imageSize
    if (imageSize) {
        const w = parseDimension(imageSize.width, 'imageSize.width');
        const h = parseDimension(imageSize.height, 'imageSize.height');
        if (w.absolute !== undefined)
            normalized.imageWidth = w.absolute;
        if (w.percent !== undefined)
            normalized.imageWidthPercent = w.percent;
        if (h.absolute !== undefined)
            normalized.imageHeight = h.absolute;
        if (h.percent !== undefined)
            normalized.imageHeightPercent = h.percent;
    }
    // Normalize smallImageSize
    if (smallImageSize) {
        const w = parseDimension(smallImageSize.width, 'smallImageSize.width');
        const h = parseDimension(smallImageSize.height, 'smallImageSize.height');
        if (w.absolute !== undefined)
            normalized.smallImageWidth = w.absolute;
        if (w.percent !== undefined)
            normalized.smallImageWidthPercent = w.percent;
        if (h.absolute !== undefined)
            normalized.smallImageHeight = h.absolute;
        if (h.percent !== undefined)
            normalized.smallImageHeightPercent = h.percent;
    }
    return normalized;
}
/**
 * @param {LiveActivityState} state The state for the live activity.
 * @param {LiveActivityConfig} config Live activity config object.
 * @param {number} relevanceScore A score you assign that determines the order in which your Live Activities appear when you start several Live Activities for your app. The relevance score is a number between 0.0 and 1.0, with 1.0 being the highest possible score.
 * @returns {string} The identifier of the started activity or undefined if creating live activity failed.
 */
export function startActivity(state, config, relevanceScore) {
    if (assertIOS('startActivity'))
        return ExpoLiveActivityModule.startActivity(state, normalizeConfig(config), relevanceScore);
}
/**
 * @param {string} id The identifier of the activity to stop.
 * @param {LiveActivityState} state The updated state for the live activity.
 * @param {number} relevanceScore A score you assign that determines the order in which your Live Activities appear when you start several Live Activities for your app. The relevance score is a number between 0.0 and 1.0, with 1.0 being the highest possible score.
 */
export function stopActivity(id, state, relevanceScore) {
    if (assertIOS('stopActivity'))
        return ExpoLiveActivityModule.stopActivity(id, state, relevanceScore);
}
/**
 * @param {string} id The identifier of the activity to update.
 * @param {LiveActivityState} state The updated state for the live activity.
 * @param {number} relevanceScore A score you assign that determines the order in which your Live Activities appear when you start several Live Activities for your app. The relevance score is a number between 0.0 and 1.0, with 1.0 being the highest possible score.
 */
export function updateActivity(id, state, relevanceScore) {
    if (assertIOS('updateActivity'))
        return ExpoLiveActivityModule.updateActivity(id, state, relevanceScore);
}
/**
 * @param {function} updateTokenListener The listener function that will be called when an update token is received.
 */
export function addActivityTokenListener(updateTokenListener) {
    if (assertIOS('addActivityTokenListener'))
        return ExpoLiveActivityModule.addListener('onTokenReceived', updateTokenListener);
}
/**
 * Adds a listener that is called when a push-to-start token is received. Supported only on iOS > 17.2.
 * On earlier iOS versions, the listener will return null as a token.
 * @param {function} listener The listener function that will be called when the observer starts and then when a push-to-start token is received.
 */
export function addActivityPushToStartTokenListener(listener) {
    if (assertIOS('addActivityPushToStartTokenListener'))
        return ExpoLiveActivityModule.addListener('onPushToStartTokenReceived', listener);
}
/**
 * @param {function} statusListener The listener function that will be called when an activity status changes.
 */
export function addActivityUpdatesListener(statusListener) {
    if (assertIOS('addActivityUpdatesListener'))
        return ExpoLiveActivityModule.addListener('onStateChange', statusListener);
}
//# sourceMappingURL=index.js.map