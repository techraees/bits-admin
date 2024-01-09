import React from "react";
import "./DownloadModal.css";
import Logo from "../../assets/images/PayPalLogo.png";

const DownloadModal = ({ show, setShow }) => {
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      {show && (
        <div
          className="modal fade show custom-backdrop" // Add custom-backdrop class here
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: "30px" }}>
              <div className="modal-header flex-column">
                <div className="w-100 text-end">
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleClose}
                  ></button>
                </div>
                <div className="w-100 text-center">
                  <h5 className="modal-title fw-bold">Download File</h5>
                </div>
              </div>
              <div className="modal-body">
                <div className="d-flex justify-content-center gap-1 gap-sm-0 flex-column flex-sm-row justify-content-sm-between flex-wrap align-items-center mt-2">
                  <p className="paymentHeading">Subtotal (USD)</p>
                  <p className="paymentHeading">$12.25</p>
                </div>

                <div className="d-flex justify-content-center gap-1 gap-sm-0 flex-column flex-sm-row justify-content-sm-between flex-wrap align-items-center mt-2">
                  <p className="items">Flat Rate</p>
                  <p className="items">$5.00</p>
                </div>

                <div className="d-flex justify-content-center gap-1 gap-sm-0 flex-column flex-sm-row justify-content-sm-between flex-wrap align-items-center mt-2">
                  <p className="items">6 Second Video - $1/sec</p>
                  <p className="items">$6.00</p>
                </div>

                <div className="d-flex justify-content-center gap-1 gap-sm-0 flex-column flex-sm-row justify-content-sm-between flex-wrap align-items-center mt-2">
                  <p className="items">Tax</p>
                  <p className="items">$1.25</p>
                </div>
              </div>
              <div
                className="modal-footer flex-column gap-2"
                style={{ paddingLeft: 0, paddingRight: 0, borderTop: 0 }}
              >
                <button
                  type="button"
                  className="btn w-100 text-white checkoutBtn"
                  onClick={handleClose}
                >
                  Start Checkout
                </button>
                <button
                  type="button"
                  className="btn w-100 paypalBtn"
                  onClick={handleClose}
                >
                  <img
                    style={{ width: "118px" }}
                    className="img-fluid"
                    src={Logo}
                    alt="paypal"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadModal;
