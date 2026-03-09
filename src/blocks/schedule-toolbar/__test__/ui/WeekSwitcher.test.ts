import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import WeekSwitcher from '../view/WeekSwitcher.vue'

describe('WeekSwitcher', () => {
  it('renders upper week active state', () => {
    const wrapper = mount(WeekSwitcher, {
      props: {
        currentWeek: 'upper',
        switchWeek: vi.fn(),
      },
    })
    expect(wrapper.text()).toContain('Верхняя')
    expect(wrapper.text()).toContain('Нижняя')
    const spans = wrapper.findAll('span')
    const upper = spans.find(s => s.text().includes('Верхняя'))!
    expect(upper.classes().join(' ')).toMatch(/text-blue-600|font-semibold/)
  })

  it('calls switchWeek on button click', async () => {
    const onSwitch = vi.fn()
    const wrapper = mount(WeekSwitcher, {
      props: {
        currentWeek: 'upper',
        switchWeek: onSwitch,
      },
    })
    await wrapper.find('button').trigger('click')
    expect(onSwitch).toHaveBeenCalledTimes(1)
  })
})
