import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import HistoryService from '../services/historyService';
import TarotCard from './TarotCard';

const HistoryContainer = styled.div`
  padding: 20px;
`;

const HistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${props => props.isActive 
    ? 'linear-gradient(135deg, #f1c40f 0%, #f39c12 100%)'
    : 'rgba(255, 255, 255, 0.1)'};
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.isActive 
      ? 'linear-gradient(135deg, #f1c40f 0%, #f39c12 100%)'
      : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const HistoryList = styled.div`
  display: grid;
  gap: 20px;
`;

const HistoryItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px;
  position: relative;
`;

const HistoryItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const HistoryItemDate = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
`;

const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  background: none;
  border: none;
  color: ${props => props.isFavorite ? '#f1c40f' : 'rgba(255, 255, 255, 0.7)'};
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s ease;

  &:hover {
    color: #f1c40f;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    color: #e74c3c;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 40px 0;
`;

type TabType = 'history' | 'favorites';

const HistoryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('history');
  const [history, setHistory] = useState(HistoryService.getHistory());

  useEffect(() => {
    setHistory(HistoryService.getHistory());
  }, []);

  const handleToggleFavorite = (id: string) => {
    HistoryService.toggleFavorite(id);
    setHistory(HistoryService.getHistory());
  };

  const handleDelete = (id: string) => {
    HistoryService.removeFromHistory(id);
    setHistory(HistoryService.getHistory());
  };

  const displayedItems = activeTab === 'history' 
    ? history 
    : history.filter(item => item.isFavorite);

  return (
    <HistoryContainer>
      <HistoryHeader>
        <h2>История предсказаний</h2>
      </HistoryHeader>

      <TabContainer>
        <Tab 
          isActive={activeTab === 'history'} 
          onClick={() => setActiveTab('history')}
        >
          История
        </Tab>
        <Tab 
          isActive={activeTab === 'favorites'} 
          onClick={() => setActiveTab('favorites')}
        >
          Избранное
        </Tab>
      </TabContainer>

      <HistoryList>
        {displayedItems.length === 0 ? (
          <EmptyState>
            {activeTab === 'history' 
              ? 'История предсказаний пуста'
              : 'Нет избранных предсказаний'}
          </EmptyState>
        ) : (
          displayedItems.map(item => (
            <HistoryItem key={item.id}>
              <HistoryItemHeader>
                <HistoryItemDate>
                  {new Date(item.timestamp).toLocaleString()}
                </HistoryItemDate>
                <div>
                  <FavoriteButton
                    isFavorite={item.isFavorite}
                    onClick={() => handleToggleFavorite(item.id)}
                  >
                    ★
                  </FavoriteButton>
                  <DeleteButton onClick={() => handleDelete(item.id)}>
                    ×
                  </DeleteButton>
                </div>
              </HistoryItemHeader>
              <TarotCard
                image={item.reading.cards[0].image}
                title={item.reading.cards[0].name}
                description={item.reading.cards[0].description}
                isReversed={item.reading.cards[0].isReversed}
              />
            </HistoryItem>
          ))
        )}
      </HistoryList>
    </HistoryContainer>
  );
};

export default HistoryView; 