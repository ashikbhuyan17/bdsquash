"use client"

import { useEffect } from "react"
import Placeholder from "@tiptap/extension-placeholder"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { BoldIcon, ItalicIcon, ListIcon, ListOrderedIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type RichTextEditorProps = {
  value: string
  onChange: (html: string) => void
  placeholder?: string
  className?: string
  "aria-invalid"?: boolean
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start typing…",
  className,
  "aria-invalid": ariaInvalid,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder, emptyNodeClass: "is-editor-empty" }),
    ],
    content: value || "<p></p>",
    onUpdate: ({ editor: ed }) => onChange(ed.getHTML()),
  })

  useEffect(() => {
    if (!editor) return
    const cur = editor.getHTML()
    if (value && value !== cur) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
  }, [editor, value])

  if (!editor) {
    return <Skeleton className={cn("min-h-40 w-full rounded-sm", className)} />
  }

  return (
    <div
      className={cn(
        "border-input bg-background focus-within:ring-ring/50 min-h-40 overflow-hidden rounded-sm border shadow-xs focus-within:ring-[3px]",
        ariaInvalid && "border-destructive ring-destructive/20",
        className
      )}
    >
      {editor && (
        <div className="bg-muted/40 flex flex-wrap items-center gap-0.5 border-b px-1.5 py-1">
          <Button
            type="button"
            size="icon-xs"
            variant={editor.isActive("bold") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleBold().run()}
            aria-label="Bold"
          >
            <BoldIcon className="size-3.5" />
          </Button>
          <Button
            type="button"
            size="icon-xs"
            variant={editor.isActive("italic") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            aria-label="Italic"
          >
            <ItalicIcon className="size-3.5" />
          </Button>
          <Button
            type="button"
            size="icon-xs"
            variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            aria-label="Bullet list"
          >
            <ListIcon className="size-3.5" />
          </Button>
          <Button
            type="button"
            size="icon-xs"
            variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            aria-label="Numbered list"
          >
            <ListOrderedIcon className="size-3.5" />
          </Button>
        </div>
      )}
      <div className="text-foreground max-w-none px-3 py-2 text-sm leading-relaxed [&_.ProseMirror]:min-h-32 [&_.ProseMirror]:outline-none [&_li]:my-1 [&_p]:my-1 [&_ul]:my-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
