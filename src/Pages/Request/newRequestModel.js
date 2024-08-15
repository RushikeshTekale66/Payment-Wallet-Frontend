import React from 'react';
import { Form, message, Modal } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { sendRequest, VerifyAccount } from '../../apicalls/request';
// import { showLoading, HideLoading } from "../../Redux/loderSclice"

function NewRequestModel({ showNewRequestModel,
    setshowNewRequestModel,
    reloadData }) {
    const { user } = useSelector(state => state.users);
    const [isVerified, setIsVerified] = React.useState('');
    const [form] = Form.useForm();
    // const dispatch = useDispatch(); 

    const verifyAccount = async () => {
        try {
            // dispatch(showLoading());
            const responce = await VerifyAccount({
                receiver: form.getFieldValue("receiver")
            })
            // dispatch(HideLoading());
            if (responce.success) {
                setIsVerified('true');
            }
            else {
                setIsVerified('false')
            }
        }
        catch (error) {
            // dispatch(HideLoading());
            setIsVerified('false');
        }
    }


    const onFinish = async (values) => {

        try {
            // dispatch(showLoading());
            const payload = {
                ...values,
                sender: user._id,
                reference: values.reference || 'no reference',
                status: "success"
            }
            const responce = await sendRequest(payload);
            if (responce.success) {
                reloadData();
                setshowNewRequestModel(false);
                message.success(responce.message);
            }
            else {
                message.error(responce.error);
            }
            // dispatch(HideLoading());
        }
        catch (error) {
            // dispatch(HideLoading());
            message.error(error.message);
        }
    }

    return (
        <div>
            <Modal title="Transfer Funds"
                open={showNewRequestModel}
                onCancel={() => setshowNewRequestModel(false)}
                footer={null}>

                <Form layout='vertical' form={form} onFinish={onFinish}>
                    <div className='flex gap-2 items-center'>
                        <Form.Item label="Account Number" name="receiver" className='w-100'>
                            <input type='text' />
                        </Form.Item>
                        <button type='button' className='primary-contained-btn mt-1' onClick={verifyAccount}>VERIFY</button>
                    </div>

                    {isVerified === 'true' && (
                        <div className='success-bg'>
                            Account Verified
                        </div>
                    )}

                    {isVerified === "false" && (
                        <div className='error-bg'>Invalid Account</div>
                    )}

                    <Form.Item label="Amount" name="amount"
                        rules={[
                            {
                                required: true,
                                message: "please input your amount!",
                            },
                            {
                                max: user.label,
                                message: "Insufficient Balence"
                            }
                        ]}>
                        <input type='Number' />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <textarea type='text' />
                    </Form.Item>

                    <div className='flex justify-end gap-1'>
                        <button className='primary-outlined-btn'>Cancel</button>

                        {isVerified === 'true' && (
                            <button className='primary-contained-btn'>Request</button>
                        )}

                    </div>
                </Form>

            </Modal>
        </div >
    );
}

export default NewRequestModel;