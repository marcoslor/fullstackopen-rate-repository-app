import { screen, fireEvent, waitFor, act } from '@testing-library/react-native';
import { SignInForm } from '../SignInForm';
import { renderWithTamagui } from '@/__tests__/utils/MockedTestProvider';
import { colors } from '@/styles/Base';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      renderWithTamagui(<SignInForm onSubmit={onSubmit} />);

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

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });
    });

    it('does not call onSubmit function with incorrect arguments when an invalid form is submitted', async () => {
      const onSubmit = jest.fn();
      renderWithTamagui(<SignInForm onSubmit={onSubmit} />);

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
          borderColor: colors.dark.error,
        });
      });

      // expect the onSubmit function to not have been called
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
  });
});
