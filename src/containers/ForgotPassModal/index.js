import { Modal } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ButtonComponent, InputComponent } from '../../components';

const ForgotPassModal = ({ visible, onClose }) => {
    const [formValue, setFormValue] = useState();
    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (data) => {
        console.log(data);
        setStep((step) => step + 1);
    };
    return (
        <>
            <Modal
                style={{ marginTop: '6rem' }}
                footer={null}
                open={visible}
                onOk={onClose}
                onCancel={onClose}
            >
                <div className="my-5">
                    {step === 1 && (
                        <form autoComplete="off">
                            <div className="w-100 semi-bold fs-5 text-center text-white mb-3">
                                Forgot your password?
                            </div>
                            <InputComponent
                                placeholder={'E-mail'}
                                name="email"
                                
                                onChange={handleChange}
                                value={formValue?.email}
                                autoComplete="off"
                            />

                            <div className="my-3">
                                <ButtonComponent
                                    onClick={handleSubmit}
                                    text={'RESET YOUR PASSWORD'}
                                />
                            </div>
                        </form>
                    )}

                    {step === 5 && (
                        <form autoComplete="off">
                            <div className="w-100 semi-bold fs-5 text-center text-white mb-3">
                                The email you entered is not registered. Please double-check and re-enter a valid email.
                            </div>
                            <InputComponent
                                placeholder={'E-mail'}
                                name="email"
                                onChange={handleChange}
                                value={formValue?.email}
                                autoComplete="off"
                                
                            />

                            <div className="my-3">
                                <ButtonComponent
                                    onClick={handleSubmit}
                                    text={'RESET YOUR PASSWORD'}
                                />
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="w-100 semi-bold fs-5 text-center text-white mb-3">
                            Password reset link sent to your email!
                        </div>
                    )}

                    {step === 3 && (
                        <form autoComplete="off">
                            <div className="w-100 semi-bold fs-5 text-center text-white mb-3">
                                Reset your password
                            </div>
                            <div className='my-3'>
                                <InputComponent
                                    placeholder={'Password'}
                                    name="password"
                                    // ref={register}
                                    onChange={handleChange}
                                    value={formValue?.password}
                                    autoComplete="off"
                                    password
                                />
                            </div>

                            <InputComponent
                                placeholder={'Confirm Password'}
                                name="confirm_password"
                                // ref={register}
                                onChange={handleChange}
                                value={formValue?.confirm_password}
                                autoComplete="off"
                                password
                            />

                            <div className="my-3">
                                <ButtonComponent
                                    onClick={handleSubmit}
                                    text={'RESET YOUR PASSWORD'}
                                />
                            </div>
                        </form>
                    )}
                    
                </div>
            </Modal>
        </>
    );
};

export default ForgotPassModal;
