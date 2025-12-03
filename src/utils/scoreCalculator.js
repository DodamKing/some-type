export class ScoreCalculator {
  constructor() {
    this.scores = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
      G: 0,
      H: 0
    }
  }

  // 점수 추가
  addScore(scoreData) {
    Object.entries(scoreData).forEach(([type, score]) => {
      this.scores[type] += score
    })
  }

  // 최종 유형 반환
  getFinalType() {
    return Object.entries(this.scores)
      .sort((a, b) => b[1] - a[1])[0][0]
  }

  // 점수 초기화
  reset() {
    Object.keys(this.scores).forEach(key => {
      this.scores[key] = 0
    })
  }

  // 상위 유형들 반환 (선택)
  getTopTypes(count = 3) {
    return Object.entries(this.scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([type, score]) => ({
        type,
        score: score.toFixed(1),
        percentage: ((score / 20) * 100).toFixed(1)
      }))
  }

  // 현재 점수 확인 (디버깅용)
  getCurrentScores() {
    return { ...this.scores }
  }
}