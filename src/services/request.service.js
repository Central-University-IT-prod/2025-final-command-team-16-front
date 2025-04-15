// src/services/request.service.js
import { BASE_URL } from "@/services/constants";

// Функция для эмуляции запроса на получение книги (пока нет API)
export async function sendBookRequest(requestData) {
  // Сохраняем запрос в localStorage
  const requests = JSON.parse(localStorage.getItem('bookRequests') || '[]');
  const newRequest = {
    id: Date.now(),
    date: new Date(),
    ...requestData
  };
  
  requests.push(newRequest);
  localStorage.setItem('bookRequests', JSON.stringify(requests));
  
  return newRequest;
}

// Получение запросов текущего пользователя
export function getUserRequests() {
  return JSON.parse(localStorage.getItem('bookRequests') || '[]');
}