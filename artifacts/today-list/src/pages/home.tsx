import { useState } from "react";
import { EntryComposer } from "@/components/entry-composer";
import { Timeline } from "@/components/timeline";
import { StatsWidget } from "@/components/stats-widget";
import { CategoryManager } from "@/components/category-manager";
import { SearchFilterBar } from "@/components/search-filter-bar";
import { Moon } from "lucide-react";

export function Home() {
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground pb-20 selection:bg-primary/20 selection:text-primary">
      <div className="max-w-4xl mx-auto px-4 pt-12 md:pt-20">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Moon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Today List</h1>
              <p className="text-sm text-muted-foreground">Your nightly ritual</p>
            </div>
          </div>
          <CategoryManager />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Content Column */}
          <div className="md:col-span-8 space-y-8">
            <section>
              <EntryComposer />
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <h2 className="text-lg font-medium tracking-tight">Timeline</h2>
              </div>
              <SearchFilterBar 
                search={search} 
                onSearchChange={setSearch} 
                categoryId={categoryId} 
                onCategoryChange={setCategoryId} 
              />
              <Timeline search={search} categoryId={categoryId} />
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="md:col-span-4">
            <div className="sticky top-8">
              <StatsWidget />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}