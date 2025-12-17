
import { CenterLayout } from "@/components/application/reusable/Box/CenterLayout";
import {PageFormEntities} from "@/components/application/specific/PageFormEntities/PageFormEntities"


export default function RegisterPage() {
  return (
    <CenterLayout p={{ base: "20px 0px", md: 5, lg: 5, xl: 5 }}>
      <PageFormEntities></PageFormEntities>
    </CenterLayout>
  );
}
