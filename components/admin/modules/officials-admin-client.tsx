"use client"

import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon, UserCogIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  createOfficialAction,
  getOfficialsAction,
  toggleOfficialActiveAction,
  updateOfficialAction,
} from "@/app/actions/officials"
import { OfficialsFiltersBar } from "@/components/admin/shared/officials-filters-bar"
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
import {
  AdminSelectContent,
  AdminSelectItem,
  AdminSelectTrigger,
} from "@/components/admin/shared/admin-select"
import { Select, SelectValue } from "@/components/ui/select"
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
import { officialFormSchema, type OfficialFormValues } from "@/lib/admin/schemas"
import { getProfileImageUrl, toApiMediaValue } from "@/lib/media-urls"
import {
  OFFICIAL_TYPES,
  type Official,
  type OfficialFilters,
  type OfficialListData,
  type OfficialsFilterState,
  type OfficialType,
} from "@/lib/types/officials"

function FieldError({ message }: { message?: string }) {
  if (message == null || message === "") return null

  return (
    <p className="text-destructive text-sm" role="alert">
      {message}
    </p>
  )
}

const defaultFilters: OfficialsFilterState = {
  officialType: "all",
}

const defaultForm: OfficialFormValues = {
  name: "",
  email: "",
  phoneNumber: "",
  officialType: "",
  designation: "",
  description: "",
  profileLink: "",
  profileImage: "",
}

function toFormValues(row: Official): OfficialFormValues {
  return {
    name: row.name,
    email: row.email,
    phoneNumber: row.phoneNumber,
    officialType: row.officialType,
    designation: row.designation,
    description: row.description,
    profileLink: row.profileLink,
    profileImage: row.profileImage ? getProfileImageUrl(row.profileImage) : "",
  }
}

function toApiFilters(
  page: number,
  pageSize: number,
  filters: OfficialsFilterState
): OfficialFilters {
  return {
    pageNumber: page + 1,
    pageSize,
    officialType: filters.officialType === "all" ? undefined : filters.officialType,
  }
}

type OfficialsAdminClientProps = {
  initialData: OfficialListData
}

