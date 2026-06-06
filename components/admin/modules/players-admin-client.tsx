'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon, UsersIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  createPlayerAction,
  getPlayersAction,
  togglePlayerActiveAction,
  updatePlayerAction,
} from '@/app/actions/players';
import { AdminFormActiveField } from '@/components/admin/shared/admin-form-active-field';
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
import { playerFormSchema, type PlayerFormValues } from '@/lib/admin/schemas';
import { getProfileImageUrl, toApiMediaValue } from '@/lib/media-urls';
import {
  PLAYER_FORMAT_TYPES,
  PLAYER_GENDERS,
  type Player,
  type PlayerListData,
} from '@/lib/types/players';

function FieldError({ message }: { message?: string }) {
  if (message == null || message === '') return null;

  return (
    <p className="text-destructive text-sm" role="alert">
      {message}
    </p>
  );
}

const defaultForm: PlayerFormValues = {
  name: '',
  email: '',
  phoneNumber: '',
  password: '',
  profileImage: IMG_PLACEHOLDER_PNG,
  formetType: 'Single',
  gender: 'Male',
  worldRanking: '0',
  description: '',
  profileLink: '',
  club: '',
  points: '0',
  isActive: true,
};

function toFormValues(row: Player): PlayerFormValues {
  return {
    name: row.name,
    email: row.email,
    phoneNumber: row.phoneNumber,
    password: '',
    profileImage: row.profileImage
      ? getProfileImageUrl(row.profileImage)
      : IMG_PLACEHOLDER_PNG,
    formetType: row.formetType,
    gender: row.gender,
    worldRanking: String(row.worldRanking),
    description: row.description,
    profileLink: row.profileLink,
    club: row.club,
    points: String(row.points),
    isActive: row.isActive,
  };
}

type PlayersAdminClientProps = {
  initialData: PlayerListData;
};

