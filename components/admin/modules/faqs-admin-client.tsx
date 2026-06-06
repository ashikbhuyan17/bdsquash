"use client"

import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleHelpIcon, PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import {
  createFaqAction,
  getFaqsAction,
  toggleFaqActiveAction,
  updateFaqAction,
} from "@/app/actions/faqs"
import { AdminListCard } from "@/components/admin/shared/admin-list-card"
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
import { PAGE_SIZES } from "@/hooks/useClientPagination"
import { faqFormSchema, type FaqFormValues } from "@/lib/admin/schemas"
import type { Faq, FaqListData } from "@/lib/types/faqs"

const defaultForm: FaqFormValues = {
  question: "",
  answer: "",
}

function toFormValues(row: Faq): FaqFormValues {
  return {
    question: row.question,
    answer: row.answer,
  }
}

type FaqsAdminClientProps = {
  initialData: FaqListData
}

export function FaqsAdminClient({ initialData }: FaqsAdminClientProps) {
  const [listData, setListData] = useState(initialData)
  const [page, setPage] = useState(Math.max(initialData.pageNumber - 1, 0))
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(
    PAGE_SIZES.includes(initialData.pageSize as (typeof PAGE_SIZES)[number])
      ? (initialData.pageSize as (typeof PAGE_SIZES)[number])
      : 10
  )
  const [loading, setLoading] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editing, setEditing] = useState<Faq | null>(null)
  const [isPending, startTransition] = useTransition()
  const skipInitialFetch = useRef(true)

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqFormSchema),
    defaultValues: defaultForm,
  })

  const loadPage = useCallback(async (nextPage: number, nextPageSize: number) => {
    setLoading(true)
    const result = await getFaqsAction(nextPage + 1, nextPageSize)
    setLoading(false)

    if (result.error) {
      toast.error(result.error)
      return
    }

    if (result.data) setListData(result.data)
  }, [])

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false
      return
    }
    void loadPage(page, pageSize)
  }, [page, pageSize, loadPage])

  const openCreate = useCallback(() => {
    setEditing(null)
    form.reset(defaultForm)
    setSheetOpen(true)
  }, [form])

  const openEdit = useCallback(
    (row: Faq) => {
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
    const payload = {
      question: values.question.trim(),
      answer: values.answer.trim(),
    }

    startTransition(async () => {
      const result = editing
        ? await updateFaqAction(editing.faqId, payload)
        : await createFaqAction(payload)

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success(result.success)
      setSheetOpen(false)
      await loadPage(page, pageSize)
    })
  })

  const toggleActive = (row: Faq) => {
    startTransition(async () => {
      const result = await toggleFaqActiveAction(row.faqId, !row.isActive)
      if (result.error) {
        toast.error(result.error)
        return
      }
      toast.success(result.success)
      await loadPage(page, pageSize)
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
                <CircleHelpIcon className="size-4" />
              </span>
              <h2 className="text-slate-800 text-base font-semibold">FAQs</h2>
            </div>
            <p className="text-slate-500 text-sm">
              Manage frequently asked questions shown on the site.
            </p>
          </div>
          <Button type="button" className={adminBtnPrimary} onClick={openCreate}>
            <PlusIcon className="size-4" />
            New FAQ
          </Button>
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
            <CircleHelpIcon className="text-slate-300 size-10" />
            <p className="text-slate-600 text-sm font-medium">No FAQs yet</p>
            <p className="text-xs">Create your first question and answer to get started.</p>
          </div>
        ) : (
          <>
            <div className="admin-data-table hidden border-t border-[#E5E7EB] bg-white md:block">
              <Table className="min-w-[720px] w-full">
                <TableHeader>
                  <TableRow className={adminTableHeaderRowClass}>
                    <TableHead>Question</TableHead>
                    <TableHead className="hidden lg:table-cell">Answer</TableHead>
                    <TableHead className="w-28">Status</TableHead>
                    <TableHead className="w-24">Active</TableHead>
                    <TableHead className="w-[5.5rem] text-end!">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.faqId}>
                      <TableCell className="max-w-[18rem]">
                        <p className="text-neutral-900 font-medium break-words">{row.question}</p>
                      </TableCell>
                      <TableCell className="text-neutral-600 hidden max-w-[24rem] lg:table-cell">
                        <p className="line-clamp-2 text-sm">{row.answer}</p>
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
                          aria-label={`Toggle FAQ ${row.faqId} active status`}
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
                  key={row.faqId}
                  className="border-slate-200 flex flex-col gap-2.5 rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="min-w-0">
                    <p className="text-slate-800 text-sm font-medium break-words">{row.question}</p>
                  </div>
                  <p className="text-slate-500 line-clamp-3 text-xs">{row.answer}</p>
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
                <SheetTitle>{editing ? "Edit FAQ" : "Create FAQ"}</SheetTitle>
                <SheetDescription>
                  Add a question and answer pair. Toggle visibility from the list.
                </SheetDescription>
              </SheetHeader>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="space-y-4 p-4 sm:p-6">
                  <div className="grid gap-2">
                    <Label htmlFor="faq-question">Question</Label>
                    <Input
                      id="faq-question"
                      autoComplete="off"
                      placeholder={formPlaceholders.faqQuestion}
                      {...form.register("question")}
                    />
                    {form.formState.errors.question?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.question.message)}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="faq-answer">Answer</Label>
                    <Textarea
                      id="faq-answer"
                      rows={6}
                      placeholder={formPlaceholders.faqAnswer}
                      {...form.register("answer")}
                    />
                    {form.formState.errors.answer?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.answer.message)}
                      </p>
                    )}
                  </div>
                  {editing ? (
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                      Status:{" "}
                      <span className="font-medium">
                        {editing.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  ) : null}
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
