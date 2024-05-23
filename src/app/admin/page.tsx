import { DataTable } from "@/components/admin/DataTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AdminPage = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>{"Nom de l'asso"}</CardTitle>
          <CardDescription>Gestion de la chaîne de rentrée</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={[]} data={[]} />
        </CardContent>
      </Card>
    </main>
  );
};

export default AdminPage;
