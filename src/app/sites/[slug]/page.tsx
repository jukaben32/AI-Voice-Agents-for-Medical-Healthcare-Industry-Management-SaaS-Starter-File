import { SiteSlugScreen } from '@/components/clinic/screens'

export default function Page({ params }: { params: { slug: string } }) {
  return <SiteSlugScreen slug={params.slug} />
}
