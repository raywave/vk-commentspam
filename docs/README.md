# Документация по работе с 'vk-commentspam'

## Установка

Установка у 'vk-commentspam' довольно простая, необходимо иметь установленный [Node.JS](https://nodejs.org/en/) и скачанный скрипт для автоматического комментирования, сделать это можно нажав на кнопку 'Clone or download' -> 'Download ZIP' или установив скрипт с помощью *GIT*, но с этим Вы сможете разобраться сами.

После скачивания скрипта, необходимо установить прикладные библиотеки для того, чтоб скрипт работал, сделать это можно открыв файл `install.bat` или `install.sh` в зависимости от вашей операционной системы.

После чего, закройте скрипт и откройте появившийся в папке файл `config.json` с помощью любого текстового редактора и настройте его.

```json
{
  "tokens": [
    "62210cbsm0k17gr4wc938533765dbb1d81590dxd4e9d90ef5ea7783d3a5aed1173z4e89a654877c6ade197ef"
  ],
  "messages": [
    "Тестовое сообщение 1",
    "Тестовое сообщение 2"
  ],
  "stickers": [
    "4276"
  ],
  "mode": 1,
  "limit": 0,
  "post": "https://vk.com/id506859913?w=wall506859913_79",
  "interval": 200
}
```

|Опция      |Описание                                                                    |
|-          |-                                                                           |
|tokens     |Массив [Токенов для работы с API ВКонтакте](#Получение-токена-группы)       |
|messages   |Массив комментариев (для первого режима)                                    |
|stickers   |Массив, содержащий [ID стикеров](#Получение-ID-стикера) (для второго режима)|
|mode       |Режим работы скрипта (1 - сообщения, 2 - стикеры)                           |
|limit      |Количество комментариев, необходимое для отправки                           |
|post       |Ссылка на пост, под который необходимо отправлять комментарии               |
|interval   |Интервал для отправки комментариев                                          |
|likecomment|Ставить ли лайк под оставленным комментарием?                               |
|time       |Время для обновления ленты ВКонтакте (в миллисекундах)                      |

### Получение токена группы

Для получечния токена группы, необходимо иметь права администратора в данной группе, имеете? Продолжаем. Заходите в раздел настроек группы, нажимайте на `Работа с API`, создайте новый ключ с правами `стена сообщества`, полученый ключ и будет токеном для работы с API ВКонтакте.

### Получение ID стикера

Для отправки определенного стикера, необходимо иметь его на аккаунте пользователя, который создал токен, если пользователь не владеет стикером, но стикер указан - отправится пустое сообщение.

Приступим к получению, переходим по [данной ссылке](https://vk.com/stickers), выбираем имеющийся у пользователя стикер-пак, открываем его, выбираем необходимый стикер, после чего копируем его URL (для Chrome - Правая Кнопка Мыши -> Копировать URL картинки), после чего вставляем его куда угодно, у вас должна получиться ссылка, подобная `https://vk.com/sticker/1-13431-128`, где 13431 - ID стикера.

## Запуск

Для запуска просто откройте `start.bat` или `start.sh` в зависимости от вашей операционной системы.