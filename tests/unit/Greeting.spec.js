import { mount, shallowMount } from '@vue/test-utils'
import Greeting from '@/components/Test/Greeting.vue'
import Vue from 'Vue'

describe('Greeting.vue', () => {
  it('renders a greeting', () => {
    const wrapper = mount(Greeting)
    expect(wrapper.text()).toMatch('Vue and TDD')
  })
})

const Child = Vue.component('Child', {
  name: 'Child',

  template: '<div>Child component</div>'
})

const Parent = Vue.component('Parent', {
  name: 'Parent',

  template: '<div><child /></div>'
})

// const shallowWrapper = shallowMount(Child)
// const mountWrapper = mount(Child)

// console.log(shallowWrapper.html())
// console.log(mountWrapper.html())

const shallowWrapper = shallowMount(Parent)
const mountWrapper = mount(Parent)

// console.log(shallowWrapper.html())
// console.log(mountWrapper.html())
