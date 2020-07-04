import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: this.props.description,
      imgUrl: this.props.imgUrl,
      file: null,
      fileObject: null,
      previewFileObject: null,
      fileName: null
    }
    this.handleModalCancelClick = this.handleModalCancelClick.bind(this)
    this.handleModalSignoutClick = this.handleModalSignoutClick.bind(this)
    this.handleDeleteNoteClick = this.handleDeleteNoteClick.bind(this)
    this.handleUpdateNoteClick = this.handleUpdateNoteClick.bind(this)
    this.handleUpdateInputChange = this.handleUpdateInputChange.bind(this)
    this.handleUpdateFileInputChange = this.handleUpdateFileInputChange.bind(this)
    this.handleUploadBtnClick = this.handleUploadBtnClick.bind(this)
    this.handleFileDropChange = this.handleFileDropChange.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.textarea = React.createRef()
    this.uploader = React.createRef()
    this.modal = React.createRef()
  }

  handleModalCancelClick() {
    this.props.closeModal()
  }

  handleModalSignoutClick() {
    this.props.signout()
  }

  handleDeleteNoteClick() {
    this.props.deleteNote()
  }

  handleUpdateNoteClick() {
    event.preventDefault()
    const { file, fileObject, fileName, description, imgUrl } = this.state
    const { user, selectedNoteId, addImage, updateNote, closeModal } = this.props
    const pathArr = imgUrl.split('/')
    const altFilename = pathArr[pathArr.length-1]
    const changedImageName = fileName ? `${fileName.split(' ').join('')}` : altFilename
    const form = new FormData();
    const updatedNote = {
      id: selectedNoteId,
      description: description,
      imgUrl: `notes/${user._id}/${changedImageName}`,
      thumbnailImgUrl: `notes/${user._id}/thumbnail-${changedImageName}`
    }
    console.log(updatedNote.thumbnailImgUrl)
    if (file) {
      form.append('image', file, changedImageName);
      addImage(form, updatedNote, 'update')
    } else {
      updateNote(updatedNote)
    }
  }

  handleUpdateInputChange() {
    event.preventDefault()
    if(event.target.value.length < 2) {
      event.target.value = event.target.value.trim()
    }
    this.setState({
      description: event.target.value
    })
  }

  handleUpdateFileInputChange() {
    event.preventDefault()
    this.setState({
      file: event.target.files[0],
      fileObject: URL.createObjectURL(event.target.files[0]),
      previewFileObject: URL.createObjectURL(event.target.files[0]),
      fileName: event.target.files[0].name
    })
  }

  handleUploadBtnClick() {
    event.preventDefault()
    this.uploader.current.click();
  }

  handleFileDropChange() {
    event.preventDefault()
    this.setState({
      file: event.dataTransfer.files[0],
      fileObject: URL.createObjectURL(event.dataTransfer.files[0]),
      previewFileObject: URL.createObjectURL(event.dataTransfer.files[0]),
      fileName: event.dataTransfer.files[0].name
    })
  }

  handleOutsideClick(event) {
    if (this.modal.current.contains(event.target)) {
      return;
    }
    this.handleModalCancelClick();
  }

  render() {
    const {
      handleModalSignoutClick,
      handleModalCancelClick,
      handleDeleteNoteClick,
      handleUpdateNoteClick,
      handleUpdateInputChange,
      handleUpdateFileInputChange,
      handleUploadBtnClick,
      handleFileDropChange,
      handleOutsideClick,
      uploader,
      textarea,
      modal } = this
    const { description, imgUrl, fileObject, previewFileObject } = this.state
    const { modalCategory, isUploading } = this.props
    let titleElement = null;
    let msgElement = null;
    let btnElement = null;
    switch(modalCategory) {
      case 'signout':
        titleElement = (<p className="h5 mt-3 text-white">sign out</p>)
        msgElement = (<p className="mt-3">Do you really want to sign out?</p>)
        btnElement = (
          <div>
            <button
              type="button"
              className="btn btn-sm btn-outline-dark mx-2 btn-custom mb-1"
              onClick={handleModalSignoutClick}>Sign Out</button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary mx-2 btn-custom mb-1"
              onClick={handleModalCancelClick}>Close</button>
          </div>
        )
      break;
      case 'deleteNote':
        titleElement = (<p className="h5 mt-3 text-white">delete a note</p>)
        msgElement = (<p className="mt-3">Do you really want to delete this note?</p>)
        btnElement = (
          <div>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger mx-2 btn-custom mb-1"
                onClick={handleDeleteNoteClick}>Delete</button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary mx-2 btn-custom mb-1"
                onClick={handleModalCancelClick}>Close</button>
            </div>
          )
        break;
      case 'updateNote':
        titleElement = (<p className="h5 mt-3 text-white">update a note</p>)
        msgElement = (
          <div className="row mx-auto note-edit-custom">
            <div className="mx-auto">
              {isUploading
                ? (
                    <div className="mx-auto my-auto">
                      <img
                        alt=""
                        className="w-100 img-fluid img-thumbnail rounded"
                        src={previewFileObject || imgUrl}
                        style={{ opacity: '0.6' }} />
                      <div
                        style={{ display: isUploading ? 'block' : 'none' }}
                        className="spinner-location-update-custom position-absolute spinner-border text-success"
                        role="status">
                        <span className="sr-only"></span>
                      </div>
                    </div>
                  )
                : imgUrl || fileObject
                  ? (
                    <div className="mx-auto my-auto">
                      <img
                        alt=""
                        className="w-100 cursor img-fluid img-thumbnail rounded"
                        src={previewFileObject || imgUrl}
                        onClick={handleUploadBtnClick}
                        onDragOver={e => e.preventDefault()}
                        onDrop={handleFileDropChange} />
                    </div>
                  )
                  : (
                  <button
                    className="w-100 btn btn-sm btn-outline-success cursor mb-1"
                    onClick={handleUploadBtnClick}
                    onDragOver={e => e.preventDefault()}
                    onDrop={handleFileDropChange}>
                    Add Image
                  </button>
                )
              }
              <input
                hidden
                type="file"
                ref={uploader}
                onChange={handleUpdateFileInputChange} />
            </div>
            <textarea
              autoFocus
              required
              rows="3"
              ref={textarea}
              disabled={isUploading}
              className="mx-auto mt-1 bg-white px-2 py-1 rounded resize-none w-100 border-light"
              value={description}
              onChange={handleUpdateInputChange}
              onFocus={(e) => {
                e.target.selectionStart = e.target.value.length;
              }} />
          </div>
          )
        btnElement = (
          <div>
            <button
              type="button"
              disabled={isUploading}
              className="btn btn-sm btn-outline-warning mx-2 btn-custom mb-1"
              onClick={handleUpdateNoteClick}>Update</button>
            <button
              type="button"
              disabled={isUploading}
              className="btn btn-sm btn-outline-secondary mx-2 btn-custom mb-1"
              onClick={handleModalCancelClick}>Close</button>
          </div>
        )
        break;
      case 'enlargeImage':
        titleElement = ('')
        msgElement = (
          <div className="row mx-auto note-edit-custom">
            <div className="mx-auto">
              <img
                alt=""
                className="img-fluid img-thumbnail rounded"
                src={fileObject || imgUrl}
                />
            </div>
            <textarea
              rows="3"
              disabled
              className="mt-1 bg-white px-2 py-1 rounded resize-none w-100 border-light"
              value={description}/>
          </div>
        )
        btnElement = (
          <div>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary mx-2 btn-custom"
              onClick={handleModalCancelClick}>Close</button>
          </div>
        )
        break;
    }
    return (
      <div className="modal fade-in" onClick={handleOutsideClick}>
        <div ref={modal} className="modal-content">
          <div className="text-center bg-info">
            {titleElement}
          </div>
          <div className="text-center mt-3 mb-3">
            {msgElement}
          </div>
          <div className="text-center mb-3">
            {btnElement}
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
