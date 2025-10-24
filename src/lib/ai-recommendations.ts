export interface UserBehavior {
  userId: string;
  searches: string[];
  clicks: string[];
  bookings: string[];
  location?: {
    lat: number;
    lng: number;
  };
  preferences?: string[];
}

export interface Recommendation {
  service: string;
  confidence: number;
  reason: string;
  providers: string[];
}

class AIRecommendationEngine {
  private async analyzePatterns(behavior: UserBehavior): Promise<string[]> {
    // Simple pattern analysis - in production, use ML model
    const patterns: string[] = [];
    
    // Analyze search patterns
    const searchKeywords = behavior.searches.join(' ').toLowerCase();
    if (searchKeywords.includes('emergency') || searchKeywords.includes('urgent')) {
      patterns.push('prefers_emergency_services');
    }
    
    if (searchKeywords.includes('renovation') || searchKeywords.includes('remodel')) {
      patterns.push('interested_in_renovation');
    }
    
    // Analyze location preferences
    if (behavior.location) {
      patterns.push('location_aware');
    }
    
    return patterns;
  }

  async getRecommendations(behavior: UserBehavior): Promise<Recommendation[]> {
    const patterns = await this.analyzePatterns(behavior);
    const recommendations: Recommendation[] = [];

    // Generate recommendations based on patterns
    if (patterns.includes('prefers_emergency_services')) {
      recommendations.push({
        service: 'Emergency Repair Services',
        confidence: 0.85,
        reason: 'Based on your search for urgent services',
        providers: ['24/7 Emergency Plumbers', 'Quick Fix Electricians']
      });
    }

    if (patterns.includes('interested_in_renovation')) {
      recommendations.push({
        service: 'Home Renovation Packages',
        confidence: 0.75,
        reason: 'You showed interest in renovation services',
        providers: ['Premium Renovators Inc', 'Dream Home Builders']
      });
    }

    // Default recommendations based on location
    if (patterns.includes('location_aware')) {
      recommendations.push({
        service: 'Local Top-Rated Services',
        confidence: 0.65,
        reason: 'Popular in your area',
        providers: ['Local Excellence Pros', 'Community Choice Services']
      });
    }

    // Sort by confidence
    return recommendations.sort((a, b) => b.confidence - a.confidence);
  }

  async predictUserNeeds(behavior: UserBehavior): Promise<{
    likelyServices: string[];
    peakHours: string[];
    budgetRange: string;
  }> {
    // Simple prediction logic - expand with real ML
    const likelyServices = Array.from(new Set([...behavior.searches, ...behavior.clicks])).slice(0, 5);
    
    // Predict peak hours based on user activity time
    const peakHours = ['09:00-12:00', '14:00-17:00']; // Default peaks
    
    // Predict budget range based on service types
    const hasPremiumSearches = behavior.searches.some(s => 
      s.toLowerCase().includes('premium') || s.toLowerCase().includes('luxury')
    );
    const budgetRange = hasPremiumSearches ? 'Premium' : 'Standard';

    return {
      likelyServices,
      peakHours,
      budgetRange
    };
  }
}

export const aiEngine = new AIRecommendationEngine();