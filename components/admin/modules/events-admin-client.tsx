'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, PlusIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  createEventAction,
  getEventsAction,
  toggleEventActiveAction,
  updateEventAction,
} from '@/app/actions/events';
import { AdminFormActiveField } from '@/components/admin/shared/admin-form-active-field';
import { EventsFiltersBar } from '@/components/admin/shared/events-filters-bar';
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
import { syncIsActiveAfterSave } from '@/lib/admin/sync-active-status';
import { Badge } from '@/components/ui/badge';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectValue } from '@/components/ui/select';
import {
  AdminSelectContent,
  AdminSelectItem,
  AdminSelectTrigger,
} from '@/components/admin/shared/admin-select';
import {
  Sheet,
  SheetContent,
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
  eventFormSchema,
  type EventFormSchemaValues,
} from '@/lib/admin/schemas';
import { getEventImageUrl, toApiMediaValue } from '@/lib/media-urls';
import type { EventType } from '@/lib/types/event-types';
import type {
  Event,
  EventFilters,
  EventListData,
  EventsFilterState,
} from '@/lib/types/events';

const defaultFilters: EventsFilterState = {
  active: 'all',
  eventTypeId: 'all',
  eventId: '',
  eventStatus: 'all',
};

const defaultForm: EventFormSchemaValues = {
  eventTypeId: '',
  name: '',
  startDate: '',
  endDate: '',
  description: '',
  address: '',
  latitude: '23.8103',
  longitude: '90.4125',
  image: IMG_PLACEHOLDER_PNG,
  isActive: true,
};

function toDatetimeLocalValue(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16);
}

function toIsoString(datetimeLocal: string): string {
  return new Date(datetimeLocal).toISOString();
}

function formatEventDate(iso: string): string {
  try {
    return format(parseISO(iso), 'dd MMM yyyy');
  } catch {
    return iso;
  }
}

function toFormValues(row: Event): EventFormSchemaValues {
  return {
    eventTypeId: String(row.eventTypeId),
    name: row.name,
    startDate: toDatetimeLocalValue(row.startDate),
    endDate: toDatetimeLocalValue(row.endDate),
    description: row.description,
    address: row.address,
    latitude: String(row.latitude),
    longitude: String(row.longitude),
    image: row.image ? getEventImageUrl(row.image) : IMG_PLACEHOLDER_PNG,
    isActive: row.isActive,
  };
}

function toApiFilters(
  page: number,
  pageSize: number,
  filters: EventsFilterState,
): EventFilters {
  return {
    pageNumber: page + 1,
    pageSize,
    active: filters.active === 'all' ? undefined : filters.active === 'active',
    eventTypeId:
      filters.eventTypeId === 'all' ? undefined : Number(filters.eventTypeId),
    eventId: filters.eventId.trim() ? Number(filters.eventId) : undefined,
    eventStatus:
      filters.eventStatus === 'all' ? undefined : filters.eventStatus,
  };
}

function statusBadgeVariant(status: Event['eventStatus']) {
  if (status === 'Ongoing') return 'active' as const;
  if (status === 'Upcoming') return 'secondary' as const;
  return 'inactive' as const;
}

type EventsAdminClientProps = {
  initialData: EventListData;
  eventTypeOptions: EventType[];
};

