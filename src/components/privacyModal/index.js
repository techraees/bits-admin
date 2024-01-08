import { Col, Modal, Row } from 'antd'
import React from 'react'
import './index.css';

const PrivacyModal = ({privacyModal, setPrivacyModal}) => {
    const handleCancel = () => {
        setPrivacyModal(false)
    }
  return (
    <Modal
        open={privacyModal}
        onCancel={handleCancel}
        footer={false}
        centered
        width={'70%'}
        bodyStyle={{
            backgroundColor: '#f3f3f3',
            color: 'black',
            borderRadius: '20px'
        }}
        className="privacy-policy-modal"
      >
        <Row className='px-3'>
            <Col span={24} className="text-center">
                <h4 className='fw-bold'>BITS Privacy Policy</h4>
                <p style={{color: '#191919'}}>This Privacy Policy is effective as of December 19, 2023.</p>
            </Col>
        </Row>

        <Row className="my-3 px-3">
            <Col span={24}>
                <p style={{color: '#191919'}}>
                    PLEASE READ THIS PRIVACY POLICY CAREFULLY. This Privacy Policy outlines how Beauty in the Streets NFT ("BITS," "we," "us," or "our") collects, uses, and protects the personal information of users on our platform. By using our website, you agree to the terms outlined in this policy.
                </p>
            </Col>
        </Row>

        <Row className="my-3 px-3">
            <Col span={24}>
                <h6 className="fw-bold">1. Information We Collect</h6>
                <p style={{color: '#191919'}}>
                1.1 Personal Information: When you register an account on BITS, we may collect personal information such as your name, email address, and digital wallet address (e.g., MetaMask).
                </p>
                <p style={{color: '#191919'}}>
                1.2 Transaction Data: To facilitate the buying and selling of NFTs for dance moves, we collect transaction information, including the details of the NFTs bought or sold, transaction amounts, and timestamps.
                </p>
                <p style={{color: '#191919'}}>
                1.3 Device Information: We may collect information about the device you use to access our website, including IP address, browser type, and operating system.
                </p>
            </Col>
        </Row>

        <Row className="my-3 px-3">
            <Col span={24}>
                <h6 className="fw-bold">2. How We Use Your Information</h6>
                <p style={{color: '#191919'}}>
                2.1 Transaction Processing: We use your personal information to facilitate transactions, confirm ownership of NFTs, and provide the necessary functionalities of our platform.
                </p>
                <p style={{color: '#191919'}}>
                2.2 Communication: We may use your email address to send transaction confirmations, updates, and important notices related to your account or our services.
                </p>
                <p style={{color: '#191919'}}>
                2.3 Improvement of Services: We analyze user behavior and feedback to enhance our website's usability, features, and overall user experience.
                </p>
            </Col>
        </Row>
        
        <Row className="my-3 px-3">
            <Col span={24}>
                <h6 className="fw-bold">3. Security Measures</h6>
                <p style={{color: '#191919'}}>
                3.1 Data Protection: We implement industry-standard security measures to protect your personal information and ensure the integrity of our platform.
                </p>
                <p style={{color: '#191919'}}>
                3.2 Encryption: Transactions and sensitive data are encrypted to secure information during transmission.
                </p>
            </Col>
        </Row>

        <Row className="my-3 px-3">
            <Col span={24}>
                <h6 className="fw-bold">4. Information Sharing</h6>
                <p style={{color: '#191919'}}>
                4.1 Third Parties: We do not sell or share your personal information with third parties for marketing purposes. However, transaction-related information may be shared with blockchain networks to confirm ownership and validate transactions.
                </p>
            </Col>
        </Row>


        <Row className="my-3 px-3">
            <Col span={24}>
                <h6 className="fw-bold">5. Your Choices</h6>
                <p style={{color: '#191919'}}>
                5.1 Account Information: You can review and update your account information by logging into your account on our website.
                </p>

                <p style={{color: '#191919'}}>
                5.2 Marketing Communication: You can opt out of receiving marketing communications by following the instructions in the emails we send.
                </p>
            </Col>
        </Row>

        
        <Row className="my-3 px-3">
            <Col span={24}>
                <h6 className="fw-bold">6. Cookies and Tracking Technologies</h6>
                <p style={{color: '#191919'}}>
                6.1 Cookies: We use cookies and similar tracking technologies to enhance your experience on our website and collect data for analytics purposes.
                </p>
            </Col>
        </Row>

        <Row className="my-3 px-3">
            <Col span={24}>
                <h6 className="fw-bold">7. Changes to Privacy Policy</h6>
                <p style={{color: '#191919'}}>
                7.1 Updates: We may update this Privacy Policy periodically. Any significant changes will be communicated on our website.
                </p>
            </Col>
        </Row>


        <Row className="my-3 px-3">
            <Col span={24}>
                <h6 className="fw-bold">8. Contact Us</h6>
                <p style={{color: '#191919'}}>
                8.1 Questions: If you have any questions or concerns about our Privacy Policy, please contact us at [contact@yourwebsitename.com].
                </p>
                <p style={{color: '#191919'}}>
                By using BITS NFT, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
                </p>
            </Col>
        </Row>


      </Modal>
  )
}

export default PrivacyModal