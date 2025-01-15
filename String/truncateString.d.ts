/**
 * Truncates a string to a specified maximum length, appending an ellipsis if the string is longer.
 *
 * @param {string} str - The original string to be truncated.
 * @param {number} maxLength - The maximum length of the string, not including the ellipsis.
 * @param {string} [trailing='...'] - The string to append if the original string is truncated.
 * @return {string} The truncated string with an ellipsis if truncated, otherwise the original string.
 */
export declare const truncateString: (str: string, maxLength?: number, trailing?: string) => string;