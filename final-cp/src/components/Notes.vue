<template>
  <div class = "lists">
    <div id="toolbar">
    <i @click="addNote()" class="glyphicon glyphicon-plus"></i>
<!--     <i @click="toggleFavorite"
      class="glyphicon glyphicon-star"
      :class="{starred: activeNote.favorite}"></i> -->
    <i @click="deleteNote" class="glyphicon glyphicon-remove"></i>
  </div>
    <div id="notes-list">

    <div id="list-header">
      <h2>Notes</h2>
     <!--  <div class="btn-group btn-group-justified" role="group">
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default"
            @click="show = 'all'"
            :class="{active: show === 'all'}">
            All Notes
          </button>
        </div>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-default"
            @click="show = 'favorites'"
            :class="{active: show === 'favorites'}">
            Favorites
          </button>
        </div>
      </div> -->
    </div>
    <!-- render notes in a list -->
    <div class="container">
      <div class="list-group">
        <a v-for="note in collection"
          class="list-group-item" href="#"
          :class="{active: activeNote === note}"
          @click="updateActiveNote(note)">
          <div v-if="note.note != null">
          <h4 class="list-group-item-heading">
            {{note.note.trim().substring(0, 30)}}
          </h4></div>
        </a>
      </div>
    </div>

  </div>
  <div id="note-editor">
      <!-- <textarea
        :value="activeNote.note"
        @input="editNote()"
        class="form-control">
      </textarea> -->
      <button @click="editNote()" class="save">Save</button>
      <textarea
        v-model="activeNoteText"
        class="form-control">
      </textarea>
    </div>
  </div>
  
</template>

<script>

import moment from 'moment';
export default {
   name: 'Notes',
   created: function() {
    this.$store.dispatch('getCollection');
    
   },
   data () {
     return {
       activeNoteText:'',
     }
   },
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
     collection: function() {
      return this.$store.getters.collection;
     },
     activeNote: function() {
      console.log("after init " + this.activeNoteText);
      return this.$store.getters.activeNote;
     },
     filteredNotes: function() {
      if (this.show === 'all'){
        return this.notes
      } else if (this.show === 'favorites') {
        return this.notes.filter(note => note.favorite)
      }
     }
   },
   methods: {
    setActiveNoteText: function() {
      this.$store.commit('setActiveNoteText',)
    },
    addNote: function() {
      this.$store.dispatch('addNote', {
        note: {note:"new note", favorite:false},
      }).then(note => {
        this.text = "";
      });
    },
    favoriteNote: function() {
      // add favorite logic
    },
    deleteNote: function() {
      console.log("active note to be deleted " + this.activeNote);
      this.$store.dispatch('deleteNote', {
        note: this.activeNote,
      }).then(note => {
        this.text="";
      })
    },
    editNote: function() {
      console.log("HEY " + this.activeNoteText);
      this.$store.dispatch('updateNote', this.activeNoteText);
      // this is whats called when an edit is made
    },
    updateActiveNote: function(note) {
      console.log("updating active note in notes " + Object.values(note));
      this.activeNoteText = note.note;
      this.$store.commit('setActiveNote',note);
    }
   }
 }
</script>

<style scoped>
.save {
  width: 100%;
  background-color: #30414D;
  border-color: #30414D;
  color: white;
  font-family: 'Raleway', sans-serif;
}
</style>


