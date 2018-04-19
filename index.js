document.addEventListener('DOMContentLoaded', () => {
  const keyboardContainer = document.getElementsByClassName('keyboard-container')[0]
  const waveTypeNode = document.getElementById('wave-type')
  showKeys(keyboardContainer)
  document.addEventListener('keydown', (event) => handleKeyDown(event, waveTypeNode))
  document.addEventListener('keyup', handleKeyUp)
  
})

const audioCtx = new AudioContext()
const gain = audioCtx.createGain()
gain.connect(audioCtx.destination)

const soundingOscillators = {}

const handleKeyDown = (event, waveTypeNode) => {
  const key = event.key
  const waveType = waveTypeNode.value 
  if (pitchPairs[key]) {
    if (!soundingOscillators[key]) {
      const osc = audioCtx.createOscillator()
      osc.type = waveType
      osc.frequency.value = pitchPairs[key]
      osc.connect(gain)
      osc.start()
      soundingOscillators[key] = osc  
    }
  }
}

const handleKeyUp = event => {
  const key = event.key
  
  console.log('in handleKeyup soundingOscillators', soundingOscillators)
  if (soundingOscillators[key]) {
    soundingOscillators[key].disconnect()
    delete soundingOscillators[key]
  }
}

const keyMaker = keyObj => {
  return `<li class="${keyObj.className}" id="${keyObj.pitcj}" style="${keyObj.style}"><span class="${keyObj.className}-label">${keyObj.keypad}</span></li>`
}


const keyBoardMaker = keyData => {
  return keyData.map(keyObj => keyMaker(keyObj)).join('')
}

const showKeys = node => {
  node.innerHTML = keyBoardMaker(keyDataOctave4)
}
// 
// const keyDataOctave4 = [
//   {pitch: 'C4', className: 'white-key', style: 'left: 0px;', keypad: 'A'  },
//   {pitch: 'C#4', className: 'black-key', style: 'left: 46px;', keypad: 'W'  },
//   {pitch: 'D4', className: 'white-key', style: 'left: 66px;', keypad: 'S'  },
//   {pitch: 'D#4', className: 'black-key', style: 'left: 112px;', keypad: 'E'  },
//   {pitch: 'E4', className: 'white-key', style: 'left: 132px;', keypad: 'D'  },
//   {pitch: 'F4', className: 'white-key', style: 'left: 196px;', keypad: 'F'  },
//   {pitch: 'F#4', className: 'black-key', style: 'left: 242px;', keypad: 'T'  },
//   {pitch: 'G4', className: 'white-key', style: 'left: 262px;', keypad: 'G'  },
//   {pitch: 'G#4', className: 'black-key', style: 'left: 308px;', keypad: 'Y'  },
//   {pitch: 'A4', className: 'white-key', style: 'left: 328px;', keypad: 'H'  },
//   {pitch: 'A#4', className: 'black-key', style: 'left: 374px;', keypad: 'U'  },
//   {pitch: 'B4', className: 'white-key', style: 'left: 394px;', keypad: 'J'  },
//   {pitch: 'C4', className: 'white-key', style: 'left: 460px;', keypad: 'K'  },
//   {pitch: 'C#4', className: 'black-key', style: 'left: 506px;', keypad: 'O'  },
//   {pitch: 'D4', className: 'white-key', style: 'left: 526px;', keypad: 'L'  },
//   {pitch: 'D#4', className: 'black-key', style: 'left: 572px;', keypad: 'P'  },
//   {pitch: 'E4', className: 'white-key', style: 'left: 592px;', keypad: ';'  },
// ]
// 
// const pitchPairs = {
//   a: 262,
//   w: 278,
//   s: 294,
//   e: 311,
//   d: 330,
//   f: 349,
//   t: 370,
//   g: 392,
//   y: 415,
//   h: 440,
//   u: 466,
//   j: 494,
//   k: 523,
//   o: 554,
//   l: 587,
//   p: 622,
//   '\;': 659
// }