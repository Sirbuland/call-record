<template>
  <div id="home"> 
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <div class="input">
          <div class="select-user card">
            <v-select
              v-model="participantId"
              :items="userComp"
              item-text="name"
              item-value="participant_id"
              label="Select user"
            />
          </div>
          <div class="start-time card">
            <strong class="px-1">Start Time: </strong>
            <input type="time" v-model="startTime" step="2"/>
          </div>
          <div class="end-time card">
            <strong class="px-1">End Time: </strong>
            <input type="time" v-model="endTime" step="2"/>
          </div>
          <v-btn class="save-btn" @click="addRecord"> Add </v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-row ">
          <div class="card mr-2" >
            <p class="card__title">Most Contributor</p>
            <p class="card__pr">{{mostContributor}}</p>
          </div>
          <div class="card mr-2" >
            <p class="card__title">Least Contributor</p>
            <p class="card__pr">{{leastContributor}}</p>
          </div>
          <div class="card">
            <v-select
              v-model="hideUsers"
              :items="userComp"
              item-text="name"
              item-value="participant_id"
              label="Select users to hide/show"
              multiple
            />
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <call-logs :hideUsers="hideUsers" />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <user-list :statsRecord="statsRecord" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import moment from 'moment'
import CallLogs from '../components/CallLogs'
import UserList from '../components/UserList'

export default {
  name: 'Home',
  components: { CallLogs, UserList },
  computed: {
    ...mapGetters(['users', 'audioRecords']),
    statsRecord () {
      return Object.keys(this.users).map(participantId => {
        return { name: this.users[participantId].name, no_of_speaks: this.speakCount(participantId), avg_duration : this.averageDuration(participantId) }
      })
    },
    mostContributor () {
      const result =  this.statsRecord.sort((a,b) => b.avg_duration - a.avg_duration)
      return result.length ? result[0].name : 'N/A'
    },
    leastContributor () {
      const result =  this.statsRecord.sort((a,b) => b.avg_duration - a.avg_duration)
      return result.length ? result[result.length -1].name : 'N/A'
    },
    userComp () {
      return Object.keys(this.users).map(key => this.users[key])
    }
  },
  data () {
    return {
      participantId: '',
      startTime: '',
      endTime: '',
      hideUsers: []
    }
  },
  mounted () {
    this.loadUsers()
    this.loadAudioRecords()
  },
  methods: {
    ...mapActions(['loadUsers', 'loadAudioRecords']),
    ...mapMutations(['addAudioRecord']),
    speakCount (id) {
      return this.audioRecords[id].length
    },
    averageDuration (id) {
      const records = this.audioRecords[id]
      const totalTime = records.map(record => this.timeDiffSeconds(record.audio_start, record.audio_end)).reduce((a,b) => a + b, 0)
      return Math.ceil((totalTime / this.speakCount(id)))
    },
    timeDiffSeconds (t1, t2) {
      return moment.duration(moment(t2, 'YYYY-MM-DD HH:mm:ss UTC').diff(moment(t1, 'YYYY-MM-DD HH:mm:ss UTC'))).asSeconds();
    },
    addRecord () {
      const audio_start = moment(this.startTime, 'HH:mm:ss').utc().format('YYYY-MM-DD HH:mm:ss')
      const audio_end = moment(this.endTime, 'HH:mm:ss').utc().format('YYYY-MM-DD HH:mm:ss')
      const payload = {participant_id: this.participantId, audio_start, audio_end }
      this.addAudioRecord(payload)
      this.clearInputs()
    },
    clearInputs () {
      this.participantId = ''
      this.startTime = ''
      this.endTime = ''
    }
  }
}
</script>
<style scoped lang="scss">
  #home {
    padding: 20px 10px 10px 10px;
    .card {
      position: relative;
      background: linear-gradient(0deg, #ECEFF3 0%, #FFFFFF 118.98%);
      overflow: hidden;
      border-radius: 12px;
      padding: 16px 22px 8px 25px;
      margin-top: 5px;
      width: 250px;
      .card__title {
        font-weight: 700;
        font-size: 13px;
        line-height: 13px;
        color: #000;
        margin-bottom: 0px;
        height: 30px;
        overflow: hidden;
        text-align: left
      }
      .card__pr {
        font-weight: 700;
        font-size: 24px;
        line-height: 0.2;
        color: #000;
        text-align: left;
      }
    }
    .save-btn{
      background: linear-gradient(0deg, #ECEFF3 0%, #FFFFFF 118.98%);
      border-radius: 50px;
      width: 5%;
      text-transform: uppercase !important;
      letter-spacing: 1.97321px !important;
      color: #000;
      text-transform: uppercase;
      font-weight: bold !important;
      min-width: 100px !important;
      height: 30px !important;
      // margin-bottom: 12px;
      &:hover{
        opacity: 0.8;
      }
    }
    .input {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0px 8px;
      .select-user {
        margin-right: 4px;
        width: 200px;
      }
      .start-time {
        margin-right: 4px;
        width: 200px;
        height: 80px;
      }
      .end-time {
        margin-right: 4px;
        width: 200px;
        height: 80px;
      }
    }
  }
</style>
