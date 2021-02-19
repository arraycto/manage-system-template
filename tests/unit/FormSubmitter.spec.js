import { mount, shallowMount } from '@vue/test-utils'
import FormSubmitter from '@/components/Test/FormSubmitter.vue'
import flushPromises from 'flush-promises'

let url = ''
let data = ''

const mockHttp = {
  get: (_url, _data) => {
    return new Promise((resolve, reject) => {
      url = _url
      data = _data
      resolve()
    })
  }
}

describe('FormSubmitter', () => {
  it('reveals a notification when submitted', async () => {
    // 1. 安排
    const wrapper = mount(FormSubmitter)
    // 2. 行动
    wrapper.find('[data-username]').setValue('alice')
    wrapper.find('form').trigger('submit.prevent')
    await wrapper.vm.$nextTick()
    // 3. 断言
    expect(wrapper.find('.message').text()).toBe(
      'Thank you for your submission, alice.'
    )
  })

  it('reveals a notification when submitted mock', async () => {
    const wrapper = mount(FormSubmitter, {
      mocks: {
        $http: mockHttp
      }
    })

    wrapper.find('[data-username]').setValue('alice')
    wrapper.find('form').trigger('submit.prevent')

    // 立即 resolve 所有 promise
    await flushPromises()

    expect(wrapper.find('.message').text()).toBe(
      'Thank you for your submission, alice.'
    )
    expect(url).toBe('/api/v1/register')
    expect(data).toEqual({ username: 'alice' })
  })
})
