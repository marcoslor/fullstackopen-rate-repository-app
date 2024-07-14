import { useFragment, type FragmentType } from '@/gql';
import { Repository_Review_Fragment } from '@/gql/fragments';
import { useDeleteReviewMutation } from '@/gql/mutations';
import { useMe } from '@/hooks/useSignInStatus';
import { MoreVertical, Trash2 } from '@tamagui/lucide-icons';
import { Button, Popover, View, type PopoverProps } from 'tamagui';
import { RepositoryReviewView } from './RepositoryReview';

export const RepositoryReviewWithActions = ({
  reviewFragment,
}: {
  reviewFragment: FragmentType<typeof Repository_Review_Fragment>;
}) => {
  const review = useFragment(Repository_Review_Fragment, reviewFragment);

  const [deleteReviewMutation] = useDeleteReviewMutation(review.id);
  const loggedUserId = useMe()?.id;

  const isOwner = loggedUserId === review.user.id;

  const deleteReview = () => {
    deleteReviewMutation({ variables: { id: review.id } });
  };

  return isOwner ? (
    <RepositoryReviewWithActionsView
      reviewFragment={reviewFragment}
      deleteReview={deleteReview}
    />
  ) : (
    <RepositoryReviewView review={reviewFragment} />
  );
};

export function ActionPopover({
  Name,
  children,
  trigger,
  content,
  ...props
}: React.PropsWithChildren<
  PopoverProps & {
    Name?: string;
    trigger: React.ReactElement;
    content: React.ReactElement;
  }
>) {
  return (
    <Popover size="$5" allowFlip placement="top" {...props}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>

      <Popover.Adapt when={'sm'}>
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Popover.Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Popover.Sheet>
      </Popover.Adapt>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />
        {content}
      </Popover.Content>
    </Popover>
  );
}

const RepositoryReviewWithActionsView = ({
  reviewFragment,
  deleteReview,
}: {
  reviewFragment: FragmentType<typeof Repository_Review_Fragment>;
  deleteReview: () => void;
}) => {
  return (
    <View position="relative">
      <RepositoryReviewView review={reviewFragment} />
      <ActionPopover
        Name="Name"
        trigger={
          <Button
            circular
            icon={MoreVertical}
            position="absolute"
            right={0}
            backgroundColor={'transparent'}
            size={'$3'}
          />
        }
        content={
          <Popover.Close>
            <Button icon={Trash2} onPress={deleteReview} color={'$red10'}>
              Delete Review
            </Button>
          </Popover.Close>
        }
      />
    </View>
  );
};
