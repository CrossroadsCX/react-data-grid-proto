import React from 'react'
import { Meta, Story } from '@storybook/react'
import { ReactGrid } from './reactGrid'

type GridProps = {}

export default {
  title: 'ReactGrid',
  component: ReactGrid,
} as Meta

const Template: Story<GridProps> = (args: any) => <ReactGrid {...args} />

export const Default = Template.bind({})
Default.args = {}
