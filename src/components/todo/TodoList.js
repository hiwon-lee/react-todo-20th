import { useCallback } from 'react';
import { TodoItem } from './TodoItem';
import styled from 'styled-components';

// 할 일 집합
export default function TodoList({ title, todos, setTodos }) {
  // 할 일 토글 함수
  const toggleComplete = useCallback(
    (id) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    },
    [setTodos]
  );

  // 할 일 삭제
  const handleDelete = useCallback(
    (id) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    },
    [setTodos]
  );

  return (
    <StyledList>
      <div className="statusTitle">
        <span>{title}</span>
        <span className="count">{todos.length}</span>
      </div>
      <ul>
{todos.map((todo) => (
  <TodoItem
    key={todo.id}
    {...todo}
    onDelete={() => handleDelete(todo.id)}
    toggleComplete={() => toggleComplete(todo.id)}
  />
))}

      </ul>
    </StyledList>
  );
}

const StyledList = styled.div`
  .statusTitle {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    padding: 1.5rem 1.5rem 0.5rem 1.5rem;
    border-bottom: 1px solid var(--sub-color);
    .count {
      font-size: 1.5rem;
      color: var(--main-color);
    }
  }
  ul {
    display: flex;
    flex-direction: column-reverse;
    list-style-type: none;
    padding-inline-start: 0;
  }
`;
