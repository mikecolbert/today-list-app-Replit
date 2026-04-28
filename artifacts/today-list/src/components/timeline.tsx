import { useListEntries, useListCategories, getListEntriesQueryKey, getListCategoriesQueryKey } from "@workspace/api-client-react";
import { TimelineEntry } from "./timeline-entry";
import { Skeleton } from "@/components/ui/skeleton";
import { BookDashed } from "lucide-react";

interface TimelineProps {
  search?: string;
  categoryId?: string;
}

export function Timeline({ search, categoryId }: TimelineProps) {
  const { data: entries = [], isLoading: loadingEntries } = useListEntries(
    { search: search || undefined, categoryId: categoryId === "all" ? undefined : categoryId },
    { query: { queryKey: getListEntriesQueryKey({ search: search || undefined, categoryId: categoryId === "all" ? undefined : categoryId }) } }
  );
  
  const { data: categories = [], isLoading: loadingCategories } = useListCategories({
    query: { queryKey: getListCategoriesQueryKey() }
  });

  const isLoading = loadingEntries || loadingCategories;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-5 border rounded-xl bg-card/20 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4 text-muted-foreground">
          <BookDashed className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No entries found</h3>
        <p className="text-muted-foreground">
          {search || (categoryId && categoryId !== "all") 
            ? "Try adjusting your filters to find what you're looking for." 
            : "Your journal is empty. Write your first entry above."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" data-testid="timeline-list">
      {entries.map((entry, idx) => (
        <TimelineEntry 
          key={entry.id} 
          entry={entry} 
          categories={categories} 
          style={{ animationDelay: `${idx * 100}ms` }}
        />
      ))}
    </div>
  );
}