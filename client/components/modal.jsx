import React, { Component } from 'react';

class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: this.props.description,
      imgUrl: this.props.imgUrl,
      file: null,
      fileObject: null,
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
    const { file, fileObject, fileName, description, imgUrl } = this.state
    const { user, selectedNoteId, addImage, updateNote, closeModal } = this.props
    const changedImageName = fileName ? fileName.split(' ').join('') : fileName
    const form = new FormData();
    if (file) {
      form.append('image', file, changedImageName);
      addImage(form)
      updateNote(selectedNoteId, description, `/notes/${user._id}/thumbnail-${changedImageName}`)
    } else {
      updateNote(selectedNoteId, description)
    }
    closeModal()
  }

  handleUpdateInputChange() {
    if(event.target.value.length < 2) {
      event.target.value = event.target.value.trim()
    }
    this.setState({
      description: event.target.value
    })
  }

  handleUpdateFileInputChange() {
    this.setState({
      file: event.target.files[0],
      fileObject: URL.createObjectURL(event.target.files[0]),
      fileName: event.target.files[0].name
    })
  }

  handleUploadBtnClick() {
    this.refs.uploader.click();
  }

  handleFileDropChange() {
    event.preventDefault()
    this.setState({
      file: event.dataTransfer.files[0],
      fileObject: URL.createObjectURL(event.dataTransfer.files[0]),
      fileName: event.dataTransfer.files[0].name
    })
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
      handleFileDropChange } = this
    const { description, imgUrl, fileObject } = this.state
    const { modalCategory } = this.props
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
              className="btn btn-sm btn-outline-dark mx-2 btn-custom"
              onClick={handleModalSignoutClick}>Sign Out</button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary mx-2 btn-custom"
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
                className="btn btn-sm btn-outline-danger mx-2 btn-custom"
                onClick={handleDeleteNoteClick}>Delete</button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary mx-2 btn-custom"
                onClick={handleModalCancelClick}>Close</button>
            </div>
          )
        break;
      case 'updateNote':
        titleElement = (<p className="h5 mt-3 text-white">update a note</p>)
        msgElement = (
          <div className="row mx-auto input-group note-edit-custom">
            <div className="input-group-prepend mx-auto">
              {imgUrl || fileObject
                ? (
                  <div className="mx-auto my-auto">
                    <img
                      alt=""
                      className="cursor img-fluid img-thumbnail rounded"
                      src={fileObject || imgUrl}
                      onClick={handleUploadBtnClick}
                      onDragOver={e => e.preventDefault()}
                      onDrop={handleFileDropChange} />
                    </div>
                  )
                : (
                  <button
                    className="btn btn-sm btn-outline-success cursor update-image"
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
                ref="uploader"
                onChange={handleUpdateFileInputChange} />
            </div>
            <textarea
              autoFocus
              required
              rows="3"
              className="mt-1 form-control px-2 py-1 rounded resize-none w-100"
              value={description}
              onChange={handleUpdateInputChange} />
          </div>
          )
        btnElement = (
          <div>
            <button
              type="button"
              className="btn btn-sm btn-outline-warning mx-2 btn-custom"
              onClick={handleUpdateNoteClick}>Update</button>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary mx-2 btn-custom"
              onClick={handleModalCancelClick}>Close</button>
          </div>
        )
        break;
      case 'enlargeImage':
        titleElement = ('')
        msgElement = (
          <div className="row mx-auto input-group note-edit-custom">
            <div className="input-group-prepend mx-auto">
              <img
                alt=""
                className="cursor img-fluid img-thumbnail rounded"
                src={fileObject || imgUrl}
                onClick={handleUploadBtnClick}
                onDragOver={e => e.preventDefault()}
                onDrop={handleFileDropChange} />
            </div>
            <textarea
              rows="3"
              disabled
              className="mt-1 bg-white form-control px-2 py-1 rounded resize-none w-100"
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
      <div className="modal fade-in">
        <div className="modal-content">
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
