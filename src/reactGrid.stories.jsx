import React from 'react'
import { ReactGrid } from './reactGrid'

export default {
  title: 'ReactGrid',
  component: ReactGrid,
}

const Template = (args) => <ReactGrid {...args} />

export const Default = Template.bind({})
Default.args = {}
