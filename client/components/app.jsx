import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import Note from './note'
import Signin from './signin'
import Signup from './signup'
import Modal from './modal';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      originalNotes: [],
      view: 'note',
      user: {},
      imgUrl: '',
      description: '',
      modalCategory: '',
      keyword: '',
      selectedNoteId: null,
      isSignedIn: false,
      isModalOpen: false,
      isFirstSearch: true,
      isUploading: false
    };
    this.setPage = this.setPage.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.signout = this.signout.bind(this)
    this.setSignin = this.setSignin.bind(this)
    this.setSignout = this.setSignout.bind(this)
    this.getNotes = this.getNotes.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.openModal = this.openModal.bind(this)
    this.addNote = this.addNote.bind(this)
    this.addImage = this.addImage.bind(this)
    this.updateNote = this.updateNote.bind(this)
    this.searchKeyword = this.searchKeyword.bind(this)
  }

  componentDidMount() {
    this.getUserInfo()
    this.getNotes()
  }

  setPage(page, user) {
    this.setState({
      view: page,
      user: user,
      notes: []
    })
    this.getUserInfo()
    this.getNotes()
  }

  setSignin() {
    this.setState({
      isSignedIn: true
    })
    this.getNotes()
  }

  setSignout() {
    this.setState({
      isModalOpen: false,
      isSignedIn: false,
      user: {}
    })
    this.getNotes()
  }

  getNotes() {
    const token = window.localStorage.getItem('omega-notes-token')
    fetch('/api/notes/?sortBy=updatedAt:desc', {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          notes: data
        });
      })
      .catch(err => console.error(err.message));
  }

  addImage(form, note, category) {
    this.setState({
      isUploading: true
    })
    const _id = this.state.user._id ? this.state.user._id : 'guest'
    fetch(`/api/notes/image/${_id}`, {
      method: 'POST',
      body: form
    }).then(res => res.json())
      .then(data => {
        console.log(`${data.message}:${data.filename}`)
        if(category === 'add') {
          this.addNote(note)
        } else if(category === 'update') {
          this.updateNote(note)
        }
      })
      .catch(err => {
        console.error('image uploading error', err.message)
        this.setState({
          isUploading: false
        });
      })
  }

  addNote(note) {
    const token = window.localStorage.getItem('omega-notes-token')
    fetch('/api/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(note)
    }).then(res => res.json())
      .then(data => {
        this.setState({
          notes: [data, ...this.state.notes],
          isUploading: false
        });
      })
      .catch(err => {
        console.error('adding a note error', err.message)
        this.setState({
          isUploading: false
        });
      })
  }

  updateNote(updatedNote) {
    const token = window.localStorage.getItem('omega-notes-token')
    const arr = [...this.state.notes]
    const newArr = arr.map((note) => {
      if (note._id === updatedNote.id) {
        note.description = updatedNote.description
        note.imgUrl = updatedNote.imgUrl
      }
      return note
    })
    if (token) {
      fetch(`/api/notes/${updatedNote.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          description: updatedNote.description,
          imgUrl: updatedNote.imgUrl
        })
      }).then(res => res.json())
        .then(data => {
          this.setState({
            notes: newArr,
            isUploading: false
          })
        })
        .catch(err => {
          console.error('updating a note error', err.message)
          this.setState({
            isUploading: false
          });
        })
    }
  }

  deleteNote() {
    const token = window.localStorage.getItem('omega-notes-token')
    const { selectedNoteId, notes } = this.state
    if (token) {
      fetch(`/api/notes/${selectedNoteId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            notes: notes.filter(note => note._id !== data._id)
          })
          this.closeModal()
        })
        .catch(err => console.error(err.message));
    }
  }

  getUserInfo() {
    const token = window.localStorage.getItem('omega-notes-token')
    if(token) {
      fetch('/api/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            user: data
          });
          this.setSignin()
        })
        .catch(err => console.error(err.message));
    }
  }

  signout() {
    const token = window.localStorage.getItem('omega-notes-token')
    const { user } = this.state
    if(token) {
      fetch('/api/users/signout', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.status)
          window.localStorage.removeItem('omega-notes-token');
          this.setSignout()
        })
        .catch(err => console.error(err.message));
    }
  }

  closeModal() {
    this.setState({
      modalCategory: '',
      isModalOpen: false
    })
  }

  openModal(category, id, description, imgUrl) {
    this.setState({
      modalCategory: category,
      isModalOpen: true,
      selectedNoteId: id,
      description: description,
      imgUrl: imgUrl
    })
  }

  searchKeyword(keyword) {
    let arr = [];
    const { isFirstSearch } = this.state;
    if (isFirstSearch) {
      arr = [...this.state.notes]
      this.setState({
        originalNotes: arr,
        isFirstSearch: false
      });
    } else {
      arr = [...this.state.originalNotes];
    }
    const newArr = arr.filter(note => {
      return note.description.toLowerCase().includes(keyword.toLowerCase());
    });
    this.setState({
      notes: newArr,
      keyword
    });
  }

  render() {
    const {
      addNote,
      addImage,
      setPage,
      openModal,
      closeModal,
      signout,
      setSignin,
      deleteNote,
      updateNote,
      searchKeyword } = this
    const {
      notes,
      view,
      user,
      isSignedIn,
      isModalOpen,
      modalCategory,
      selectedNoteId,
      description,
      imgUrl,
      keyword,
      isUploading } = this.state
    const username = user ? user.name : ''
    let element = null

    switch(view) {
      case 'note':
        element = (
          <Note
            user={user}
            isSignedIn={isSignedIn}
            isModalOpen={isModalOpen}
            openModal={openModal}
            notes={notes}
            addNote={addNote}
            addImage={addImage}
            keyword={keyword}
            isUploading={isUploading}/>
        )
        break;
      case 'signin':
        element = (
          <Signin
            setPage={setPage}
            setSignin={setSignin}
            isUploading={isUploading}
            />
        )
        break;
      case 'signup':
        element = (
          <Signup
            setPage={setPage}
            setSignin={setSignin}
            isUploading={isUploading}
          />
        )
        break;
    }
    return (
      <div>
        <Header
          view={view}
          setPage={setPage}
          username={username}
          isSignedIn={isSignedIn}
          closeModal={closeModal}
          openModal={openModal}
          isModalOpen={isModalOpen}
          searchKeyword={searchKeyword}
          isUploading={isUploading} />
        {element}
        {isModalOpen
          ? <Modal
            user={user}
            addImage={addImage}
            modalCategory={modalCategory}
            signout={signout}
            deleteNote={deleteNote}
            updateNote={updateNote}
            selectedNoteId={selectedNoteId}
            closeModal={closeModal}
            description={description}
            imgUrl={imgUrl}
            isUploading={isUploading} />
          : ''
        }
        <Footer />
      </div>
    )
  }
}

export default App;
