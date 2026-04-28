import { useGetEntryStats, getGetEntryStatsQueryKey, type Mood } from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Flame, BookOpen, BarChart3 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { MoodIcon } from "./mood-icon";

const MOODS: Mood[] = ["great", "good", "okay", "bad", "awful"];

export function StatsWidget() {
  const { data: stats, isLoading } = useGetEntryStats({
    query: { queryKey: getGetEntryStatsQueryKey() }
  });

  if (isLoading || !stats) {
    return <Skeleton className="h-[200px] w-full rounded-xl" />;
  }

  const topMood = stats.moodCounts.length > 0 
    ? [...stats.moodCounts].sort((a, b) => b.count - a.count)[0] 
    : null;

  return (
    <Card className="bg-card border-card-border p-5 h-full" data-testid="stats-widget">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        Your Journey
      </h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background/50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <Flame className="w-6 h-6 text-orange-500 mb-2" />
            <span className="text-2xl font-semibold text-foreground">{stats.currentStreak}</span>
            <span className="text-xs text-muted-foreground">Day Streak</span>
          </div>
          
          <div className="bg-background/50 rounded-lg p-4 flex flex-col items-center justify-center text-center">
            <BookOpen className="w-6 h-6 text-blue-400 mb-2" />
            <span className="text-2xl font-semibold text-foreground">{stats.totalEntries}</span>
            <span className="text-xs text-muted-foreground">Total Entries</span>
          </div>
        </div>

        {stats.moodCounts.length > 0 && (
          <div className="bg-background/50 rounded-lg p-4">
            <span className="text-xs text-muted-foreground block mb-3 text-center">Mood Distribution</span>
            <div className="flex items-end justify-between h-16 gap-1">
              {MOODS.map(mood => {
                const count = stats.moodCounts.find(m => m.mood === mood)?.count || 0;
                const maxCount = Math.max(...stats.moodCounts.map(m => m.count));
                const height = maxCount > 0 ? `${Math.max((count / maxCount) * 100, 10)}%` : '10%';
                
                return (
                  <div key={mood} className="flex flex-col items-center gap-2 flex-1 group">
                    <div className="w-full bg-muted rounded-t-sm relative group-hover:bg-primary/20 transition-colors" style={{ height }}>
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {count}
                      </span>
                    </div>
                    <MoodIcon mood={mood} className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}