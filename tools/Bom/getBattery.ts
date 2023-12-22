// 获取电池状态

interface BatteryStatus {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
}

const getBatteryStatus = async (): Promise<BatteryStatus> => {
  if (!navigator.getBattery) {
    throw new Error('Battery status is not supported by this browser.');
  }

  const battery: Record<string, any> = await navigator.getBattery();
  return {
    charging: battery.charging,
    chargingTime: battery.chargingTime,
    dischargingTime: battery.dischargingTime,
    level: battery.level
  };
};

// 使用示例
getBatteryStatus()
  .then((status) => {
    console.log(status);
  })
  .catch((error) => {
    console.error(error);
  });
