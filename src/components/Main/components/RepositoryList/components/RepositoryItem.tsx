import { colors, fontSizing, layoutSizing } from '@/styles/Base';
import type Repository from '@/types/Repository';
import { Image, StyleSheet, Text, View } from 'react-native';

const separator1 = layoutSizing.s4;

const styles = StyleSheet.create({
  repositoryItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: layoutSizing.s6,
  },
  itemInfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: layoutSizing.s6,
  },
  itemInfoListWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    marginTop: layoutSizing.s1,
  },
  avatar: {
    width: layoutSizing.s16,
    height: layoutSizing.s16,
    borderRadius: layoutSizing.s1,
    marginRight: layoutSizing.s6,
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: fontSizing.xl,
    color: colors.dark.text1,
    marginBottom: separator1,
  },
  description: {
    color: colors.dark.text2,
    marginBottom: separator1,
  },
  languageWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  language: {
    backgroundColor: colors.dark.brand,
    flex: 0,
    padding: layoutSizing.s2,
    borderRadius: layoutSizing.s1,
    overflow: 'hidden',
    color: colors.dark.text1,
  },
  statsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  statColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statTitle: {
    color: colors.dark.text1,
    fontWeight: 'bold',
  },
  statValue: {
    color: colors.dark.text2,
  },
});

const toK = (n: number) => {
  if (n < 1000) {
    return n;
  }
  return `${(n / 1000).toFixed(1)}k`;
};

const RepositoryItem = ({ item }: { item: Repository }) => {
  const details = {
    Stars: item.stargazersCount,
    Forks: item.forksCount,
    Reviews: item.reviewCount,
    Rating: item.ratingAverage,
  };
  return (
    <View style={styles.repositoryItemContainer}>
      <View style={styles.itemInfoWrapper}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.itemInfoListWrapper}>
          <Text style={styles.fullName}>{item.fullName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.statsWrapper}>
        {Object.entries(details).map(([key, value]) => (
          <View key={key} style={styles.statColumn}>
            <Text style={styles.statTitle}>{key}</Text>
            <Text style={styles.statValue}>{toK(value)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RepositoryItem;
