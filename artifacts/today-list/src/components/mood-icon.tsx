import { Sun, CloudRain, Cloud, CloudLightning, CloudDrizzle } from "lucide-react";
import type { Mood } from "@workspace/api-client-react";

interface MoodIconProps {
  mood: Mood;
  className?: string;
}

export function MoodIcon({ mood, className }: MoodIconProps) {
  switch (mood) {
    case "great":
      return <Sun className={`text-amber-400 ${className}`} data-testid={`mood-icon-great`} />;
    case "good":
      return <Cloud className={`text-blue-300 ${className}`} data-testid={`mood-icon-good`} />;
    case "okay":
      return <CloudRain className={`text-slate-400 ${className}`} data-testid={`mood-icon-okay`} />;
    case "bad":
      return <CloudLightning className={`text-indigo-400 ${className}`} data-testid={`mood-icon-bad`} />;
    case "awful":
      return <CloudDrizzle className={`text-slate-500 ${className}`} data-testid={`mood-icon-awful`} />;
    default:
      return <Cloud className={className} />;
  }
}
