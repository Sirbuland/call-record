<template>
  <div>
    <div class="card" >
        <p class="card__title">Users statistics</p>
    </div>
    <div class="pa-5">
        <v-data-table
          :headers="userHeaders"
          :items="statsRecord"
        >
        </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: ['statsRecord'],
  data () {
    return {
      userHeaders: [
        { text: 'User', value: 'name' },
        { text: 'Participant Speaks Count', value: 'no_of_speaks' },
        { text: 'Average Duration', value: 'avg_duration' }
      ]
    }
  }
}
</script>