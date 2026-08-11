/**
 * @file src/app/domain/polls/poll.contracts.ts
 * @description Framework-independent contracts for the poll feature.
 *
 * The domain layer describes the data the application works with without
 * exposing Supabase table/column names to Angular pages.
 */

export const POLL_CATEGORIES = [
  'Team Activities',
  'Health & Wellness',
  'Gaming & Entertainment',
  'Education & Learning',
  'Lifestyle & Preferences',
  'Technology & Innovation',
] as const;

export type PollCategory = (typeof POLL_CATEGORIES)[number];

export interface PollSummary {
  id: number;
  title: string;
  category: PollCategory;
  description?: string;
  closesAt?: Date;
}

export interface PollChoice {
  id: number;
  label: string;
  text: string;
  votes: number;
  percentage: number;
}

export interface PollPrompt {
  id: number;
  text: string;
  multiple: boolean;
  choices: PollChoice[];
  totalVotes: number;
}

export interface PollDetails extends PollSummary {
  prompts: PollPrompt[];
}

export interface PollDraftChoice {
  text: string;
}

export interface PollDraftPrompt {
  text: string;
  multiple: boolean;
  choices: PollDraftChoice[];
}

export interface PollDraft {
  title: string;
  category: PollCategory;
  description?: string;
  closesAt?: string;
  prompts: PollDraftPrompt[];
}
