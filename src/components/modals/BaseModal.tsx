import React    from "react";
import ReactDOM from "react-dom";

const BaseModal: React.FC = ({ children }) => {
  const modalRoot = document.body;
  console.log({modalRoot});


  return ReactDOM.createPortal(children, modalRoot);
};

export default BaseModal;