'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDaysIcon, PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  createEventTypeAction,
  getEventTypesAction,
  toggleEventTypeActiveAction,
  updateEventTypeAction,
} from '@/app/actions/event-types';
import { AdminListCard } from '@/components/admin/shared/admin-list-card';
import { ImageDataUrlUpload } from '@/components/admin/shared/image-data-url-upload';
import { ImageThumb } from '@/components/admin/shared/image-thumb';
import { ListPagination } from '@/components/admin/shared/list-pagination';
import { RowIconActions } from '@/components/admin/shared/row-icon-actions';
import { Button } from '@/components/ui/button';
import {
  adminBtnPrimary,
  adminTableHeaderRowClass,
} from '@/lib/admin/admin-ui';
import { formPlaceholders } from '@/lib/admin/form-placeholders';
import { Badge } from '@/components/ui/badge';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { PAGE_SIZES } from '@/hooks/useClientPagination';
import { IMG_PLACEHOLDER_PNG } from '@/lib/admin/constants';
import {
  eventTypeFormSchema,
  type EventTypeFormValues,
} from '@/lib/admin/schemas';
import { getEventTypeImageUrl, toApiMediaValue } from '@/lib/media-urls';
import type { EventType, EventTypeListData } from '@/lib/types/event-types';

const defaultForm: EventTypeFormValues = {
  name: '',
  image: IMG_PLACEHOLDER_PNG,
  description: '',
};

function toFormValues(row: EventType): EventTypeFormValues {
  return {
    name: row.name,
    image: row.image ? getEventTypeImageUrl(row.image) : IMG_PLACEHOLDER_PNG,
    description: row.description,
  };
}

function toApiImage(value: string, existingFilename?: string | null): string {
  return toApiMediaValue(value, existingFilename);
}

type EventTypesAdminClientProps = {
  initialData: EventTypeListData;
};

