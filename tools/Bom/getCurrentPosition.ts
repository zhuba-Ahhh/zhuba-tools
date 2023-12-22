/* eslint-disable @typescript-eslint/no-unnecessary-condition */

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
export const getCurrentPosition = (): Promise<Position> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy, altitude, altitudeAccuracy, speed, heading } =
          position.coords;
        resolve({
          timestamp: position.timestamp,
          latitude,
          longitude,
          accuracy,
          altitude,
          altitudeAccuracy,
          speed,
          heading
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};
