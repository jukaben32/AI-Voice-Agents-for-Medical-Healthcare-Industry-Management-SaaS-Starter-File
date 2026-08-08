import { DashboardAgentDetailScreen } from '@/components/clinic/screens'

export default function Page({ params }: { params: { id: string } }) {
  return <DashboardAgentDetailScreen id={params.id} />
}
