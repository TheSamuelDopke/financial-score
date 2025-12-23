
import { EntityDetails } from '@/components/application/specific/EntityDetails/EntityDetails';
import { Text } from '@/components/application/reusable/Text/Text';

interface PropsParams {
  params: { id: string }; 
}


export default async function EntityDetailPage({ params }: PropsParams) {

  const { id } = await params;

  if (!id) {
    return <Text>ID inválido</Text>;
  }

  return <EntityDetails entityId={id} />;
}