//import { fireEvent, screen } from '@testing-library/react';

import Menu from '.';
//import { renderWithTheme } from './../../utils/tests/helpers';
import { render, screen, fireEvent } from 'utils/test-utils';

describe('<Menu />', () => {
  it('should render the menu', () => {
    render(<Menu />);

    expect(screen.getByRole('img', { name: /won games/i })).toBeInTheDocument();
    /**
     * or
     * expect(screen.getByLabelText(/won games/i)).toBeInTheDocument();
     */

    expect(screen.getByLabelText(/open menu/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    //expect(screen.getByLabelText(/open shopping cart/i)).toBeInTheDocument();
  });

  it('should handle the open/close mobile menu', () => {
    render(<Menu />);
    //select MenuFull - all nav element have role 'navigation'
    const fullMenuElement = screen.getByRole('navigation', { hidden: true });
    //check if the element is hidden - getAttribute returns a string with the boolean
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true');
    expect(fullMenuElement).toHaveStyle({ opacity: 0 });
    //click button to open menu
    fireEvent.click(screen.getByLabelText(/open menu/i));
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('false');
    expect(fullMenuElement).toHaveStyle({ opacity: 1 });
    //click on close button to close menu
    fireEvent.click(screen.getByLabelText(/close menu/i));
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true');
    expect(fullMenuElement).toHaveStyle({ opacity: 0 });
  });

  it('should show register box when logged out', () => {
    render(<Menu />);
    // -- use queryByText if you're not sure if the element exists
    expect(screen.queryByText(/my account/i)).not.toBeInTheDocument();
    //expect(screen.queryByText(/wishlist/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/sign in/i)).toHaveLength(2);
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  it('should show wishlight and account when logged in', () => {
    render(<Menu username="user" />);

    //expect(screen.getByText(/my account/i)).toBeInTheDocument();
    // expect(screen.getByText(/wishlist/i)).toBeInTheDocument();
    // -- use queryByText if you're not sure if the element exists
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
  });

  it('should not show sign ir or dropdownUser if loading', () => {
    render(<Menu username="test" status="unauthenticated" />);

    //expect(screen.queryByText(/my profile/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });
});
