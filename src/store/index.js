import Vue from 'vue'
import Vuex from 'vuex'
import dummyUsers from '../data/Users.json'
import dummyAudioRecords from '../data/AudioRecords.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: {},
    audioRecords: {}
  },

  getters: {
    users: state => {
      return state.users
    },
    audioRecords: state => {
      return state.audioRecords
    }
  },

  actions: {
    loadUsers({commit}) {
      // api request to get users data
      const usersMap = {}
      dummyUsers.forEach(user => {
        usersMap[user.participant_id] = user
      })
      commit("setUsers", usersMap)
    },
    loadAudioRecords({commit}) {
      // api request to get audioRecords data
      const audioRecordMap = {}
      dummyAudioRecords.forEach(record => {
        if(audioRecordMap[record.participant_id]) {
          audioRecordMap[record.participant_id].push(record)
        } else {
          audioRecordMap[record.participant_id] = [record]
        }
      })
      commit("setAudioRecords", audioRecordMap)
    }
  },
  
  mutations: {
    setUsers(state, users) {
      state.users = users
    },
    setAudioRecords(state, records) {
      state.audioRecords = records
    },
    addAudioRecord(state, record) {
      if(state.audioRecords[record.participant_id]) {
        state.audioRecords[record.participant_id].push(record)
      } else {
        state.audioRecords[record.participant_id] = [record]
      }
    }
  }
})
