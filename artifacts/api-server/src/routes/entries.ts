import { Router, type IRouter } from "express";
import { supabase } from "../lib/supabase";
import {
  CreateEntryBody,
  UpdateEntryBody,
  UpdateEntryParams,
  DeleteEntryParams,
  GetEntryParams,
  ListEntriesQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/entries/stats", async (_req, res): Promise<void> => {
  const { data: entries, error } = await supabase
    .from("entries")
    .select("id, mood, category_ids, created_at");

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const totalEntries = entries.length;

  const moodCounts: Record<string, number> = {
    great: 0,
    good: 0,
    okay: 0,
    bad: 0,
    awful: 0,
  };
  for (const e of entries) {
    if (e.mood in moodCounts) moodCounts[e.mood]++;
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name");

  const categoryCountMap: Record<string, { categoryName: string; count: number }> = {};
  for (const cat of categories ?? []) {
    categoryCountMap[cat.id] = { categoryName: cat.name, count: 0 };
  }
  for (const e of entries) {
    for (const catId of e.category_ids ?? []) {
      if (categoryCountMap[catId]) {
        categoryCountMap[catId].count++;
      }
    }
  }

  const sortedDates = entries
    .map((e) => e.created_at.slice(0, 10))
    .sort((a, b) => b.localeCompare(a));

  let currentStreak = 0;
  if (sortedDates.length > 0) {
    const uniqueDates = [...new Set(sortedDates)];
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (uniqueDates[0] === today || uniqueDates[0] === yesterday) {
      currentStreak = 1;
      for (let i = 1; i < uniqueDates.length; i++) {
        const prev = new Date(uniqueDates[i - 1]);
        const curr = new Date(uniqueDates[i]);
        const diff = (prev.getTime() - curr.getTime()) / 86400000;
        if (diff === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
  }

  res.json({
    totalEntries,
    currentStreak,
    moodCounts: Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      count,
    })),
    categoryCounts: Object.entries(categoryCountMap).map(
      ([categoryId, { categoryName, count }]) => ({
        categoryId,
        categoryName,
        count,
      })
    ),
  });
});

router.get("/entries", async (req, res): Promise<void> => {
  const parsed = ListEntriesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  let query = supabase
    .from("entries")
    .select("*")
    .order("created_at", { ascending: false });

  if (parsed.data.search) {
    query = query.ilike("text", `%${parsed.data.search}%`);
  }

  if (parsed.data.categoryId) {
    query = query.contains("category_ids", [parsed.data.categoryId]);
  }

  const { data, error } = await query;

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const entries = (data ?? []).map((row) => ({
    id: row.id,
    text: row.text,
    mood: row.mood,
    categoryIds: row.category_ids ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));

  res.json(entries);
});

router.post("/entries", async (req, res): Promise<void> => {
  const parsed = CreateEntryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { text, mood, categoryIds } = parsed.data;

  const { data, error } = await supabase
    .from("entries")
    .insert({ text, mood, category_ids: categoryIds })
    .select()
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(201).json({
    id: data.id,
    text: data.text,
    mood: data.mood,
    categoryIds: data.category_ids ?? [],
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  });
});

router.get("/entries/:id", async (req, res): Promise<void> => {
  const params = GetEntryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("id", params.data.id)
    .single();

  if (error || !data) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  res.json({
    id: data.id,
    text: data.text,
    mood: data.mood,
    categoryIds: data.category_ids ?? [],
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  });
});

router.patch("/entries/:id", async (req, res): Promise<void> => {
  const params = UpdateEntryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = UpdateEntryBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const updates: Record<string, unknown> = {};
  if (body.data.text !== undefined) updates.text = body.data.text;
  if (body.data.mood !== undefined) updates.mood = body.data.mood;
  if (body.data.categoryIds !== undefined)
    updates.category_ids = body.data.categoryIds;
  updates.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("entries")
    .update(updates)
    .eq("id", params.data.id)
    .select()
    .single();

  if (error || !data) {
    res.status(404).json({ error: "Entry not found" });
    return;
  }

  res.json({
    id: data.id,
    text: data.text,
    mood: data.mood,
    categoryIds: data.category_ids ?? [],
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  });
});

router.delete("/entries/:id", async (req, res): Promise<void> => {
  const params = DeleteEntryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { error } = await supabase
    .from("entries")
    .delete()
    .eq("id", params.data.id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.sendStatus(204);
});

export default router;
