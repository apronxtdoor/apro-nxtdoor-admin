
export class PerformanceMonitor {
  private queryTimes: number[] = []
  private errorCount: number = 0

  async trackQuery<T>(query: Promise<T>, name: string): Promise<T> {
    const startTime = Date.now()
    
    try {
      const result = await query
      const endTime = Date.now()
      const duration = endTime - startTime
      
      this.queryTimes.push(duration)
      
      console.log(`Query ${name} completed in ${duration}ms`)
      
      // Log slow queries
      if (duration > 1000) {
        console.warn(`Slow query detected: ${name} took ${duration}ms`)
      }
      
      return result
    } catch (error) {
      this.errorCount++
      console.error(`Query ${name} failed:`, error)
      throw error
    }
  }

  getPerformanceMetrics() {
    const avgTime = this.queryTimes.length > 0 
      ? this.queryTimes.reduce((a, b) => a + b, 0) / this.queryTimes.length 
      : 0
    
    const p95Time = this.queryTimes.length > 0
      ? this.queryTimes.sort((a, b) => a - b)[Math.floor(this.queryTimes.length * 0.95)]
      : 0

    return {
      totalQueries: this.queryTimes.length,
      averageQueryTime: avgTime,
      p95QueryTime: p95Time,
      errorRate: this.queryTimes.length > 0 ? (this.errorCount / this.queryTimes.length) * 100 : 0,
      errorCount: this.errorCount
    }
  }
}

export const performanceMonitor = new PerformanceMonitor()