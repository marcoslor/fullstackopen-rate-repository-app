import { useFragment, type FragmentType } from '@/gql';
import { Repository_Review_Fragment } from '@/gql/fragments';
import { format } from 'date-fns';
import { Circle, Paragraph, Text, XStack, YStack } from 'tamagui';

type RepositoryReviewItemProps = {
  review: FragmentType<typeof Repository_Review_Fragment>;
};

const getFormattedDate = (date: string) => {
  return format(new Date(date), 'dd.MM.yyyy');
};

export const RepositoryReviewView = (props: RepositoryReviewItemProps) => {
  const review = useFragment(Repository_Review_Fragment, props.review);

  return (
    <XStack
      paddingVertical={'$3'}
      paddingHorizontal={'$2.5'}
      backgroundColor={'$gray2'}
      marginBottom={'$2'}
      borderRadius={'$3'}
    >
      <Circle
        borderColor={'$blue10'}
        borderWidth={'$1'}
        size={'$4'}
        justifyContent="center"
      >
        <Text>{review.rating}</Text>
      </Circle>
      <YStack marginLeft="$2" maxWidth={'100%'} flex={1}>
        <Text fontWeight={900}>{review.user.username}</Text>
        <Text color={'$gray11'}>{getFormattedDate(review.createdAt)}</Text>
        <Paragraph maxWidth={'100%'} marginTop="$2">
          {review.text}
        </Paragraph>
      </YStack>
    </XStack>
  );
};
