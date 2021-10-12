<template>
  <div>
    <div class="card" >
      <p class="card__title">Conference Call logs</p>
    </div>
    <div class="pa-5">
      <v-data-table
        :headers="headers"
        :items="audioRecordsComp"
      >
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item,index) in items" :key="index">
              <td>{{ users[item.participant_id].name || 'Unknown' }}</td>
              <td>{{ localTime(item.audio_start) }}</td>
              <td>{{ localTime(item.audio_end) }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Home',
  props: ['hideUsers'],
  computed: {
    ...mapGetters(['users', 'audioRecords']),
    audioRecordsComp () {
      let result = []
      Object.keys(this.audioRecords).forEach(participantId => {
        if(this.audioRecords[participantId] && !(this.hideUsers.includes(Number(participantId)))) {
          result = result.concat(this.audioRecords[participantId])
        }
      });
      return result.sort((a,b) => moment(a.audio_start, 'YYYY-MM-DD HH-mm-ss UTC').valueOf() - moment(b.audio_start, 'YYYY-MM-DD HH-mm-ss UTC').valueOf())
    }
  },
  data () {
    return {
      headers: [
        { text: 'User', value: 'name' },
        { text: 'Audio start', value: 'audio_start' },
        { text: 'Audio end', value: 'audio_end' }
      ]
    }
  },
  methods: {
    localTime (utc) {
      const local = moment.utc(utc, 'YYYY-MM-DD HH:mm:ss UTC').local()
      return moment(local, 'YYYY-MM-DD HH:mm:ss UTC').format('HH:mm:ss')
    }
  }
}
</script>