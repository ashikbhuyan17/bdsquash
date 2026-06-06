"use client"

import { useCallback, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { AdminListCard } from "@/components/admin/shared/admin-list-card"
import { DeleteConfirm } from "@/components/admin/shared/delete-confirm"
import { FiltersBar } from "@/components/admin/shared/filters-bar"
import { ImageDataUrlUpload } from "@/components/admin/shared/image-data-url-upload"
import { ImageThumb } from "@/components/admin/shared/image-thumb"
import { ListPagination } from "@/components/admin/shared/list-pagination"
import { RowIconActions } from "@/components/admin/shared/row-icon-actions"
import { Button } from "@/components/ui/button"
import { adminBtnPrimary, adminTableHeaderRowClass } from "@/lib/admin/admin-ui"
import { formPlaceholders } from "@/lib/admin/form-placeholders"
import { Badge } from "@/components/ui/badge"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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
import { IMG_PLACEHOLDER_PNG } from "@/lib/admin/constants"
import { bannerFormSchema, type BannerFormValues } from "@/lib/admin/schemas"
import { seedBanners } from "@/lib/admin/seed"
import type { Banner } from "@/types/admin"

const defaultForm: BannerFormValues = {
  image: IMG_PLACEHOLDER_PNG,
  title: "",
  description: "",
  bannerLink: "https://",
  active: true,
}

function mapBannerToForm(row: Banner): BannerFormValues {
  return {
    image: row.image,
    title: row.title,
    description: row.description,
    bannerLink: row.bannerLink,
    active: row.active,
  }
}

export function BannerAdminClient() {
  const [rows, setRows] = useState<Banner[]>(() => seedBanners)
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
  const [editing, setEditing] = useState<Banner | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const form = useForm<BannerFormValues>({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: defaultForm,
  })

  const openCreate = useCallback(() => {
    setEditing(null)
    form.reset(defaultForm)
    setSheetOpen(true)
  }, [form])

  const openEdit = useCallback(
    (row: Banner) => {
      setEditing(row)
      form.reset(mapBannerToForm(row))
      setSheetOpen(true)
    },
    [form]
  )

  useEffect(() => {
    if (!sheetOpen) return
    if (editing) form.reset(mapBannerToForm(editing))
    else form.reset(defaultForm)
  }, [sheetOpen, editing, form])

  const onSubmit = form.handleSubmit((values) => {
    if (editing) {
      setRows((prev) =>
        prev.map((b) => (b.id === editing.id ? { ...b, ...values } : b))
      )
      toast.success("Banner updated")
    } else {
      const id = `b_${Date.now().toString(36)}`
      setRows((prev) => [{ id, ...values }, ...prev])
      toast.success("Banner created")
    }
    setSheetOpen(false)
  })

  const handleDelete = () => {
    if (!deleteId) return
    setRows((prev) => prev.filter((b) => b.id !== deleteId))
    toast.success("Banner deleted")
    setDeleteId(null)
  }

  const toggleActive = (row: Banner) => {
    setRows((prev) =>
      prev.map((b) => (b.id === row.id ? { ...b, active: !b.active } : b))
    )
    toast.message(`Status: ${!row.active ? "Active" : "Inactive"}`)
  }

  const deleteTarget = deleteId ? rows.find((b) => b.id === deleteId) : null

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <AdminListCard>
        <div className="border-slate-100 flex flex-col gap-1 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
          <div className="min-w-0">
            <h2 className="text-slate-800 text-base font-semibold">Banner list</h2>
            <p className="text-slate-500 text-sm">Hero content shown on the home page.</p>
          </div>
          <Button
            type="button"
            className={adminBtnPrimary}
            onClick={openCreate}
          >
            <PlusIcon className="size-4" />
            New banner
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
                    <TableHead className="w-12"> </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden lg:table-cell">Link</TableHead>
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
                        <ImageThumb src={row.image} alt="" />
                      </TableCell>
                      <TableCell className="max-w-[12rem]">
                        <p className="text-neutral-900 font-medium break-words">{row.title}</p>
                        <p className="text-neutral-500 line-clamp-2 text-xs">
                          {row.description}
                        </p>
                      </TableCell>
                      <TableCell className="text-neutral-600 hidden max-w-[10rem] truncate text-sm lg:table-cell">
                        {row.bannerLink}
                      </TableCell>
                      <TableCell>
                        <Badge variant={row.active ? "active" : "inactive"}>
                          {row.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-start">
                          <Switch
                            checked={row.active}
                            onCheckedChange={() => toggleActive(row)}
                            size="sm"
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
                  <div className="flex gap-3">
                    <ImageThumb src={row.image} alt="" className="size-12" />
                    <div className="min-w-0 flex-1">
                      <p className="text-slate-800 text-sm font-medium break-words">{row.title}</p>
                      <p className="text-slate-500 line-clamp-2 text-xs">{row.description}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs break-all">{row.bannerLink}</p>
                  <div className="flex items-center justify-between gap-2">
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
        <SheetContent
          className="w-full gap-0 border-l p-0 sm:max-w-xl lg:max-w-2xl"
          side="right"
        >
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="flex h-full max-h-svh flex-col"
            >
              <SheetHeader className="shrink-0 space-y-1 border-b p-4 sm:p-6">
                <SheetTitle>{editing ? "Edit banner" : "Create banner"}</SheetTitle>
                <SheetDescription>
                  Upload a hero image — stored as a base64 data URL for your backend.
                </SheetDescription>
              </SheetHeader>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="space-y-4 p-4 sm:p-6">
                  <div className="grid gap-2">
                    <Label htmlFor="banner-image">Image</Label>
                    <ImageDataUrlUpload
                      id="banner-image"
                      value={form.watch("image")}
                      onChange={(v) =>
                        form.setValue("image", v, { shouldValidate: true, shouldDirty: true })
                      }
                      aria-invalid={!!form.formState.errors.image}
                      error={
                        form.formState.errors.image?.message != null
                          ? String(form.formState.errors.image.message)
                          : undefined
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="banner-title">Title</Label>
                    <Input id="banner-title" autoComplete="off" placeholder={formPlaceholders.title} {...form.register("title")} />
                    {form.formState.errors.title?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.title.message)}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="banner-description">Description</Label>
                    <Textarea id="banner-description" rows={3} placeholder={formPlaceholders.description} {...form.register("description")} />
                    {form.formState.errors.description?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.description.message)}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="banner-link">Banner link</Label>
                    <Input
                      id="banner-link"
                      type="url"
                      autoComplete="off"
                      placeholder={formPlaceholders.bannerLink}
                      {...form.register("bannerLink")}
                    />
                    {form.formState.errors.bannerLink?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.bannerLink.message)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-sm border p-3">
                    <div>
                      <Label htmlFor="banner-active" className="text-sm font-medium">
                        Active
                      </Label>
                      <p className="text-muted-foreground text-xs">Show on the public site.</p>
                    </div>
                    <Switch
                      id="banner-active"
                      checked={form.watch("active")}
                      onCheckedChange={(v) =>
                        form.setValue("active", v, { shouldDirty: true, shouldValidate: true })
                      }
                    />
                  </div>
                </div>
              </div>
              <SheetFooter className="bg-background shrink-0 gap-2 border-t p-4 sm:flex-row sm:justify-end sm:p-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSheetOpen(false)}
                >
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
        title="Delete this banner?"
        description={
          deleteTarget
            ? `“${deleteTarget.title}” will be removed from the list.`
            : "This item will be removed."
        }
        onConfirm={handleDelete}
      />
    </div>
  )
}
