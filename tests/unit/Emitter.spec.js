import { mount, shallowMount } from '@vue/test-utils'
import Emitter from '@/components/Test/Emitter.vue'
import flushPromises from 'flush-promises'

describe('Emitter', () => {
  it('emits an event with two arguments', () => {
    const wrapper = shallowMount(Emitter)

    wrapper.vm.emitEvent()

    console.log(wrapper.emitted())

    expect(wrapper.emitted().myEvent[0]).toEqual(['name', 'password'])
  })
})
