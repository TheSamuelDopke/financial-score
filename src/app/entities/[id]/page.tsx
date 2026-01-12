
import { EntityDetails } from '@/components/application/features/EntityDetails/EntityDetails';
import { Text } from '@/components/application/shared/Text/Text';

interface PropsParams {
  params: { id: string }; 
}


export default async function EntityDetailPage({ params }: PropsParams) {

  const { id } = await params;

  if (!id) {
    return <Text>ID inválido</Text>;
  }
    // const idNumber = Number({id})
  

  return <EntityDetails entityId={id} />;
}