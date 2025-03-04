import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';    //import Link

function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = async () => {
        try {
            const res = await axios.get('http://localhost:5000/');
            console.log("Fetched Data:", res.data);  // ตรวจสอบข้อมูลที่ได้จาก API
            setData(res.data);
            console.log("Success");
        } catch (error) {
            console.log("Fail", error);
        }
    };


    const deleteUser = async (id) => {
        if (window.confirm("Are you sure ?")) {
            try {
                await axios.delete(`http://localhost:5000/delete-patient/${id}`);
                fetchPatient()


            } catch (error) {
                console.log("Error deleting patient: " + error)
            }
        }
    }

    return (
        <>

            <div className='container text-center'>

                <h1>Patient Management</h1>

                <Link to="/create-patient" className='btn btn-primary btn-sm mb-3'>Create New</Link>

                <table className="table" style={{ border: "2px solid black", borderCollapse: "collapse" }}>
                    <thead className="table-dark">
                        <tr>
                            <th style={{ border: "1px solid black" }}>id</th>
                            <th style={{ border: "1px solid black" }}>Name</th>
                            <th style={{ border: "1px solid black" }}>AppointmentDate</th>
                            <th style={{ border: "1px solid black" }}>Status</th>
                            <th style={{ border: "1px solid black" }}>Appointment_time</th>
                            <th style={{ border: "1px solid black" }}>Phone_number</th>
                            <th style={{ border: "1px solid black" }}>Action</th>
                        </tr>
                        
                    </thead>
                    
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td style={{ border: "1px solid black" }}>{item.id}</td>
                                <td style={{ border: "1px solid black" }}>{item.name}</td>
                                <td style={{ border: "1px solid black" }}>{item.appointmentdate}</td>
                                <td style={{ border: "1px solid black" }}>{item.status}</td>
                                <td style={{ border: "1px solid black" }}>{item.appointment_time}</td>
                                <td style={{ border: "1px solid black" }}>{item.phone_number}</td>
                                <td style={{ border: "1px solid black" }}>
                                    <button className="btn btn-warning">
                                        <Link to={`edit-patient/${item.id}`} className="MyFontBlack">
                                            Edit
                                        </Link>
                                    </button>
                                    {" "}
                                    <button className="btn btn-danger">
                                        <Link to="#" className="MyFont" onClick={() => deleteUser(item.id)}>
                                            Delete
                                        </Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        </>
    )
}
export default Home;