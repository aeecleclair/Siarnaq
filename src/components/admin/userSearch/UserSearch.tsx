import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { users } from "./users";

export const UserSearch = () => {
  return (
    <div className="flex items-center justify-center p-6 min-w-96">
      <DataTable columns={columns} data={users} />
    </div>
  );
};
