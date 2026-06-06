export type ActiveToggleResult = { error?: string }

export async function syncIsActiveAfterSave(options: {
  entityId: number | string | undefined
  previousActive: boolean | undefined
  nextActive: boolean
  sync: () => Promise<ActiveToggleResult>
}): Promise<string | undefined> {
  const { entityId, previousActive, nextActive, sync } = options
  if (entityId === undefined) return undefined

  const needsToggle =
    previousActive === undefined
      ? !nextActive
      : previousActive !== nextActive

  if (!needsToggle) return undefined

  const result = await sync()
  return result.error
}
