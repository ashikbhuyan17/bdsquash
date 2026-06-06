import "server-only"

import { HOME_COMMITTEE } from "@/lib/home/data"
import { fetchPublicOfficials } from "@/lib/officials"
import { getProfileImageUrl } from "@/lib/media-urls"
import type { Official } from "@/lib/types/officials"
import type { PublicCommitteeMember } from "@/lib/officials/public-officials.types"

const LEAD_DESIGNATIONS = new Set(["President", "General Secretary"])

function isLeadMember(designation: string): boolean {
  return LEAD_DESIGNATIONS.has(designation.trim())
}

export function mapOfficialToCommitteeMember(
  official: Official
): PublicCommitteeMember {
  const role = official.designation.trim() || "Committee Member"

  return {
    id: official.officialId,
    role,
    name: official.name,
    lead: isLeadMember(role),
    profileImageUrl: official.profileImage
      ? getProfileImageUrl(official.profileImage)
      : "",
  }
}

export function sortCommitteeMembersDesc(
  members: PublicCommitteeMember[]
): PublicCommitteeMember[] {
  return [...members].sort((a, b) => b.id - a.id)
}

export function getFallbackCommitteeMembers(): PublicCommitteeMember[] {
  return HOME_COMMITTEE.map((member, index) => ({
    id: index + 1,
    role: member.role,
    name: member.name,
    lead: "lead" in member && member.lead === true,
    profileImageUrl: "",
  }))
}

export async function loadCommitteeMembers(): Promise<PublicCommitteeMember[]> {
  try {
    const result = await fetchPublicOfficials(1, 100)
    const members = sortCommitteeMembersDesc(
      result.data
        .filter((official) => official.isActive)
        .map(mapOfficialToCommitteeMember)
    )

    return members.length > 0 ? members : getFallbackCommitteeMembers()
  } catch {
    return getFallbackCommitteeMembers()
  }
}
