'use client';

import { useActionState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { updateAdminProfileAction } from '@/app/actions/admin-information';
import { AdminListCard } from '@/components/admin/shared/admin-list-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { adminBtnPrimary } from '@/lib/admin/admin-ui';
import { formPlaceholders } from '@/lib/admin/form-placeholders';
import { profileFormSchema, type ProfileFormValues } from '@/lib/admin/schemas';
import { publicEnv } from '@/lib/env';
import type { AdminInformation } from '@/lib/types/admin-information';
import { initialsFromName } from '@/lib/utils';

function resolveProfileImageUrl(
  profileImage: string | null,
): string | undefined {
  if (!profileImage) return undefined;
  if (/^https?:\/\//i.test(profileImage)) return profileImage;
  return `${publicEnv.imgUrl}${profileImage.startsWith('/') ? profileImage : `/${profileImage}`}`;
}

function toFormValues(data: AdminInformation): ProfileFormValues {
  return {
    name: data.name,
    email: data.email ?? '',
    phoneNumber: data.phoneNumber,
  };
}

export function ProfileAdminClient({
  initialData,
}: {
  initialData: AdminInformation | null;
}) {
  const [state, formAction, isPending] = useActionState(
    updateAdminProfileAction,
    {},
  );

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData
      ? toFormValues(initialData)
      : { name: '', email: '', phoneNumber: '' },
  });

  useEffect(() => {
    if (initialData) form.reset(toFormValues(initialData));
  }, [initialData, form]);

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) toast.success(state.success);
  }, [state.error, state.success]);

  const watchedName = form.watch('name');
  const profileImage = initialData?.profileImage ?? null;
  const avatarUrl = resolveProfileImageUrl(profileImage);
  const initials = initialsFromName(
    watchedName || initialData?.name || 'Admin',
  );

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <AdminListCard className="overflow-visible">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <Avatar className="size-20 border-2 border-[#1b4332]/20">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={watchedName} />
              ) : null}
              <AvatarFallback className="bg-[#1b4332] text-lg font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-lg font-semibold text-slate-900">
                {initialData?.name || 'Admin Profile'}
              </p>
              <p className="text-slate-500 mt-1 text-sm">
                Update your account details used across the admin panel and site
                header.
              </p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form action={formAction} className="space-y-6 px-6 py-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      name="name"
                      placeholder={formPlaceholders.fullName}
                      disabled={isPending}
                      className="h-10 rounded-lg border-slate-200 bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      name="email"
                      type="email"
                      placeholder={formPlaceholders.email}
                      disabled={isPending}
                      className="h-10 rounded-lg border-slate-200 bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      name="phoneNumber"
                      inputMode="numeric"
                      maxLength={11}
                      placeholder={formPlaceholders.phoneNumber}
                      disabled={isPending}
                      className="h-10 rounded-lg border-slate-200 bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
              <Button
                type="submit"
                className={adminBtnPrimary}
                disabled={isPending}
              >
                <UserIcon className="size-4" />
                {isPending ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </form>
        </Form>
      </AdminListCard>
    </div>
  );
}
