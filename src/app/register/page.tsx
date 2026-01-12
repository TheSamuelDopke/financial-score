
import { CenterLayout } from "@/components/application/shared/Box/CenterLayout";
import {GeneralFormEntities} from "@/components/application/features/EntityRegistration/GeneralFormEntities"


export default function RegisterPage() {
  return (
    <CenterLayout p={{ base: "20px 0px", md: 5, lg: 5, xl: 5 }}>
      <GeneralFormEntities></GeneralFormEntities>
    </CenterLayout>
  );
}
