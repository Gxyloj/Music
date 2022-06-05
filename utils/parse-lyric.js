const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

export function parseLyric(lyricString){
  const lyricStrings = lyricString.split('\n')
  const lyricInfos = []
  for (const lineString of lyricStrings) {
    const timeResult = timeRegExp.exec(lineString)
    if (!timeResult) continue
    const minuted = timeResult[1] * 60 * 1000
    const second = timeResult[2] * 1000
    const millisecondTime = timeResult[3]
    const millisecond = millisecondTime.length === 2 ? millisecondTime * 10 : millisecondTime * 1
    const time = minuted + second + millisecond
    //文本
    const lyricText = lineString.replace(timeResult[0],'')
    lyricInfos.push({
      time:time,
      lyricText
    })

  }
  return lyricInfos
}