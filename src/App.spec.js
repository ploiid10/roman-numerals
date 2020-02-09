import React from 'react'

import App from './App'

import {shallow} from 'enzyme'


describe('Application Start', () => {
  it('Should render component', () => {
    const wrapper = shallow(<App/>)

    expect(wrapper.find('.FileInputWrapper')).toHaveLength(0)
    expect(wrapper.find('.FileUploadWrapper')).toHaveLength(0)
  })
})