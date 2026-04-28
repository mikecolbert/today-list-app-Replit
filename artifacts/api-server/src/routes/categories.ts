import { Router, type IRouter } from "express";
import { supabase } from "../lib/supabase";
import {
  CreateCategoryBody,
  UpdateCategoryBody,
  UpdateCategoryParams,
  DeleteCategoryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/categories", async (_req, res): Promise<void> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  const categories = (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    color: row.color,
    createdAt: row.created_at,
  }));

  res.json(categories);
});

router.post("/categories", async (req, res): Promise<void> => {
  const parsed = CreateCategoryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, color } = parsed.data;

  const { data, error } = await supabase
    .from("categories")
    .insert({ name, color })
    .select()
    .single();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.status(201).json({
    id: data.id,
    name: data.name,
    color: data.color,
    createdAt: data.created_at,
  });
});

router.patch("/categories/:id", async (req, res): Promise<void> => {
  const params = UpdateCategoryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = UpdateCategoryBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const updates: Record<string, unknown> = {};
  if (body.data.name !== undefined) updates.name = body.data.name;
  if (body.data.color !== undefined) updates.color = body.data.color;

  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", params.data.id)
    .select()
    .single();

  if (error || !data) {
    res.status(404).json({ error: "Category not found" });
    return;
  }

  res.json({
    id: data.id,
    name: data.name,
    color: data.color,
    createdAt: data.created_at,
  });
});

router.delete("/categories/:id", async (req, res): Promise<void> => {
  const params = DeleteCategoryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", params.data.id);

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  res.sendStatus(204);
});

export default router;
