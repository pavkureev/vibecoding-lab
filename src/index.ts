import "dotenv/config";
import express, { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

const app = express();
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.get("/notes", async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("claude1")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/notes", async (req: Request, res: Response) => {
  const { text } = req.body as { text?: string };

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "text is required" });
  }

  const { data, error } = await supabase
    .from("claude1")
    .insert({ text: text.trim() })
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
