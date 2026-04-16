import { Haptics, ImpactStyle } from "@capacitor/haptics";

export const useHaptics = () => {
  const impact = async (style: "light" | "medium" | "heavy" = "medium") => {
    const map = {
      light: ImpactStyle.Light,
      medium: ImpactStyle.Medium,
      heavy: ImpactStyle.Heavy,
    };

    await Haptics.impact({
      style: map[style],
    });
  };

  return { impact };
};