import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../../../tamagui.config';
import { render } from '@testing-library/react-native';

const MockedTestProvider = ({
  mocks,
  children,
}: {
  mocks: MockedResponse[];
  children: React.ReactNode;
}) => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <MockedProvider mocks={mocks}>{children}</MockedProvider>
    </TamaguiProvider>
  );
};

const renderWithTamagui = (component: React.ReactElement) => {
  return render(
    <TamaguiProvider config={tamaguiConfig}>{component}</TamaguiProvider>
  );
};

export { MockedTestProvider, renderWithTamagui };
