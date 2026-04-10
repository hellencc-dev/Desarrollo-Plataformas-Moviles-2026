import { useEffect, useState } from "react";
import {
  Haptics,
  ImpactStyle,
  NotificationType,
} from "@capacitor/haptics";

export default function useHaptics() {
  const [isAvailable, setIsAvailable] = useState(true);

  const checkAvailability = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
      setIsAvailable(true);
    } catch {
      setIsAvailable(false);
    }
  };

  useEffect(() => {
    checkAvailability();
  }, []);

  const impact = async (style: "light" | "medium" | "heavy") => {
    const map = {
      light: ImpactStyle.Light,
      medium: ImpactStyle.Medium,
      heavy: ImpactStyle.Heavy,
    };

    await Haptics.impact({ style: map[style] });
  };

  const notify = async (type: "success" | "warning" | "error") => {
    const map = {
      success: NotificationType.Success,
      warning: NotificationType.Warning,
      error: NotificationType.Error,
    };

    await Haptics.notification({ type: map[type] });
  };

  const vibrate = async () => {
    await Haptics.vibrate();
  };

  return { isAvailable, impact, notify, vibrate };
}