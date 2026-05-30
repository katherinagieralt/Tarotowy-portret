export type ArticleType = 
  | "pillar" 
  | "cluster" 
  | "FAQ" 
  | "product-support" 
  | "comparison" 
  | "guide" 
  | "glossary" 
  | "relationship-content" 
  | "archetype-content";

export type SeoStatus = "index" | "noindex";

export type ContentQuality = "ready" | "needs_review" | "draft";

export interface BlogArticleInput {
  topic: string;
  mainKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string; // e.g. "informational", "commercial", "navigational"
  funnelStage: string; // e.g. "ToFu", "MoFu", "BoFu"
  relatedTarotCards?: number[]; // e.g. [0, 1, 2] for Fool, Magician, High Priestess
  relatedPortraitPositions?: number[]; // e.g. [1, 2, 3, 4]
  relatedCombinations?: string[];
  relatedProductsOrCTAs: string[]; // e.g. ["calculator", "individual_pdf", "partnership_pdf"]
  articleType: ArticleType;
  preferredLengthTokens?: number;
  tone?: string;
  seoBatch?: string; // identifier for mass generation grouping
}

export interface BlogArticleOutput {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  mainKeyword: string;
  secondaryKeywords: string[];
  searchIntent: string;
  funnelStage: string;
  recommendedInternalLinks: string[];
  recommendedCTA: string[];
  schemaTypes: string[]; // e.g. ["Article", "FAQPage"]
  seoStatus: SeoStatus;
  seoBatch: string;
  contentQuality: ContentQuality;
  articleBody: string; // The full markdown (MDX) content
}
