"use client"

import { useCallback, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { AdminListCard } from "@/components/admin/shared/admin-list-card"
import { DeleteConfirm } from "@/components/admin/shared/delete-confirm"
import { FiltersBar } from "@/components/admin/shared/filters-bar"
import { ListPagination } from "@/components/admin/shared/list-pagination"
import { RowIconActions } from "@/components/admin/shared/row-icon-actions"
import { Button } from "@/components/ui/button"
import { adminBtnPrimary, adminTableHeaderRowClass } from "@/lib/admin/admin-ui"
import { Badge } from "@/components/ui/badge"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useClientPagination } from "@/hooks/useClientPagination"
import { useSimulatedLoader } from "@/hooks/useSimulatedLoader"
import { aboutFormSchema, type AboutFormValues } from "@/lib/admin/schemas"
import { seedAbout } from "@/lib/admin/seed"
import type { About } from "@/types/admin"

const defaultForm: AboutFormValues = {
  history: "<p>Your federation history here.</p>",
  presidentMessage: "<p>President message here.</p>",
  mission: "Define your mission statement (demo).",
  vision: "Define your vision (demo).",
  active: true,
}

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
}

function toForm(a: About): AboutFormValues {
  return {
    history: a.history,
    presidentMessage: a.presidentMessage,
    mission: a.mission,
    vision: a.vision,
    active: a.active,
  }
}

