import styled from 'styled-components';
import Clock from './Clock';

// ProgressBar : 오늘 정보 + 할 일 진척도
export default function ProgressBar({ todos }) {
  // 전체 할 일
  const totalTodo = todos.length;

  // 완료된 할 일의 개수
  const completedCount = todos.filter((todo) => todo.isCompleted).length;

  // 진행률 계산 (완료된 할 일의 수 / 전체 할 일 수)
  const progress = todos.length > 0 ? (completedCount / totalTodo) * 100 : 0;

  return (
    <StyledProgress>
      <div className="todayInfo">
        <p>오늘 할 일</p>
        <Clock />
      </div>
      <div className="progressInfo">
        <label htmlFor="todoProgress">진행률: {Math.round(progress)}%</label>
        <progress
          id="todoProgress"
          max={totalTodo} // 전체 할 일 수
          value={completedCount} // 완료된 할 일 수
        >
          {Math.round(progress)}%
        </progress>
      </div>
    </StyledProgress>
  );
}

const StyledProgress = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 1rem 0;
  .todayInfo {
    display: flex;
    flex-direction: column;
    text-align: left;
    & > p {
      font-size: 1.5rem;
      margin-bottom: 0.7rem;
    }
  }
  .progressInfo {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  label {
    display: block;
    text-align: right;
    margin-bottom: 0.5rem;
    border-radius: 10px;
  }

  progress {
    width: 100%;
    border-radius: 10px;
    padding: 0.2rem;
    overflow: hidden;
    background-color: #3c3c3c;

    // progressbar 내부 디자인
    &::-webkit-progress-bar {
      background-color: #3c3c3c;
      border-radius: 10px;
    }

    &::-webkit-progress-value {
      background-color: var(--main-color);
      border-radius: 10px 0 0 10px;
    }
  }
`;
