import { Story, Meta } from '@storybook/react/types-6-0';
import MediaMatch from '.';

export default {
  title: 'MediaMatch',
  component: MediaMatch
} as Meta;

export const Desktop: Story = () => (
  <MediaMatch greaterThan="medium">Only on Desktop</MediaMatch>
);
export const Mobile: Story = () => (
  <MediaMatch lessThan="medium">Only on Mobile</MediaMatch>
);

// -- adding default parameters when click on Mobile, display a screen of size 'mobile1'
Mobile.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
};
