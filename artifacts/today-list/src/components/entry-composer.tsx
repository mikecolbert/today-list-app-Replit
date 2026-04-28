import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  useCreateEntry, 
  useListCategories, 
  getListEntriesQueryKey,
  getGetEntryStatsQueryKey,
  getListCategoriesQueryKey,
  type Mood 
} from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MoodIcon } from "./mood-icon";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  text: z.string().min(1, "Please write something about your day."),
  mood: z.enum(["great", "good", "okay", "bad", "awful"] as const),
  categoryIds: z.array(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

const MOODS: Mood[] = ["great", "good", "okay", "bad", "awful"];

export function EntryComposer() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: categories = [] } = useListCategories({
    query: { queryKey: getListCategoriesQueryKey() }
  });
  
  const createEntry = useCreateEntry();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      mood: "good",
      categoryIds: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    createEntry.mutate(
      { data },
      {
        onSuccess: () => {
          form.reset({ text: "", mood: "good", categoryIds: [] });
          toast({
            description: "Entry saved. Rest well.",
          });
          queryClient.invalidateQueries({ queryKey: getListEntriesQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetEntryStatsQueryKey() });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Could not save entry.",
            variant: "destructive",
          });
        }
      }
    );
  };

  const selectedMood = form.watch("mood");
  const selectedCategories = form.watch("categoryIds");

  const toggleCategory = (id: string) => {
    const current = new Set(selectedCategories);
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    form.setValue("categoryIds", Array.from(current), { shouldDirty: true });
  };

  return (
    <Card className="p-4 md:p-6 bg-card border-card-border shadow-md">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Textarea
          placeholder="How was today?"
          className="min-h-[100px] resize-none bg-background/50 border-none focus-visible:ring-1 focus-visible:ring-primary/50 text-lg placeholder:text-muted-foreground/50 transition-all"
          data-testid="input-entry-text"
          {...form.register("text")}
        />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Mood</span>
            <div className="flex gap-2">
              {MOODS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => form.setValue("mood", m)}
                  className={cn(
                    "p-2 rounded-full transition-all hover:bg-muted/50",
                    selectedMood === m ? "bg-muted ring-1 ring-primary/30 scale-110" : "opacity-50 hover:opacity-100"
                  )}
                  data-testid={`button-select-mood-${m}`}
                >
                  <MoodIcon mood={m} className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tags</span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategories.includes(cat.id);
                return (
                  <Badge
                    key={cat.id}
                    variant="outline"
                    className={cn(
                      "cursor-pointer transition-colors px-3 py-1",
                      isSelected ? "bg-primary/20 border-primary/50 text-primary" : "hover:bg-muted"
                    )}
                    style={{
                      ...(isSelected && cat.color ? { backgroundColor: `${cat.color}20`, borderColor: `${cat.color}50`, color: cat.color } : {})
                    }}
                    onClick={() => toggleCategory(cat.id)}
                    data-testid={`button-toggle-category-${cat.id}`}
                  >
                    {cat.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-border/50">
          <Button 
            type="submit" 
            disabled={createEntry.isPending}
            className="w-full sm:w-auto font-medium tracking-wide"
            data-testid="button-submit-entry"
          >
            {createEntry.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Entry
          </Button>
        </div>
      </form>
    </Card>
  );
}