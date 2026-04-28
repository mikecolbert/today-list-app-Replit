import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useListCategories, 
  useCreateCategory, 
  useUpdateCategory, 
  useDeleteCategory,
  getListCategoriesQueryKey,
} from "@workspace/api-client-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tags, Plus, Trash2, Loader2, Check, Pencil, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const COLORS = [
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
  "#64748b",
];

export function CategoryManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatColor, setNewCatColor] = useState(COLORS[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  
  const { data: categories = [], isLoading } = useListCategories({
    query: { queryKey: getListCategoriesQueryKey(), enabled: isOpen }
  });
  
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    
    createCategory.mutate(
      { data: { name: newCatName.trim(), color: newCatColor } },
      {
        onSuccess: () => {
          setNewCatName("");
          queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() });
          toast({ description: "Category added." });
        }
      }
    );
  };

  const startEditing = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleRename = (id: string) => {
    const trimmed = editingName.trim();
    if (!trimmed) return;

    updateCategory.mutate(
      { id, data: { name: trimmed } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() });
          toast({ description: "Category renamed." });
          cancelEditing();
        },
        onError: () => {
          toast({ description: "Failed to rename category.", variant: "destructive" });
        }
      }
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this category?")) return;
    
    deleteCategory.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() });
          toast({ description: "Category deleted." });
        }
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" data-testid="button-manage-categories">
          <Tags className="w-4 h-4" />
          Manage Tags
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card border-card-border">
        <DialogHeader>
          <DialogTitle>Manage Tags</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <form onSubmit={handleCreate} className="space-y-3">
            <div className="flex gap-2">
              <Input 
                placeholder="New tag name..." 
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
                className="flex-1"
                data-testid="input-new-category"
              />
              <Button type="submit" disabled={createCategory.isPending || !newCatName.trim()}>
                {createCategory.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              </Button>
            </div>
            <div className="flex gap-2 p-2 bg-background/50 rounded-md">
              {COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setNewCatColor(c)}
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110"
                  style={{ backgroundColor: c }}
                  data-testid={`color-picker-${c}`}
                >
                  {newCatColor === c && <Check className="w-3 h-3 text-white" />}
                </button>
              ))}
            </div>
          </form>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
            {isLoading ? (
              <div className="flex justify-center p-4"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
            ) : categories.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-4">No custom tags yet.</p>
            ) : (
              categories.map(cat => (
                <div key={cat.id} className="flex items-center justify-between p-2 rounded-md bg-background/50 border border-border/50 group">
                  {editingId === cat.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color || COLORS[0] }} />
                      <Input
                        value={editingName}
                        onChange={e => setEditingName(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === "Enter") handleRename(cat.id);
                          if (e.key === "Escape") cancelEditing();
                        }}
                        className="h-7 text-sm flex-1"
                        autoFocus
                        data-testid={`input-rename-category-${cat.id}`}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-green-500 hover:text-green-400"
                        onClick={() => handleRename(cat.id)}
                        disabled={updateCategory.isPending || !editingName.trim()}
                        data-testid={`button-save-rename-${cat.id}`}
                      >
                        {updateCategory.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-foreground"
                        onClick={cancelEditing}
                        data-testid={`button-cancel-rename-${cat.id}`}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color || COLORS[0] }} />
                        <span className="font-medium text-sm">{cat.name}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => startEditing(cat.id, cat.name)}
                          data-testid={`button-edit-category-${cat.id}`}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(cat.id)}
                          disabled={deleteCategory.isPending}
                          data-testid={`button-delete-category-${cat.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
