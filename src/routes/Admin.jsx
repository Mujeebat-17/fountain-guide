import DataTable from 'react-data-table-component';
import Navbar from "../components/Navbar";

function Admin() {

    const columns=[
{
    name: 'Id',
    selector: row => row.id,
    sortable:true
},
{
    name: 'Name',
    selector: row => row.name,
    sortable:true

},
{
    name: 'Email',
    selector: row => row.email,
    sortable:true
},
{
    name: 'from location',
    selector: row => row.fromlocation,
    sortable:true
},
{
    name: 'to destination',
    selector: row => row.todestination,
    sortable:true
}

    ]
    const data = [
        {
            id: 1,
            name: "hello",
            email: "hello",
            "from location": "hello",
            "to destination": "hello",

        }
    ]
    return(
        <>
        <Navbar />
        <div className='table-container'>
        <DataTable>
            columns={columns}
            data={data}
            selectableRows
        </DataTable>

        </div>
        </>
    )
}
export default Admin;