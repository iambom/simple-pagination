import { DataType } from "../App";

const Records = ({ data }: { data: DataType[] }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">City</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id} </td>
            <td>{item.first_name} </td>
            <td>{item.last_name} </td>
            <td>{item.city} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Records;
