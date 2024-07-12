import DataTable from "react-data-table-component";
//import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Admin() {
  const [tableData, setTableData] = useState([]);

  const getFirestoreData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "location")); 
        const dataArray = querySnapshot.docs.map(doc => (
          { ...doc.data(), id: doc.id, createdAt: doc.data().createdAt.toDate().toLocaleDateString() }));
        setTableData(dataArray)
        console.log(dataArray);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    console.log(tableData)
};

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "User ID",
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: "from location",
      selector: (row) => row.from_location.name,
      sortable: true,
    },
    {
      name: "To destination",
      selector: (row) => row.to_location.name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.createdAt,
      sortable: true,
    }
  ];

  useEffect(() => {
    getFirestoreData();  
   }, []);

  return (
    <>
      
      <div className="table-container">
        <DataTable columns={columns} data={tableData} NotselectableRows></DataTable>
      </div>
    </>
  );
}
export default Admin;
