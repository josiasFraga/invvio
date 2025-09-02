import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import LoaderList from '@components/LoaderList';
import NoItems from '../NoItems';

const FlatListPaginated = ({
  fetchPage,
  renderItem,
  keyExtractor,
  limit = 15,
  initialOffset = 0,
  items = [],
  loading = false,
  noItemsText = 'Nenhum item encontrado',
  noItemsSubmessage = null,
  noItemsActionText = null,
  noItemsOnActionPress = null,
  resetItemsReducer = () => {},
  ...listProps
}) => {
  const [offset, setOffset]     = useState(initialOffset);
  const [refreshing, setRefreshing] = useState(false);

  /* ---------- Primeira carga ---------- */
  useEffect(() => { 
    fetchPage(0);
    return () => {
      resetItemsReducer();
    };
  }, []);

  /* ---------- Handlers ---------- */
  const handleEndReached = useCallback(() => {
  
    if (items.length < (offset + limit)) return;
    if (loading || items.length < limit) return;

    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchPage(newOffset);

  }, [offset, limit, loading, items]);

  const handleRefresh = () => {
    fetchPage(0);
  }

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ marginVertical: 16 }} />;
  };

  useEffect(() => {
    if (items.length === 0 && offset > 0) {
      setOffset(0);
    } 
  }, [items]);

  console.log('Renderizando FlatListPaginated', items.length);
  
  /* ---------- Tela carregando ---------- */
  if (loading && items.length === 0) {
    return <LoaderList avatar button />;
  }

  if ( !loading && items.length === 0 ) {
    return (
      <View style={{ flex: 1 }}>
        <NoItems message={noItemsText} submessage={noItemsSubmessage} actionText={noItemsActionText} onActionPress={noItemsOnActionPress} />
      </View>
    );

  }

  /* ---------- Render ---------- */
  return (
    <FlatList
      data={items}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      ListFooterComponent={renderFooter}
      {...listProps}
    />
  );
};

export default FlatListPaginated;
