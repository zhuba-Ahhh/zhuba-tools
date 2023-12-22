interface BatteryStatus {
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
    level: number;
}
declare const getBatteryStatus: () => Promise<BatteryStatus>;
