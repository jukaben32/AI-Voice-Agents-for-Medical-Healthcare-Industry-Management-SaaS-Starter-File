import type { Website } from '@/types'
import { slugify } from '@/lib/utils'
import type { DbClient } from './_shared'

function toWebsite(row: any): Website {
  return {
    id: row.id,
    businessId: row.business_id,
    agentId: row.agent_id ?? null,
    slug: row.slug,
    template: row.template,
    published: row.published,
    primaryColor: row.primary_color,
    secondaryColor: row.secondary_color,
    font: row.font,
    siteTitle: row.site_title,
    siteDescription: row.site_description,
    heroHeadline: row.hero_headline ?? null,
    heroSubheadline: row.hero_subheadline ?? null,
    heroImageUrl: row.hero_image_url ?? null,
    ctaPrimaryText: row.cta_primary_text,
    ctaSecondaryText: row.cta_secondary_text,
    aboutTitle: row.about_title,
    aboutStory: row.about_story ?? null,
    aboutPhotoUrl: row.about_photo_url ?? null,
    footerTagline: row.footer_tagline ?? null,
    footerCopyright: row.footer_copyright ?? null,
    contactPhone: row.contact_phone ?? null,
    contactEmail: row.contact_email ?? null,
    contactAddress: row.contact_address ?? null,
    contactHours: row.contact_hours ?? null,
    contactMapsUrl: row.contact_maps_url ?? null,
    yearsExperience: row.years_experience ?? null,
    patientsServed: row.patients_served ?? null,
    satisfactionPct: row.satisfaction_pct ?? null,
    trustBadges: row.trust_badges ?? [],
    featuredServiceIds: row.featured_service_ids ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function getWebsiteByBusinessId(supabase: DbClient, businessId: string) {
  const { data, error } = await supabase.from('websites').select('*').eq('business_id', businessId).maybeSingle()
  if (error) throw error
  return data ? toWebsite(data) : null
}

export async function getWebsiteBySlug(supabase: DbClient, slug: string) {
  const { data, error } = await supabase.from('websites').select('*').eq('slug', slug).maybeSingle()
  if (error) throw error
  return data ? toWebsite(data) : null
}

export async function checkWebsiteSlugAvailability(supabase: DbClient, slug: string) {
  const { count, error } = await supabase.from('websites').select('id', { count: 'exact', head: true }).eq('slug', slug)
  if (error) throw error
  return (count ?? 0) === 0
}

export async function createOrUpdateWebsite(
  supabase: DbClient,
  businessId: string,
  input: {
    slug?: string
    agentId?: string | null
    template?: Website['template']
    published?: boolean
    primaryColor?: string
    secondaryColor?: string
    font?: string
    siteTitle: string
    siteDescription: string
    heroHeadline?: string | null
    heroSubheadline?: string | null
    heroImageUrl?: string | null
    ctaPrimaryText?: string
    ctaSecondaryText?: string
    aboutTitle?: string
    aboutStory?: string | null
    aboutPhotoUrl?: string | null
    footerTagline?: string | null
    footerCopyright?: string | null
    contactPhone?: string | null
    contactEmail?: string | null
    contactAddress?: string | null
    contactHours?: string | null
    contactMapsUrl?: string | null
    yearsExperience?: number | null
    patientsServed?: number | null
    satisfactionPct?: number | null
    trustBadges?: string[]
    featuredServiceIds?: string[]
  }
) {
  const { data, error } = await supabase
    .from('websites')
    .upsert({
      business_id: businessId,
      agent_id: input.agentId ?? null,
      slug: input.slug ? slugify(input.slug) : undefined,
      template: input.template ?? 'serenity',
      published: input.published ?? false,
      primary_color: input.primaryColor ?? '#0f766e',
      secondary_color: input.secondaryColor ?? '#0ea5e9',
      font: input.font ?? 'Inter',
      site_title: input.siteTitle,
      site_description: input.siteDescription,
      hero_headline: input.heroHeadline ?? null,
      hero_subheadline: input.heroSubheadline ?? null,
      hero_image_url: input.heroImageUrl ?? null,
      cta_primary_text: input.ctaPrimaryText ?? 'Book Appointment',
      cta_secondary_text: input.ctaSecondaryText ?? 'View Services',
      about_title: input.aboutTitle ?? 'About Us',
      about_story: input.aboutStory ?? null,
      about_photo_url: input.aboutPhotoUrl ?? null,
      footer_tagline: input.footerTagline ?? null,
      footer_copyright: input.footerCopyright ?? null,
      contact_phone: input.contactPhone ?? null,
      contact_email: input.contactEmail ?? null,
      contact_address: input.contactAddress ?? null,
      contact_hours: input.contactHours ?? null,
      contact_maps_url: input.contactMapsUrl ?? null,
      years_experience: input.yearsExperience ?? null,
      patients_served: input.patientsServed ?? null,
      satisfaction_pct: input.satisfactionPct ?? null,
      trust_badges: input.trustBadges ?? [],
      featured_service_ids: input.featuredServiceIds ?? [],
    })
    .select('*')
    .single()
  if (error) throw error
  return toWebsite(data)
}

export async function updateWebsite(supabase: DbClient, businessId: string, websiteId: string, patch: Partial<Website>) {
  const { data, error } = await supabase
    .from('websites')
    .update({
      agent_id: patch.agentId,
      slug: patch.slug,
      template: patch.template,
      published: patch.published,
      primary_color: patch.primaryColor,
      secondary_color: patch.secondaryColor,
      font: patch.font,
      site_title: patch.siteTitle,
      site_description: patch.siteDescription,
      hero_headline: patch.heroHeadline,
      hero_subheadline: patch.heroSubheadline,
      hero_image_url: patch.heroImageUrl,
      cta_primary_text: patch.ctaPrimaryText,
      cta_secondary_text: patch.ctaSecondaryText,
      about_title: patch.aboutTitle,
      about_story: patch.aboutStory,
      about_photo_url: patch.aboutPhotoUrl,
      footer_tagline: patch.footerTagline,
      footer_copyright: patch.footerCopyright,
      contact_phone: patch.contactPhone,
      contact_email: patch.contactEmail,
      contact_address: patch.contactAddress,
      contact_hours: patch.contactHours,
      contact_maps_url: patch.contactMapsUrl,
      years_experience: patch.yearsExperience,
      patients_served: patch.patientsServed,
      satisfaction_pct: patch.satisfactionPct,
      trust_badges: patch.trustBadges,
      featured_service_ids: patch.featuredServiceIds,
    })
    .eq('business_id', businessId)
    .eq('id', websiteId)
    .select('*')
    .single()
  if (error) throw error
  return toWebsite(data)
}

export async function publishWebsite(supabase: DbClient, businessId: string, websiteId: string, published = true) {
  return updateWebsite(supabase, businessId, websiteId, { published })
}

export async function createWebsiteSubscriber(
  supabase: DbClient,
  businessId: string,
  input: {
    email: string
    name?: string | null
    source?: string
  }
) {
  const result: any = await supabase
    .from('website_subscribers')
    .insert({
      business_id: businessId,
      email: input.email,
      name: input.name ?? null,
      source: input.source ?? 'website',
    })
    .select('*')
    .single()
  const { data, error } = result
  if (error) throw error
  return {
    id: data.id,
    businessId: data.business_id,
    email: data.email,
    name: data.name ?? null,
    source: data.source,
    createdAt: data.created_at,
  }
}
