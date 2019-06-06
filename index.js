const debug = require('debug')('vk-commentspam:main')
const Utils = global.U = require('./utils')
const chalk = require('chalk')
const fs = require('fs')
const request = require('request-promise')
const readlineSync = require('readline-sync')

let { tokens, messages, stickers, mode, limit, post, interval } = fs.existsSync('./config.json') ? global.safeRequire('./config.json') : {}

let data = {
  sent: 0,
  success: 0,
  errors: 0,
}

let errors = {
  15: 'Нет доступа к комментированию записи. [нет 50 подписчиков / группа создана менее недели назад]',
  213: 'Нет возможности комментирования записи. [на странице пользователя закрыты комментарии]'
}

async function init () {
  console.log(`${chalk.blue('>')} Инициализация скрипта.`)

  let [, owner_id, post_id ] = post.match(/(\d+)_(\d+)/)

  tokens.forEach((token, index) => {
    if (token === '' || token == null) {
      console.error(`${chalk.red('>')} Токен #${index} не определен, удалите или заполните его.`)
      readlineSync.keyIn(`${chalk.blue('>')} Press any key . . .`, { hideEchoBack: true, mask: '' })
      process.exit(0)
    }
  })

  switch (mode) {
    case 1: {
      messages.forEach((message, index) => {
        if (message === '' || message == null) {
          console.error(`${chalk.red('>')} Сообщение #${index} не определено, удалите или заполните его.`)
          readlineSync.keyIn(`${chalk.blue('>')} Press any key . . .`, { hideEchoBack: true, mask: '' })
          process.exit(0)
        }
      })
      break
    }
    case 2: {
      stickers.forEach((sticker, index) => {
        if (sticker === '' || sticker == null) {
          console.error(`${chalk.red('>')} Стикер #${index} не определен, удалите или заполните его.`)
          readlineSync.keyIn(`${chalk.blue('>')} Press any key . . .`, { hideEchoBack: true, mask: '' })
          process.exit(0)
        }
      })
      break
    }
    default: {
      console.error(`${chalk.red('>')} Вы указали некорректный режим.`)
      readlineSync.keyIn(`${chalk.blue('>')} Press any key . . .`, { hideEchoBack: true, mask: '' })
      process.exit(0)
      break
    }
  }

  setInterval(async () => {
    tokens.forEach(async (token) => {
      data.sent++
      let message = mode === 1 ? messages[data.sent % messages.length] : stickers[data.sent % stickers.length]
      await request(`https://api.vk.com/method/wall.createComment?owner_id=${owner_id}&post_id=${post_id}&${mode === 1 ? 'message=' : 'sticker_id='}${encodeURI(message)}&v=5.95&access_token=${token}`)
        .then((resp) => {
          if (resp.includes('response')) {
            data.success++
            console.log(`${chalk.green('>')} Оставлен комментарий #${data.success} с${ mode === 1 ? ' текстом' : 'о стикером' } '${message}'.`)
            if (data.success >= limit && limit !== 0) {
              console.log(`${chalk.blue('>')} Завершена работа скрипта, достингут лимит.`)
              readlineSync.keyIn(`${chalk.blue('>')} Press any key . . .`, { hideEchoBack: true, mask: '' })
              process.exit(1)
            }
          } else {
            let { error } = JSON.parse(resp)
            let error_message = errors[error.error_code] || error.error_msg
            data.errors++
            console.log(`${chalk.red('>')} Ошибка при оставлении комментария #${data.sent} с${ mode === 1 ? ' текстом' : 'о стикером' } '${message}': ${error_message}`)
          }
        })
        .catch((error) => {
          if (error) {
            data.errors++
            console.log(`${chalk.red('>')} Ошибка при оставлении комментария #${data.sent} с${ mode === 1 ? ' текстом' : 'о стикером' } '${message}'.`)
          }
        })
    })
  }, interval)
  console.log(`${chalk.blue('>')} Скрипт запущен.`)
}

init().catch(console.error)