export function OfficialsAdminClient({ initialData }: OfficialsAdminClientProps) {
  const [listData, setListData] = useState(initialData)
  const [filters, setFilters] = useState<OfficialsFilterState>(defaultFilters)
  const [page, setPage] = useState(Math.max(initialData.pageNumber - 1, 0))
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(
    PAGE_SIZES.includes(initialData.pageSize as (typeof PAGE_SIZES)[number])
      ? (initialData.pageSize as (typeof PAGE_SIZES)[number])
      : 10
  )
  const [loading, setLoading] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editing, setEditing] = useState<Official | null>(null)
  const [isPending, startTransition] = useTransition()
  const skipInitialFetch = useRef(true)

  const form = useForm<OfficialFormValues>({
    resolver: zodResolver(officialFormSchema),
    defaultValues: defaultForm,
  })

  const loadOfficials = useCallback(
    async (nextPage: number, nextPageSize: number, nextFilters: OfficialsFilterState) => {
      setLoading(true)
      const result = await getOfficialsAction(toApiFilters(nextPage, nextPageSize, nextFilters))
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
    void loadOfficials(page, pageSize, filters)
  }, [page, pageSize, filters, loadOfficials])

  const applyFilters = (next: OfficialsFilterState) => {
    setFilters(next)
    setPage(0)
  }

  const openCreate = useCallback(() => {
    setEditing(null)
    form.reset(defaultForm)
    setSheetOpen(true)
  }, [form])

  const openEdit = useCallback(
    (row: Official) => {
      setEditing(row)
      form.reset(toFormValues(row))
      setSheetOpen(true)
    },
    [form]
  )

  useEffect(() => {
    if (!sheetOpen) return
    if (editing) form.reset(toFormValues(editing))
    else form.reset(defaultForm)
  }, [sheetOpen, editing, form])

  const onSubmit = form.handleSubmit((values) => {
    const profileImage = toApiMediaValue(values.profileImage, editing?.profileImage)
    const payload = {
      name: values.name.trim(),
      phoneNumber: values.phoneNumber.trim(),
      email: values.email.trim(),
      officialType: values.officialType as OfficialType,
      designation: values.designation.trim(),
      description: values.description.trim(),
      profileLink: values.profileLink.trim(),
      profileImage,
    }

    startTransition(async () => {
      const result = editing
        ? await updateOfficialAction(editing.officialId, payload)
        : await createOfficialAction(payload)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success(result.success)
      setSheetOpen(false)
      await loadOfficials(page, pageSize, filters)
    })
  })

  const toggleActive = (row: Official) => {
    startTransition(async () => {
      const result = await toggleOfficialActiveAction(row.officialId, !row.isActive)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success(result.success)
      await loadOfficials(page, pageSize, filters)
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
                <UserCogIcon className="size-4" />
              </span>
              <h2 className="text-slate-800 text-base font-semibold">
                Coaches & officials
              </h2>
            </div>
            <p className="text-slate-500 text-sm">
              Register and manage federation coaches and officials.
            </p>
          </div>
          <Button type="button" className={adminBtnPrimary} onClick={openCreate}>
            <PlusIcon className="size-4" />
            New official
          </Button>
        </div>

        <div className="border-slate-100 bg-slate-50/30 px-4 py-3 sm:px-5 sm:py-3.5">
          <OfficialsFiltersBar filters={filters} onChange={applyFilters} />
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
            <UserCogIcon className="text-slate-300 size-10" />
            <p className="text-slate-600 text-sm font-medium">No officials found</p>
            <p className="text-xs">Adjust filters or register a new coach or official.</p>
          </div>
        ) : (
          <>
            <div className="admin-data-table hidden border-t border-[#E5E7EB] bg-white md:block">
              <Table className="min-w-[960px] w-full">
                <TableHeader>
                  <TableRow className={adminTableHeaderRowClass}>
                    <TableHead className="w-16">Photo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden lg:table-cell">Type</TableHead>
                    <TableHead className="hidden xl:table-cell">Designation</TableHead>
                    <TableHead className="w-28">Status</TableHead>
                    <TableHead className="w-24">Active</TableHead>
                    <TableHead className="w-[5.5rem] text-end!">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.officialId}>
                      <TableCell>
                        <ImageThumb
                          src={getProfileImageUrl(row.profileImage)}
                          alt={row.name}
                        />
                      </TableCell>
                      <TableCell className="max-w-[14rem]">
                        <p className="text-neutral-900 font-medium break-words">{row.name}</p>
                        <p className="text-neutral-500 text-xs">{row.phoneNumber}</p>
                        <p className="text-neutral-400 text-xs">{row.email}</p>
                      </TableCell>
                      <TableCell className="hidden text-sm text-neutral-600 lg:table-cell">
                        {row.officialType}
                      </TableCell>
                      <TableCell className="hidden max-w-[12rem] truncate text-sm text-neutral-600 xl:table-cell">
                        {row.designation}
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
                          aria-label={`Toggle ${row.name} active status`}
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
                  key={row.officialId}
                  className="border-slate-200 flex flex-col gap-2.5 rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-3">
                    <ImageThumb
                      src={getProfileImageUrl(row.profileImage)}
                      alt={row.name}
                      className="size-12"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-slate-800 text-sm font-medium break-words">{row.name}</p>
                      <p className="text-slate-500 text-xs">
                        {row.officialType} · {row.designation}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs">{row.phoneNumber}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={row.isActive ? "active" : "inactive"}>
                        {row.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Switch
                        size="sm"
                        checked={row.isActive}
                        disabled={isPending}
                        onCheckedChange={() => toggleActive(row)}
                      />
                    </div>
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
                <SheetTitle>{editing ? "Edit official" : "Register official"}</SheetTitle>
                <SheetDescription>
                  Add coach or official profile details and photo.
                </SheetDescription>
              </SheetHeader>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="flex flex-col gap-4 p-4 sm:p-6">
                  <div className="grid w-full gap-2">
                    <Label htmlFor="official-type">Official type</Label>
                    <Select
                      value={form.watch("officialType") || undefined}
                      onValueChange={(value) =>
                        form.setValue("officialType", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                    >
                      <AdminSelectTrigger
                        id="official-type"
                        aria-invalid={!!form.formState.errors.officialType}
                      >
                        <SelectValue placeholder={formPlaceholders.selectOfficialType} />
                      </AdminSelectTrigger>
                      <AdminSelectContent>
                        {OFFICIAL_TYPES.map((type) => (
                          <AdminSelectItem key={type} value={type}>
                            {type}
                          </AdminSelectItem>
                        ))}
                      </AdminSelectContent>
                    </Select>
                    <FieldError message={form.formState.errors.officialType?.message} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="official-name">Full name</Label>
                    <Input
                      id="official-name"
                      autoComplete="off"
                      placeholder={formPlaceholders.fullName}
                      {...form.register("name")}
                    />
                    <FieldError message={form.formState.errors.name?.message} />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="official-email">Email</Label>
                      <Input
                        id="official-email"
                        type="email"
                        autoComplete="off"
                        placeholder={formPlaceholders.email}
                        {...form.register("email")}
                      />
                      <FieldError message={form.formState.errors.email?.message} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="official-phone">Phone number</Label>
                      <Input
                        id="official-phone"
                        inputMode="numeric"
                        maxLength={11}
                        autoComplete="off"
                        placeholder={formPlaceholders.phoneNumber}
                        {...form.register("phoneNumber")}
                      />
                      <FieldError message={form.formState.errors.phoneNumber?.message} />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="official-designation">Designation</Label>
                    <Input
                      id="official-designation"
                      autoComplete="off"
                      placeholder={formPlaceholders.designation}
                      {...form.register("designation")}
                    />
                    <FieldError message={form.formState.errors.designation?.message} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="official-description">Description</Label>
                    <Textarea
                      id="official-description"
                      rows={4}
                      placeholder={formPlaceholders.description}
                      {...form.register("description")}
                    />
                    <FieldError message={form.formState.errors.description?.message} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="official-profile-link">Profile link</Label>
                    <Input
                      id="official-profile-link"
                      type="url"
                      autoComplete="off"
                      placeholder={formPlaceholders.profileLink}
                      {...form.register("profileLink")}
                    />
                    <FieldError message={form.formState.errors.profileLink?.message} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="official-profile-image">Profile photo</Label>
                    <ImageDataUrlUpload
                      id="official-profile-image"
                      value={form.watch("profileImage")}
                      onChange={(value) =>
                        form.setValue("profileImage", value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <SheetFooter className="bg-background shrink-0 gap-2 border-t p-4 sm:flex-row sm:justify-end sm:p-6">
                <Button type="button" variant="outline" onClick={() => setSheetOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className={adminBtnPrimary} disabled={isPending}>
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
