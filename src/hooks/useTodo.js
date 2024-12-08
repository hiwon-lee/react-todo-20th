import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/todos';

export const useTodo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Todo 전체 가져오기 함수
  const getTodos = async () => {
    setLoading(true); // 로딩 상태 설정
    setError(null); // 기존 에러 초기화
    try {
      const response = await axios.get('http://localhost:3000/todos'); // GET 요청
      setLoading(false); // 로딩 상태 해제
      return response.data; // 성공 시 데이터 반환
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || err.message); // 에러 상태 업데이트
      throw err; // 호출하는 곳에서 에러 처리 가능하도록 다시 던짐
    }
  };

  // Todo 생성 함수
  const createTodo = async (todo) => {
    setLoading(true);
    setError(null);
    try {
      const todoData = {
        value: todo, // 폼의 텍스트 입력 값
        isComplete: false, // 체크박스 상태 (true/false)
      };
      console.log(todoData);
      const response = await axios.post(API_URL, todoData);
      setLoading(false);
      return response.data; // 성공 시 데이터 반환
    } catch (err) {
      setLoading(false);
      setError(err.response?.data || err.message);
      throw err; // 호출하는 쪽에서 에러 처리 가능하도록 다시 던짐
    }
  };

  return { createTodo, loading, error };
};
