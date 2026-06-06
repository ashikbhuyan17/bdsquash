"use client"

import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImageIcon, NewspaperIcon, PlusIcon, VideoIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  createMediaGalleryItemAction,
  getMediaGalleryAction,
  getMediaGalleryItemAction,
  toggleMediaGalleryActiveAction,
  updateMediaGalleryItemAction,
} from "@/app/actions/media-gallery"
import { AdminFormActiveField } from "@/components/admin/shared/admin-form-active-field"
import { GalleryFiltersBar } from "@/components/admin/shared/gallery-filters-bar"
import { AdminListCard } from "@/components/admin/shared/admin-list-card"
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
import { AdminSelectField } from "@/components/admin/shared/admin-select"
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
import { PAGE_SIZES } from "@/hooks/useClientPagination"
import {
  mediaGalleryFormSchema,
  type MediaGalleryFormValues,
} from "@/lib/admin/schemas"
import { getMediaGalleryImageUrl, toApiMediaValue } from "@/lib/media-urls"
import type {
  GalleryCategory,
  GalleryType,
  MediaGalleryFilterState,
  MediaGalleryFilters,
  MediaGalleryItem,
  MediaGalleryListData,
} from "@/lib/types/media-gallery"
import { GALLERY_CATEGORIES, GALLERY_TYPES } from "@/lib/types/media-gallery"

const GALLERY_TYPE_LABELS: Record<GalleryType, string> = {
  GalleryImage: "Gallery image",
  Video: "Video",
  News: "News",
}

const CATEGORY_LABELS: Record<GalleryCategory, string> = {
  Tournaments: "Tournaments",
  NationalTeam: "National team",
  Training: "Training",
  Juniors: "Juniors",
  Events: "Events",
}

const GALLERY_TYPE_OPTIONS = GALLERY_TYPES.map((type) => ({
  value: type,
  label: GALLERY_TYPE_LABELS[type],
  icon:
    type === "GalleryImage" ? (
      <ImageIcon className="size-3.5" />
    ) : type === "Video" ? (
      <VideoIcon className="size-3.5" />
    ) : (
      <NewspaperIcon className="size-3.5" />
    ),
}))

const GALLERY_CATEGORY_OPTIONS = GALLERY_CATEGORIES.map((category) => ({
  value: category,
  label: CATEGORY_LABELS[category],
}))

const defaultFilters: MediaGalleryFilterState = {
  galleryType: "all",
  category: "all",
  active: "all",
}

const defaultForm: MediaGalleryFormValues = {
  galleryType: "",
  category: "",
  image: "",
  newsLink: "",
  title: "",
  description: "",
  isActive: true,
}

function galleryItemLabel(row: MediaGalleryItem): string {
  const title = (row.title ?? "").trim()
  const description = (row.description ?? "").trim()
  return title || description || `Item ${row.id}`
}

function toFormValues(row: MediaGalleryItem): MediaGalleryFormValues {
  return {
    galleryType: row.galleryType,
    category: row.category,
    image: row.image ? getMediaGalleryImageUrl(row.image) : "",
    newsLink: row.newsLink,
    title: row.title ?? "",
    description: row.description ?? "",
    isActive: row.isActive,
  }
}

function toApiFilters(
  page: number,
  pageSize: number,
  filters: MediaGalleryFilterState
): MediaGalleryFilters {
  return {
    pageNumber: page + 1,
    pageSize,
    galleryType: filters.galleryType === "all" ? undefined : filters.galleryType,
    category: filters.category === "all" ? undefined : filters.category,
    isActive:
      filters.active === "all" ? undefined : filters.active === "active",
  }
}

function linkLabel(galleryType: string): string {
  if (galleryType === "Video") return "Video link"
  if (galleryType === "News") return "News link"
  return "Link"
}

type GalleryAdminClientProps = {
  initialData: MediaGalleryListData
}

