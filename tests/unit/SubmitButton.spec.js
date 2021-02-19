import { mount, shallowMount } from '@vue/test-utils'
import SubmitButton from '@/components/Test/SubmitButton.vue'
import Vue from 'Vue'

describe('SubmitButton.vue', () => {
  it('displays a non authorized message', () => {
    const msg = '提交'
    const wrapper = shallowMount(SubmitButton, {
      propsData: {
        msg: msg
      }
    })

    // console.log(wrapper.html())

    expect(wrapper.find('span').text()).toBe('Not Authorized')
    expect(wrapper.find('button').text()).toBe('提交')
  })
})

describe('SubmitButton.vue', () => {
  it('displays a admin privileges message', () => {
    const msg = 'submit'
    const isAdmin = true
    const wrapper = shallowMount(SubmitButton, {
      propsData: {
        msg,
        isAdmin
      }
    })

    // console.log(wrapper.html())

    expect(wrapper.find('span').text()).toBe('Admin Privileges')
    expect(wrapper.find('button').text()).toBe('submit')
  })
})

const msg = 'submit'
const factory = (propsData) => {
  return shallowMount(SubmitButton, {
    propsData: {
      msg,
      ...propsData
    }
  })
}
describe('SubmitButton', () => {
  describe('has admin privileges', () => {
    it('renders a message', () => {
      const wrapper = factory()

      expect(wrapper.find('span').text()).toBe('Not Authorized')
      expect(wrapper.find('button').text()).toBe('submit')
    })
  })

  describe('does not have admin privileges', () => {
    it('renders a message', () => {
      const wrapper = factory({ isAdmin: true })

      expect(wrapper.find('span').text()).toBe('Admin Privileges')
      expect(wrapper.find('button').text()).toBe('submit')
    })
  })
})
