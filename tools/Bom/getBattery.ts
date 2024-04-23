// 获取电池状态

export interface BatteryStatus {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

export interface BatterySupportingNavigator extends Navigator {
  getBattery?: () => Promise<BatteryStatus>;
}

export const getBatteryStatus = async (): Promise<BatteryStatus> => {
  if (!(navigator as BatterySupportingNavigator).getBattery) {
    throw new Error('Battery status is not supported by this browser.');
  }

  const battery: Record<string, any> = await (
    navigator as Required<BatterySupportingNavigator>
  ).getBattery();
  return {
    charging: battery.charging,
    chargingTime: battery.chargingTime,
    dischargingTime: battery.dischargingTime,
    level: battery.level
  };
};