export function GalleryAdminClient({ initialData }: GalleryAdminClientProps) {
  const [listData, setListData] = useState(initialData)
  const [filters, setFilters] = useState<MediaGalleryFilterState>(defaultFilters)
  const [page, setPage] = useState(Math.max(initialData.pageNumber - 1, 0))
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(
    PAGE_SIZES.includes(initialData.pageSize as (typeof PAGE_SIZES)[number])
      ? (initialData.pageSize as (typeof PAGE_SIZES)[number])
      : 10
  )
  const [loading, setLoading] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editing, setEditing] = useState<MediaGalleryItem | null>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const skipInitialFetch = useRef(true)

  const form = useForm<MediaGalleryFormValues>({
    resolver: zodResolver(mediaGalleryFormSchema),
    defaultValues: defaultForm,
  })

  const watchedGalleryType = form.watch("galleryType")

  const loadGallery = useCallback(
    async (
      nextPage: number,
      nextPageSize: number,
      nextFilters: MediaGalleryFilterState
    ) => {
      setLoading(true)
      const result = await getMediaGalleryAction(
        toApiFilters(nextPage, nextPageSize, nextFilters)
      )
      setLoading(false)

      if (result.error) {
        toast.error(result.error)
        return
      }

      if (result.data) setListData(result.data)
    },
    []
  )

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false
      return
    }
    void loadGallery(page, pageSize, filters)
  }, [page, pageSize, filters, loadGallery])

  const applyFilters = (next: MediaGalleryFilterState) => {
    setFilters(next)
    setPage(0)
  }

  const openCreate = useCallback(() => {
    setEditing(null)
    form.reset(defaultForm)
    setSheetOpen(true)
  }, [form])

  const openEdit = useCallback(
    (row: MediaGalleryItem) => {
      setEditing(row)
      form.reset(toFormValues(row))
      setSheetOpen(true)
      setDetailsLoading(true)

      void getMediaGalleryItemAction(row.id).then((result) => {
        setDetailsLoading(false)
        if (result.error) {
          toast.error(result.error)
          return
        }
        if (result.data) {
          setEditing(result.data)
          form.reset(toFormValues(result.data))
        }
      })
    },
    [form]
  )

  useEffect(() => {
    if (!sheetOpen) return
    if (editing) form.reset(toFormValues(editing))
    else form.reset(defaultForm)
  }, [sheetOpen, editing, form])

  const onSubmit = form.handleSubmit((values) => {
    const image = toApiMediaValue(values.image, editing?.image)
    const payload = {
      galleryType: values.galleryType as GalleryType,
      category: values.category as GalleryCategory,
      image,
      newsLink: values.newsLink.trim(),
      title: values.title.trim(),
      description: values.description.trim(),
    }

    startTransition(async () => {
      const editingRow = editing
      const result = editingRow
        ? await updateMediaGalleryItemAction(editingRow.id, payload)
        : await createMediaGalleryItemAction({
            ...payload,
            isActive: values.isActive,
          })

      if (result.error) {
        toast.error(result.error)
        return
      }

      if (editingRow && values.isActive !== editingRow.isActive) {
        const statusResult = await toggleMediaGalleryActiveAction(
          editingRow.id,
          values.isActive
        )
        if (statusResult.error) {
          toast.error(statusResult.error)
          return
        }
      }

      toast.success(result.success)
      setSheetOpen(false)
      await loadGallery(page, pageSize, filters)
    })
  })

  const toggleActive = (row: MediaGalleryItem) => {
    startTransition(async () => {
      const result = await toggleMediaGalleryActiveAction(row.id, !row.isActive)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success(result.success)
      await loadGallery(page, pageSize, filters)
    })
  }

  const rows = listData.data
  const pageCount = Math.max(listData.totalPages, 1)
  const total = listData.totalCount

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <AdminListCard>
        <div className="border-slate-100 flex flex-col gap-1 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#1b4332]/10 text-[#1b4332]">
                <ImageIcon className="size-4" />
              </span>
              <h2 className="text-slate-800 text-base font-semibold">Media gallery</h2>
            </div>
            <p className="text-slate-500 text-sm">
              Manage gallery images, videos, and news items by category.
            </p>
          </div>
          <Button type="button" className={adminBtnPrimary} onClick={openCreate}>
            <PlusIcon className="size-4" />
            New item
          </Button>
        </div>

        <div className="border-slate-100 bg-slate-50/30 px-4 py-3 sm:px-5 sm:py-3.5">
          <GalleryFiltersBar filters={filters} onChange={applyFilters} />
        </div>

        {loading ? (
          <div className="space-y-2 px-4 py-4 sm:px-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div
            className="border-slate-100 text-slate-500 flex flex-col items-center justify-center gap-2 px-4 py-14 text-center"
            role="status"
          >
            <ImageIcon className="text-slate-300 size-10" />
            <p className="text-slate-600 text-sm font-medium">No gallery items found</p>
            <p className="text-xs">Adjust filters or create a new item.</p>
          </div>
        ) : (
          <>
            <div className="admin-data-table hidden border-t border-[#E5E7EB] bg-white md:block">
              <Table className="min-w-[880px] w-full">
                <TableHeader>
                  <TableRow className={adminTableHeaderRowClass}>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead className="hidden lg:table-cell">Category</TableHead>
                    <TableHead className="hidden xl:table-cell">Link</TableHead>
                    <TableHead className="w-28">Status</TableHead>
                    <TableHead className="w-24">Active</TableHead>
                    <TableHead className="w-[5.5rem] text-end!">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <ImageThumb
                          src={getMediaGalleryImageUrl(row.image)}
                          alt={galleryItemLabel(row)}
                        />
                      </TableCell>
                      <TableCell className="max-w-[14rem]">
                        <p className="text-neutral-900 line-clamp-2 font-medium break-words">
                          {galleryItemLabel(row)}
                        </p>
                        <p className="text-neutral-500 text-xs">
                          {GALLERY_TYPE_LABELS[row.galleryType]}
                        </p>
                        <p className="text-neutral-400 text-xs">ID {row.id}</p>
                      </TableCell>
                      <TableCell className="hidden text-sm text-neutral-600 lg:table-cell">
                        {CATEGORY_LABELS[row.category]}
                      </TableCell>
                      <TableCell className="hidden max-w-[12rem] truncate text-sm text-neutral-600 xl:table-cell">
                        {row.newsLink || "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={row.isActive ? "active" : "inactive"}>
                          {row.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          size="sm"
                          checked={row.isActive}
                          disabled={isPending}
                          onCheckedChange={() => toggleActive(row)}
                          aria-label={`Toggle gallery item ${row.id} active status`}
                        />
                      </TableCell>
                      <TableCell className="text-end!">
                        <RowIconActions onEdit={() => openEdit(row)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="grid gap-3 p-4 md:hidden">
              {rows.map((row) => (
                <div
                  key={row.id}
                  className="border-slate-200 flex flex-col gap-2.5 rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-3">
                    <ImageThumb
                      src={getMediaGalleryImageUrl(row.image)}
                      alt={galleryItemLabel(row)}
                      className="size-12"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-slate-800 line-clamp-2 text-sm font-medium break-words">
                        {galleryItemLabel(row)}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {GALLERY_TYPE_LABELS[row.galleryType]} · {CATEGORY_LABELS[row.category]}
                      </p>
                    </div>
                  </div>
                  {row.newsLink ? (
                    <p className="text-slate-500 truncate text-xs">{row.newsLink}</p>
                  ) : null}
                  <div className="flex items-center justify-between">
                    <Switch
                      size="sm"
                      checked={row.isActive}
                      disabled={isPending}
                      onCheckedChange={() => toggleActive(row)}
                    />
                    <RowIconActions onEdit={() => openEdit(row)} />
                  </div>
                </div>
              ))}
            </div>

            <ListPagination
              page={page}
              pageSize={pageSize}
              onPageSizeChange={(size) => {
                setPageSize(size)
                setPage(0)
              }}
              pageCount={pageCount}
              total={total}
              onPageChange={setPage}
              className="bg-white"
            />
          </>
        )}
      </AdminListCard>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full gap-0 border-l p-0 sm:max-w-xl lg:max-w-2xl" side="right">
          <Form {...form}>
            <form onSubmit={onSubmit} className="flex h-full max-h-svh flex-col">
              <SheetHeader className="shrink-0 space-y-1 border-b p-4 sm:p-6">
                <SheetTitle>{editing ? "Edit gallery item" : "Create gallery item"}</SheetTitle>
                <SheetDescription>
                  {editing
                    ? "Item details loaded from the API. Update fields and save."
                    : "Add a gallery image, video, or news entry with category and link."}
                </SheetDescription>
              </SheetHeader>
              <div className="min-h-0 flex-1 overflow-y-auto">
                {detailsLoading ? (
                  <div className="space-y-3 p-4 sm:p-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 p-4 sm:p-6">
                    <div className="grid w-full gap-2">
                      <Label htmlFor="gallery-type">Gallery type</Label>
                      <AdminSelectField
                        id="gallery-type"
                        value={form.watch("galleryType")}
                        placeholder={formPlaceholders.selectGalleryType}
                        options={GALLERY_TYPE_OPTIONS}
                        onValueChange={(value) =>
                          form.setValue("galleryType", value, {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }
                        aria-invalid={!!form.formState.errors.galleryType}
                      />
                      {form.formState.errors.galleryType?.message != null && (
                        <p className="text-destructive text-sm" role="alert">
                          {String(form.formState.errors.galleryType.message)}
                        </p>
                      )}
                    </div>

                    <div className="grid w-full gap-2">
                      <Label htmlFor="gallery-category">Category</Label>
                      <AdminSelectField
                        id="gallery-category"
                        value={form.watch("category")}
                        placeholder={formPlaceholders.selectGalleryCategory}
                        options={GALLERY_CATEGORY_OPTIONS}
                        onValueChange={(value) =>
                          form.setValue("category", value, {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }
                        aria-invalid={!!form.formState.errors.category}
                      />
                      {form.formState.errors.category?.message != null && (
                        <p className="text-destructive text-sm" role="alert">
                          {String(form.formState.errors.category.message)}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="gallery-title">Title</Label>
                      <Input
                        id="gallery-title"
                        autoComplete="off"
                        placeholder={formPlaceholders.title}
                        {...form.register("title")}
                      />
                      {form.formState.errors.title?.message != null && (
                        <p className="text-destructive text-sm" role="alert">
                          {String(form.formState.errors.title.message)}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="gallery-description">Description</Label>
                      <Textarea
                        id="gallery-description"
                        rows={4}
                        placeholder={formPlaceholders.description}
                        {...form.register("description")}
                      />
                      {form.formState.errors.description?.message != null && (
                        <p className="text-destructive text-sm" role="alert">
                          {String(form.formState.errors.description.message)}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="gallery-link">{linkLabel(watchedGalleryType)}</Label>
                      <Input
                        id="gallery-link"
                        type="url"
                        autoComplete="off"
                        placeholder={formPlaceholders.newsLink}
                        {...form.register("newsLink")}
                      />
                      {form.formState.errors.newsLink?.message != null && (
                        <p className="text-destructive text-sm" role="alert">
                          {String(form.formState.errors.newsLink.message)}
                        </p>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="gallery-image">Image</Label>
                      <ImageDataUrlUpload
                        id="gallery-image"
                        value={form.watch("image")}
                        onChange={(value) =>
                          form.setValue("image", value, {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }
                      />
                    </div>

                    <AdminFormActiveField
                      id="gallery-is-active"
                      checked={form.watch("isActive")}
                      onChange={(value) =>
                        form.setValue("isActive", value, {
                          shouldDirty: true,
                          shouldValidate: true,
                        })
                      }
                    />
                  </div>
                )}
              </div>
              <SheetFooter className="bg-background shrink-0 gap-2 border-t p-4 sm:flex-row sm:justify-end sm:p-6">
                <Button type="button" variant="outline" onClick={() => setSheetOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={adminBtnPrimary}
                  disabled={isPending || detailsLoading}
                >
                  {isPending ? "Saving…" : "Save"}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
