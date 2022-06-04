const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString){
  const lyricStrings = lyricString.split('\n')
  const lyricInfos = []
  for (const lineString of lyricStrings) {
    const timeResult = timeRegExp.exec(lineString)
    if (!timeResult) continue
    const minuted = timeResult[1]
    const second = timeResult[2]
    const millisecond = timeResult[3]
    //文本
    const lyricText = lineString.replace(timeResult[0],'')
    lyricInfos.push({
      time:minuted + ':' + second + ':' + millisecond,
      lyricText
    })

  }
  return lyricInfos
}