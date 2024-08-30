import { renderWithTamagui } from '@/__tests__/utils/MockedTestProvider';
import { act, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { SignInForm } from '../SignInForm';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      renderWithTamagui(<SignInForm />);

      act(() => {
        // fill the form
        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
        fireEvent.changeText(
          screen.getByPlaceholderText('Password'),
          'password'
        );
      });

      // submit the form
      fireEvent.press(screen.getByText('Submit'));
    });

    it('does not call onSubmit function with incorrect arguments when an invalid form is submitted', async () => {
      // fill the form
      act(() => {
        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
        fireEvent.changeText(screen.getByPlaceholderText('Password'), '');
      });

      // submit the form
      fireEvent.press(screen.getByText('Submit'));

      await waitFor(() => {
        // expect the input has an error outline
        expect(screen.getByPlaceholderText('Password')).toHaveStyle({
          borderColor: '$error',
        });
      });
    });
  });
});
