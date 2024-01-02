import "./Jobs.scss";
import { Modal } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { DatabaseTable, deleteItem, updateItem } from "../../utils/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { Job, JobUpdate } from "../../state/jobs";
import { Radio } from "../../state/radio";
import Dropzone from 'react-dropzone'
import { v4 as uuid } from 'uuid';
import { uploadJobLoot } from "../../utils/storage";
import { DropzoneFile } from "../../state/dropzone";

interface JobLootModalProps {
  job: Job;
  radio?: Radio;
}

function JobLootModal(props: JobLootModalProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<DropzoneFile[]>([]);

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const handleClose = () => {
    setFiles([]);
    setLoading(false);
    setOpen(false);
  }

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles([
      ...files,
      ...acceptedFiles.map(file => Object.assign(
        file,
        { id: uuid(), preview: URL.createObjectURL(file) }
      )),
    ]);
  }

  const handleRemoveFile = (id: string) => {
    const index = files.findIndex(file => file.id === id);

    if (index >= 0) {
      setFiles([
        ...files.slice(0, index),
        ...files.slice(index + 1),
      ])
    }
  }

  const handleSubmit = async () => {
    setLoading(true);

    if (files.length) {
      for (const file of files) {
        await uploadJobLoot(props.job.id, file, file.name)
      }
    }

    await completeJob();
    handleClose();
  }

  const completeJob = async () => {
    await updateItem<JobUpdate>(
      DatabaseTable.JOBS,
      props.job.id,
      {
        ...props.job,
        completed: true,
      },
      user
    );

    if (props.radio) {
      await deleteItem(DatabaseTable.RADIOS, props.radio.id, user);
    }
  }

  return (
    <Modal
      className="JobLootModal Modal"
      size="small"
      onClose={handleClose}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <button className="ui button positive hover-animation" onClick={() => setOpen(true)}>
          <p className='label contrast'>Finish Job</p>
          <p className='IconContainer contrast'><i className='check icon'></i></p>
        </button>
      }
    >
      <Modal.Header>Finish Job</Modal.Header>
      <Modal.Content>
        <Dropzone onDrop={handleDrop} accept={{ 'image/*': ['.jpeg', '.png', '.jpg'] }}>
          {({ getRootProps, getInputProps }) => (
            <>
              <h4>Upload loot pictures (optional)</h4>
              <div className="DropzoneRoot" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag & drop files here, or click to select files</p>
              </div>
              <div className="DropzoneThumbnails">
                {files.map(file => (
                  <div key={file.name} className="DropzoneThumbnail">
                    <img
                      src={file.preview}
                      onLoad={() => URL.revokeObjectURL(file.preview)}
                      alt={`Thumbnail ${file.id}`}
                    />
                    <button className="ui icon negative button" disabled={loading} onClick={() => handleRemoveFile(file.id)}>
                      <i className="close icon" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </Dropzone>
      </Modal.Content>
      <Modal.Actions>
        <button className="ui button negative hover-animation" onClick={handleClose}>
          <p className='label contrast'>Cancel</p>
          <p className='IconContainer contrast'><i className='close icon'></i></p>
        </button>
        <button className="ui button positive hover-animation" disabled={loading} onClick={handleSubmit}>
          <p className='label contrast'>Confirm</p>
          <p className='IconContainer contrast'><i className='check icon'></i></p>
        </button>
      </Modal.Actions>
    </Modal>
  );
}

export default JobLootModal;