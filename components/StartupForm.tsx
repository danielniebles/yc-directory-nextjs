'use client'
import { useState, useActionState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from '@uiw/react-md-editor';
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { createPitch } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { SanityDocument } from "next-sanity";


export default function StartupForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pitch, setPitch] = useState("");
  const { toast } = useToast()
  const router = useRouter()
  const handleSubmit = async (prevState: any, formData: FormData) => {

    try {
      const formValues = {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        link: formData.get('link'),
        pitch
      }
      await formSchema.parseAsync(formValues)

      const result = await createPitch(formData, pitch) as SanityDocument

      if (result.status === 'SUCCESS') {
        toast({ title: 'Success', description: 'Your startup pitch has been created' })
        router.push(`/startup/${result._id}`)

      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors
        console.log({ error, fieldErrors });

        setErrors(fieldErrors as unknown as Record<string, string>)
        toast({ title: "Error", description: 'Please check your inputs and try again', variant: 'destructive' })

        return { ...prevState, error: 'Validation failed', status: 'ERROR' }
      }
      toast({ title: "Error", description: 'An unexpected error has ocurred', variant: 'destructive' })

      return {
        ...prevState,
        error: 'An unexpected error has ocurred',
        status: 'ERROR'
      }
    }
  }
  const [state, formAction, isPending] = useActionState(handleSubmit, { errors: [], status: 'INITIAL' })


  return <form action={formAction} className="startup-form">
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
          placeholder: "Briefly describe your idea and what problem it solves"
        }}
        previewOptions={{ disallowedElements: ["style"] }}
        onChange={(value) => setPitch(value as string)} />
      {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
    </div>
    <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
      {isPending ? 'Submitting' : 'Submit Your Pitch'}
      <Send className="size-10 ml-2" />
    </Button>
  </form>
}