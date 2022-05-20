import React from "react";
import "./css/index.css";
import { Modal } from "antd";
import { attachment, cross, cross2, save, upload2 } from "../../assets";
// import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Input } from "antd";

const TextEditorModal = ({ visible, onCancel }) => {
  return (
    <Modal
      title={
        <div className="bg-dark-blue d-flex justify-content-between center p-3">
          <h5 className="white m-0">+ Add New Note</h5>
          <div className="d-flex center">
            <div className="cursor">
              <img src={save} />
              <span className="blue ms-2">Save Note</span>
            </div>
            <img src={cross2} className="ms-4" />
          </div>
        </div>
      }
      visible={visible}
      onCancel={onCancel}
      closeIcon={<></>}
      footer={
        <div className="d-flex justify-content-between center p-3">
          <span className="red m-0 red-border-bottom cursor">{`See Previous Notes >>`}</span>
          <Button className="bg-blue white radius1" onClick={onCancel}>Submit</Button>
        </div>
      }
      centered
      style={{ height: 400 }}
    >
      <Input
        className="modalInputStyle bg-white2 mb-3"
        placeholder="Write Title here ..."
      />
      <Editor
        // editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        // onEditorStateChange={this.onEditorStateChange}
      />
      <div className="mt-4">
        <Button className="bg-white2 white radius1">
          <img src={attachment} />
          <span className="light-grey2 ms-2">Add Attachement</span>
        </Button>
        <Button className="bg-white2 white radius1 ms-3">
          <img src={upload2} />
          <span className="light-grey2 ms-2">Upload Image</span>
        </Button>
      </div>
    </Modal>
  );
};

export default TextEditorModal;
