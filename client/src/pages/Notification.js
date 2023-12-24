import React from 'react';
import Layout from '../components/Layout';
import { Tabs, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';

const Notification = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleMarkAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/get-all-notification', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            }
            else {
                message.error(res.data.message)
            }
        }
        catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error('Something went wrong');
        }
    };

    const handleDeleteAllRead = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.post('/api/v1/user/delete-all-notification', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
            }
            else {
                message.error(res.data.message);
            }
        }
        catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Something went wrong in notification");
        }
    };
    return (
        <Layout>
            <h4 className="p-3 text-center">Notification page</h4>
            <Tabs>
                <Tabs.Pane tab="Unread" key={0}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2" onClick={handleMarkAllRead}>Mark All Read</h4>
                    </div>
                    {
                        user?.notification.map((notificationMsg) => (
                            <div className="card" onClick={notificationMsg.onClickPath}>
                                <div className="card-text">
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.Pane>
                <Tabs.Pane tab="Read" key={1}>
                    <div className="d-flex justify-content-end">
                        <h4 className="p-2 text-center" style={{cursor:'pointer'}} onClick={handleDeleteAllRead}>Delete All Read</h4>
                    </div>
                    {
                        user?.seenNotification.map((notificationMsg) => (
                            <div className="card" onClick={notificationMsg.onClickPath}>
                                <div className="card-text">
                                    {notificationMsg.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.Pane>
            </Tabs>
        </Layout>
    )
}

export default Notification