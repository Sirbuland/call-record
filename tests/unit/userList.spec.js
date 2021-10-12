import { mount, createLocalVue } from '@vue/test-utils'
import UserList from '../../src/components/UserList'
import Vuetify from 'vuetify'

describe('UserList.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('renders props.statsRecords when passed', () => {
    const statsRecord = [
      { name: 'A', no_of_speaks: 3, avg_duration : 5 },
      { name: 'B', no_of_speaks: 13, avg_duration : 5 },
      { name: 'C', no_of_speaks: 30, avg_duration : 5 }
    ]
    const wrapper = mount(UserList, {
      localVue,
      vuetify,
      propsData: { statsRecord }
    })
    expect(wrapper.props().statsRecord[0].name).toMatch(statsRecord[0].name)
  })
  
})
