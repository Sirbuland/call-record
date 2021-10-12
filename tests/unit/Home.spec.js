import { mount, createLocalVue } from '@vue/test-utils'
import Home from '../../src/views/Home'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import store from '../../src/store'

describe('UserList.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    localVue.use(Vuex)
  })

  it('Check Average Duration method', () => {
  
    const wrapper = mount(Home, {
      localVue,
      vuetify,
      store
    })
    
    expect(wrapper.vm.averageDuration(3)+'').toMatch("19")
  })


  it('Check Most Contributor method', () => {
  
    const wrapper = mount(Home, {
      localVue,
      vuetify,
      store
    })

    expect(wrapper.vm.mostContributor).toMatch("Morpheus")
  })

  it('Check Least Contributor method', () => {
  
    const wrapper = mount(Home, {
      localVue,
      vuetify,
      store
    })
    
    expect(wrapper.vm.leastContributor).toMatch("Neo")
  })

})
