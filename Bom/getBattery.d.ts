export interface BatteryStatus {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
}
export interface BatterySupportingNavigator extends Navigator {
    getBattery?: () => Promise<BatteryStatus>;
}
export declare const getBatteryStatus: () => Promise<BatteryStatus>;
