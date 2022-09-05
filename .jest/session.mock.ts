const useSession = jest.spyOn(require('next-auth/react'), 'useSession');
const mockSession = { jwt: '123', user: { email: 'lorem@ipsum.com' } };
useSession.mockImplementation(() => {
  return { data: mockSession, status: 'authenticated' };
});