export function AboutAdminClient() {
  const [rows, setRows] = useState<About[]>(() => seedAbout)
  const loading = useSimulatedLoader(380)
  const {
    search,
    onSearchChange,
    statusFilter,
    onStatusChange,
    page,
    setPage,
    pageSize,
    setPageSize,
    pageCount,
    pageItems,
    totalFiltered,
  } = useClientPagination(rows)

  const [sheetOpen, setSheetOpen] = useState(false)
  const [editing, setEditing] = useState<About | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: defaultForm,
  })

  const openCreate = useCallback(() => {
    setEditing(null)
    form.reset(defaultForm)
    setSheetOpen(true)
  }, [form])

  const openEdit = useCallback(
    (row: About) => {
      setEditing(row)
      form.reset(toForm(row))
      setSheetOpen(true)
    },
    [form]
  )

  useEffect(() => {
    if (!sheetOpen) return
    if (editing) form.reset(toForm(editing))
    else form.reset(defaultForm)
  }, [sheetOpen, editing, form])

  const onSubmit = form.handleSubmit((values) => {
    if (editing) {
      setRows((prev) => prev.map((a) => (a.id === editing.id ? { ...a, ...values } : a)))
      toast.success("About content updated")
    } else {
      setRows((prev) => [{ id: `a_${Date.now().toString(36)}`, ...values }, ...prev])
      toast.success("About block created")
    }
    setSheetOpen(false)
  })

  const handleDelete = () => {
    if (!deleteId) return
    setRows((prev) => prev.filter((a) => a.id !== deleteId))
    toast.success("About block deleted")
    setDeleteId(null)
  }

  const toggleActive = (row: About) => {
    setRows((prev) =>
      prev.map((a) => (a.id === row.id ? { ...a, active: !a.active } : a))
    )
    toast.message(`Status: ${!row.active ? "Active" : "Inactive"}`)
  }

  const deleteTarget = deleteId ? rows.find((a) => a.id === deleteId) : null

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <AdminListCard>
        <div className="border-slate-100 flex flex-col gap-1 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
          <div className="min-w-0">
            <h2 className="text-slate-800 text-base font-semibold">About list</h2>
            <p className="text-slate-500 text-sm">Mission, vision, and leadership content.</p>
          </div>
          <Button type="button" className={adminBtnPrimary} onClick={openCreate}>
            <PlusIcon className="size-4" />
            New block
          </Button>
        </div>
        <div className="border-slate-100 bg-slate-50/30 px-4 py-3 sm:px-5 sm:py-3.5">
          <FiltersBar
            search={search}
            onSearchChange={onSearchChange}
            statusFilter={statusFilter}
            onStatusChange={onStatusChange}
          />
        </div>
        {loading ? (
          <div className="space-y-2 px-4 py-4 sm:px-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : totalFiltered === 0 ? (
          <div
            className="border-slate-100 text-slate-500 flex flex-col items-center justify-center gap-1 px-4 py-14 text-center"
            role="status"
          >
            <p className="text-slate-600 text-sm font-medium">No rows match your filters</p>
            <p className="text-xs">Try clearing the search or status filter.</p>
          </div>
        ) : (
          <>
            <div className="admin-data-table hidden border-t border-[#E5E7EB] bg-white md:block">
              <Table className="min-w-[720px] w-full">
                <TableHeader>
                  <TableRow className={adminTableHeaderRowClass}>
                    <TableHead className="min-w-32">Mission</TableHead>
                    <TableHead className="hidden lg:table-cell">Vision</TableHead>
                    <TableHead className="w-28">Status</TableHead>
                    <TableHead className="w-24">Active</TableHead>
                    <TableHead className="w-[5.5rem] min-w-[5.5rem] text-end! sm:min-w-0 sm:max-w-28">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageItems.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <p className="line-clamp-2 font-medium text-neutral-900">{row.mission}</p>
                        <p className="line-clamp-1 text-xs text-neutral-500 lg:hidden">
                          {row.vision}
                        </p>
                      </TableCell>
                      <TableCell className="hidden max-w-56 line-clamp-2 text-sm text-neutral-600 lg:table-cell">
                        {row.vision}
                      </TableCell>
                      <TableCell>
                        <Badge variant={row.active ? "active" : "inactive"}>
                          {row.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-start">
                          <Switch
                            size="sm"
                            checked={row.active}
                            onCheckedChange={() => toggleActive(row)}
                            aria-label="Toggle active"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-end!">
                        <RowIconActions
                          onEdit={() => openEdit(row)}
                          onDelete={() => setDeleteId(row.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="grid gap-3 md:hidden">
              {pageItems.map((row) => (
                <div
                  key={row.id}
                  className="border-slate-200 flex flex-col gap-2.5 rounded-xl border bg-white p-4 shadow-sm"
                >
                  <p className="text-slate-800 text-sm font-medium">{row.mission}</p>
                  <p className="text-slate-500 line-clamp-2 text-xs">{row.vision}</p>
                  <p className="text-slate-400 line-clamp-1 text-xs">
                    {stripTags(row.history).slice(0, 100)}…
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-xs">Active</span>
                      <Switch
                        size="sm"
                        checked={row.active}
                        onCheckedChange={() => toggleActive(row)}
                        aria-label="Toggle active"
                      />
                    </div>
                    <RowIconActions
                      onEdit={() => openEdit(row)}
                      onDelete={() => setDeleteId(row.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <ListPagination
              page={page}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
              pageCount={pageCount}
              total={totalFiltered}
              onPageChange={setPage}
              className="bg-white"
            />
          </>
        )}
      </AdminListCard>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full gap-0 border-l p-0 sm:max-w-xl lg:max-w-3xl" side="right">
          <Form {...form}>
            <form onSubmit={onSubmit} className="flex h-full max-h-svh flex-col">
              <SheetHeader className="shrink-0 space-y-1 border-b p-4 sm:p-6">
                <SheetTitle>{editing ? "Edit about content" : "Create about block"}</SheetTitle>
                <SheetDescription>History and president message use the rich text editor. Mission and vision are plain text.</SheetDescription>
              </SheetHeader>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="space-y-4 p-4 sm:p-6">
                  <div className="grid gap-2">
                    <Label htmlFor="about-history">History</Label>
                    <div id="about-history" className="space-y-1">
                      <RichTextEditor
                        value={form.watch("history")}
                        onChange={(html) =>
                          form.setValue("history", html, { shouldValidate: true, shouldDirty: true })
                        }
                        placeholder="Federation background…"
                        aria-invalid={!!form.formState.errors.history}
                      />
                    </div>
                    {form.formState.errors.history?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.history.message)}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="about-president">President message</Label>
                    <div id="about-president" className="space-y-1">
                      <RichTextEditor
                        value={form.watch("presidentMessage")}
                        onChange={(html) =>
                          form.setValue("presidentMessage", html, {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }
                        placeholder="Letter from the president…"
                        aria-invalid={!!form.formState.errors.presidentMessage}
                      />
                    </div>
                    {form.formState.errors.presidentMessage?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.presidentMessage.message)}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="about-mission">Mission</Label>
                    <Textarea id="about-mission" rows={2} {...form.register("mission")} />
                    {form.formState.errors.mission?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.mission.message)}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="about-vision">Vision</Label>
                    <Textarea id="about-vision" rows={2} {...form.register("vision")} />
                    {form.formState.errors.vision?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.vision.message)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-sm border p-3">
                    <div>
                      <Label htmlFor="about-active" className="text-sm font-medium">
                        Active
                      </Label>
                      <p className="text-muted-foreground text-xs">Shown in the public About page when on.</p>
                    </div>
                    <Switch
                      id="about-active"
                      checked={form.watch("active")}
                      onCheckedChange={(v) =>
                        form.setValue("active", v, { shouldDirty: true, shouldValidate: true })
                      }
                    />
                  </div>
                </div>
              </div>
              <SheetFooter className="bg-background shrink-0 gap-2 border-t p-4 sm:flex-row sm:justify-end sm:p-6">
                <Button type="button" variant="outline" onClick={() => setSheetOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className={adminBtnPrimary}>
                  Save
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>

      <DeleteConfirm
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
        title="Delete this about block?"
        description={
          deleteTarget
            ? `Mission “${deleteTarget.mission.slice(0, 80)}” will be removed.`
            : "This item will be removed."
        }
        onConfirm={handleDelete}
      />
    </div>
  )
}
