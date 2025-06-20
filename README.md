# Простой автотестовый проект для тестового задания

Проект написан на `TypeScript` с использованием фрэймворка `Playwright` и паттерна проектирования `PageObject`

# Как развернуть

## Клонируем проект себе локально

### `git clone https://github.com/dgtal-cat/wiam_cb_playwright_ts.git`

Либо скачиваем `.zip` и распаковываем

## Выполняем в терминале команду

### `npm install`

## Для запуска тестов настроены следующие скрипты

Запуск всех тестов:
### `npm run test`

Запуск тестов с тегом @e2e
### `npm run test:e2e`

Запуск тестов с тегом @api
### `npm run test:api`

Просмотр последнего отчета прогона в формате HTML
### `npm run test:report`

## Для тестового задания были установлены следующие настройки `playwright.config.ts`

Базовые урлы к хосту и API получаются из файла `.env` в корне проекта

Число воркеров для параллельного запуска ограничего 4 штуками

Отчет формируется в формате `HTML` и открывается в любом случае (успешный/неуспешный прогон)

В рамках тестового задания используется только браузер Chrome
