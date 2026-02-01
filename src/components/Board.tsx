import { useState } from 'react';
import { makeStyles } from '@fluentui/react-components';
import { BoardColumn } from './BoardColumn';
import { StorageService } from '../services/StorageService';
import type { Board as BoardType } from '../types/kanban';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    height: '100%',
    overflowX: 'auto',
    padding: '10px',
    alignItems: 'flex-start',
  },
});

export const Board = () => {
  const styles = useStyles();
  const [boardData] = useState<BoardType>(() => StorageService.loadData());

  if (!boardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.root}>
      {boardData.columns.map((column) => (
        <BoardColumn key={column.id} column={column} />
      ))}
    </div>
  );
};