export function EventsAdminClient({
  initialData,
  eventTypeOptions,
}: EventsAdminClientProps) {
  const [listData, setListData] = useState(initialData);
  const [filters, setFilters] = useState<EventsFilterState>(defaultFilters);
  const [page, setPage] = useState(Math.max(initialData.pageNumber - 1, 0));
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(
    PAGE_SIZES.includes(initialData.pageSize as (typeof PAGE_SIZES)[number])
      ? (initialData.pageSize as (typeof PAGE_SIZES)[number])
      : 10,
  );
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [isPending, startTransition] = useTransition();
  const skipInitialFetch = useRef(true);

  const form = useForm<EventFormSchemaValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: defaultForm,
  });

  const loadEvents = useCallback(
    async (
      nextPage: number,
      nextPageSize: number,
      nextFilters: EventsFilterState,
    ) => {
      setLoading(true);
      const result = await getEventsAction(
        toApiFilters(nextPage, nextPageSize, nextFilters),
      );
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
    void loadEvents(page, pageSize, filters);
  }, [page, pageSize, filters, loadEvents]);

  const applyFilters = (next: EventsFilterState) => {
    setFilters(next);
    setPage(0);
  };

  const openCreate = useCallback(() => {
    setEditing(null);
    form.reset(defaultForm);
    setSheetOpen(true);
  }, [form]);

  const openEdit = useCallback(
    (row: Event) => {
      setEditing(row);
      form.reset(toFormValues(row));
      setSheetOpen(true);
    },
    [form],
  );

  useEffect(() => {
    if (!sheetOpen) return;
    if (editing) form.reset(toFormValues(editing));
    else form.reset(defaultForm);
  }, [sheetOpen, editing, form]);

  const onSubmit = form.handleSubmit((values) => {
    const image = toApiMediaValue(values.image, editing?.image);
    const sharedPayload = {
      name: values.name.trim(),
      startDate: toIsoString(values.startDate),
      endDate: toIsoString(values.endDate),
      description: values.description.trim(),
      address: values.address.trim(),
      latitude: Number(values.latitude),
      longitude: Number(values.longitude),
      image,
    };

    startTransition(async () => {
      const editingRow = editing;
      const result = editingRow
        ? await updateEventAction(editingRow.eventId, sharedPayload)
        : await createEventAction({
            ...sharedPayload,
            eventTypeId: Number(values.eventTypeId),
          });

      if (result.error) {
        toast.error(result.error);
        return;
      }

      const entityId =
        editingRow?.eventId ?? (result as { id?: number }).id;
      const statusError = await syncIsActiveAfterSave({
        entityId,
        previousActive: editingRow?.isActive,
        nextActive: values.isActive,
        sync: () => toggleEventActiveAction(entityId!, values.isActive),
      });
      if (statusError) {
        toast.error(statusError);
        return;
      }

      toast.success(result.success);
      setSheetOpen(false);
      await loadEvents(page, pageSize, filters);
    });
  });

  const toggleActive = (row: Event) => {
    startTransition(async () => {
      const result = await toggleEventActiveAction(row.eventId, !row.isActive);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(result.success);
      await loadEvents(page, pageSize, filters);
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
                <CalendarIcon className="size-4" />
              </span>
              <h2 className="text-slate-800 text-base font-semibold">Events</h2>
            </div>
            <p className="text-slate-500 text-sm">
              Create and manage BSRF tournaments with dates, location, and
              status filters.
            </p>
          </div>
          <Button
            type="button"
            className={adminBtnPrimary}
            onClick={openCreate}
          >
            <PlusIcon className="size-4" />
            New event
          </Button>
        </div>

        <div className="border-slate-100 bg-slate-50/30 px-4 py-3 sm:px-5 sm:py-3.5">
          <EventsFiltersBar
            filters={filters}
            eventTypeOptions={eventTypeOptions}
            onChange={applyFilters}
          />
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
            <CalendarIcon className="text-slate-300 size-10" />
            <p className="text-slate-600 text-sm font-medium">
              No events found
            </p>
            <p className="text-xs">Adjust filters or create a new event.</p>
          </div>
        ) : (
          <>
            <div className="admin-data-table hidden border-t border-[#E5E7EB] bg-white md:block">
              <Table className="min-w-[960px] w-full">
                <TableHeader>
                  <TableRow className={adminTableHeaderRowClass}>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Dates
                    </TableHead>
                    <TableHead className="hidden xl:table-cell">
                      Location
                    </TableHead>
                    <TableHead className="w-28">Status</TableHead>
                    <TableHead className="w-24">Active</TableHead>
                    <TableHead className="w-[5.5rem] text-end!">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.eventId}>
                      <TableCell>
                        <ImageThumb
                          src={getEventImageUrl(row.image)}
                          alt={row.name}
                        />
                      </TableCell>
                      <TableCell className="max-w-[14rem]">
                        <p className="text-neutral-900 font-medium break-words">
                          {row.name}
                        </p>
                        <p className="text-neutral-500 text-xs">
                          {row.eventTypeName}
                        </p>
                        <p className="text-neutral-400 text-xs">
                          ID {row.eventId}
                        </p>
                      </TableCell>
                      <TableCell className="hidden text-sm text-neutral-600 lg:table-cell">
                        <p>{formatEventDate(row.startDate)}</p>
                        <p className="text-neutral-400">
                          to {formatEventDate(row.endDate)}
                        </p>
                      </TableCell>
                      <TableCell className="hidden max-w-[12rem] truncate text-sm text-neutral-600 xl:table-cell">
                        {row.address}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge variant={statusBadgeVariant(row.eventStatus)}>
                            {row.eventStatus}
                          </Badge>
                          <Badge variant={row.isActive ? 'active' : 'inactive'}>
                            {row.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
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
                  key={row.eventId}
                  className="border-slate-200 flex flex-col gap-2.5 rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-3">
                    <ImageThumb
                      src={getEventImageUrl(row.image)}
                      alt={row.name}
                      className="size-12"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-slate-800 text-sm font-medium break-words">
                        {row.name}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {row.eventTypeName}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs">
                    {formatEventDate(row.startDate)} –{' '}
                    {formatEventDate(row.endDate)}
                  </p>
                  <p className="text-slate-500 line-clamp-2 text-xs">
                    {row.address}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant={statusBadgeVariant(row.eventStatus)}>
                        {row.eventStatus}
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
                  {editing ? 'Edit event' : 'Create event'}
                </SheetTitle>
              </SheetHeader>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="space-y-4 p-4 sm:p-6">
                  {!editing ? (
                    <div className="grid w-full gap-2">
                      <Label htmlFor="event-type">Event type</Label>
                      <Select
                        value={form.watch('eventTypeId') || undefined}
                        onValueChange={(value) =>
                          form.setValue('eventTypeId', value, {
                            shouldValidate: true,
                            shouldDirty: true,
                          })
                        }
                      >
                        <AdminSelectTrigger id="event-type">
                          <SelectValue
                            placeholder={formPlaceholders.selectEventType}
                          />
                        </AdminSelectTrigger>
                        <AdminSelectContent>
                          {eventTypeOptions.map((type) => (
                            <AdminSelectItem
                              key={type.eventTypeId}
                              value={String(type.eventTypeId)}
                            >
                              {type.name}
                            </AdminSelectItem>
                          ))}
                        </AdminSelectContent>
                      </Select>
                      {form.formState.errors.eventTypeId?.message != null && (
                        <p className="text-destructive text-sm" role="alert">
                          {String(form.formState.errors.eventTypeId.message)}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                      Type:{' '}
                      <span className="font-medium">
                        {editing.eventTypeName}
                      </span>
                    </div>
                  )}

                  <div className="grid gap-2">
                    <Label htmlFor="event-name">Name</Label>
                    <Input
                      id="event-name"
                      autoComplete="off"
                      placeholder={formPlaceholders.eventName}
                      {...form.register('name')}
                    />
                    {form.formState.errors.name?.message != null && (
                      <p className="text-destructive text-sm" role="alert">
                        {String(form.formState.errors.name.message)}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="event-start">Start date</Label>
                      <Input
                        id="event-start"
                        type="datetime-local"
                        {...form.register('startDate')}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="event-end">End date</Label>
                      <Input
                        id="event-end"
                        type="datetime-local"
                        {...form.register('endDate')}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="event-description">Description</Label>
                    <Textarea
                      id="event-description"
                      rows={4}
                      placeholder={formPlaceholders.description}
                      {...form.register('description')}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="event-address">Address</Label>
                    <Input
                      id="event-address"
                      autoComplete="off"
                      placeholder={formPlaceholders.eventAddress}
                      {...form.register('address')}
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="event-latitude">Latitude</Label>
                      <Input
                        id="event-latitude"
                        placeholder={formPlaceholders.latitude}
                        {...form.register('latitude')}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="event-longitude">Longitude</Label>
                      <Input
                        id="event-longitude"
                        placeholder={formPlaceholders.longitude}
                        {...form.register('longitude')}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="event-image">Image</Label>
                    <ImageDataUrlUpload
                      id="event-image"
                      value={form.watch('image')}
                      onChange={(value) =>
                        form.setValue('image', value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                    />
                  </div>

                  <AdminFormActiveField
                    id="event-is-active"
                    checked={form.watch('isActive')}
                    onChange={(value) =>
                      form.setValue('isActive', value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      })
                    }
                  />
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
