import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  useUpdateEntry,
  useDeleteEntry, 
  getListEntriesQueryKey, 
  getGetEntryStatsQueryKey,
  type Entry,
  type Category
} from "@workspace/api-client-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit2, Loader2 } from "lucide-react";
import { MoodIcon } from "./mood-icon";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const editFormSchema = z.object({
  text: z.string().min(1, "Please write something about your day."),
  mood: z.enum(["great", "good", "okay", "bad", "awful"] as const),
  categoryIds: z.array(z.string()),
});

type EditFormValues = z.infer<typeof editFormSchema>;

interface TimelineEntryProps {
  entry: Entry;
  categories: Category[];
  style?: React.CSSProperties;
}

export function TimelineEntry({ entry, categories, style }: TimelineEntryProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const deleteEntry = useDeleteEntry();
  const updateEntry = useUpdateEntry();

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<EditFormValues>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      text: entry.text,
      mood: entry.mood,
      categoryIds: entry.categoryIds,
    },
  });

  const entryCategories = categories.filter(c => entry.categoryIds.includes(c.id));

  const handleDelete = () => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    
    deleteEntry.mutate(
      { id: entry.id },
      {
        onSuccess: () => {
          toast({ description: "Entry deleted." });
          queryClient.invalidateQueries({ queryKey: getListEntriesQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetEntryStatsQueryKey() });
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to delete entry.", variant: "destructive" });
        }
      }
    );
  };

  const handleEditSubmit = (data: EditFormValues) => {
    updateEntry.mutate(
      { id: entry.id, data },
      {
        onSuccess: () => {
          toast({ description: "Entry updated." });
          setIsEditing(false);
          queryClient.invalidateQueries({ queryKey: getListEntriesQueryKey() });
          queryClient.invalidateQueries({ queryKey: getGetEntryStatsQueryKey() });
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to update entry.", variant: "destructive" });
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
    <>
      <Card 
        className="p-5 bg-card/40 border-card-border hover:bg-card/60 transition-colors group relative animate-in fade-in slide-in-from-bottom-4 duration-500"
        style={style}
        data-testid={`card-entry-${entry.id}`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1 bg-background/50 p-2 rounded-full ring-1 ring-border/50">
            <MoodIcon mood={entry.mood} className="w-5 h-5" />
          </div>
          
          <div className="flex-grow space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-medium" data-testid={`text-date-${entry.id}`}>
                {format(new Date(entry.createdAt), "EEEE, MMMM d, yyyy")}
              </span>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => {
                    form.reset({ text: entry.text, mood: entry.mood, categoryIds: entry.categoryIds });
                    setIsEditing(true);
                  }}
                  data-testid={`button-edit-entry-${entry.id}`}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  onClick={handleDelete}
                  disabled={deleteEntry.isPending}
                  data-testid={`button-delete-entry-${entry.id}`}
                >
                  {deleteEntry.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            
            <p className="text-foreground text-lg leading-relaxed whitespace-pre-wrap" data-testid={`text-content-${entry.id}`}>
              {entry.text}
            </p>
            
            {entryCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {entryCategories.map(cat => (
                  <Badge 
                    key={cat.id} 
                    variant="secondary"
                    className="bg-muted text-muted-foreground hover:bg-muted"
                    style={cat.color ? { color: cat.color, backgroundColor: `${cat.color}15` } : {}}
                    data-testid={`badge-category-${cat.id}`}
                  >
                    {cat.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-lg bg-card border-card-border">
          <DialogHeader>
            <DialogTitle>Edit Entry</DialogTitle>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(handleEditSubmit)} className="space-y-6 pt-4">
            <Textarea
              className="min-h-[100px] resize-none bg-background/50 border-none focus-visible:ring-1 focus-visible:ring-primary/50"
              {...form.register("text")}
            />
            
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Mood</span>
                <div className="flex gap-2">
                  {(["great", "good", "okay", "bad", "awful"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => form.setValue("mood", m)}
                      className={cn(
                        "p-2 rounded-full transition-all hover:bg-muted/50",
                        selectedMood === m ? "bg-muted ring-1 ring-primary/30 scale-110" : "opacity-50 hover:opacity-100"
                      )}
                    >
                      <MoodIcon mood={m} className="w-6 h-6" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
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
                      >
                        {cat.name}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateEntry.isPending}>
                {updateEntry.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}