export function PlayersAdminClient({ initialData }: PlayersAdminClientProps) {
  const [listData, setListData] = useState(initialData);
  const [page, setPage] = useState(Math.max(initialData.pageNumber - 1, 0));
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(
    PAGE_SIZES.includes(initialData.pageSize as (typeof PAGE_SIZES)[number])
      ? (initialData.pageSize as (typeof PAGE_SIZES)[number])
      : 10,
  );
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Player | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const skipInitialFetch = useRef(true);

  const form = useForm<PlayerFormValues>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: defaultForm,
  });

  const loadPage = useCallback(
    async (nextPage: number, nextPageSize: number) => {
      setLoading(true);
      const result = await getPlayersAction(nextPage + 1, nextPageSize);
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
    (row: Player) => {
      setSubmitError(null);
      setEditing(row);
      form.reset(toFormValues(row));
      setSheetOpen(true);
    },
    [form],
  );

  const onSubmit = form.handleSubmit((values) => {
    const editingRow = editing;
    const profileImage = toApiMediaValue(
      values.profileImage,
      editingRow?.profileImage,
    );

    if (!editingRow) {
      const password = values.password.trim();
      if (password.length === 0) {
        const message = 'Password is required';
        setSubmitError(message);
        toast.error(message);
        return;
      }
      if (password.length < 6) {
        const message = 'Password must be at least 6 characters';
        setSubmitError(message);
        toast.error(message);
        return;
      }
    }

    setSubmitError(null);

    startTransition(async () => {
      try {
        let entityId: string | undefined;
        let previousActive: boolean | undefined;

        if (editingRow) {
          const result = await updatePlayerAction(editingRow.userId, {
            name: values.name.trim(),
            email: values.email.trim(),
            phoneNumber: values.phoneNumber.trim(),
            formetType: values.formetType,
            gender: values.gender,
            worldRanking: Number(values.worldRanking),
            description: values.description.trim(),
            profileLink: values.profileLink.trim(),
            club: values.club.trim(),
            points: Number(values.points),
            profileImage,
          });

          if (result.error) {
            toast.error(result.error, { duration: 6000 });
            return;
          }

          entityId = editingRow.userId;
          previousActive = editingRow.isActive;
          toast.success(result.success);
        } else {
          const result = await createPlayerAction({
            userType: 'Player',
            phoneNumber: values.phoneNumber.trim(),
            password: values.password,
            email: values.email.trim(),
            name: values.name.trim(),
            profileImage,
            playerInformation: {
              formetType: values.formetType,
              gender: values.gender,
              worldRanking: Number(values.worldRanking),
              description: values.description.trim(),
              profileLInk: values.profileLink.trim(),
              club: values.club.trim(),
              points: Number(values.points),
            },
          });

          if (result.error) {
            toast.error(result.error, { duration: 6000 });
            return;
          }

          entityId = result.id;
          toast.success(result.success);
        }

        const statusError = await syncIsActiveAfterSave({
          entityId,
          previousActive,
          nextActive: values.isActive,
          sync: () => togglePlayerActiveAction(entityId!, values.isActive),
        });
        if (statusError) {
          toast.error(statusError, { duration: 6000 });
          return;
        }

        setSheetOpen(false);
        await loadPage(page, pageSize);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Something went wrong while saving.',
        );
      }
    });
  });

  const toggleActive = (row: Player) => {
    startTransition(async () => {
      const result = await togglePlayerActiveAction(row.userId, !row.isActive);
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
                <UsersIcon className="size-4" />
              </span>
              <h2 className="text-slate-800 text-base font-semibold">
                Players
              </h2>
            </div>
            <p className="text-slate-500 text-sm">
              Register players, manage rankings, clubs, and profile details.
            </p>
          </div>
          <Button
            type="button"
            className={adminBtnPrimary}
            onClick={openCreate}
          >
            <PlusIcon className="size-4" />
            New player
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
            <UsersIcon className="text-slate-300 size-10" />
            <p className="text-slate-600 text-sm font-medium">No players yet</p>
            <p className="text-xs">
              Register your first player to get started.
            </p>
          </div>
        ) : (
          <>
            <div className="admin-data-table hidden border-t border-[#E5E7EB] bg-white md:block">
              <Table className="min-w-[980px] w-full">
                <TableHeader>
                  <TableRow className={adminTableHeaderRowClass}>
                    <TableHead className="w-16">Photo</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Format
                    </TableHead>
                    <TableHead className="w-24">Ranking</TableHead>
                    <TableHead className="hidden xl:table-cell">Club</TableHead>
                    <TableHead className="w-24">Points</TableHead>
                    <TableHead className="w-28">Status</TableHead>
                    <TableHead className="w-24">Active</TableHead>
                    <TableHead className="w-[5.5rem] text-end!">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.userId}>
                      <TableCell>
                        <ImageThumb
                          src={getProfileImageUrl(row.profileImage)}
                          alt={row.name}
                        />
                      </TableCell>
                      <TableCell className="max-w-[14rem]">
                        <p className="text-neutral-900 font-medium break-words">
                          {row.name}
                        </p>
                        <p className="text-neutral-500 text-xs">
                          {row.phoneNumber}
                        </p>
                        <p className="text-neutral-400 text-xs">{row.email}</p>
                      </TableCell>
                      <TableCell className="hidden text-sm text-neutral-600 lg:table-cell">
                        {row.formetType} · {row.gender}
                      </TableCell>
                      <TableCell className="text-sm font-medium tabular-nums">
                        #{row.worldRanking}
                      </TableCell>
                      <TableCell className="hidden max-w-[10rem] truncate text-sm text-neutral-600 xl:table-cell">
                        {row.club}
                      </TableCell>
                      <TableCell className="text-sm tabular-nums">
                        {row.points}
                      </TableCell>
                      <TableCell>
                        <Badge variant={row.isActive ? 'active' : 'inactive'}>
                          {row.isActive ? 'Active' : 'Inactive'}
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
                  key={row.userId}
                  className="border-slate-200 flex flex-col gap-2.5 rounded-xl border bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-3">
                    <ImageThumb
                      src={getProfileImageUrl(row.profileImage)}
                      alt={row.name}
                      className="size-12"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-slate-800 text-sm font-medium break-words">
                        {row.name}
                      </p>
                      <p className="text-slate-500 text-xs">
                        #{row.worldRanking} · {row.points} pts
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs">
                    {row.formetType} · {row.gender} · {row.club}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant={row.isActive ? 'active' : 'inactive'}>
                      {row.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <Switch
                        size="sm"
                        checked={row.isActive}
                        disabled={isPending}
                        onCheckedChange={() => toggleActive(row)}
                      />
                      <RowIconActions onEdit={() => openEdit(row)} />
                    </div>
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
                  {editing ? 'Edit player' : 'Register player'}
                </SheetTitle>
              </SheetHeader>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <div className="space-y-4 p-4 sm:p-6">
                  <div className="grid gap-2">
                    <Label htmlFor="player-name">Full name</Label>
                    <Input
                      id="player-name"
                      autoComplete="off"
                      placeholder={formPlaceholders.fullName}
                      {...form.register('name')}
                    />
                    <FieldError message={form.formState.errors.name?.message} />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="player-email">Email</Label>
                      <Input
                        id="player-email"
                        type="email"
                        placeholder={formPlaceholders.email}
                        {...form.register('email')}
                      />
                      <FieldError
                        message={form.formState.errors.email?.message}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="player-phone">Phone number</Label>
                      <Input
                        id="player-phone"
                        inputMode="numeric"
                        maxLength={11}
                        placeholder={formPlaceholders.phoneNumber}
                        {...form.register('phoneNumber')}
                      />
                      <FieldError
                        message={form.formState.errors.phoneNumber?.message}
                      />
                    </div>
                  </div>

                  {!editing ? (
                    <div className="grid gap-2">
                      <Label htmlFor="player-password">Password</Label>
                      <Input
                        id="player-password"
                        type="password"
                        autoComplete="new-password"
                        placeholder={formPlaceholders.password}
                        {...form.register('password')}
                      />
                      {submitError != null &&
                      (submitError === 'Password is required' ||
                        submitError ===
                          'Password must be at least 6 characters') ? (
                        <FieldError message={submitError} />
                      ) : null}
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="grid min-w-0 flex-1 gap-2">
                      <Label>Format</Label>
                      <Select
                        value={form.watch('formetType')}
                        onValueChange={(value) =>
                          form.setValue(
                            'formetType',
                            value as PlayerFormValues['formetType'],
                            {
                              shouldValidate: true,
                            },
                          )
                        }
                      >
                        <AdminSelectTrigger>
                          <SelectValue
                            placeholder={formPlaceholders.selectFormat}
                          />
                        </AdminSelectTrigger>
                        <AdminSelectContent>
                          {PLAYER_FORMAT_TYPES.map((type) => (
                            <AdminSelectItem key={type} value={type}>
                              {type}
                            </AdminSelectItem>
                          ))}
                        </AdminSelectContent>
                      </Select>
                      <FieldError
                        message={form.formState.errors.formetType?.message}
                      />
                    </div>
                    <div className="grid min-w-0 flex-1 gap-2">
                      <Label>Gender</Label>
                      <Select
                        value={form.watch('gender')}
                        onValueChange={(value) =>
                          form.setValue(
                            'gender',
                            value as PlayerFormValues['gender'],
                            {
                              shouldValidate: true,
                            },
                          )
                        }
                      >
                        <AdminSelectTrigger>
                          <SelectValue
                            placeholder={formPlaceholders.selectGender}
                          />
                        </AdminSelectTrigger>
                        <AdminSelectContent>
                          {PLAYER_GENDERS.map((gender) => (
                            <AdminSelectItem key={gender} value={gender}>
                              {gender}
                            </AdminSelectItem>
                          ))}
                        </AdminSelectContent>
                      </Select>
                      <FieldError
                        message={form.formState.errors.gender?.message}
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="player-ranking">World ranking</Label>
                      <Input
                        id="player-ranking"
                        inputMode="numeric"
                        placeholder={formPlaceholders.worldRanking}
                        {...form.register('worldRanking')}
                      />
                      <FieldError
                        message={form.formState.errors.worldRanking?.message}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="player-points">Points</Label>
                      <Input
                        id="player-points"
                        inputMode="numeric"
                        placeholder={formPlaceholders.points}
                        {...form.register('points')}
                      />
                      <FieldError
                        message={form.formState.errors.points?.message}
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="player-club">Club</Label>
                    <Input
                      id="player-club"
                      placeholder={formPlaceholders.club}
                      {...form.register('club')}
                    />
                    <FieldError message={form.formState.errors.club?.message} />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="player-profile-link">Profile link</Label>
                    <Input
                      id="player-profile-link"
                      type="url"
                      placeholder={formPlaceholders.profileLink}
                      {...form.register('profileLink')}
                    />
                    <FieldError
                      message={form.formState.errors.profileLink?.message}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="player-description">Description</Label>
                    <Textarea
                      id="player-description"
                      rows={4}
                      placeholder={formPlaceholders.description}
                      {...form.register('description')}
                    />
                    <FieldError
                      message={form.formState.errors.description?.message}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="player-image">Profile image</Label>
                    <ImageDataUrlUpload
                      id="player-image"
                      value={form.watch('profileImage')}
                      onChange={(value) =>
                        form.setValue('profileImage', value, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                    />
                  </div>

                  <AdminFormActiveField
                    id="player-is-active"
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
                  {isPending
                    ? 'Saving…'
                    : editing
                      ? 'Save changes'
                      : 'Register player'}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
}
