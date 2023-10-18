## **Client**
### Визуальная часть приложения
#### Действия:
- Изменить файл src/config.js
- npm install
- npm run start

## **Services**
### ServiceUser
#### Сервис создания, изменения, получения всех пользователей
#### Действия:
- docker-compose.yml 
  - изменить HISTORY_SERVICE_HOST - хост сервиса истории действий с пользователями
  - изменить HISTORY_SERVICE_PORT - порт сервиса истории действий с пользователями
- docker-compose build
- docker-compose up


### ServiceHistory
#### Сервис истории действий с пользователями
#### Действия:
- docker-compose build
- docker-compose up

## **Пример работы приложения**
### http://192.168.22.130:5500