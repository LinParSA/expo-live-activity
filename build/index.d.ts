import { EventSubscription } from 'expo-modules-core';
type Voidable<T> = T | void;
export type DynamicIslandTimerType = 'circular' | 'digital';
export type ElapsedTimer = {
    startDate: number;
};
type ProgressBarType = {
    date?: number;
    progress?: undefined;
    elapsedTimer?: undefined;
    currentStep?: undefined;
    totalSteps?: undefined;
} | {
    date?: undefined;
    progress?: number;
    elapsedTimer?: undefined;
    currentStep?: undefined;
    totalSteps?: undefined;
} | {
    date?: undefined;
    progress?: undefined;
    elapsedTimer?: ElapsedTimer;
    currentStep?: undefined;
    totalSteps?: undefined;
} | {
    date?: undefined;
    progress?: undefined;
    elapsedTimer?: undefined;
    currentStep?: number;
    totalSteps?: number;
};
export type LiveActivityState = {
    title: string;
    subtitle?: string;
    progressBar?: ProgressBarType;
    imageName?: string;
    dynamicIslandImageName?: string;
    smallImageName?: string;
};
export type NativeLiveActivityState = {
    title: string;
    subtitle?: string;
    date?: number;
    progress?: number;
    imageName?: string;
    dynamicIslandImageName?: string;
};
export type Padding = {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    vertical?: number;
    horizontal?: number;
} | number;
export type ImagePosition = 'left' | 'right' | 'leftStretch' | 'rightStretch';
export type ImageAlign = 'top' | 'center' | 'bottom';
export type ImageDimension = number | `${number}%`;
export type ImageSize = {
    width?: ImageDimension;
    height?: ImageDimension;
};
export type ImageContentFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
export type LiveActivityConfig = {
    backgroundColor?: string;
    titleColor?: string;
    subtitleColor?: string;
    progressViewTint?: string;
    progressViewLabelColor?: string;
    deepLinkUrl?: string;
    timerType?: DynamicIslandTimerType;
    padding?: Padding;
    imagePosition?: ImagePosition;
    imageAlign?: ImageAlign;
    imageSize?: ImageSize;
    smallImageSize?: ImageSize;
    contentFit?: ImageContentFit;
    progressSegmentActiveColor?: string;
    progressSegmentInactiveColor?: string;
};
export type ActivityTokenReceivedEvent = {
    activityID: string;
    activityName: string;
    activityPushToken: string;
};
export type ActivityPushToStartTokenReceivedEvent = {
    activityPushToStartToken: string | null;
};
type ActivityState = 'active' | 'dismissed' | 'pending' | 'stale' | 'ended';
export type ActivityUpdateEvent = {
    activityID: string;
    activityName: string;
    activityState: ActivityState;
};
export type LiveActivityModuleEvents = {
    onTokenReceived: (params: ActivityTokenReceivedEvent) => void;
    onPushToStartTokenReceived: (params: ActivityPushToStartTokenReceivedEvent) => void;
    onStateChange: (params: ActivityUpdateEvent) => void;
};
/**
 * @param {LiveActivityState} state The state for the live activity.
 * @param {LiveActivityConfig} config Live activity config object.
 * @param {number} relevanceScore A score you assign that determines the order in which your Live Activities appear when you start several Live Activities for your app. The relevance score is a number between 0.0 and 1.0, with 1.0 being the highest possible score.
 * @returns {string} The identifier of the started activity or undefined if creating live activity failed.
 */
export declare function startActivity(state: LiveActivityState, config?: LiveActivityConfig, relevanceScore?: number): Voidable<string>;
/**
 * @param {string} id The identifier of the activity to stop.
 * @param {LiveActivityState} state The updated state for the live activity.
 * @param {number} relevanceScore A score you assign that determines the order in which your Live Activities appear when you start several Live Activities for your app. The relevance score is a number between 0.0 and 1.0, with 1.0 being the highest possible score.
 */
export declare function stopActivity(id: string, state: LiveActivityState, relevanceScore?: number): any;
/**
 * @param {string} id The identifier of the activity to update.
 * @param {LiveActivityState} state The updated state for the live activity.
 * @param {number} relevanceScore A score you assign that determines the order in which your Live Activities appear when you start several Live Activities for your app. The relevance score is a number between 0.0 and 1.0, with 1.0 being the highest possible score.
 */
export declare function updateActivity(id: string, state: LiveActivityState, relevanceScore?: number): any;
/**
 * @param {function} updateTokenListener The listener function that will be called when an update token is received.
 */
export declare function addActivityTokenListener(updateTokenListener: (event: ActivityTokenReceivedEvent) => void): Voidable<EventSubscription>;
/**
 * Adds a listener that is called when a push-to-start token is received. Supported only on iOS > 17.2.
 * On earlier iOS versions, the listener will return null as a token.
 * @param {function} listener The listener function that will be called when the observer starts and then when a push-to-start token is received.
 */
export declare function addActivityPushToStartTokenListener(listener: (event: ActivityPushToStartTokenReceivedEvent) => void): Voidable<EventSubscription>;
/**
 * @param {function} statusListener The listener function that will be called when an activity status changes.
 */
export declare function addActivityUpdatesListener(statusListener: (event: ActivityUpdateEvent) => void): Voidable<EventSubscription>;
export {};
//# sourceMappingURL=index.d.ts.map