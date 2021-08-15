const key = "[YOUR DEEPL FREE API KEY]"
const svc = "https://api-free.deepl.com/v2/translate"

// let's keep the last text
let lastText = ""

function getCacheObject() {
  const raw = localStorage.getItem('translateCache')
  if (!raw) {
    return {}
  }
  try {
    const cache = JSON.parse(raw)
    return cache
  } catch(e) {
    return {}
  }
}

function getCache(text) {
  const cache = getCacheObject()
  if (cache[text]) {
    console.log("FROM CACHE")
    return cache[text]
  }
  return undefined
}

function setCache(key, value) {
  const cache = getCacheObject()
  cache[key] = value
  localStorage.setItem('translateCache', JSON.stringify(cache))
}

function fromAPI(text) {
  return new Promise((resolve)=>{
    fetch(`${svc}?auth_key=${key}&source_lang=PT&target_lang=EN&text=${encodeURI(text)}`).then((response)=>{
      if (response.status !== 200) {
        resolve(undefined)
      }
      response.json().then((data) => {
        resolve(data.translations[0].text)
      })
    })
  })
}

function updateDisplay(timestamp, sources, translations) {
  const translation = []
  for (const line in sources) {
    translation.push(sources[line].replace(/^[\s\n\r]*/, "").replace(/[\s\n\r]*$/, ""))
    const translateText = translations[line].replace(/^[\s\n\r]*/, "").replace(/[\s\n\r]*$/, "")
    if (translateText) {
      translation.push(`[${translateText}]`)
    } 
  }

  const updateText = translation.join("\n") 
  console.log(`[[${timestamp}]]\n${updateText}`)
  $(".rmp-cc-area-translation .rmp-cc-cue")[0].innerText = updateText
}

function translate(timestamp, text) {
  const sources = text.split("\n")
  const cache = getCache(text)
  if (cache) {
    const translations = cache.split("\n")
    updateDisplay(timestamp, sources, translations)
    return
  }

  fromAPI(text).then(response => {
    console.log("RESPONSE", response)
    const translations = response.split("\n")
    setCache(text, response)
    updateDisplay(timestamp, sources, translations)
  }) 
}

setTimeout(()=>{
  // turn on captions
  $(".captions-PT")[0].click()

  // hide existing captions
  const style = document.createElement("style")
  style.innerHTML = `
    .rmp-cc-area {
      display: none !important;
    }
  `
  document.head.appendChild(style)

  // add new caption div
  const div = document.createElement("div")
  $(".rmp-content")[0].appendChild(div)
  div.outerHTML = `
    <div class="rmp-cc-area-translation" style="display: block; width: 1100px; height: 619px; position: absolute; bottom: -368px;">
      <div class="rmp-cc-container" style="position: absolute; inset: 0px; margin: 1.5%;">
        <div class="rmp-cc-display" style="text-align: center; font: 14px Roboto, Arial, sans-serif; white-space: pre-line; position: absolute; direction: ltr; writing-mode: horizontal-tb; left: 0px; width: 100%; right: 0px;">
          <div class="rmp-cc-cue" style="color: rgb(255, 255, 255); background-color: rgba(0, 0, 0, 0.8); position: relative; inset: 0px; display: inline; writing-mode: horizontal-tb; unicode-bidi: plaintext;">
            - Não exatamente.
            - Ainda não sei, então.
          </div>
        </div>
      </div>
    </div> 
  `
}, 500)

setInterval(()=>{
  try {
    const newText = $(".rmp-cc-cue")[0].innerText
    const time = $(".rmp-time-elapsed-text")[0].innerText
    if (newText === lastText) {
      return
    }
    translate(time, newText)
    lastText = newText
  } catch (e) {

  }
}, 500)

