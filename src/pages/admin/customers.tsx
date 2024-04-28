import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAllUsersQuery, useDeleteUserMutation } from "../../redux/api/userAPI";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/Loader";
import { responseToast } from "../../utils/features";
interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
const Customers = () => {

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useAllUsersQuery(user?._id as string);


  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }



  const [rows, setRows] = useState<DataType[]>([]);


  const [deleteUser] = useDeleteUserMutation();


  const deleteHandler = async (userId: string) => {

    const response = await deleteUser({ userId, adminUserId: user?._id as string });
    responseToast(response, null, "");
  }

  useEffect(() => {

    if (data) {
      setRows(data.users.map(item => {
        return {
          avatar: <img src={item.photo} alt={item.name} style={{
            borderRadius: "50%"
          }} />,
          name: item.name,
          email: item.email,
          gender: item.gender,
          role: item.role,
          action: <button onClick={() => deleteHandler(item._id)}><FaTrash /></button>
        };
      }));
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();




  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ?
        <Skeleton length={10} /> : Table}</main>
    </div>
  );
};

export default Customers;