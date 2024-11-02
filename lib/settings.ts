import { Models } from "@/app/types";
import { z } from "zod";

export const settingsLocalStorageKey = "openArtifacts:settings";

export const settingsSchema = z.object({
  anthropicApiKey: z.string(),
  openaiApiKey: z.string(),
  model: z.nativeEnum(Models),
});

export type SettingsSchema = z.infer<typeof settingsSchema>;

const defaultSettings: SettingsSchema = {
  anthropicApiKey: "",
  openaiApiKey: "",
  model: Models.claude,
};

export const getSettings = (): SettingsSchema => {
  if (typeof window === 'undefined') {
    return defaultSettings;
  }

  const storedSettings = window.localStorage.getItem(settingsLocalStorageKey);

  if (!storedSettings) {
    return defaultSettings;
  }

  try {
    const parsedSettings = JSON.parse(storedSettings);
    const mergedSettings: SettingsSchema = {
      ...defaultSettings,
      ...parsedSettings,
    };

    if (
      mergedSettings.model !== null &&
      !Object.values(Models).includes(mergedSettings.model)
    ) {
      console.warn(
        `Invalid model value: ${mergedSettings.model}. Resetting to default.`
      );
      mergedSettings.model = Models.claude;
    }

    return settingsSchema.parse(mergedSettings);
  } catch (error) {
    console.error("Error parsing stored settings:", error);
    return defaultSettings;
  }
};

export const updateSettings = (newSettings: SettingsSchema) => {
  if (typeof window === 'undefined') return;
  
  window.localStorage.setItem(
    settingsLocalStorageKey,
    JSON.stringify(newSettings)
  );
};