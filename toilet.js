function tick () {
  let time = 100 // seconds
  let to_send = []
  let MSG = document.getElementsByClassName('im-mess-stack')[document.getElementsByClassName('im-mess-stack').length - 1].getElementsByClassName('im-mess--text')[0].innerText
  MSG = MSG.slice(MSG.indexOf(',') + 2, MSG.length)
  if (MSG.indexOf('туалет') === 6) {
    let min_water = parseInt(MSG.substring(MSG.indexOf('Воды потрачено:') + 16, MSG.indexOf('кубометров воды.') - 1)) * 2
    let water = parseInt(MSG.substring(MSG.indexOf('Вода:') + 6, MSG.length - 4))
    let dirty = parseInt(MSG.substring(MSG.indexOf('В туалете грязно на') + 20, MSG.lastIndexOf('%')))
    console.table({ water, dirty, min_water })
    if (water < min_water) {
      to_send.push(`водоснабжение ${ (min_water - water) * 2 }`)
    }
    if (dirty > 60) {
      to_send.push('мистер пропер')
    }
  }
  if (MSG.includes('Нужно вызвать мистера пропера!')) {
    to_send.push('мистер пропер')
  }
  to_send.push('работать')
  to_send.map(e => {
    send(e)
  })
  setTimeout(tick, time * 1000)
  console.log('New message will be sent in: ' + (time - (time %= 60)) / 60 + (9 < time ? ':' : ':0') + Math.round(time))
}
const send = text => {
  setTimeout(() => {
    console.log(text)
    document.getElementsByClassName('im-chat-input--text')[0].innerHTML = text
    document.getElementsByClassName('im-send-btn')[1].classList.remove('im-send-btn_audio')
    document.getElementsByClassName('im-send-btn')[1].click()
  }, 2000)
}
tick()
