interface BatteryStatus {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
}
export declare const getBatteryStatus: () => Promise<BatteryStatus>;
export {};
