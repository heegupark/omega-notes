import React, { Component } from 'react';
import Modal from './modal';

class NoteItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.getTimeMsg = this.getTimeMsg.bind(this)
    this.handleUpdateClick = this.handleUpdateClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleImageClick = this.handleImageClick.bind(this)
    this.textBolder = this.textBolder.bind(this)
  }

  getTimeMsg(updatedAt) {
    const createdTime = new Date(updatedAt)
    const currentTime = new Date()
    let diff = (currentTime - createdTime) / 1000;

    const second = 1
    const minute = 60
    const hour = 60
    const day = 24
    const month = 30
    const year = 12

    let divider = second
    let timeMsg = 'minutes'

    if (diff < 60 * second) {
      divider = second
      timeMsg = 'second'
    } else if (diff < 60 * second * minute) {
      divider = second * minute
      timeMsg = 'minute'
    } else if (diff < 60 * second * minute * hour) {
      divider = second * minute * hour
      timeMsg = 'hour'
    } else if (diff < 60 * second * minute * hour * day) {
      divider = second * minute * hour * day
      timeMsg = 'day'
    } else if (diff < 60 * second * minute * hour * day * month) {
      divider = second * minute * hour * day * month
      timeMsg = 'month'
    } else if (diff < 60 * second * minute * hour * day * month * year) {
      divider = second * minute * hour * day * month * year
      timeMsg = 'month'
    }

    diff /= divider;

    const displayTime = Math.abs(Math.round(diff))
    const plural = displayTime > 1 ? 's' : ''
    const timeMessage = `${displayTime} ${timeMsg}${plural} ago`
    return timeMessage
  }

  handleUpdateClick() {
    const { _id, description, imgUrl, openModal } = this.props
    openModal('updateNote', _id, description, imgUrl)
  }

  handleDeleteClick() {
    const { openModal } = this.props
    openModal('deleteNote', event.target.id)
  }

  handleImageClick() {
    const { _id, description, imgUrl, openModal } = this.props
    openModal('enlargeImage', _id, description, imgUrl)
  }

  textBolder(text, boldStr) {
    const keyword = new RegExp(boldStr, 'i');
    const array = text.split(keyword);
    const keyIndex = text.toLowerCase().indexOf(boldStr.toLowerCase());
    const originalKeyword = text.substring(keyIndex, keyIndex + boldStr.length);
    return (
      <>
        {array.map((item, index) => (
          <span key={index}>
            {item}
            {index !== array.length - 1 && (
              <b className="text-dark bg-warning">{originalKeyword}</b>
            )}
          </span>
        ))}
      </>
    );
  }

  render() {
    const {
      _id,
      imgUrl,
      isSignedIn,
      description,
      updatedAt,
      updateNote,
      keyword } = this.props
    const { isModalOpen } = this.state
    const {
      getTimeMsg,
      handleUpdateClick,
      handleDeleteClick,
      handleImageClick,
      textBolder } = this
    const timeMessage = getTimeMsg(updatedAt)
    return (
      <div id={_id}>
        <hr></hr>
        <div className="row my-1">
          <div className="add-image ml-4">
          {imgUrl
            ? (
                <img
                  alt=""
                  className="img-fluid img-thumbnail rounded cursor"
                  src={imgUrl}
                  onClick={handleImageClick}></img>
              )
              : (
                // <img alt="" className="img-fluid img-thumbnail rounded"></img>
                <div className="ml-2 mt-2">No Image</div>
              )
          }
          </div>
          <div className="col my-auto mr-3">
            <div className="row d-flex">
              <div className="col">
                <div className="">{keyword ? textBolder(description, keyword) : description}</div>
              </div>
              <div className="col">
                <div className="editing-box">
                  <div className="text-right">
                    {isSignedIn
                      ? (
                        <>
                          <i id={_id} className="mx-1 text-warning fas fa-pencil-alt cursor" onClick={handleUpdateClick}></i>
                          <i id={_id} className="mx-1 text-danger fas fa-eraser cursor" onClick={handleDeleteClick}></i>
                        </>
                      )
                      : ''
                    }
                  </div>
                </div>
              </div>
            </div>
              <div className="time-msg text-secondary">{ timeMessage }</div>
          </div>

        </div>
      </div>
    )
  }
}

export default NoteItem;
