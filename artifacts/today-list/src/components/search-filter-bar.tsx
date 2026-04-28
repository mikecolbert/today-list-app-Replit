import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useListCategories, getListCategoriesQueryKey } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  categoryId: string;
  onCategoryChange: (id: string) => void;
}

export function SearchFilterBar({ search, onSearchChange, categoryId, onCategoryChange }: SearchFilterBarProps) {
  const { data: categories = [] } = useListCategories({
    query: { queryKey: getListCategoriesQueryKey() }
  });

  return (
    <div className="space-y-3" data-testid="search-filter-bar">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input 
          placeholder="Search your journal..." 
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="pl-9 bg-card/50 border-border/50 focus-visible:bg-card"
          data-testid="input-search"
        />
      </div>
      
      <ScrollArea className="w-full whitespace-nowrap pb-2">
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className={cn(
              "cursor-pointer px-3 py-1 transition-colors",
              categoryId === "all" ? "bg-primary/20 border-primary/50 text-primary" : "bg-card/50 hover:bg-card"
            )}
            onClick={() => onCategoryChange("all")}
            data-testid="filter-category-all"
          >
            All
          </Badge>
          {categories.map(cat => (
            <Badge
              key={cat.id}
              variant="outline"
              className={cn(
                "cursor-pointer px-3 py-1 transition-colors",
                categoryId === cat.id ? "bg-primary/20 border-primary/50" : "bg-card/50 hover:bg-card"
              )}
              style={categoryId === cat.id && cat.color ? { color: cat.color, borderColor: `${cat.color}50`, backgroundColor: `${cat.color}20` } : {}}
              onClick={() => onCategoryChange(cat.id)}
              data-testid={`filter-category-${cat.id}`}
            >
              {cat.name}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden" />
      </ScrollArea>
    </div>
  );
}