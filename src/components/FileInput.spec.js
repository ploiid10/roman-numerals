import React from 'react'

import {mount, shallow} from 'enzyme'

import FileInput from './FileInput'

const requiredProps = {
  handleChange: jest.fn(),
  handleSubmit: jest.fn(),
  handleClick: jest.fn()
}

describe('File Input Component', () => {

  it('Should render component', () => {
    const props = {
      isValidFile: true,
      ...requiredProps
    }
    const wrapper = mount(
      <FileInput 
        {...props}
      />
    )
    expect(wrapper.find('.FileInputWrapper')).toHaveLength(1)
    expect(wrapper.find('.uploadLabel')).toHaveLength(1)
    expect(wrapper.find('.btn-primary')).toHaveLength(1)
    expect(wrapper.find('.btn-primary').props().disabled).toBe(false)
  })

  it('Button Should be disabled', () => {
    const props = {
      isValidFile: false,
      ...requiredProps
    }
    const wrapper = mount(
      <FileInput 
        {...props}
      />
    )
    expect(wrapper.find('.FileInputWrapper')).toHaveLength(1)
    expect(wrapper.find('.uploadLabel')).toHaveLength(1)
    expect(wrapper.find('.btn-primary')).toHaveLength(1)
    expect(wrapper.find('.btn-primary').props().disabled).toBe(true)
  })

  it('Label Should have the same text as fileName', () => {
    const props = {
      fileName: 'input.txt',
      ...requiredProps
    }
    const wrapper = mount(
      <FileInput 
        {...props}
      />
    )
    expect(wrapper.find('.FileInputWrapper')).toHaveLength(1)
    expect(wrapper.find('.uploadLabel')).toHaveLength(1)
    expect(wrapper.find('.uploadLabel').text()).toBe('input.txt')
  })
})