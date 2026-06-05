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
import { playerFormSchema, type PlayerFormValues } from "@/lib/admin/schemas"
import { seedPlayers } from "@/lib/admin/seed"
import type { Player } from "@/types/admin"

const defaultForm: PlayerFormValues = {
  name: "",
  profileImage: IMG_PLACEHOLDER_PNG,
  ranking: 1,
  country: "Bangladesh",
  bio: "",
  active: true,
}

function toForm(p: Player): PlayerFormValues {
  return {
    name: p.name,
    profileImage: p.profileImage,
    ranking: p.ranking,
    country: p.country,
    bio: p.bio,
    active: p.active,
  }
}

export function PlayersAdminClient() {
  const [rows, setRows] = useState<Player[]>(() => seedPlayers)
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
  const [editing, setEditing] = useState<Player | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: defaultForm,
  })

  const openCreate = useCallback(() => {
    setEditing(null)
    form.reset(defaultForm)
    setSheetOpen(true)
  }, [form])

  const openEdit = useCallback(
    (row: Player) => {
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
      setRows((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...values } : p)))
      toast.success("Player updated")
    } else {
      setRows((prev) => [{ id: `p_${Date.now().toString(36)}`, ...values }, ...prev])
      toast.success("Player created")
    }
    setSheetOpen(false)
  })

  const handleDelete = () => {
    if (!deleteId) return
    setRows((prev) => prev.filter((p) => p.id !== deleteId))
    toast.success("Player removed")
    setDeleteId(null)
  }

  const toggleActive = (row: Player) => {
    setRows((prev) =>
      prev.map((p) => (p.id === row.id ? { ...p, active: !p.active } : p))
    )
    toast.message(`Status: ${!row.active ? "Active" : "Inactive"}`)
  }

  const deleteTarget = deleteId ? rows.find((p) => p.id === deleteId) : null

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <AdminListCard>
        <div className="border-slate-100 flex flex-col gap-1 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
          <div className="min-w-0">
            <h2 className="text-slate-800 text-base font-semibold">Player list</h2>
            <p className="text-slate-500 text-sm">Rankings and profiles for the public site.</p>
          </div>
          <Button type="button" className={adminBtnPrimary} onClick={openCreate}>
            <PlusIcon className="size-4" />
            New player
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

                    <TableHead className="w-16">#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Country</TableHead>
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
                        <ImageThumb src={row.profileImage} alt="" />
                      </TableCell>
                      <TableCell className="font-medium tabular-nums text-emerald-700">
                        {row.ranking}
                      </TableCell>
                      <TableCell className="max-w-[10rem]">
                        <p className="text-neutral-900 font-medium break-words">{row.name}</p>
                        <p className="text-neutral-500 line-clamp-1 text-xs sm:hidden">{row.country}</p>
                        <p className="text-neutral-500 line-clamp-1 text-xs sm:hidden">{row.bio}</p>
                      </TableCell>
                      <TableCell className="text-neutral-600 hidden text-sm sm:table-cell">
                        {row.country}
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
                  <div className="flex gap-3">
                    <div className="flex shrink-0 flex-col items-center gap-0.5">
                      <ImageThumb src={row.profileImage} alt="" className="size-12" />
                      <span className="text-emerald-700 text-xs font-medium">#{row.ranking}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-slate-800 text-sm font-medium break-words">{row.name}</p>
                      <p className="text-slate-500 text-xs">{row.country}</p>
                    </div>
                  </div>
                  <p className="text-slate-500 line-clamp-2 text-xs">{row.bio}</p>
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
        <SheetContent className="w-full gap-0 border-l p-0 sm:max-w-xl lg:max-w-2xl" side="right">
          <Form {...form}>
            <form onSubmit={onSubmit} className="flex h-full max-h-svh flex-col">
              <SheetHeader className="shrink-0 space-y-1 border-b p-4 sm:p-6">
                <SheetTitle>{editing ? "Edit player" : "Add player"}</SheetTitle>
                <SheetDescription>
                  Upload a profile photo (stored as base64). Ranking should be unique in production.
                </SheetDescription>
              </SheetHeader>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="space-y-4 p-4 sm:p-6">
                  <div className="grid gap-2">
                    <Label htmlFor="player-name">Name</Label>
                    <Input id="player-name" autoComplete="off" {...form.register("name")} />
                    {form.formState.errors.name?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.name.message)}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="player-profile-image">Profile image</Label>
                    <ImageDataUrlUpload
                      id="player-profile-image"
                      value={form.watch("profileImage")}
                      onChange={(v) =>
                        form.setValue("profileImage", v, { shouldValidate: true, shouldDirty: true })
                      }
                      aria-invalid={!!form.formState.errors.profileImage}
                      error={
                        form.formState.errors.profileImage?.message != null
                          ? String(form.formState.errors.profileImage.message)
                          : undefined
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="player-ranking">Ranking</Label>
                    <Input
                      id="player-ranking"
                      type="number"
                      min={1}
                      name="ranking"
                      value={
                        Number.isFinite(form.watch("ranking"))
                          ? String(form.watch("ranking"))
                          : ""
                      }
                      onChange={(e) => {
                        const v = e.target.value
                        if (v === "") form.setValue("ranking", 1, { shouldValidate: true })
                        else {
                          const n = parseInt(v, 10)
                          if (!Number.isNaN(n)) form.setValue("ranking", n, { shouldValidate: true })
                        }
                      }}
                    />
                    {form.formState.errors.ranking?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.ranking.message)}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="player-country">Country</Label>
                    <Input id="player-country" autoComplete="off" {...form.register("country")} />
                    {form.formState.errors.country?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.country.message)}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="player-bio">Bio</Label>
                    <Textarea id="player-bio" rows={3} {...form.register("bio")} />
                    {form.formState.errors.bio?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.bio.message)}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-sm border p-3">
                    <div>
                      <Label htmlFor="player-active" className="text-sm font-medium">
                        Active
                      </Label>
                      <p className="text-muted-foreground text-xs">Listed in rankings when active.</p>
                    </div>
                    <Switch
                      id="player-active"
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
        title="Delete this player?"
        description={
          deleteTarget
            ? `“${deleteTarget.name}” will be removed.`
            : "This item will be removed."
        }
        onConfirm={handleDelete}
      />
    </div>
  )
}
