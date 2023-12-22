interface Position {
    timestamp: number;
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude: number | null;
    altitudeAccuracy: number | null;
    speed: number | null;
    heading: number | null;
}
/**
 * @description 获取地理位置
 * @returns
 */
export declare const getCurrentPosition: () => Promise<Position>;
export {};
