import { computed, type Ref } from 'vue'

export type HSL = [hue: number, saturation: number, lightness: number]

export function useSuccessRate(successRate: Ref<string | number>) {
  const colorBlack: HSL = [0, 0, 0]
  const colorGreen: HSL = [122, 39, 49]
  const colorYellow: HSL = [54, 100, 62]
  const colorRed: HSL = [4, 90, 58]

  const successRateColor = computed((): HSL => {
    if (typeof successRate.value !== 'number') {
      return colorBlack
    }

    if (successRate.value === 100) {
      return colorGreen
    }
    if (successRate.value > 50) {
      return [
        colorYellow[0] + (colorGreen[0] - colorYellow[0]) * ((successRate.value - 50) / 50),
        colorYellow[1] + (colorGreen[1] - colorYellow[1]) * ((successRate.value - 50) / 50),
        colorYellow[2] + (colorGreen[2] - colorYellow[2]) * ((successRate.value - 50) / 50),
      ]
    }
    if (successRate.value === 50) {
      return colorYellow
    }
    if (successRate.value > 0) {
      return [
        colorRed[0] + (colorYellow[0] - colorRed[0]) * (successRate.value / 50),
        colorRed[1] + (colorYellow[1] - colorRed[1]) * (successRate.value / 50),
        colorRed[2] + (colorYellow[2] - colorRed[2]) * (successRate.value / 50),
      ]
    }
    return colorRed
  })
  const successRateColorString = computed(() => {
    return `hsl(${successRateColor.value[0]}, ${successRateColor.value[1]}%, ${successRateColor.value[2]}%)`
  })

  return {
    successRateColor,
    successRateColorString,
  }
}
