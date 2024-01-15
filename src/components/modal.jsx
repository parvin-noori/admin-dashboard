import React from "react";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, title, open, body, children }) {
  return (
    <>
      {isOpen &&
        createPortal(
          <div
            className="modal"
            style={{ display: "block" }}
            onClick={() => open(false)}
          >
            <div className="modal-dialog modal-dialog-centered" onClick={(e)=>e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bolder">{title}</h5>
                  <button
                    type="button"
                    className="btn-close m-0"
                    onClick={() => open(false)}
                  ></button>
                </div>
                <div className="modal-body m-3">
                  <p className="mb-0">{body}</p>
                </div>
                <div className="modal-footer">{children}</div>
              </div>
            </div>
          </div>,
          document.getElementById("modal")
        )}
    </>
  );
}
