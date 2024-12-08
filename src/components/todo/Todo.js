import React, { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import ProgressBar from '../ProgressBar';
import axios from 'axios';

function Todo() {
  const API_URL = 'http://localhost:3000/todos'; // 서버 API URL
  const [todos, setTodos] = useState([]); // 서버와 동기화된 상태 관리
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 서버에서 할 일 가져오기
  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL); // 서버에서 데이터 가져오기
        setTodos(response.data); // 상태 업데이트
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch todos');
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);
  const memoizedTodos = useMemo(() => {
    return todos;
  }, [todos]);
  if (loading) return <p>Loading...</p>; // 로딩 상태 표시
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>; // 에러 상태 표시

  return (
    <>
      <ProgressBar todos={memoizedTodos} />
      <TodoForm setTodos={setTodos} />

      <TodoContainer>
        <TodoList
          title="TODO"
          todos={memoizedTodos.filter((todo) => !todo.isCompleted)}
          setTodos={setTodos}
        />
        <TodoList
          title="COMPLETED"
          todos={memoizedTodos.filter((todo) => todo.isCompleted)}
          setTodos={setTodos}
        />
      </TodoContainer>
    </>
  );
}

const TodoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export default React.memo(Todo);
