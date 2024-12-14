import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const TopicTabs = () => {
  const tabs = [
    { id: '1', title: '公式話題', selected: false },
    { id: '2', title: '新着話題', selected: true },
    { id: '3', title: '人気話題', selected: false },
  ]

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, tab.selected && styles.selectedTab]}
        >
          <Text
            style={[styles.tabText, tab.selected && styles.selectedTabText]}
          >
            {tab.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

interface TimelineItemProps {
  title: string
  time: string
  commentCount: string
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  time,
  commentCount,
}) => (
  <TouchableOpacity style={styles.timelineItem}>
    <View style={styles.timelineContent}>
      <Text style={styles.timelineTitle}>{title}</Text>
      <View style={styles.timelineFooter}>
        <Text style={styles.timelineTime}>{time}</Text>
        <Text style={styles.timelineComments}>{commentCount} 件</Text>
      </View>
    </View>
    <TouchableOpacity style={styles.moreButton}>
      <Ionicons name='ellipsis-horizontal' size={20} color='#999' />
    </TouchableOpacity>
  </TouchableOpacity>
)

const Timeline = () => {
  const timelineData = [
    {
      id: '1',
      title: '怒菌娘的金玉、怒金玉',
      time: '一分前',
      commentCount: '零',
    },
    {
      id: '2',
      title: '五月蝿～！！！我無知～～！！！！最終物語',
      time: '一分前',
      commentCount: '一',
    },
    {
      id: '3',
      title: '政治好好人多、畏惧',
      time: '一分前',
      commentCount: '零',
    },
    {
      id: '4',
      title: '提供平成大学何処漫疑問也',
      time: '一分前',
      commentCount: '零',
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <TopicTabs />

      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>今投稿</Text>
      </View>

      <FlatList
        data={timelineData}
        renderItem={({ item }) => (
          <TimelineItem
            title={item.title}
            time={item.time}
            commentCount={item.commentCount}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabBarItem}>
          <Ionicons name='globe-outline' size={24} color='#F90' />
          <Text style={[styles.tabBarText, { color: '#F90' }]}>話題</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarItem}>
          <Ionicons name='person-outline' size={24} color='#999' />
          <Text style={styles.tabBarText}>自分</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabBarItem}>
          <Ionicons name='settings-outline' size={24} color='#999' />
          <Text style={styles.tabBarText}>設定</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  selectedTab: {
    backgroundColor: '#FFE4C4',
  },
  tabText: {
    color: '#666',
  },
  selectedTabText: {
    color: '#F90',
  },
  subHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#333',
  },
  timelineItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 15,
    marginBottom: 8,
    fontFamily: 'NotoSerifJP_500Medium',
  },
  timelineFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timelineTime: {
    fontSize: 12,
    color: '#666',
    marginRight: 16,
    fontFamily: 'NotoSerifJP_400Regular',
  },
  timelineComments: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'NotoSerifJP_400Regular',
  },
  moreButton: {
    padding: 4,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
  },
  tabBarItem: {
    alignItems: 'center',
  },
  tabBarText: {
    fontSize: 12,
    marginTop: 4,
    color: '#999',
  },
})

export default Timeline
