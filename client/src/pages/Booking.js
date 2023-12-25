import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

function Booking() {
    const [doctor, setDoctor] = useState(null);
    const params = useParams();
    const { user } = useSelector((state) => state.user);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [isAvailable, setIsAvailable] = useState();
    const dispatch = useDispatch();

    const getDoctorData = async () => {
        try {
            const res = await axios.post('/api/v1/doctor/get-doctor-by-id', { doctorId: params.doctorId }, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('token')
                }
            });
            if (res.data.success) {
                setDoctor(res.data.data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    const handleBooking = async () => {
        try {
          dispatch(showLoading());
          const res = await axios.post(
            "/api/v1/user/book-appointment",
            {
              doctorId: params.doctorId,
              userId: user._id,
              doctorInfo: doctor,
              userInfo: user,
              date: date,
              time: time,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (res.data.success) {
            message.success(res.data.message);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
        }
      };

    useEffect(() => {
        getDoctorData();
        //eslinit-disable-next-line
    }, []);
    return (
        <Layout>
            <h3>Booking Page</h3>
            <div className="container m-2">
                {doctor && (
                    <div>
                        <h4>
                            Dr.{doctor.firstName} {doctor.lastName}
                        </h4>
                        <h4>Fees : {doctor.feesPerCunsaltation}</h4>
                        <h4>
                            Timings : {doctor.timings && doctor.timings[0]} -{" "}
                            {doctor.timings && doctor.timings[1]}{" "}
                        </h4>
                        <div className="d-flex flex-column w-50">
                            <DatePicker
                                className="m-2"
                                format="DD-MM-YYYY"
                                onChange={(value) =>
                                    setDate(moment(value).format("DD-MM-YYYY"))
                                }
                            />
                            <TimePicker
                                format="HH:mm"
                                className="m-2"
                                onChange={(value) => {
                                    setTime(moment(value).format("HH:mm"));
                                }}
                            />
                            <button className="btn btn-primary mt-2">
                                Check Availability
                            </button>
                            <button className="btn btn-dark mt-2" onClick={handleBooking}>
                                Book Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default Booking