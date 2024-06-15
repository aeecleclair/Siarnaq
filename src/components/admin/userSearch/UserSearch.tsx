import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { CoreUserSimple, getUsers } from "@/api";
import { useEffect, useState } from "react";

export const UserSearch = () => {
  const [users, setUsers] = useState<CoreUserSimple[]>([]);
  const [refetchUsers, setRefetchUsers] = useState<boolean>(true);

  const onGetCdrSellers = async () => {
    const { data, error } = await getUsers({});
    if (error) {
      console.log(error);
      return;
    }
    setUsers(data!);
  };

  useEffect(() => {
    if (refetchUsers) {
      onGetCdrSellers();
      setRefetchUsers(false);
    }
  }, [refetchUsers]);

  return (
    <div className="flex items-center justify-center p-6 min-w-96">
      <DataTable columns={columns} data={users} />
    </div>
  );
};