export function EventTypesAdminClient({
  initialData,
}: EventTypesAdminClientProps) {
  const [listData, setListData] = useState(initialData);
  const [page, setPage] = useState(Math.max(initialData.pageNumber - 1, 0));
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(
    PAGE_SIZES.includes(initialData.pageSize as (typeof PAGE_SIZES)[number])
      ? (initialData.pageSize as (typeof PAGE_SIZES)[number])
      : 10,
  );
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<EventType | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const skipInitialFetch = useRef(true);

  const form = useForm<EventTypeFormValues>({
    resolver: zodResolver(eventTypeFormSchema),
    defaultValues: defaultForm,
  });

  const loadPage = useCallback(
    async (nextPage: number, nextPageSize: number) => {
      setLoading(true);
      const result = await getEventTypesAction(nextPage + 1, nextPageSize);
      setLoading(false);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.data) setListData(result.data);
    },
    [],
  );

  useEffect(() => {
    if (skipInitialFetch.current) {
      skipInitialFetch.current = false;
      return;
    }
    void loadPage(page, pageSize);
  }, [page, pageSize, loadPage]);

  const openCreate = useCallback(() => {
    setSubmitError(null);
    setEditing(null);
    form.reset(defaultForm);
    setSheetOpen(true);
  }, [form]);

  const openEdit = useCallback(
    (row: EventType) => {
      setSubmitError(null);
      setEditing(row);
      form.reset(toFormValues(row));
      setSheetOpen(true);
    },
    [form],
  );

  const onSubmit = form.handleSubmit((values) => {
    const editingRow = editing;
    const payload = {
      name: values.name.trim(),
      image: toApiImage(values.image, editingRow?.image),
      description: values.description.trim(),
    };

    setSubmitError(null);

    startTransition(async () => {
      try {
        const result = editingRow
          ? await updateEventTypeAction(editingRow.eventTypeId, payload)
          : await createEventTypeAction(payload);

        if (result.error) {
          setSubmitError(result.error);
          toast.error(result.error);
          return;
        }

        toast.success(result.success);
        setSheetOpen(false);
        await loadPage(page, pageSize);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong while saving.";
        setSubmitError(message);
        toast.error(message);
      }
    });
  });

  const toggleActive = (row: EventType) => {
    startTransition(async () => {
      const result = await toggleEventTypeActiveAction(
        row.eventTypeId,
        !row.isActive,
      );
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(result.success);
      await loadPage(page, pageSize);
    });
  };

  const rows = listData.data;
  const pageCount = Math.max(listData.totalPages, 1);
  const total = listData.totalCount;

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      <AdminListCard>
        <div className="border-slate-100 flex flex-col gap-1 border-b px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[#1b4332]/10 text-[#1b4332]">
                <CalendarDaysIcon className="size-4" />
              </span>
              <h2 className="text-slate-800 text-base font-semibold">
                Event types
              </h2>
            </div>
            <p className="text-slate-500 text-sm">
              Manage tournament and event categories shown across the BSRF site.
            </p>
          </div>
          <Button
            type="button"
            className={adminBtnPrimary}
            onClick={openCreate}
          >
            <PlusIcon className="size-4" />
            New event type
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
            <CalendarDaysIcon className="text-slate-300 size-10" />
            <p className="text-slate-600 text-sm font-medium">
              No event types yet
            </p>
            <p className="text-xs">
              Create your first event category to get started.
            </p>
          </div>
        ) : (
          <>
            <div className="admin-data-table hidden border-t border-[#E5E7EB] bg-white md:block">
              <Table className="min-w-[720px] w-full">
                <TableHeader>
                  <TableRow className={adminTableHeaderRowClass}>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Description
                    </TableHead>
                    <TableHead className="w-28">Status</TableHead>
                    <TableHead className="w-24">Active</TableHead>
                    <TableHead className="w-[5.5rem] min-w-[5.5rem] text-end! sm:min-w-0 sm:max-w-28">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.eventTypeId}>
                      <TableCell>
                        <ImageThumb
                          src={getEventTypeImageUrl(row.image)}
                          alt={row.name}
                        />
                      </TableCell>
                      <TableCell className="max-w-[14rem]">
                        <p className="text-neutral-900 font-medium break-words">
                          {row.name}
                        </p>
                        <p className="text-neutral-500 text-xs">
                          ID {row.eventTypeId}
                        </p>
                      </TableCell>
                      <TableCell className="text-neutral-600 hidden max-w-[18rem] lg:table-cell">
                        <p className="line-clamp-2 text-sm">
                          {row.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={row.isActive ? 'active' : 'inactive'}>
                          {row.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-start">
                          <Switch
                            size="sm"
                            checked={row.isActive}
                            disabled={isPending}
                            onCheckedChange={() => toggleActive(row)}
                            aria-label={`Toggle ${row.name} active status`}
                          />
                        </div>
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
                  key={row.eventTypeId}
                  className="border-slate-200 flex flex-col gap-2.5 rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-3">
                    <ImageThumb
                      src={getEventTypeImageUrl(row.image)}
                      alt={row.name}
                      className="size-12"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-slate-800 text-sm font-medium break-words">
                        {row.name}
                      </p>
                      <p className="text-slate-500 text-xs">
                        ID {row.eventTypeId}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-500 line-clamp-3 text-xs">
                    {row.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={row.isActive ? 'active' : 'inactive'}>
                        {row.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Switch
                        size="sm"
                        checked={row.isActive}
                        disabled={isPending}
                        onCheckedChange={() => toggleActive(row)}
                        aria-label={`Toggle ${row.name} active status`}
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
                setPageSize(size);
                setPage(0);
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
                <SheetTitle>
                  {editing ? 'Edit event type' : 'Create event type'}
                </SheetTitle>
                <SheetDescription>
                  Name and description appear on events pages. Image is
                  optional.
                </SheetDescription>
              </SheetHeader>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="space-y-4 p-4 sm:p-6">
                  {submitError ? (
                    <div
                      role="alert"
                      className="border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                    >
                      {submitError}
                    </div>
                  ) : null}
                  <div className="grid gap-2">
                    <Label htmlFor="event-type-name">Name</Label>
                    <Input
                      id="event-type-name"
                      autoComplete="off"
                      placeholder={formPlaceholders.eventTypeName}
                      {...form.register('name')}
                    />
                    {form.formState.errors.name?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.name.message)}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="event-type-image">Image</Label>
                    <ImageDataUrlUpload
                      id="event-type-image"
                      value={form.watch('image')}
                      onChange={(v) =>
                        form.setValue('image', v, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
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
                    <Label htmlFor="event-type-description">Description</Label>
                    <Textarea
                      id="event-type-description"
                      rows={4}
                      placeholder={formPlaceholders.description}
                      {...form.register('description')}
                    />
                    {form.formState.errors.description?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.description.message)}
                      </p>
                    )}
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
                <Button
                  type="submit"
                  className={adminBtnPrimary}
                  disabled={isPending}
                >
                  {isPending ? 'Saving…' : 'Save'}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
