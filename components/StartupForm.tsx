'use client'
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import { Button } from "./ui/button";
import { Send } from "lucide-react";

export default function StartupForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pitch, setPitch] = useState("");

  const isPending = false;

  return <form action={() => { }} className="startup-form">
    <div>
      <label htmlFor="title" className="startup-form_label">Title</label>
      <Input id="title" required name="title" className="startup-form_input" placeholder="Startup Title" />
      {errors.title && <p className="startup-form_error">{errors.title}</p>}
    </div>
    <div>
      <label htmlFor="description" className="startup-form_label">Description</label>
      <Textarea id="description" required name="description" className="startup-form_textarea" placeholder="Startup description" />
      {errors.description && <p className="startup-form_error">{errors.description}</p>}
    </div>
    <div>
      <label htmlFor="category" className="startup-form_label">Category</label>
      <Input id="category" required name="category" className="startup-form_input" placeholder="Startup Category (Tech, Health, Education)" />
      {errors.category && <p className="startup-form_error">{errors.category}</p>}
    </div>
    <div>
      <label htmlFor="link" className="startup-form_label">link</label>
      <Input id="link" required name="link" className="startup-form_input" placeholder="Startup Image URL" />
      {errors.link && <p className="startup-form_error">{errors.link}</p>}
    </div>
    <div data-color-mode="light">
      <label htmlFor="pitch" className="startup-form_label">Pitch</label>
      <MDEditor id="pitch"
        preview="edit"
        height={300}
        value={pitch}
        style={{ borderRadius: 20, overflow: "hidden" }}
        textareaProps={{
          placeholder: "Briefly descript your idea and what problem it solves"
        }}
        previewOptions={{ disallowedElements: ["style"] }}
        onChange={(value) => setPitch(value as string)} />
      {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
    </div>
    <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
      {isPending ? 'Submitting' : 'Submit Your Pitch'}
      <Send className="size-10 ml-2"/>
    </Button>
  </form>
}