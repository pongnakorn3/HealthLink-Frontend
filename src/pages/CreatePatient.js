import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CreatePatient() {
    const [name, setName] = useState("");
    const [appointmentdate, setAppointmentdate] = useState("");
    const [status, setStatus] = useState("");
    const [appointment_time, setAppointment_time] = useState("");
    const [phone_number, setPhone_number] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/create-patient", {
                name,
                appointmentdate,
                status,
                appointment_time,
                phone_number
            });

            navigate('/'); //redirect to home page


        } catch (error) {
            setMessage("Error creating user, please try again");
        }
    }

    return (
        <div className='container'>
            <h1>Create Patient</h1>
            {message && <p className='text-danger'>{message}</p>}

            <form onSubmit={handleSubmit}>
                <div className="w-25 p-3">
                    <label className='form-label'>Name: {name}</label>
                    <input type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required />
                </div>

                <div className="w-25 p-3">
                    <label className='form-label'>appointmentDate: {appointmentdate}</label>
                    <input type="date"
                        className="form-control"
                        value={appointmentdate}
                        onChange={(e) => setAppointmentdate(e.target.value)}
                        required />
                </div>

                <div className="w-25 p-3">
                    <label className='form-label'>Status:</label>
                    <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value=""> Please Select Status</option>
                        <option value="รอคิว">รอคิว</option>
                        <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                        <option value="ยกเลิก">ยกเลิก</option>
                    </select>
                </div>

                <div className="w-25 p-3">
                    <label className='form-label'>Appointment_time: {appointment_time}</label>
                    <input type="TIME"
                        className="form-control"
                        value={appointment_time}
                        onChange={(e) => setAppointment_time(e.target.value)}
                        required />
                </div>

                <div className="w-25 p-3">
                    <label className='form-label'>Phone_number: {phone_number}</label>
                    <input type="text"
                        className="form-control"
                        value={phone_number}
                        onChange={(e) => setPhone_number(e.target.value)}
                        required />
                </div>




                <div className="w-25 p-3">
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </div>

    )
}

export default CreatePatient;
