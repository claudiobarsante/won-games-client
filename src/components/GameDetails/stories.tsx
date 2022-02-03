import { Story, Meta } from '@storybook/react/types-6-0';
import GameDetails, { GameDetailsProps } from '.';
import mockGame from './mock';

export default {
  title: 'Game/GameDetails',
  component: GameDetails,
  args: {
    mockGame
  },
  argTypes: {
    platforms: {
      control: {
        //--especify the type of control to use in storybook, in this case inline checkboxes to select OS
        type: 'inline-check',
        options: ['windows', 'linux', 'mac']
      },
      genres: {
        control: {
          type: 'inline-check',
          options: ['Role-playing', 'Narrative']
        }
      }
    }
  },
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta;

export const Default: Story<GameDetailsProps> = (args) => (
  <div style={{ maxWidth: '130rem', margin: '0 auto' }}>
    <GameDetails {...args} />
  </div>
);
