import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    loginError: '',
    registerError: '',
    //
    // notes: [],
    // activeNote: {},
    collection: [],
    activeNote: {},
  },
  getters: {
    user: state => state.user,
    loggedIn: state => state.loggedIn,
    loginError: state => state.loginError,
    registerError: state => state.registerError,
    //
    collection: state => state.collection,
    activeNote: state => state.activeNote,
    activeNoteText: state => state.activeNote.note,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setLogin (state, status) {
      state.loggedIn = status;
    },
    setLoginError (state, message) {
      state.loginError = message;
    },
    setRegisterError (state, message) {
      state.registerError = message;
    },
    setCollection (state, collection) {
      state.collection = collection;
    },
    setActiveNote (state, activeNote) {
    	state.activeNote = activeNote;
    	console.log("setting active note");
    }
   //   ADD_NOTE (state) {
	  //   const newNote = {
	  //     text: 'New note',
	  //     favorite: false
	  //   }
	  //   state.notes.push(newNote)
	  //   state.activeNote = newNote
	  // },

	  // EDIT_NOTE (state, text) {
	  //   state.activeNote.text = text
	  // },

	  // DELETE_NOTE (state) {
	  //   state.notes.$remove(state.activeNote)
	  //   state.activeNote = state.notes[0]
	  // },

	  // TOGGLE_FAVORITE (state) {
	  //   state.activeNote.favorite = !state.activeNote.favorite
	  // },

	  // SET_ACTIVE_NOTE (state, note) {
	  //   state.activeNote = note
	  // }
  },
  actions: {
  	register(context,user) {
      axios.post("/api/users",user).then(response => {
	context.commit('setUser', response.data.user);
	context.commit('setLogin',true);
	context.commit('setRegisterError',"");
	context.commit('setLoginError',"");
      }).catch(error => {
	context.commit('setLoginError',"");
	context.commit('setLogin',false);
	if (error.response) {
	  if (error.response.status === 403)
	    context.commit('setRegisterError',"That email address already has an account.");
	  else if (error.response.status === 409)
	    context.commit('setRegisterError',"That user name is already taken.");
	  return;
	}
	context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
      });
    },
    login(context,user) {
      axios.post("/api/login",user).then(response => {
	context.commit('setUser', response.data.user);
	context.commit('setLogin',true);
	context.commit('setRegisterError',"");
	context.commit('setLoginError',"");
      }).catch(error => {
	context.commit('setRegisterError',"");
	if (error.response) {
	  if (error.response.status === 403 || error.response.status === 400)
	    context.commit('setLoginError',"Invalid login.");
	  context.commit('setRegisterError',"");
	  return;
	}
	context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
      });
    },
    logout(context,user) {
      context.commit('setUser', {});
      context.commit('setLogin',false);
    },
    getCollection(context) {
      axios.get("/api/users/" + context.state.user.id + "/notes").then(response => {
	context.commit('setCollection',response.data.notes);
      }).catch(err => {
	console.log("getCollection failed:",err);
      });
    },
    addNote(context,note) {
      axios.post("/api/users/" + context.state.user.id + "/notes",note).then(response => {
		return context.dispatch('getCollection');
      }).catch(err => {
		console.log("addNote failed:",err);
      });
    },
    deleteNote(context,note) {
    	console.log("yooo note to be deleted " + Object.values(context.state.activeNote));
    	axios.delete("/api/users/" + context.state.user.id + "/notes/" + context.state.activeNote.id).then(response => {
    		return context.dispatch('getCollection');
    	}).catch(err => {
    		console.log("deleteNote failed:",err);
    	});
    },
    updateNote(context, note) {
    	console.log("LOOK HERE " + note);
    	context.state.activeNote.note = note;
    	console.log('updating ' + Object.values(context.state.activeNote));

    	axios.put("/api/users/" + context.state.user.id + "/notes/" + context.state.activeNote.id, context.state.activeNote).then(response => {
    		return context.dispatch('getCollection');
    	}).catch(err => {
    		console.log("updateNote failed:",err);
    	})
    }

  }
});