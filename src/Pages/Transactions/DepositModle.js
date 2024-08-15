import { Modal, Form, message } from 'antd'
import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { DepositeFunds } from '../../apicalls/transactions';
import { useDispatch } from 'react-redux';

const DepositModle = ({
    showDepositeModel,
    setShowDepositModel,
    reloaddata
}) => {

    const [form] = Form.useForm();
    // const dispatch = useDispatch();
    const onToken = async(token)=>{
        try{
            // dispatch(showLoading());
            const responce = await DepositeFunds({token, amount: form.getFieldValue("amount")})
            // dispatch(hideLoading());
            if(responce.success){
                reloaddata();
                setShowDepositModel(false);
                message.success(responce.success);
            }
            else{
                message.error(responce.error);
            }
        }
        catch(error){
            // dispatch(hideLoading());
            message.error(error.message);
        }
    }

    return (
        <Modal title="Deposit"
            open={showDepositeModel}
            onCancel ={() => setShowDepositModel(false)}
            footer={null}>
            <div classname="flex-col gap-1">
                <Form layout='vertical' form={form}>
                    <Form.Item label="Amount" name='amount'
                        rules={[
                            {
                                required: true,
                                message: "Please input amount"
                            }
                        ]}>
                        <input type='number' />
                    </Form.Item>

                    <div className='flex justify-end gap-1'>
                        <button className='primary-outlined-btn' onClick={() => setShowDepositModel(false)}>Cancel</button>
                        <StripeCheckout
                            token={onToken}
                            currency="USD"
                            amount={form.getFieldValue("amount")*100}
                            shippingAddress
                            stripeKey="pk_test_51Pg2ylJNohXhnEmGWpjfKIk1CaogBLUYbNp8qp06JmcQdaU7hR0qKzKGZTD8Xp0pmmiWigeGCJGyuaah59gXG85b00LTkkANjg">
                                <button className='primary-contained-btn'>Deposit</button>
                            </StripeCheckout>
                    </div>
                </Form>
            </div>
        </Modal>
    )
}

export default DepositModle