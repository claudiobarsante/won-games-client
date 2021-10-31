import { Story, Meta } from '@storybook/react/types-6-0';
import Logo, { LogoProps } from '.';

export default {
  title: 'Logo',
  component: Logo
} as Meta;

//to appear the controls to select the colors, use args
export const Default: Story<LogoProps> = (args) => <Logo {...args} />;
