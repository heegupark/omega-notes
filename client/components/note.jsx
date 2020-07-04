import React, { Component } from 'react';
import NoteItem from './note-item'

class Note extends Component {
  constructor(props) {
    super(props)
    this.state = {
      note: '',
      file: null,
      fileObject: null,
      fileName: null
    }
    this.handleNoteInputChange = this.handleNoteInputChange.bind(this)
    this.handleAddClick = this.handleAddClick.bind(this)
    this.showMessage = this.showMessage.bind(this)
    this.handleUploadBtnClick = this.handleUploadBtnClick.bind(this)
    this.handleFileInputChange = this.handleFileInputChange.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.handleFileDropChange = this.handleFileDropChange.bind(this)
    this.uploader = React.createRef();
  }

  handleNoteInputChange() {
    if(event.target.value.length < 2) {
      event.target.value = event.target.value.trim()
    }
    this.setState({
      note: event.target.value
    })
  }

  handleAddClick(event) {
    const { showMessage } = this
    const { addNote, addImage, user } = this.props
    const { note, file, fileName } = this.state
    const _id = user._id ? user._id : 'guest'
    let newNote = {
      "description": note
    }
    const form = new FormData();
    if (file) {
      const changedImageName = fileName.split(' ').join('');
      newNote = {
        "description": note,
        "imgUrl": `notes/${_id}/thumbnail-${changedImageName}`
      }
      form.append('image', file, changedImageName);
    }
    this.setState({
      note: '',
      file: null,
      fileObject: null,
      fileName: null
    })
    if (newNote.description) {
      if(file) {
        addImage(form, newNote, 'add')
      } else {
        addNote(newNote)
      }
    } else {
      showMessage('please write a note!', 1000)
    }
  }

  showMessage(message, time) {
    setTimeout(() => {
      this.setState({
        note: ''
      })
    }, time)
    this.setState({
      note: message
    })
  }

  handleUploadBtnClick() {
    // this.refs.uploader.click();
    this.uploader.current.click();
  }

  handleCancelClick() {
    this.setState({
      note: '',
      file: null,
      fileObject: null,
      fileName: null
    })
  }

  handleFileInputChange() {
    if (event.target.files[0]) {
      this.setState({
        file: event.target.files[0],
        fileObject: URL.createObjectURL(event.target.files[0]),
        fileName: event.target.files[0].name
      })
    }
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
        notes,
        isSignedIn,
        addImage,
        openModal,
        closeModal,
        isModalOpen,
        updateNote,
        keyword,
        isUploading } = this.props
    const {
        handleNoteInputChange,
        handleAddClick,
        handleUploadBtnClick,
        handleFileInputChange,
        handleCancelClick,
        handleFileDropChange,
        uploader} = this
    const { note, fileObject } = this.state
    return (
      <main>
        <div className="row my-3 mx-auto fixed-top bg-white input-box">
          <div className="col-sm mx-auto input-group">
            <div className="input-group-prepend">
              {fileObject
                  ? (
                      <div className="add-image mx-auto my-auto">
                        {isUploading
                        ? (
                          <>
                            <img
                              alt=""
                              className="img-fluid img-thumbnail rounded cursor"
                              src={fileObject}
                              style={{opacity: '0.6'}}/>
                            <div
                              className="spinner-location-custom position-absolute spinner-border spinner-border-sm text-success"
                              role="status">
                              <span className="sr-only"></span>
                            </div>
                          </>
                        )
                        : (
                          <img
                          alt = ""
                          className = "img-fluid img-thumbnail rounded"
                          src = { fileObject }
                          onClick = { handleUploadBtnClick } />
                        )}
                      </div>
                    )
                  : (
                      <button
                        className="btn btn-sm btn-outline-success input-text cursor"
                        disabled={isUploading}
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
                onChange={handleFileInputChange} />
            </div>
            <textarea
              autoFocus
              required
              rows="1"
              className="form-control resize-none input-text"
              type="text"
              value={note}
              disabled={isUploading}
              onChange={handleNoteInputChange}
              placeholder="what do you have today?"/>
            <div className="input-group-append">
              {isUploading
              ? (
                  <button
                    disabled
                    type="button"
                    className="btn btn-sm btn-outline-info input-text">Write</button>
              )
              :(
                  <button
                    disabled={isModalOpen}
                    type="button"
                    className="btn btn-sm btn-outline-info input-text"
                    onClick={handleAddClick}>Write</button>
              )
              }
              {isUploading
              ? ''
              : fileObject || note
                ? (
                    <button
                      disabled={isModalOpen}
                      type="button"
                      className="btn btn-sm btn-outline-secondary input-text"
                      onClick={handleCancelClick}>Cancel</button>
                )
                : ''
              }
            </div>
          </div>
        </div>
        <div
          className={`row mx-auto ${fileObject ? 'note-item-box-add' :'note-item-box' }`}>
          <div className='col-sm mx-auto'>
            {notes.length > 0
              ? notes.map((note, index) => {
                const { _id, description, imgUrl, updatedAt } = note
                return <NoteItem
                  key={index}
                  _id={_id}
                  imgUrl={imgUrl}
                  description={description}
                  imgUrl={imgUrl}
                  updatedAt={updatedAt}
                  isSignedIn={isSignedIn}
                  addImage={addImage}
                  openModal={openModal}
                  closeModal={closeModal}
                  updateNote={updateNote}
                  keyword={keyword}
                  isUploading={isUploading} />;
              })
              : (
                <>
                  <p className="text-center">no notes at the moment</p>
                  <p className="text-center">why don't you start writing a small note?</p>
                </>
              )
            }
          </div>
        </div>
      </main>
    )
  }
}


export default Note;
