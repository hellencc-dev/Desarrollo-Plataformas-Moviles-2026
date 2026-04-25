import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check, Pencil, Plus, Trash2, X, ListTodo } from "lucide-react";
interface Props {
  onAdd: (title: string) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [draft, setDraft] = useState("");
  const [editingValue, setEditingValue] = useState("");

  const add = () => {
    onAdd(title);
    setTitle("");
  };

  const saveEdit = (id: string) => {
    const next = editingValue.trim();
  };

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const title = draft.trim();
    if (!title) return;
    setDraft("");
  };

  return (
    <>
      <form
          onSubmit={handleAdd}
          className="group flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-sm transition-shadow focus-within:shadow-md"
        >
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="What needs to be done?"
            className="border-0 bg-transparent text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="New task"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!draft.trim()}
            className="!rounded-xl px-4"
          >
            <Plus className="!h-4 w-4" />
            Add
          </Button>
        </form>
    </>
  );
}