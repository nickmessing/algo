import type { UseTimeAgoMessages } from '@vueuse/core'

export const messages: UseTimeAgoMessages = {
  justNow: 'cîteva secunde în urmă',
  past: n => (n.match(/\d/) ? `acum ${n}` : n),
  future: n => (n.match(/\d/) ? `în ${n}` : n),
  month: (n, past) => (n === 1 ? (past ? 'luna trecută' : 'luna următoare') : `${n} lun${n > 1 ? 'i' : 'ă'}`),
  year: (n, past) => (n === 1 ? (past ? 'anul trecut' : 'anul următor') : `${n} an${n > 1 ? 'i' : ''}`),
  day: (n, past) => (n === 1 ? (past ? 'ieri' : 'mâine') : `${n} zi${n > 1 ? 'le' : ''}`),
  week: (n, past) =>
    n === 1 ? (past ? 'săptămâna trecută' : 'săptămâna următoare') : `${n} săptămân${n > 1 ? 'i' : 'ă'}`,
  hour: n => `${n} or${n > 1 ? 'e' : 'ă'}`,
  minute: n => `${n} minut${n > 1 ? 'e' : ''}`,
  second: n => `${n} secund${n > 1 ? 'e' : 'ă'}`,
}
