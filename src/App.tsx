import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./components/Pagination";
import Records from "./components/Records";

export type DataType = {
  id: number;
  first_name: string;
  last_name: string;
  city: string;
};

function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const listPerPage = 7;
  const totalPage = Math.ceil(data.length / listPerPage);

  useEffect(() => {
    axios
      .get("MOCK.json")
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        alert("There was an error while retrieving the data");
      });
  }, []);

  /**
   * 한 화면에 보이는 마지막 li 인덱스
   * ex) 10개씩 잘랐으면 마지막 10, 20, ...
   * 7개씩 잘랐으면 7, 14, ...
   */
  const indexOfLastRecord = currentPage * listPerPage;
  // 0, 7, 14, 21, ...
  // 0, 10, 20, 30, ...
  const indexOfFirstRecord = indexOfLastRecord - listPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="container mt-5">
      <h2> Simple React Pagination</h2>
      <Records data={currentRecords} />
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
